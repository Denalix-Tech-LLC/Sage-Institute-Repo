"use client";

/**
 * New Client Intake form.
 *
 * SECURITY NOTES (do not weaken):
 * - This form collects Protected Health Information (PHI).
 * - Data is held in React state (memory) only: never in localStorage,
 *   sessionStorage, cookies, URLs/query strings, or browser history.
 * - Submitted via HTTPS POST (JSON body) to the HIPAA-compliant endpoint in
 *   NEXT_PUBLIC_INTAKE_ENDPOINT. Never hardcode the URL here.
 * - Never log field values to the console, and never wire this page or its
 *   data to analytics/tracking of any kind.
 * - On success, form state is cleared from memory and a generic confirmation
 *   is shown (no PHI is echoed back).
 */

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2, Phone, Send } from "lucide-react";

import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PRACTICE_PHONE = "336-920-3487";

const INSURANCE_OPTIONS = [
  "No Insurance",
  "Aetna",
  "BCBS (except Blue Local, UNC Health Alliance, or other local/closed-network plans)",
  "Cigna",
  "United Healthcare",
  "Oxford",
  "Oscar",
  "Other",
];

const CLINICIAN_OPTIONS = [
  "Laurie Arena PMHNP",
  "Jade Montana PMHNP",
  "Amy Main PMHNP",
  "Lindsey Rebollar PMHNP",
  "No Preference",
  "Soonest Available",
];

interface IntakeState {
  legalName: string;
  email: string;
  phone: string;
  cityState: string;
  dob: string;
  age: string;
  insurance: string;
  issues: string;
  controlledStatus: string;
  controlledList: string;
  hospitalized: string;
  hospitalizedDetails: string;
  suicideAttempt: string;
  suicideWhen: string;
  addiction: string;
  addictionOther: string;
  recordsRelease: string;
  currentTreatment: string;
  clinician: string;
  referral: string;
  textOk: string;
  consent: boolean;
}

const INITIAL_STATE: IntakeState = {
  legalName: "",
  email: "",
  phone: "",
  cityState: "",
  dob: "",
  age: "",
  insurance: "",
  issues: "",
  controlledStatus: "",
  controlledList: "",
  hospitalized: "",
  hospitalizedDetails: "",
  suicideAttempt: "",
  suicideWhen: "",
  addiction: "",
  addictionOther: "",
  recordsRelease: "",
  currentTreatment: "",
  clinician: "",
  referral: "",
  textOk: "",
  consent: false,
};

type Errors = Partial<Record<keyof IntakeState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(state: IntakeState, field: keyof IntakeState): string {
  switch (field) {
    case "legalName": {
      const value = state.legalName.trim();
      if (!value) return "Please enter your legal name.";
      if (value.split(/\s+/).length < 2)
        return "Please include both your first and last name.";
      return "";
    }
    case "email":
      if (!state.email.trim()) return "Please enter your email address.";
      if (!EMAIL_RE.test(state.email.trim()))
        return "That email address doesn't look quite right.";
      return "";
    case "phone": {
      const digits = state.phone.replace(/\D/g, "");
      if (!digits) return "Please enter your phone number.";
      if (digits.length !== 10)
        return "Please enter a 10-digit phone number.";
      return "";
    }
    case "cityState":
      return state.cityState.trim() ? "" : "Please enter your city and state.";
    case "dob":
      return state.dob ? "" : "Please enter your date of birth.";
    case "age": {
      if (!state.age.trim()) return "Please enter your age.";
      const n = Number(state.age);
      if (!Number.isFinite(n) || n < 1 || n > 120)
        return "Please enter a valid age.";
      return "";
    }
    case "insurance":
      return state.insurance ? "" : "Please choose an insurance option.";
    case "issues":
      return state.issues.trim()
        ? ""
        : "Please share a little about what brings you here.";
    case "controlledStatus":
      return state.controlledStatus ? "" : "Please choose an option.";
    case "consent":
      return state.consent
        ? ""
        : "Please confirm and consent so we can contact you.";
    default:
      return "";
  }
}

const REQUIRED_FIELDS: (keyof IntakeState)[] = [
  "legalName",
  "email",
  "phone",
  "cityState",
  "dob",
  "age",
  "insurance",
  "issues",
  "controlledStatus",
  "consent",
];

function validateAll(state: IntakeState): Errors {
  const errors: Errors = {};
  for (const field of REQUIRED_FIELDS) {
    const message = validateField(state, field);
    if (message) errors[field] = message;
  }
  return errors;
}

/** Smoothly reveals conditional follow-up questions; honors reduced motion. */
function Reveal({ show, children }: { show: boolean; children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return show ? <div>{children}</div> : null;

  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HelperText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm leading-relaxed text-gray-500">
      {children}
    </p>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-600">
      {message}
    </p>
  );
}

interface RadioGroupProps {
  legend: string;
  sublabel?: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  helper?: ReactNode;
  error?: string;
  required?: boolean;
}

function RadioGroup({
  legend,
  sublabel,
  name,
  options,
  value,
  onChange,
  helper,
  error,
  required,
}: RadioGroupProps) {
  const helperId = helper ? `${name}-helper` : undefined;
  const errorId = error ? `${name}-error` : undefined;

  return (
    <fieldset
      aria-required={required || undefined}
      aria-invalid={error ? true : undefined}
      aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
    >
      <legend className="text-sm font-medium leading-relaxed text-ink">
        {legend}
        {required ? <span aria-hidden="true"> *</span> : null}
      </legend>
      {sublabel ? (
        <p className="mt-1 text-sm leading-relaxed text-gray-500">{sublabel}</p>
      ) : null}
      {helper ? <HelperText id={helperId!}>{helper}</HelperText> : null}
      <div className="mt-3 space-y-2.5">
        {options.map((option) => {
          const id = `${name}-${option.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`;
          return (
            <label
              key={option}
              htmlFor={id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border bg-white px-4 py-3 text-sm leading-relaxed text-ink transition-colors",
                value === option
                  ? "border-forest ring-1 ring-forest/30"
                  : "border-stone-200/60 hover:border-forest/40"
              )}
            >
              <input
                type="radio"
                id={id}
                name={name}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
                autoComplete="off"
                className="mt-0.5 h-4 w-4 shrink-0 accent-forest"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
      <FieldError id={errorId ?? `${name}-error`} message={error} />
    </fieldset>
  );
}

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="border-b border-stone-200/60 pb-3 pt-2">
      <Eyebrow>{label}</Eyebrow>
    </div>
  );
}

export function IntakeForm() {
  const [form, setForm] = useState<IntakeState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const set = <K extends keyof IntakeState>(field: K, value: IntakeState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear the error as soon as the user starts fixing the field.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  const handleBlur = (field: keyof IntakeState) => {
    const message = validateField(form, field);
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validateAll(form);
    setErrors(nextErrors);
    const firstError = REQUIRED_FIELDS.find((f) => nextErrors[f]);
    if (firstError) {
      document
        .getElementById(`field-${firstError}`)
        ?.scrollIntoView({ block: "center" });
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_INTAKE_ENDPOINT;
    if (!endpoint) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const payload = {
      legalName: form.legalName.trim(),
      email: form.email.trim(),
      phone: form.phone.replace(/\D/g, ""),
      cityState: form.cityState.trim(),
      dateOfBirth: form.dob,
      age: Number(form.age),
      insurance: form.insurance,
      issuesSeekingHelpWith: form.issues.trim(),
      controlledSubstances: {
        status: form.controlledStatus,
        list:
          form.controlledStatus === "Yes" || form.controlledStatus === "Maybe"
            ? form.controlledList.trim()
            : "",
      },
      psychiatricHospitalization: {
        status: form.hospitalized,
        details:
          form.hospitalized === "Yes" || form.hospitalized === "Other"
            ? form.hospitalizedDetails.trim()
            : "",
      },
      suicideAttemptHistory: {
        status: form.suicideAttempt,
        when:
          form.suicideAttempt === "Yes" || form.suicideAttempt === "Maybe"
            ? form.suicideWhen.trim()
            : "",
      },
      activeAddiction: {
        status: form.addiction,
        other: form.addiction === "Other" ? form.addictionOther.trim() : "",
      },
      willingToReleaseRecords: form.recordsRelease,
      currentlyInTreatment: form.currentTreatment,
      clinicianPreference: form.clinician,
      referralSource: form.referral.trim(),
      okToText: form.textOk,
      consentToContact: form.consent,
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submit-failed");
      // Clear PHI from memory before showing the confirmation.
      setForm(INITIAL_STATE);
      setErrors({});
      setStatus("success");
      window.scrollTo({ top: 0 });
    } catch {
      // Intentionally no logging: never emit PHI or raw errors to the console.
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-stone-200/60 bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest/10">
          <CheckCircle2 className="h-8 w-8 text-forest" aria-hidden="true" />
        </div>
        <h2 className="mt-6 font-serif text-2xl font-semibold text-forest">
          We&rsquo;ve received your information.
        </h2>
        <div className="mx-auto mt-4 max-w-xl space-y-3 leading-relaxed text-gray-600">
          <p>
            Once we review your information, we&rsquo;ll send you a text and an
            invite to our secure messaging app, Spruce Health. You&rsquo;ll then
            receive an email from TherapyPortal on behalf of The Sage Institute,
            and depending on billing status, possibly from Headway.co.
          </p>
          <p>
            Questions in the meantime? Text us at{" "}
            <a
              href={`sms:${PRACTICE_PHONE.replace(/-/g, "")}`}
              className="font-medium text-forest underline-offset-4 hover:underline"
            >
              {PRACTICE_PHONE}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  const showControlledList =
    form.controlledStatus === "Yes" || form.controlledStatus === "Maybe";
  const showHospitalizedDetails =
    form.hospitalized === "Yes" || form.hospitalized === "Other";
  const showSuicideWhen =
    form.suicideAttempt === "Yes" || form.suicideAttempt === "Maybe";
  const showAddictionOther = form.addiction === "Other";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm sm:p-8 md:p-10"
    >
      <div className="space-y-10">
        {/* ============ CONTACT INFO ============ */}
        <SectionHeading label="Contact Info" />

        <div id="field-legalName" className="space-y-1.5">
          <Label htmlFor="legalName">
            Legal name (first and last) <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="legalName"
            name="legalName"
            autoComplete="name"
            required
            value={form.legalName}
            onChange={(e) => set("legalName", e.target.value)}
            onBlur={() => handleBlur("legalName")}
            aria-invalid={errors.legalName ? true : undefined}
            aria-describedby={errors.legalName ? "legalName-error" : undefined}
          />
          <FieldError id="legalName-error" message={errors.legalName} />
        </div>

        <div id="field-email" className="space-y-1.5">
          <Label htmlFor="email">
            Email address <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div id="field-phone" className="space-y-1.5">
          <Label htmlFor="phone">
            10-digit phone number <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div id="field-cityState" className="space-y-1.5">
          <Label htmlFor="cityState">
            City and State <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="cityState"
            name="cityState"
            autoComplete="off"
            required
            value={form.cityState}
            onChange={(e) => set("cityState", e.target.value)}
            onBlur={() => handleBlur("cityState")}
            aria-invalid={errors.cityState ? true : undefined}
            aria-describedby={
              ["cityState-helper", errors.cityState ? "cityState-error" : ""]
                .filter(Boolean)
                .join(" ")
            }
          />
          <HelperText id="cityState-helper">
            We can only see clients virtually when they are in North Carolina
            at the time of the visit.
          </HelperText>
          <FieldError id="cityState-error" message={errors.cityState} />
        </div>

        <div id="field-dob" className="space-y-1.5">
          <Label htmlFor="dob">
            Date of birth <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="dob"
            name="dob"
            type="date"
            autoComplete="off"
            required
            value={form.dob}
            onChange={(e) => set("dob", e.target.value)}
            onBlur={() => handleBlur("dob")}
            aria-invalid={errors.dob ? true : undefined}
            aria-describedby={
              ["dob-helper", errors.dob ? "dob-error" : ""].filter(Boolean).join(" ")
            }
          />
          <HelperText id="dob-helper">We only see clients age 16 and up.</HelperText>
          <FieldError id="dob-error" message={errors.dob} />
        </div>

        <div id="field-age" className="space-y-1.5">
          <Label htmlFor="age">
            Age <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            inputMode="numeric"
            min={1}
            max={120}
            autoComplete="off"
            required
            value={form.age}
            onChange={(e) => set("age", e.target.value)}
            onBlur={() => handleBlur("age")}
            aria-invalid={errors.age ? true : undefined}
            aria-describedby={errors.age ? "age-error" : undefined}
            className="max-w-[10rem]"
          />
          <FieldError id="age-error" message={errors.age} />
        </div>

        {/* ============ INSURANCE ============ */}
        <SectionHeading label="Insurance" />

        <div id="field-insurance">
          <RadioGroup
            legend="Insurance"
            name="insurance"
            options={INSURANCE_OPTIONS}
            value={form.insurance}
            onChange={(v) => set("insurance", v)}
            required
            error={errors.insurance}
            helper={
              <>
                All clinicians are In-Network with Cigna, United, Aetna, Oxford,
                Meritain, Carelon, and Oscar Commercial plans. Laurie Arena
                PMHNP, Jade Montana PMHNP, and Lindsey Rebollar PMHNP are also
                In-Network with most BCBS plans (not local plans); Amy Main
                PMHNP is NOT in-network with BCBS. Other or no insurance:
                self-pay rates are available. We are NOT in-network with any
                Medicaid or Medicare plans.
              </>
            }
          />
        </div>

        {/* ============ CLINICAL HISTORY ============ */}
        <SectionHeading label="Clinical History" />

        <div id="field-issues" className="space-y-1.5">
          <Label htmlFor="issues">
            What issues are you seeking help around?{" "}
            <span aria-hidden="true">*</span>
          </Label>
          <Textarea
            id="issues"
            name="issues"
            autoComplete="off"
            required
            value={form.issues}
            onChange={(e) => set("issues", e.target.value)}
            onBlur={() => handleBlur("issues")}
            aria-invalid={errors.issues ? true : undefined}
            aria-describedby={errors.issues ? "issues-error" : undefined}
          />
          <FieldError id="issues-error" message={errors.issues} />
        </div>

        <div id="field-controlledStatus">
          <RadioGroup
            legend="Are you on any controlled-substance medications?"
            sublabel="(e.g., Xanax, Klonopin, Valium, Ativan, pain pills, Ambien, Adderall, Ritalin, Vyvanse)"
            name="controlledStatus"
            options={["Yes", "No", "Maybe"]}
            value={form.controlledStatus}
            onChange={(v) => set("controlledStatus", v)}
            required
            error={errors.controlledStatus}
            helper="We do not prescribe suboxone or ketamine products."
          />
        </div>

        <Reveal show={showControlledList}>
          <div className="space-y-1.5 pt-1">
            <Label htmlFor="controlledList">
              List any controlled substances and their doses
            </Label>
            <Textarea
              id="controlledList"
              name="controlledList"
              autoComplete="off"
              value={form.controlledList}
              onChange={(e) => set("controlledList", e.target.value)}
            />
          </div>
        </Reveal>

        <RadioGroup
          legend="Have you been psychiatrically hospitalized?"
          name="hospitalized"
          options={["Yes", "No", "Other"]}
          value={form.hospitalized}
          onChange={(v) => set("hospitalized", v)}
        />

        <Reveal show={showHospitalizedDetails}>
          <div className="space-y-1.5 pt-1">
            <Label htmlFor="hospitalizedDetails">
              If so, where/when was the hospitalization?
            </Label>
            <Textarea
              id="hospitalizedDetails"
              name="hospitalizedDetails"
              autoComplete="off"
              value={form.hospitalizedDetails}
              onChange={(e) => set("hospitalizedDetails", e.target.value)}
            />
          </div>
        </Reveal>

        <RadioGroup
          legend="Any history of suicide attempt?"
          name="suicideAttempt"
          options={["Yes", "No", "Maybe"]}
          value={form.suicideAttempt}
          onChange={(v) => set("suicideAttempt", v)}
        />

        <Reveal show={showSuicideWhen}>
          <div className="space-y-1.5 pt-1">
            <Label htmlFor="suicideWhen">If so, when?</Label>
            <Input
              id="suicideWhen"
              name="suicideWhen"
              autoComplete="off"
              value={form.suicideWhen}
              onChange={(e) => set("suicideWhen", e.target.value)}
            />
          </div>
        </Reveal>

        <RadioGroup
          legend="Any active addiction to alcohol or drugs?"
          name="addiction"
          options={["Yes", "No", "Maybe", "Other"]}
          value={form.addiction}
          onChange={(v) => set("addiction", v)}
        />

        <Reveal show={showAddictionOther}>
          <div className="space-y-1.5 pt-1">
            <Label htmlFor="addictionOther">Please describe (optional)</Label>
            <Input
              id="addictionOther"
              name="addictionOther"
              autoComplete="off"
              value={form.addictionOther}
              onChange={(e) => set("addictionOther", e.target.value)}
            />
          </div>
        </Reveal>

        <RadioGroup
          legend="Willing to have records released from previous mental-health providers?"
          name="recordsRelease"
          options={["Yes", "No"]}
          value={form.recordsRelease}
          onChange={(v) => set("recordsRelease", v)}
        />

        <RadioGroup
          legend="Currently in mental-health treatment or psychotherapy?"
          name="currentTreatment"
          options={["Yes", "No", "Maybe"]}
          value={form.currentTreatment}
          onChange={(v) => set("currentTreatment", v)}
        />

        {/* ============ PREFERENCES & CONSENT ============ */}
        <SectionHeading label="Preferences & Consent" />

        <RadioGroup
          legend="Who would you like to work with?"
          name="clinician"
          options={CLINICIAN_OPTIONS}
          value={form.clinician}
          onChange={(v) => set("clinician", v)}
        />

        <div className="space-y-1.5">
          <Label htmlFor="referral">Who referred you / how did you find us?</Label>
          <Input
            id="referral"
            name="referral"
            autoComplete="off"
            value={form.referral}
            onChange={(e) => set("referral", e.target.value)}
          />
        </div>

        <RadioGroup
          legend="Is it okay for us to text you with appointment instructions?"
          name="textOk"
          options={["Yes", "No"]}
          value={form.textOk}
          onChange={(v) => set("textOk", v)}
        />

        <div className="rounded-xl bg-cream p-5">
          <p className="text-sm leading-relaxed text-gray-700">
            Once we review your information, we&rsquo;ll send you a text and an
            invite to our secure messaging app, Spruce Health. You may text{" "}
            {PRACTICE_PHONE} with questions. You&rsquo;ll then receive an email
            from TherapyPortal on behalf of The Sage Institute, and depending on
            billing status, possibly from Headway.co.
          </p>
        </div>

        <div id="field-consent">
          <label
            htmlFor="consent"
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border bg-white px-4 py-3.5 text-sm leading-relaxed text-ink transition-colors",
              form.consent
                ? "border-forest ring-1 ring-forest/30"
                : "border-stone-200/60 hover:border-forest/40"
            )}
          >
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={form.consent}
              onChange={(e) => set("consent", e.target.checked)}
              autoComplete="off"
              required
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-0.5 h-4 w-4 shrink-0 accent-forest"
            />
            <span>
              I confirm that the information I&rsquo;ve provided is accurate,
              and I consent to The Sage Institute contacting me about
              scheduling and next steps. <span aria-hidden="true">*</span>
            </span>
          </label>
          <FieldError id="consent-error" message={errors.consent} />
        </div>

        {status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-stone-200/60 bg-cream p-5"
          >
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-gray-700">
              We couldn&rsquo;t submit your form just now. Rather than retrying,
              please call or text us at{" "}
              <a
                href={`tel:${PRACTICE_PHONE.replace(/-/g, "")}`}
                className="font-medium text-forest underline-offset-4 hover:underline"
              >
                {PRACTICE_PHONE}
              </a>{" "}
              and we&rsquo;ll take it from there.
            </p>
          </div>
        )}

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Submit intake form
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

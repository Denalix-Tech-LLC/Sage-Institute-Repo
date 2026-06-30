"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type Status = "idle" | "submitting" | "success";

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const serviceOptions = [
  "Executive Coaching",
  "Team Development",
  "Leadership Training",
  "Organizational Consulting",
  "Mindfulness Programs",
  "Keynote Speaking",
  "General enquiry",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(values: FormState): FormErrors {
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) {
      nextErrors.message = "Please enter a message.";
    }
    return nextErrors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setForm(initialForm);
      setErrors({});
    }, 1500);
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-forest/10">
          <CheckCircle2 className="h-12 w-12 text-forest" />
        </div>
        <h3 className="mt-6 font-serif text-xl text-forest">Message sent</h3>
        <p className="mt-3 max-w-md text-gray-600">
          Thank you — your message is on its way. A member of the Sage team will
          be in touch within one business day.
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          aria-invalid={errors.name ? true : undefined}
          className="mt-2"
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          aria-invalid={errors.email ? true : undefined}
          className="mt-2"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="service">Service interested in</Label>
        <Select
          value={form.service}
          onValueChange={(value) => setForm({ ...form, service: value })}
        >
          <SelectTrigger id="service" className="mt-2">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          aria-invalid={errors.message ? true : undefined}
          className="mt-2"
        />
        {errors.message && (
          <p className="text-sm text-red-600 mt-1">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}

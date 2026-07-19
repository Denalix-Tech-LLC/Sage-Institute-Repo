"use client";

// Catches errors thrown while rendering the root layout itself (Navbar,
// Footer, fonts). It replaces the entire layout, so it must render its own
// <html>/<body> — and because the global stylesheet may not be loaded in
// that state, all styling is inlined and self-contained on purpose.

const styles = {
  body: {
    margin: 0,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1ECEC", // cream
    color: "#1C1917", // ink
    fontFamily:
      "'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    textAlign: "center" as const,
    padding: "4rem 1.5rem",
  },
  heading: {
    margin: 0,
    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
    fontSize: "2.25rem",
    fontWeight: 600,
    color: "#365B6B", // forest (teal-slate)
  },
  copy: {
    margin: "1rem auto 0",
    maxWidth: "36rem",
    lineHeight: 1.65,
    color: "#57534E",
  },
  button: {
    marginTop: "2rem",
    display: "inline-block",
    padding: "0.75rem 2rem",
    borderRadius: "9999px",
    border: "none",
    backgroundColor: "#A092BE", // gold token (muted lavender)
    color: "#1C1917", // ink
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
  },
};

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={styles.body}>
        <div>
          <h1 style={styles.heading}>Something went wrong</h1>
          <p style={styles.copy}>
            We ran into an unexpected hiccup on our end. Take a breath and try
            again in a moment &mdash; we&rsquo;re still here for you.
          </p>
          <button type="button" style={styles.button} onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

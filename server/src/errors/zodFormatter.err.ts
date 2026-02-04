import type { ZodError } from "zod";

type FormattedZodIssue = {
  path: string;
  message: string;
  code: string;
};

export function formatZodError(err: ZodError): {
  message: string;
  errors: FormattedZodIssue[];
} {
  const errors: FormattedZodIssue[] = err.issues.map((issue) => ({
    path: issue.path.length > 0 ? issue.path.join(".") : "body",
    message: issue.message,
    code: issue.code,
  }));

  // 🔥 Combine all messages into ONE clean sentence
  const message = errors
    .map((e) => e.message)
    .filter(Boolean)
    .join(", ");

  return {
    message: message || "Invalid request data",
    errors,
  };
}

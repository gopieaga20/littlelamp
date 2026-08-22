"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, classOptions, type LeadFormValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Props = {
  source?: "CONTACT_FORM" | "BOOKING_FORM";
  title?: string;
  submitLabel?: string;
};

export function LeadForm({
  source = "CONTACT_FORM",
  title = "Tell us about your child",
  submitLabel = "Request a callback",
}: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { source },
  });

  async function onSubmit(values: LeadFormValues) {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      reset({ source });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="card text-center">
        <h3 className="text-lg font-semibold text-ink-800">Thank you!</h3>
        <p className="mt-2 text-sm text-ink-500">
          We&apos;ve received your details and will reach out shortly to confirm your free session.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4" noValidate>
      {title && <h3 className="text-lg font-semibold text-ink-800">{title}</h3>}

      {/* Honeypot — hidden from real users via CSS, catches naive bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div>
        <label htmlFor="parentName" className="mb-1 block text-sm font-medium text-ink-700">
          Parent&apos;s Name
        </label>
        <input
          id="parentName"
          type="text"
          autoComplete="name"
          className={cn(
            "w-full rounded-lg border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink-800 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100",
            errors.parentName && "border-red-400"
          )}
          {...register("parentName")}
        />
        {errors.parentName && <p className="mt-1 text-xs text-red-600">{errors.parentName.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={cn(
              "w-full rounded-lg border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink-800 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100",
              errors.phone && "border-red-400"
            )}
            {...register("phone")}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink-700">
            Email <span className="text-ink-400">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={cn(
              "w-full rounded-lg border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink-800 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100",
              errors.email && "border-red-400"
            )}
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="childClass" className="mb-1 block text-sm font-medium text-ink-700">
          Child&apos;s Class
        </label>
        <select
          id="childClass"
          defaultValue=""
          className={cn(
            "w-full rounded-lg border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink-800 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100",
            errors.childClass && "border-red-400"
          )}
          {...register("childClass")}
        >
          <option value="" disabled>
            Select class
          </option>
          {classOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.childClass && <p className="mt-1 text-xs text-red-600">{errors.childClass.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink-700">
          Anything you&apos;d like us to know? <span className="text-ink-400">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={3}
          className="w-full rounded-lg border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink-800 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          {...register("message")}
        />
      </div>

      {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full disabled:opacity-60">
        {status === "submitting" ? "Sending..." : submitLabel}
      </button>
    </form>
  );
}

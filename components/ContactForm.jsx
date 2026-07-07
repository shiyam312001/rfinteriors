"use client";

import { useState } from "react";
import { siteInfo } from "@/lib/content";
import Button from "./Button";

export default function ContactForm({ compact = false }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const service = formData.get("service");
    const message = formData.get("message");

    const text = encodeURIComponent(
      `Hi, I'm ${name}. I'm interested in ${service}. Phone: ${phone}. Message: ${message}`,
    );

    window.open(`https://wa.me/${siteInfo.whatsapp}?text=${text}`, "_blank");
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-border/80 bg-surface p-6 shadow-soft md:p-8 ${
        compact ? "" : "h-full"
      }`}
    >
      <h3 className="font-heading text-2xl font-semibold text-charcoal">
        Request a Free Quote
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        Share your requirements and we&apos;ll connect with you on WhatsApp.
      </p>

      <div className={`mt-8 grid gap-5 ${compact ? "" : "md:grid-cols-2"}`}>
        <label className="block text-sm">
          <span className="mb-2 block font-semibold text-charcoal">Name</span>
          <input
            required
            name="name"
            type="text"
            className="input-field"
            placeholder="Your name"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-2 block font-semibold text-charcoal">Phone</span>
          <input
            required
            name="phone"
            type="tel"
            className="input-field"
            placeholder="Your phone number"
          />
        </label>

        <label className={`block text-sm ${compact ? "" : "md:col-span-2"}`}>
          <span className="mb-2 block font-semibold text-charcoal">
            Service Needed
          </span>
          <select
            required
            name="service"
            className="input-field"
            defaultValue=""
          >
            <option value="" disabled>
              Select a service
            </option>
            <option value="PVC Cupboards">PVC Cupboards</option>
            <option value="UPVC Modular Kitchen">UPVC Modular Kitchen</option>
            <option value="Aluminium Windows">Aluminium Windows</option>
            <option value="Mosquito Nets">Mosquito Nets</option>
            <option value="Custom Interior Works">Custom Interior Works</option>
          </select>
        </label>

        <label className={`block text-sm ${compact ? "" : "md:col-span-2"}`}>
          <span className="mb-2 block font-semibold text-charcoal">Message</span>
          <textarea
            required
            name="message"
            rows={compact ? 4 : 5}
            className="input-field resize-none"
            placeholder="Tell us about your space, timeline, and requirements"
          />
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="md">
          Send via WhatsApp
        </Button>
        {submitted ? (
          <p className="text-sm text-muted">
            Opening WhatsApp with your message…
          </p>
        ) : null}
      </div>
    </form>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitInquiry } from "@/lib/site-data";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Please tell us your name").max(200),
  email: z.string().email("Enter a valid email").max(320).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  relation: z.string().max(120).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  preferred_date: z.string().optional().or(z.literal("")),
  preferred_time: z.string().optional().or(z.literal("")),
}).refine((d) => !!d.email || !!d.phone, {
  message: "Please give us a phone or email",
  path: ["email"],
});

type Values = z.infer<typeof schema>;

export function InquiryForm({
  kind,
  design,
  sourcePath,
  roomSlug,
  variant = "heritage",
  showSchedule = false,
  submitLabel,
}: {
  kind: "contact" | "tour" | "room" | "admissions";
  design: "heritage" | "heirloom";
  sourcePath: string;
  roomSlug?: string;
  variant?: "heritage" | "heirloom";
  showSchedule?: boolean;
  submitLabel?: string;
}) {
  const [done, setDone] = useState(false);
  const f = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", relation: "", message: "", preferred_date: "", preferred_time: "" },
  });

  const onSubmit = async (v: Values) => {
    try {
      await submitInquiry({
        kind,
        design,
        source_path: sourcePath,
        name: v.name,
        email: v.email || undefined,
        phone: v.phone || undefined,
        relation: v.relation || undefined,
        message: v.message || undefined,
        room_slug: roomSlug,
        preferred_date: v.preferred_date || undefined,
        preferred_time: v.preferred_time || undefined,
      });
      setDone(true);
      f.reset();
      toast.success("Thank you — we'll be in touch shortly.");
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please call us instead.");
    }
  };

  const isH = variant === "heritage";
  const inputCls = isH
    ? "w-full min-h-[44px] rounded-md border border-stone-300 bg-white px-3 py-2 text-base focus:border-[var(--h-primary)] outline-none"
    : "w-full min-h-[44px] border-0 border-b border-[var(--hl-border)] bg-transparent px-0 py-3 text-base focus:border-[var(--hl-ink)] outline-none";
  const labelCls = isH
    ? "block text-sm font-medium text-stone-700 mb-1"
    : "block text-xs uppercase tracking-[0.18em] text-[var(--hl-muted)] mb-2 font-mono";
  const errCls = "text-sm text-red-700 mt-1";
  const btnCls = isH
    ? "min-h-[48px] px-8 rounded-full text-white font-medium hover:brightness-110 transition disabled:opacity-60"
    : "min-h-[48px] px-8 rounded-none text-white font-medium hover:brightness-110 transition disabled:opacity-60";
  const btnBg = isH ? "var(--h-primary)" : "var(--hl-ink)";

  if (done) {
    return (
      <div className="p-6 rounded-lg" style={{ background: isH ? "var(--h-primary-soft)" : "var(--hl-primary-soft)" }}>
        <p className="font-medium">Thank you. We received your message and will reply within one business day.</p>
        <button onClick={() => setDone(false)} className="mt-3 text-sm underline">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={f.handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls} htmlFor="name">Your name</label>
          <input id="name" className={inputCls} {...f.register("name")} required aria-required="true" />
          {f.formState.errors.name && <p className={errCls}>{f.formState.errors.name.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="relation">Relationship to resident</label>
          <input id="relation" className={inputCls} placeholder="Daughter, son, spouse…" {...f.register("relation")} />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Email</label>
          <input id="email" type="email" className={inputCls} {...f.register("email")} />
          {f.formState.errors.email && <p className={errCls}>{f.formState.errors.email.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">Phone</label>
          <input id="phone" type="tel" className={inputCls} {...f.register("phone")} />
        </div>
        {showSchedule && (
          <>
            <div>
              <label className={labelCls} htmlFor="preferred_date">Preferred date</label>
              <input id="preferred_date" type="date" className={inputCls} {...f.register("preferred_date")} />
            </div>
            <div>
              <label className={labelCls} htmlFor="preferred_time">Preferred time</label>
              <input id="preferred_time" type="time" className={inputCls} {...f.register("preferred_time")} />
            </div>
          </>
        )}
      </div>
      <div>
        <label className={labelCls} htmlFor="message">How can we help?</label>
        <textarea id="message" rows={5} className={inputCls + " min-h-[120px]"} {...f.register("message")} />
      </div>
      <button type="submit" className={btnCls} style={{ background: btnBg }} disabled={f.formState.isSubmitting}>
        {f.formState.isSubmitting ? "Sending…" : (submitLabel ?? "Send message")}
      </button>
      <p className="text-xs text-stone-500">We respond within one business day. For urgent care needs, please call.</p>
    </form>
  );
}
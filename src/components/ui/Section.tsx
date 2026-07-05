import type { ReactNode } from "react";

export function Section({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children: ReactNode }) {
  return (
    <section className="py-12">
      <div className="mb-8 max-w-3xl">
        {eyebrow ? <p className="mb-2 text-sm font-bold text-brand-600">{eyebrow}</p> : null}
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
        {description ? <p className="mt-3 text-lg leading-8 text-slate-600">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

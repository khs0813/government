import { notFound } from "next/navigation";
import { getGuideBySlug, guides } from "@/data/guides";
import { JsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/jsonLd";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return createMetadata({ title: guide.title, description: guide.description, path: `/guides/${guide.slug}/` });
}

function getActionTitle(index: number) {
  const titles = ["공식 사이트에서 찾기", "내 조건 정리하기", "신청 전 확인하기", "놓치기 쉬운 기준 보기"];
  return titles[index % titles.length];
}

function getStepTitle(index: number) {
  const titles = ["먼저 확인할 것", "두 번째로 볼 것", "서류와 조건 확인", "마지막 점검"];
  return titles[index % titles.length];
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const [intro, ...details] = guide.body;
  const keyPoints = details.slice(0, 4);
  const steps = details.slice(4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "가이드", path: "/guides/" }, { name: guide.title, path: `/guides/${guide.slug}/` }])} />
      <JsonLd data={faqJsonLd(guide.faq)} />

      <div className="max-w-3xl">
        <p className="text-sm font-bold text-brand-600">{guide.category}</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">{guide.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{guide.description}</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <main className="space-y-8">
          <section className="rounded-2xl border border-brand-100 bg-brand-50 p-6 md:p-8">
            <p className="text-sm font-extrabold text-brand-700">핵심 요약</p>
            <p className="mt-3 text-xl font-extrabold leading-9 text-slate-950">{intro}</p>
          </section>

          {keyPoints.length ? (
            <section className="grid gap-4 md:grid-cols-2">
              {keyPoints.map((point, index) => (
                <div key={point} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-brand-700">
                    {index + 1}
                  </div>
                  <h2 className="text-lg font-black text-slate-950">{getActionTitle(index)}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{point}</p>
                </div>
              ))}
            </section>
          ) : null}

          {steps.length ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="max-w-2xl">
                <p className="text-sm font-bold text-brand-600">체크리스트</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">신청 전에 순서대로 확인하세요</h2>
              </div>
              <div className="mt-6 divide-y divide-slate-200">
                {steps.map((step, index) => (
                  <div key={step} className="grid gap-3 py-5 first:pt-0 last:pb-0 md:grid-cols-[160px_1fr]">
                    <p className="text-sm font-extrabold text-slate-950">{getStepTitle(index)}</p>
                    <p className="text-sm leading-7 text-slate-600">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </main>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-950">공식 확인처</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">아래 기관 안내를 최종 기준으로 확인하세요.</p>
            <div className="mt-5 grid gap-3">
              {guide.sources.map((source) => (
                <a key={source.url + source.name} href={source.url} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-brand-700 transition hover:border-brand-200 hover:bg-brand-50">
                  {source.name}
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-950">자주 묻는 질문</h2>
            <div className="mt-5 space-y-5">
              {guide.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="text-sm font-bold text-slate-950">{item.question}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

import { ButtonLink } from "@/components/ui/Button";

export function PolicyReferenceBox({
  sourceName,
  sourceUrl,
  sourceCheckedAt,
  officialUrl
}: {
  sourceName: string;
  sourceUrl: string;
  sourceCheckedAt: string;
  officialUrl: string;
}) {
  return (
    <section className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
      <p className="text-sm font-extrabold text-brand-700">공식 기준 확인</p>
      <dl className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
        <div>
          <dt className="inline font-bold text-slate-950">기준 확인일: </dt>
          <dd className="inline">{sourceCheckedAt}</dd>
        </div>
        <div>
          <dt className="inline font-bold text-slate-950">공식 출처: </dt>
          <dd className="inline">{sourceName}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-6 text-slate-700">
        본 계산기는 참고용이며, 실제 대상 여부와 지급액은 공식 기관 심사 결과에 따라 달라질 수 있습니다. 입력한 정보는 브라우저 내 계산에만 사용되며 민감한 개인정보를 요구하지 않습니다.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <ButtonLink href={sourceUrl} variant="secondary" className="w-full rounded-xl">공식 출처 확인</ButtonLink>
        <ButtonLink href={officialUrl} className="w-full rounded-xl">공식 신청/확인</ButtonLink>
      </div>
    </section>
  );
}

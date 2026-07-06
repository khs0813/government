export function SourceNotice({ sourceName, sourceUrl, sourceCheckedAt }: { sourceName: string; sourceUrl: string; sourceCheckedAt: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
      <p><span className="font-semibold text-slate-900">출처:</span> {sourceName}</p>
      <p><span className="font-semibold text-slate-900">기준 확인일:</span> {sourceCheckedAt}</p>
      <a className="mt-2 inline-block font-semibold text-brand-700 hover:underline" href={sourceUrl} target="_blank" rel="noreferrer">
        공식 출처 확인하기
      </a>
      <p className="mt-3 text-xs leading-5 text-slate-500">본 계산기는 참고용이며, 실제 대상 여부와 지급액은 공식 기관 심사 결과에 따라 달라질 수 있습니다.</p>
    </div>
  );
}

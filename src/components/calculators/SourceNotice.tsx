export function SourceNotice({ sourceName, sourceUrl, sourceCheckedAt }: { sourceName: string; sourceUrl: string; sourceCheckedAt: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
      <p><span className="font-semibold text-slate-900">출처:</span> {sourceName}</p>
      <p><span className="font-semibold text-slate-900">기준 확인일:</span> {sourceCheckedAt}</p>
      <a className="mt-2 inline-block font-semibold text-brand-700 hover:underline" href={sourceUrl} target="_blank" rel="noreferrer">
        공식 출처 확인하기
      </a>
    </div>
  );
}

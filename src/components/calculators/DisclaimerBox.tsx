export function DisclaimerBox() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
      <strong>중요 안내</strong>
      <p className="mt-1">
        본 결과는 사용자가 입력한 정보를 바탕으로 한 단순 자격 추정 결과입니다. 실제 신청 가능 여부와 지급 금액은 각 정부기관의 심사 결과에 따라 달라질 수 있습니다. 정확한 내용은 반드시 공식 신청기관에서 확인하세요.
      </p>
      <p className="mt-2 font-bold">
        주민등록번호, 계좌번호, 신분증, 상세주소를 입력하거나 이메일로 보내지 마세요.
      </p>
    </div>
  );
}

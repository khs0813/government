import type { Benefit } from "@/types/benefit";

export const benefits: Benefit[] = [
  {
    id: "earned-income-tax-credit",
    title: "근로장려금",
    slug: "earned-income-tax-credit",
    category: "low_income",
    shortDescription: "근로·사업소득이 있는 가구의 근로를 장려하는 세제 지원 제도입니다.",
    targetUsers: ["근로소득자", "사업소득자", "소득이 낮은 가구"],
    supportAmountText: "가구유형별 최대 지급액은 단독 165만원, 홑벌이 285만원, 맞벌이 330만원입니다.",
    applicationPeriodText: "정기 신청은 통상 5월, 반기 신청은 근로소득자 대상 공식 일정에 따릅니다.",
    agencyName: "국세청",
    officialUrl: "https://www.nts.go.kr/",
    sourceUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7783&mi=2452",
    sourceCheckedAt: "2026-07-04",
    isActive: true,
    isVerified: true,
    calculatorTitle: "근로장려금 자격 계산기",
    seoTitle: "근로장려금 계산기 | 2026 신청 가능성·소득·재산 기준 확인",
    seoDescription: "근로장려금 신청 가능성을 소득, 가구유형, 재산 조건으로 간단히 확인하세요.",
    benefitSeoDescription: "2026년 근로장려금의 가구유형별 소득 기준, 재산 기준, 국세청 신청 경로와 정기·반기 신청 전 확인할 항목을 정리했습니다.",
    faq: [
      { question: "이 계산기로 실제 지급액을 확정할 수 있나요?", answer: "아니요. 입력값을 바탕으로 한 단순 추정이며, 실제 지급 여부와 금액은 국세청 심사 결과에 따라 달라집니다." },
      { question: "재산 기준도 확인해야 하나요?", answer: "네. 근로장려금은 가구원 합산 재산이 2.4억원 미만인지 함께 확인해야 합니다." }
    ]
  },
  {
    id: "child-tax-credit",
    title: "자녀장려금",
    slug: "child-tax-credit",
    category: "childcare",
    shortDescription: "부양자녀가 있는 가구를 대상으로 하는 세제 지원 제도입니다.",
    targetUsers: ["부양자녀가 있는 가구", "저소득 가구"],
    supportAmountText: "부양자녀 1명당 최대 100만원 범위에서 소득에 따라 산정됩니다.",
    applicationPeriodText: "근로·자녀장려금 정기 신청 일정 등 국세청 공식 안내에 따릅니다.",
    agencyName: "국세청",
    officialUrl: "https://www.nts.go.kr/",
    sourceUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7783&mi=2452",
    sourceCheckedAt: "2026-07-04",
    isActive: true,
    isVerified: true,
    calculatorTitle: "자녀장려금 자격 계산기",
    seoTitle: "자녀장려금 계산기 | 자녀 수·소득 기준별 신청 가능성 확인",
    seoDescription: "자녀장려금 신청 가능성을 자녀 수, 소득, 재산 조건으로 간단히 확인하세요.",
    benefitSeoDescription: "자녀장려금 대상 부양자녀 요건, 총소득·재산 기준, 국세청 근로·자녀장려금 신청 전 확인할 공식 기준을 안내합니다.",
    faq: [
      { question: "자녀 수가 많으면 무조건 받을 수 있나요?", answer: "아니요. 부양자녀 조건 외에도 소득과 재산 조건을 함께 확인해야 합니다." },
      { question: "근로장려금과 같이 확인할 수 있나요?", answer: "네. 국세청 근로·자녀장려금 기준에서 소득과 재산 요건을 함께 확인할 수 있습니다." }
    ]
  },
  {
    id: "unemployment-benefit",
    title: "실업급여",
    slug: "unemployment-benefit",
    category: "employment",
    shortDescription: "고용보험 가입 근로자가 비자발적 실직 후 재취업 활동을 하는 경우 받을 수 있는 급여입니다.",
    targetUsers: ["실직자", "고용보험 가입자", "구직활동 예정자"],
    supportAmountText: "퇴직 전 평균임금, 고용보험 가입기간, 연령 등에 따라 달라집니다.",
    applicationPeriodText: "퇴직 후 지체 없이 신청 권장",
    agencyName: "고용24/고용보험",
    officialUrl: "https://www.work24.go.kr/",
    sourceUrl: "https://www.work24.go.kr/",
    sourceCheckedAt: "2026-07-04",
    isActive: true,
    isVerified: false,
    calculatorTitle: "실업급여 예상액 계산기",
    seoTitle: "실업급여 계산기 | 고용보험·퇴사 사유·근무기간 기준 확인",
    seoDescription: "실업급여 수급 가능성을 고용보험, 실직 상태, 구직활동 조건으로 확인하세요.",
    benefitSeoDescription: "실업급여 신청 전 고용보험 가입 이력, 이직 사유, 구직활동 요건과 고용24 공식 절차에서 확인할 내용을 정리했습니다.",
    faq: [
      { question: "자진퇴사도 실업급여를 받을 수 있나요?", answer: "일반적으로 제한될 수 있으나 예외 사유가 있을 수 있어 고용센터 확인이 필요합니다." },
      { question: "이 계산기는 예상액을 정확히 계산하나요?", answer: "아니요. 현재 입력값으로는 고용보험 피보험 단위기간, 이직 사유, 재취업활동 요건을 모두 확인할 수 없어 수급 가능성만 참고할 수 있습니다." }
    ]
  },
  {
    id: "parental-leave-benefit",
    title: "육아휴직급여",
    slug: "parental-leave-benefit",
    category: "childcare",
    shortDescription: "육아휴직을 사용하는 근로자를 대상으로 하는 고용보험 급여입니다.",
    targetUsers: ["육아휴직 근로자", "고용보험 가입자", "자녀가 있는 근로자"],
    supportAmountText: "통상임금, 육아휴직 기간, 적용 시점별 상한액에 따라 달라집니다.",
    applicationPeriodText: "육아휴직 사용 후 고용24/고용센터 공식 절차에 따라 신청합니다.",
    agencyName: "고용24/고용보험",
    officialUrl: "https://www.work24.go.kr/",
    sourceUrl: "https://www.work24.go.kr/",
    sourceCheckedAt: "2026-07-04",
    isActive: true,
    isVerified: false,
    calculatorTitle: "육아휴직급여 계산기",
    seoTitle: "육아휴직급여 계산기 | 통상임금 기준 예상 급여 확인",
    seoDescription: "육아휴직급여 신청 가능성을 고용보험, 자녀, 휴직 상태 기준으로 확인하세요.",
    benefitSeoDescription: "육아휴직급여 대상 근로자 요건, 고용보험 확인 사항, 자녀와 휴직 사용 조건, 고용24 신청 전 주의사항을 안내합니다.",
    faq: [
      { question: "고용보험 가입 여부가 중요한가요?", answer: "네. 육아휴직급여는 고용보험과 관련된 급여이므로 가입 요건 확인이 필요합니다." },
      { question: "사업자도 신청할 수 있나요?", answer: "일반 근로자 기준과 다를 수 있으므로 공식 기관 확인이 필요합니다." }
    ]
  },
  {
    id: "maternity-leave-benefit",
    title: "출산휴가급여",
    slug: "maternity-leave-benefit",
    category: "childcare",
    shortDescription: "출산전후휴가를 사용하는 근로자를 대상으로 하는 급여입니다.",
    targetUsers: ["임신·출산 근로자", "고용보험 가입자"],
    supportAmountText: "통상임금, 고용보험 가입기간, 우선지원대상기업 여부 등에 따라 달라집니다.",
    applicationPeriodText: "출산전후휴가 사용 후 고용24/고용센터 공식 절차에 따라 신청합니다.",
    agencyName: "고용24/고용보험",
    officialUrl: "https://www.work24.go.kr/",
    sourceUrl: "https://www.work24.go.kr/",
    sourceCheckedAt: "2026-07-04",
    isActive: true,
    isVerified: false,
    calculatorTitle: "출산휴가급여 계산기",
    seoTitle: "출산휴가급여 계산기 | 출산전후휴가 급여 예상 계산",
    seoDescription: "출산휴가급여 신청 가능성을 임신·출산, 고용보험 조건으로 확인하세요.",
    benefitSeoDescription: "출산전후휴가급여의 고용보험 요건, 휴가 사용 확인, 통상임금 관련 참고사항과 고용24 공식 확인 경로를 정리했습니다.",
    faq: [
      { question: "출산 예정이어도 확인할 수 있나요?", answer: "네. 임신 또는 출산 관련 상태를 선택해 예상 가능성을 확인할 수 있습니다." },
      { question: "정확한 금액은 어디서 확인하나요?", answer: "정확한 지급액은 고용24 또는 관할 고용센터 기준으로 확인해야 합니다." }
    ]
  },
  {
    id: "youth-rent-support",
    title: "청년 월세 지원",
    slug: "youth-rent-support",
    category: "housing",
    shortDescription: "월세로 거주하는 청년의 주거비 부담을 줄이기 위한 지원 제도입니다.",
    targetUsers: ["19~34세 청년", "무주택자", "부모와 별도 거주하는 월세 거주자"],
    supportAmountText: "청년월세 한시 특별지원은 월 최대 20만원 범위이며, 세부 기간은 사업 공고를 확인해야 합니다.",
    applicationPeriodText: "정부24, 복지로, 지자체별 접수 공고에 따릅니다.",
    agencyName: "정부24/복지로/지자체",
    officialUrl: "https://www.gov.kr/",
    sourceUrl: "https://www.gov.kr/",
    sourceCheckedAt: "2026-07-04",
    isActive: true,
    isVerified: false,
    calculatorTitle: "청년 월세 지원 자격 계산기",
    seoTitle: "청년월세 지원 계산기 | 무주택·소득·월세 기준 확인",
    seoDescription: "청년 월세 지원 가능성을 나이, 월세 거주, 무주택 조건으로 확인하세요.",
    benefitSeoDescription: "청년 월세 지원의 나이, 무주택, 월세 거주, 소득·재산 확인 항목과 정부24·복지로·지자체 공고 확인 방법을 안내합니다.",
    faq: [
      { question: "지역마다 조건이 다른가요?", answer: "네. 중앙정부 청년월세 한시 특별지원 외에도 지자체 사업은 조건, 신청기간, 금액이 다를 수 있습니다." },
      { question: "자가 보유자는 대상인가요?", answer: "일반적으로 무주택 여부가 중요한 조건이 될 수 있어 공식 공고 확인이 필요합니다." }
    ]
  },
  {
    id: "youth-savings-support",
    title: "청년도약계좌",
    slug: "youth-savings-support",
    category: "youth",
    shortDescription: "청년도약계좌는 신규 가입이 종료된 상품이며, 기존 가입자는 유지·만기·전환 가능 여부를 공식 안내에서 확인해야 합니다.",
    targetUsers: ["기존 청년도약계좌 가입자", "청년미래적금 대체 상품 확인 필요자"],
    supportAmountText: "신규 가입은 종료되었습니다. 기존 가입자의 유지, 만기, 특별중도해지, 청년미래적금 갈아타기 가능 여부는 공식 안내에서 확인해야 합니다.",
    applicationPeriodText: "신규 가입 종료. 기존 가입자는 금융위원회·서민금융진흥원·취급기관 공식 안내를 확인하세요.",
    agencyName: "금융위원회/서민금융진흥원",
    officialUrl: "https://www.fsc.go.kr/no010101/87106",
    sourceUrl: "https://www.fsc.go.kr/no010101/87106",
    sourceCheckedAt: "2026-07-06",
    isActive: true,
    isVerified: false,
    calculatorTitle: "청년도약계좌 신규가입 종료 및 대체상품 안내",
    seoTitle: "청년도약계좌 신규가입 종료 | 기존 가입자·청년미래적금 확인",
    seoDescription: "청년도약계좌 신규 가입 종료 후 기존 가입자의 유지·만기·갈아타기 확인 사항과 청년미래적금 대체 상품을 안내합니다.",
    benefitSeoDescription: "청년도약계좌 신규 가입 종료 이후 기존 가입자가 확인해야 할 유지, 만기, 특별중도해지, 청년미래적금 전환 관련 공식 안내를 정리했습니다.",
    faq: [
      { question: "청년도약계좌 신규 가입이 가능한가요?", answer: "아니요. 2026년 현재 청년도약계좌 신규 가입은 종료된 것으로 안내하고, 신규 가입자는 청년미래적금 등 대체 상품을 확인해야 합니다." },
      { question: "기존 가입자는 무엇을 확인해야 하나요?", answer: "유지, 만기, 특별중도해지, 청년미래적금 갈아타기 가능 여부를 금융위원회, 서민금융진흥원, 취급기관 공식 안내에서 확인해야 합니다." }
    ]
  },
  {
    id: "youth-future-savings",
    title: "청년미래적금",
    slug: "youth-future-savings",
    category: "youth",
    shortDescription: "청년도약계좌 종료 후 도입된 청년 자산형성 정책상품으로, 연령, 소득, 가구요건, 우대형 요건을 공식 심사로 확인합니다.",
    targetUsers: ["19~34세 청년", "직전연도 소득 확인 가능자", "중소기업 재직자·신규 취업자", "소상공인", "청년도약계좌 갈아타기 검토자"],
    supportAmountText: "월 최대 50만원 한도 자유적립식 3년 만기 상품이며, 소득수준·근로형태에 따라 정부기여금 지원이 달라질 수 있습니다.",
    applicationPeriodText: "1차 가입신청은 2026-06-22~2026-07-03에 종료되었습니다. 2026-07-06 현재 가입요건 확인 기간이며, 다음 모집 일정은 공식 발표 기준으로 업데이트됩니다.",
    agencyName: "금융위원회/서민금융진흥원",
    officialUrl: "https://www.fsc.go.kr/no010101/87106",
    sourceUrl: "https://www.fsc.go.kr/no010101/87106",
    sourceCheckedAt: "2026-07-06",
    isActive: true,
    isVerified: true,
    calculatorTitle: "청년미래적금 계산기",
    seoTitle: "청년미래적금 계산기 | 가입 가능성·갈아타기 확인",
    seoDescription: "청년미래적금 가입 가능성과 청년도약계좌 갈아타기 확인 사항을 참고용으로 점검하세요. 1차 가입신청 종료 후 다음 모집 일정은 공식 발표 기준으로 확인해야 합니다.",
    benefitSeoDescription: "청년미래적금 1차 가입신청 종료 후 가입요건·소득 심사 상태, 대상 요건, 청년도약계좌 갈아타기 주의사항과 공식 확인 경로를 안내합니다.",
    faq: [
      { question: "청년도약계좌 신규 가입이 가능한가요?", answer: "아니요. 청년도약계좌 신규 가입은 종료된 것으로 보고 청년미래적금 등 대체 상품을 확인해야 합니다." },
      { question: "청년미래적금은 누구나 신청할 수 있나요?", answer: "아니요. 나이, 직전연도 소득 확인, 개인소득, 가구요건, 금융소득 종합과세 여부 등을 취급기관과 서민금융진흥원에서 확인합니다." },
      { question: "기존 청년도약계좌 가입자는 갈아탈 수 있나요?", answer: "갈아타기를 검토할 수 있으나, 청년미래적금 계좌 개설 전 청년도약계좌를 먼저 해지하면 갈아타기가 불가할 수 있어 공식 안내를 반드시 확인해야 합니다." },
      { question: "병역 이행 기간은 나이 계산에 반영되나요?", answer: "금융위원회 안내에 따르면 병역 이행 기간은 최대 6년까지 연령 계산에서 미산입될 수 있습니다." },
      { question: "계산 결과가 실제 가입 가능 여부를 보장하나요?", answer: "아니요. 이 결과는 사전 참고용입니다. 1차 가입신청 종료 후에는 다음 모집 일정과 기존 신청자의 심사 결과를 공식 안내에서 확인해야 합니다." }
    ]
  },
  {
    id: "basic-pension",
    title: "기초연금",
    slug: "basic-pension",
    category: "senior",
    shortDescription: "일정 연령 이상의 어르신을 대상으로 소득인정액 기준에 따라 지급되는 연금입니다.",
    targetUsers: ["고령자", "소득인정액 기준 확인 필요자"],
    supportAmountText: "2026년 기준연금액은 월 349,700원이며, 소득수준·부부 동시 수급 등에 따라 감액될 수 있습니다.",
    applicationPeriodText: "대상 연령 도달 시 신청 가능 여부 확인",
    agencyName: "복지로/국민연금공단",
    officialUrl: "https://www.bokjiro.go.kr/",
    sourceUrl: "https://basicpension.mohw.go.kr/menu.es?mid=a10102010000",
    sourceCheckedAt: "2026-07-04",
    isActive: true,
    isVerified: true,
    calculatorTitle: "기초연금 자격 간편 계산기",
    seoTitle: "기초연금 계산기 | 2026 선정기준액·소득인정액 확인",
    seoDescription: "기초연금 신청 가능성을 나이, 소득, 재산 입력값으로 간단히 확인하세요.",
    benefitSeoDescription: "2026년 기초연금의 만 65세 연령 요건, 단독·부부가구 선정기준액, 소득인정액 확인 방법과 공식 신청 경로를 정리했습니다.",
    faq: [
      { question: "나이만 맞으면 받을 수 있나요?", answer: "아니요. 나이 요건 외에도 소득인정액 기준을 확인해야 합니다." },
      { question: "부부가구도 계산할 수 있나요?", answer: "혼인 여부와 월 소득인정액 참고값을 입력하면 2026년 부부가구 선정기준액 395.2만원을 기준으로 참고 결과를 볼 수 있습니다." }
    ]
  }
];

export function getBenefitBySlug(slug: string) {
  return benefits.find((benefit) => benefit.slug === slug);
}

export function getBenefitById(id: string) {
  return benefits.find((benefit) => benefit.id === id);
}

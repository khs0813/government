# 정부지원금 자격 계산기

정부지원금, 복지급여, 청년지원금, 고용지원금, 주거지원금 등을 사용자가 간단히 체크할 수 있는 Next.js 기반 SEO형 계산기 사이트입니다.

> 중요: 이 프로젝트에 포함된 지원금 조건과 룰 파일은 **개발용 초안 데이터**입니다. 실제 서비스 배포 전에는 반드시 정부24, 보조금24, 복지로, 국세청, 고용24, 지자체 공식 안내를 기준으로 최신 조건을 검증하고 `src/data/rules`와 `src/data/benefits.ts`를 수정해야 합니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 아래 주소를 확인합니다.

```text
http://localhost:3000
```

## 배포 전 설정

`.env.example`을 참고해서 `.env.local`을 만듭니다.

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SITE_URL=https://jiwoncalc.co.kr
NEXT_PUBLIC_NAVER_VERIFICATION=네이버_소유확인값
NEXT_PUBLIC_GOOGLE_VERIFICATION=구글_소유확인값
NEXT_PUBLIC_CONTACT_EMAIL=운영이메일@example.com
```

## 포함된 기능

- 메인 통합 지원금 자격 체크
- 계산기 목록 페이지
- 개별 계산기 페이지
- 지원금 상세 페이지
- 가이드 페이지
- 룰 기반 자격 판정 엔진
- sitemap.xml 자동 생성
- robots.txt 자동 생성
- SEO 메타태그, Open Graph, canonical
- FAQPage / Breadcrumb / WebApplication JSON-LD 구조화 데이터
- 개인정보 최소 수집 설계
- 면책 고지, 편집 정책, 계산 기준 페이지

## 주요 폴더

```text
src/app              Next.js App Router 페이지
src/components       UI, 계산기, SEO 컴포넌트
src/data             지원금/가이드/룰 데이터
src/lib              계산 엔진, SEO 유틸
src/types            타입 정의
```

## 데이터 수정 위치

지원금 기본 정보:

```text
src/data/benefits.ts
```

지원금 계산 룰:

```text
src/data/rules/*.json
```

가이드 콘텐츠:

```text
src/data/guides.ts
```

## 배포 후 체크리스트

1. `/robots.txt`가 200 OK로 열리는지 확인
2. `/sitemap.xml`이 XML로 열리는지 확인
3. Google Search Console 등록
4. Naver Search Advisor 등록
5. 사이트 소유확인 메타태그 삽입
6. 사이트맵 제출
7. 주요 계산기 URL 색인 요청
8. 네이버 사이트 간단체크 실행
9. 정책 데이터 최신성 검증
10. 광고/제휴 영역은 과장 문구 없이 적용

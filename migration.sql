-- Generated from CSV exports in ./from-lovable for direct execution in Supabase SQL Editor.
-- Assumes the target tables already exist in the public schema.
BEGIN;

-- education_stats (3 rows)
INSERT INTO public.education_stats (
  id, stat_key, stat_value, stat_suffix, stat_label, display_order, is_active, created_at, updated_at
)
VALUES
  ('17cc883d-4e20-4aeb-87e5-f7ecd92f61eb'::uuid, 'repurchase', '92', '%', '재구매/심화 교육 희망', 2, TRUE, '2026-01-30 16:31:57.201317+00'::timestamptz, '2026-01-30 16:31:57.201317+00'::timestamptz),
  ('04578ac2-fd14-4bc8-ae0a-af7d2af841df'::uuid, 'satisfaction', '4.6', '/5.0', '평균 교육 만족도', 1, TRUE, '2026-01-30 16:31:57.201317+00'::timestamptz, '2026-01-30 16:40:12.66061+00'::timestamptz),
  ('73660e6b-26d9-4cf2-82f4-bb43c77bbc12'::uuid, 'students', '243', '명', '누적 기업교육 수강생', 3, TRUE, '2026-01-30 16:31:57.201317+00'::timestamptz, '2026-02-20 06:13:10.648946+00'::timestamptz)
ON CONFLICT (id) DO UPDATE
SET
  stat_key = EXCLUDED.stat_key,
  stat_value = EXCLUDED.stat_value,
  stat_suffix = EXCLUDED.stat_suffix,
  stat_label = EXCLUDED.stat_label,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  created_at = EXCLUDED.created_at,
  updated_at = EXCLUDED.updated_at;

-- inquiries (14 rows)
INSERT INTO public.inquiries (
  id, inquiry_type, company, name, email, phone, department, position, company_type, topic, visit_path, message, employee_count, ai_status, pain_points, target_areas, budget, timeline, additional_info, ai_level, ai_interests, download_file, privacy_agreed, marketing_agreed, source_url, user_agent, ip_address, created_at
)
VALUES
  ('fcaf1686-68e5-4928-8c05-a9a756b679da'::uuid, 'diagnosis', '넥스트젠ai', '김도경', 'dk@nextgenai.kr', '010-2628-0313', 'ceo', 'test', NULL, NULL, NULL, NULL, '1-10', 'partial', ARRAY['manual_reports', 'no_roi']::text[], ARRAY['document', 'marketing']::text[], 'undecided', 'asap', 'dd', NULL, NULL, NULL, TRUE, FALSE, 'https://nextgenai.kr/', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', NULL, '2026-01-30 16:02:23.98354+00'::timestamptz),
  ('594c0c70-fc0a-4b78-83f0-4ce9cdf623ea'::uuid, 'download', '달파', '영어회화', 'luckyttangttang@gmail.com', NULL, '야나두', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'not-yet', ARRAY['data-analysis']::text[], 'AI_도입_사례집.pdf', TRUE, TRUE, 'https://nextgenai.kr/cases', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', NULL, '2026-01-30 16:04:06.401427+00'::timestamptz),
  ('80f1d4ff-0127-4019-9170-8ca616fac04b'::uuid, 'contact', '한국금형산업협동조합', '김옥선', 'oksun@koreamold.com', '01050530818', '전시마케팅', '차장', '기타', '기타', '기타', '홈페이지에 연락처가 없어서 이쪽에 문의 드립니다.
저희가 AI플랫폼 구축을 위해서 준비하고 있는데 구축에 대한 견적을 받아보려고 합니다. 빠른 회신 부탁드립니다.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, FALSE, 'https://nextgenai.kr/education', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0', NULL, '2026-02-12 02:52:26.409865+00'::timestamptz),
  ('c6e1c0f9-148d-4c63-a493-f14753d9a90a'::uuid, 'contact', 'ㅇㅇㅇ', 'ㅇㅇㅇ', 'dk@nextgenai.kr', '01026280313', '야나두', 'CEO', '대기업', 'AI 기초 교육', '소셜미디어', 'ㅇㅇㅇ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, FALSE, 'https://yanadoo-ax-homepage-6n6pzzofu-kdkcodes-projects.vercel.app/', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', NULL, '2026-02-19 15:09:18.31961+00'::timestamptz),
  ('1218df0d-400b-48ba-9691-0fc7b14b55ea'::uuid, 'download', '대모산개발단', '안승원', 'seunan@demodev.io', NULL, 'IT', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'considering', ARRAY['workflow']::text[], 'AI Education Curriculum', TRUE, FALSE, 'https://nextgenai.kr/education', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, '2026-02-25 06:03:38.205018+00'::timestamptz),
  ('5e25e0db-d709-4a65-9edf-d86a83b90bab'::uuid, 'download', '대모산개발단', '안승원', 'seunan@demodev.io', NULL, 'it', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'considering', ARRAY['workflow']::text[], 'AI_도입_사례집.pdf', TRUE, FALSE, 'https://nextgenai.kr/', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, '2026-02-25 06:04:16.676515+00'::timestamptz),
  ('18a62be8-0155-4889-8b95-694151d9ffb6'::uuid, 'download', '야나두', '강민서', 'ian@nextgenai.kr', NULL, '운영', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'in-use', ARRAY['marketing']::text[], 'AI_도입_사례집.pdf', TRUE, TRUE, 'https://nextgenai.kr/cases', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, '2026-02-25 10:38:22.88418+00'::timestamptz),
  ('7a5e0766-efc4-4ce9-8a53-a9995d9773c5'::uuid, 'download', '넥스트젠', '이원석', 'jack@nextgenai.kr', NULL, '그로스 스쿼드', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'in-use', ARRAY['cs-sales']::text[], 'AI_도입_사례집.pdf', TRUE, TRUE, 'https://nextgenai.kr/#about', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, '2026-02-27 02:17:39.572536+00'::timestamptz),
  ('4c322504-1fc1-4847-a63e-9ff1415b3f80'::uuid, 'download', '넥스트젠', '이원석', 'jack@nextgenai.kr', NULL, '그로스 스쿼드', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'in-use', ARRAY['marketing']::text[], 'AI Education Curriculum', TRUE, FALSE, 'https://nextgenai.kr/education', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, '2026-02-27 02:19:10.453704+00'::timestamptz),
  ('9561d2e2-bf39-4320-ae14-6d60e6bab0c1'::uuid, 'download', '모티브인텔리전스', '양준모', 'Jayyang@motiv-i.com', NULL, '대표이사', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'in-use', ARRAY['marketing', 'document', 'cs-sales', 'workflow']::text[], 'AI_도입_사례집.pdf', TRUE, FALSE, 'https://yanadooax.kr/', 'Mozilla/5.0 (Linux; Android 16; SM-F966N Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/145.0.7632.120 Mobile Safari/537.36 KAKAOTALK/26.1.3 (INAPP) ', NULL, '2026-03-05 08:19:57.025031+00'::timestamptz),
  ('06e98a9d-44cc-4bfe-ae3e-82819ab7c8ec'::uuid, 'download', '네이버', '나은빈', 'na.eunbin@navercorp.com', NULL, '마케팅', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'testing', ARRAY['data-analysis']::text[], 'AI Education Curriculum', TRUE, FALSE, 'https://nextgenai.kr/education', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.122 Whale/3.16.138.27 Safari/537.36', NULL, '2026-03-17 11:07:30.346751+00'::timestamptz),
  ('05cb1341-5e9c-4d85-9bb4-61301056eb81'::uuid, 'contact', '네이버', '나은빈', 'na.eunbin@navercorp.com', '01090955505', '마케팅', '리더', '대기업', '맞춤형 교육', '지인추천', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, FALSE, 'https://nextgenai.kr/ax-partners#', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.122 Whale/3.16.138.27 Safari/537.36', NULL, '2026-03-17 11:10:00.887849+00'::timestamptz),
  ('704aaf5f-74f0-42cf-a250-70cc6ef1a34f'::uuid, 'contact', '넥스트젠에이아이', '임재호', 'khan@nextgenai.kr', '01030120571', '개발팀', '리드', '대기업', '생성형 AI 활용', '뉴스/기사', 'ssssss', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, 'http://localhost:3001/ko/education', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', NULL, '2026-03-18 08:54:53.106852+00'::timestamptz),
  ('d5725058-6687-42e1-8943-6cc65e768ead'::uuid, 'contact', '테스트 주식회사', '홍길동', 'test@example.com', '010-1234-5678', '개발팀', '팀장', NULL, 'AI 도입 상담', NULL, 'DB 트리거 자동 알림 테스트입니다.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, FALSE, NULL, NULL, NULL, '2026-03-18 11:46:39.341167+00'::timestamptz)
ON CONFLICT (id) DO UPDATE
SET
  inquiry_type = EXCLUDED.inquiry_type,
  company = EXCLUDED.company,
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  department = EXCLUDED.department,
  position = EXCLUDED.position,
  company_type = EXCLUDED.company_type,
  topic = EXCLUDED.topic,
  visit_path = EXCLUDED.visit_path,
  message = EXCLUDED.message,
  employee_count = EXCLUDED.employee_count,
  ai_status = EXCLUDED.ai_status,
  pain_points = EXCLUDED.pain_points,
  target_areas = EXCLUDED.target_areas,
  budget = EXCLUDED.budget,
  timeline = EXCLUDED.timeline,
  additional_info = EXCLUDED.additional_info,
  ai_level = EXCLUDED.ai_level,
  ai_interests = EXCLUDED.ai_interests,
  download_file = EXCLUDED.download_file,
  privacy_agreed = EXCLUDED.privacy_agreed,
  marketing_agreed = EXCLUDED.marketing_agreed,
  source_url = EXCLUDED.source_url,
  user_agent = EXCLUDED.user_agent,
  ip_address = EXCLUDED.ip_address,
  created_at = EXCLUDED.created_at;

-- testimonials (19 rows)
INSERT INTO public.testimonials (
  id, title, subtitle, content, author_name, author_title, author_company_size, author_avatar_url, display_order, is_active, language, created_at, updated_at, category
)
VALUES
  ('996f8021-2135-4062-963d-865be68a35be'::uuid, '컨설팅이 아닌 실제 시스템 구축', 'PoC에서 끝나지 않는 진짜 AX를 경험했습니다', 'PoC 컨설팅이랑은 완전히 다릅니다. 보고서만 받고 끝나는 게 아니라, 실제로 돌아가는 시스템을 함께 만들었어요. 지금도 그 시스템을 우리 팀이 직접 운영하고 개선하고 있습니다.', 'DX 담당 매니저', '대기업 제조사', '직원수 500+', NULL, 1, TRUE, 'ko', '2026-01-27 07:17:07.009753+00'::timestamptz, '2026-01-27 07:17:07.009753+00'::timestamptz, 'home'),
  ('25b79d45-d024-483a-961e-392cdb4e75a1'::uuid, '업무 시간이 절반으로 줄었습니다', '반복 업무에서 해방되어 창의적인 일에 집중할 수 있게 되었습니다', '매일 3시간씩 걸리던 리포트 작성이 이제 30분이면 끝납니다. AI가 데이터를 수집하고 초안을 작성해주니, 저는 검토와 인사이트 도출에만 집중하면 됩니다.', '마케팅 팀장', '이커머스 스타트업', '직원수 50+', NULL, 2, TRUE, 'ko', '2026-01-27 07:17:07.009753+00'::timestamptz, '2026-01-27 07:17:07.009753+00'::timestamptz, 'home'),
  ('4cdc8e60-d4ba-4a68-85e7-e17a88328d9c'::uuid, 'AI 도입의 두려움이 사라졌습니다', '현업 담당자도 쉽게 사용할 수 있는 시스템이었습니다', '처음엔 AI가 어렵고 복잡할 거라 걱정했는데, NextGenAI 팀이 우리 업무 방식에 맞춰 시스템을 만들어줬어요. 이제 팀원 누구나 AI 어시스턴트를 활용하고 있습니다.', 'HR 파트장', '중견 유통기업', '직원수 200+', NULL, 3, TRUE, 'ko', '2026-01-27 07:17:07.009753+00'::timestamptz, '2026-01-27 07:17:07.009753+00'::timestamptz, 'home'),
  ('1075b685-e484-49c4-a974-2de7c32ec96e'::uuid, 'ROI가 명확하게 보입니다', '투자 대비 성과가 눈에 보이는 AI 프로젝트였습니다', '다른 AI 프로젝트는 효과 측정이 어려웠는데, NextGenAI는 처음부터 KPI를 정하고 시작했습니다. 6개월 만에 인건비 30% 절감, 처리 속도 5배 향상을 달성했어요.', 'COO', '핀테크 기업', '직원수 100+', NULL, 4, TRUE, 'ko', '2026-01-27 07:17:07.009753+00'::timestamptz, '2026-01-27 07:17:07.009753+00'::timestamptz, 'home'),
  ('6ef52115-ef28-46c3-8b7a-627589164d6b'::uuid, 'コンサルティングではなく実際のシステム構築', 'PoCで終わらない本物のAXを経験しました', 'PoCコンサルティングとは全く違います。レポートを受け取って終わりではなく、実際に動くシステムを一緒に作りました。今もそのシステムを私たちのチームが直接運用・改善しています。', 'DX担当マネージャー', '大手製造業', '従業員500名以上', NULL, 1, TRUE, 'ja', '2026-01-27 07:17:07.009753+00'::timestamptz, '2026-01-27 07:17:07.009753+00'::timestamptz, 'home'),
  ('518b2832-1850-4d24-ba39-ec96a6e8f0d5'::uuid, '業務時間が半分に減りました', '繰り返し作業から解放され、創造的な仕事に集中できるようになりました', '毎日3時間かかっていたレポート作成が、今では30分で終わります。AIがデータを収集して下書きを作成してくれるので、私はレビューとインサイトの導出に集中すればいいんです。', 'マーケティングチームリーダー', 'ECスタートアップ', '従業員50名以上', NULL, 2, TRUE, 'ja', '2026-01-27 07:17:07.009753+00'::timestamptz, '2026-01-27 07:17:07.009753+00'::timestamptz, 'home'),
  ('03dda2fb-ab2a-4087-a83b-3c3320af4991'::uuid, 'AI導入の不安がなくなりました', '現場担当者でも簡単に使えるシステムでした', '最初はAIが難しくて複雑だと心配していましたが、NextGenAIチームが私たちの業務方式に合わせてシステムを作ってくれました。今ではチームの誰もがAIアシスタントを活用しています。', 'HR担当', '中堅流通企業', '従業員200名以上', NULL, 3, TRUE, 'ja', '2026-01-27 07:17:07.009753+00'::timestamptz, '2026-01-27 07:17:07.009753+00'::timestamptz, 'home'),
  ('3e5f72b3-6276-40af-9b3c-ab046d08ac67'::uuid, 'ROIが明確に見えます', '投資対効果が目に見えるAIプロジェクトでした', '他のAIプロジェクトは効果測定が難しかったのですが、NextGenAIは最初からKPIを設定してスタートしました。6ヶ月で人件費30%削減、処理速度5倍向上を達成しました。', 'COO', 'フィンテック企業', '従業員100名以上', NULL, 4, TRUE, 'ja', '2026-01-27 07:17:07.009753+00'::timestamptz, '2026-01-27 07:17:07.009753+00'::timestamptz, 'home'),
  ('7a0dc680-6c3e-4b63-8c00-8c20d2a64951'::uuid, 'AI 해커톤 운영', '첫 미팅 후 불과 한달 반만에', '첫 미팅 후 불과 한달 반만에 이렇게 큰 행사를 치를 수 있었던 것은 적극적인 지원과 노력, 역량 덕분이었습니다. 이번 해커톤을 성공으로 이끄는데 큰 도움을 주셨습니다. 우수한 전문코치와 특강사 섭외, 빠짐없는 물품 준비, 운영진의 빠른 업무처리가 인상적이었습니다.', '김두환 리더님', '포스코인재창조원', NULL, NULL, 1, TRUE, 'ko', '2026-01-27 08:08:38.623555+00'::timestamptz, '2026-01-27 08:08:38.623555+00'::timestamptz, 'education'),
  ('e7d2012f-c0a3-45db-b522-5ff924adacc0'::uuid, 'AI 업무자동화 교육', '팀 전체의 업무 효율 향상', 'AI 교육 후 팀 전체의 업무 효율이 눈에 띄게 향상되었습니다. 반복 업무가 50% 이상 줄었어요. 단순히 툴 사용법만 알려주는 게 아니라, 실제 우리 업무에 바로 적용할 수 있는 워크플로우를 함께 설계해주셔서 교육 직후부터 성과가 나왔습니다.', '운영팀장', '이커머스 M사', NULL, NULL, 2, TRUE, 'ko', '2026-01-27 08:08:38.623555+00'::timestamptz, '2026-01-27 08:08:38.623555+00'::timestamptz, 'education'),
  ('21ceb7f5-259d-4ca7-851d-2057e5020d6c'::uuid, 'AI 활용 방법론 교육', '실무 적용이 명확해졌습니다', 'AI 활용에 대한 방법론을 구체적으로 설명해 주신 덕분에, 실무에 어떻게 적용할 수 있을지 더 명확하게 이해할 수 있었습니다.', '실무 담당자', '에듀테크 Y사', NULL, NULL, 3, TRUE, 'ko', '2026-01-30 08:45:19.528106+00'::timestamptz, '2026-01-30 08:45:19.528106+00'::timestamptz, 'education'),
  ('4d80385f-a5c9-4f75-94ec-edcb44d787c1'::uuid, '맞춤형 팀 교육', '팀 단위 교육의 장점', '그룹 교육보다 팀 단위로 운영하니 궁금한 점을 바로바로 물어볼 수 있어서 좋았습니다. 회계팀은 엑셀 작업이 많은데 AI가 이해할 수 있는 자료 정리법 등 특정 팀에 적합한 내용만 집중해서 교육받을 수 있어서 좋았습니다.', '회계팀 담당자', '에듀테크 Y사', NULL, NULL, 4, TRUE, 'ko', '2026-01-30 08:45:19.528106+00'::timestamptz, '2026-01-30 08:45:19.528106+00'::timestamptz, 'education'),
  ('aed8c644-61c5-4b67-9106-213a039fefb3'::uuid, '실무 기반 맞춤 교육', '실제 니즈에 맞춘 교육', '이전에는 브로드하게 받다보니 실무에 얼마나 적용이 되려나 괴리감이 컸었는데, 이번엔 실무 기반으로 필요하다고 생각되는 것들을 맞춤으로 들을 수 있어서 AI를 더 다양하게 활용해볼 수 있겠다는 생각이 들었습니다.', '팀원', '에듀테크 Y사', NULL, NULL, 5, TRUE, 'ko', '2026-01-30 08:45:19.528106+00'::timestamptz, '2026-01-30 08:45:19.528106+00'::timestamptz, 'education'),
  ('9f82a2d5-0a80-4547-93dd-815767ba8600'::uuid, '프롬프트 활용 교육', '효과적인 질문 방식 습득', '효과적으로 질문하는 방식에 대한 이해도가 높아지면서, 전반적인 업무 활용도와 산출물의 완성도가 함께 개선되어 대단히 만족스럽습니다!', '실무 담당자', '이커머스 S사', NULL, NULL, 6, TRUE, 'ko', '2026-01-30 08:45:19.528106+00'::timestamptz, '2026-01-30 08:45:19.528106+00'::timestamptz, 'education'),
  ('66ee9111-76a7-4a7d-a5bc-21aeb09bf8f3'::uuid, 'GEM 활용법 교육', '반복 업무 자동화', '동일한 형식으로 데이터를 반복 분석하고 보고서/슬랙/노션으로 정리하던 작업을 GEM 활용법을 익혀서 일관된 포맷으로 자동화할 수 있게 되어 업무가 확실히 간소화되었습니다.', '데이터 분석 담당자', '이커머스 S사', NULL, NULL, 7, TRUE, 'ko', '2026-01-30 08:45:19.528106+00'::timestamptz, '2026-01-30 08:45:19.528106+00'::timestamptz, 'education'),
  ('4520a86c-83d4-451c-8e1e-fc03f3fb9a2a'::uuid, 'AI 툴 실습 교육', '화면 공유와 실습이 좋았습니다', 'AI 툴 별로 실제 사용 화면 공유하면서 설명해주셔서 이해하기 쉬웠습니다! 그리고 툴 별로 실무에 적용할 수 있는 부분들 같이 고민해주셔서 좋았습니다.', '팀원', '이커머스 S사', NULL, NULL, 8, TRUE, 'ko', '2026-01-30 08:45:19.528106+00'::timestamptz, '2026-01-30 08:45:19.528106+00'::timestamptz, 'education'),
  ('f14b4bbd-a6b7-4081-94bd-7869df9305dc'::uuid, 'N8N 자동화 교육', '복잡한 툴도 차근차근', 'N8N은 다른 AI 툴 대비 사용법이 복잡한 편인데 초반 세팅부터 차근차근 배울 수 있어 많은 도움이 되었으며 실시간으로 N8N을 활용하는 수업 방식에 보다 쉽게 배울 수 있었습니다.', '운영팀 팀원', '게임 O사', NULL, NULL, 9, TRUE, 'ko', '2026-01-30 08:45:19.528106+00'::timestamptz, '2026-01-30 08:45:19.528106+00'::timestamptz, 'education'),
  ('c3a1a99b-f246-45f4-94c3-5cc0e5b36747'::uuid, 'Figma AI 기능 교육', '실무 적용 가능한 내용', '피그마에서 Gemini Nano 기능을 활용하는 방법을 실습 중심으로 배울 수 있어 좋았습니다. 실무에서 바로 적용할 수 있는 내용이라 매우 유익했습니다.', '디자인팀 팀원', '게임 O사', NULL, NULL, 10, TRUE, 'ko', '2026-01-30 08:45:19.528106+00'::timestamptz, '2026-01-30 08:45:19.528106+00'::timestamptz, 'education'),
  ('f44056fb-2c00-4da8-9cd1-2c757483ec16'::uuid, '바이브 코딩 기초 교육', '직접 만들어보고 싶어졌습니다', '바이브 코딩이 무엇인지와 관련 툴들을 정리해서 설명해주셔서 이해하기 쉬웠습니다. 구글 AI 스튜디오를 활용해 실제로 어떻게 구현할 수 있는지까지 보여주셔서 도움이 많이 되었습니다.', '개발팀 팀원', '게임 O사', NULL, NULL, 11, TRUE, 'ko', '2026-01-30 08:45:19.528106+00'::timestamptz, '2026-01-30 08:45:19.528106+00'::timestamptz, 'education')
ON CONFLICT (id) DO UPDATE
SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  content = EXCLUDED.content,
  author_name = EXCLUDED.author_name,
  author_title = EXCLUDED.author_title,
  author_company_size = EXCLUDED.author_company_size,
  author_avatar_url = EXCLUDED.author_avatar_url,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  language = EXCLUDED.language,
  created_at = EXCLUDED.created_at,
  updated_at = EXCLUDED.updated_at,
  category = EXCLUDED.category;

-- user_roles (1 row)
INSERT INTO public.user_roles (
  id, user_id, role, created_at
)
VALUES
  ('22f4baf0-1292-444f-a68b-db0d1047d214'::uuid, '57fb3720-d3a3-4f49-a96d-dd1034b38aa0'::uuid, 'admin'::public.app_role, '2026-01-27 07:46:29.90523+00'::timestamptz)
ON CONFLICT (id) DO UPDATE
SET
  user_id = EXCLUDED.user_id,
  role = EXCLUDED.role,
  created_at = EXCLUDED.created_at;

COMMIT;

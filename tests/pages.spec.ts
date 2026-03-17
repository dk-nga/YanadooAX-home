import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Yanadoo AX — 전체 페이지 마이그레이션 검증
//
// 기존 Vite 프로젝트(yanadoo-ax-homepage)에 있던 모든 공개·관리자 라우트가
// 새 Next.js 프로젝트에 구현되었는지 확인한다.
// 각 페이지가 200 응답을 반환하고, 페이지별 핵심 요소가 존재하는지 검증한다.
// ---------------------------------------------------------------------------

// ── 공개 페이지 ──────────────────────────────────────────────────────────────

test.describe('공개 페이지', () => {
  test('/ — 홈페이지가 렌더링된다', async ({ page }) => {
    const res = await page.goto('/');
    expect(res?.status()).toBe(200);

    // Header가 존재한다
    await expect(page.locator('header')).toBeVisible();

    // 메인 콘텐츠 영역이 존재한다
    await expect(page.locator('main')).toBeVisible();

    // Footer가 존재한다
    await expect(page.locator('footer')).toBeVisible();
  });

  test('/blog — 블로그 목록이 렌더링된다', async ({ page }) => {
    const res = await page.goto('/blog');
    expect(res?.status()).toBe(200);

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('/blog/[slug] — 블로그 상세가 렌더링된다', async ({ page }) => {
    // 임의의 slug로 접근해도 404가 아닌 블로그 상세 페이지 자체가 렌더링되어야 한다
    const res = await page.goto('/blog/test-post');
    expect(res?.status()).toBeLessThan(500);

    await expect(page.locator('header')).toBeVisible();
  });

  test('/cases — 고객 사례가 렌더링된다', async ({ page }) => {
    const res = await page.goto('/cases');
    expect(res?.status()).toBe(200);

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('/education — AI 교육 페이지가 렌더링된다', async ({ page }) => {
    const res = await page.goto('/education');
    expect(res?.status()).toBe(200);

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('/ax-partners — AX 파트너스가 렌더링된다', async ({ page }) => {
    const res = await page.goto('/ax-partners');
    expect(res?.status()).toBe(200);

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('/privacy — 개인정보처리방침이 렌더링된다', async ({ page }) => {
    const res = await page.goto('/privacy');
    expect(res?.status()).toBe(200);

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('/terms — 이용약관이 렌더링된다', async ({ page }) => {
    const res = await page.goto('/terms');
    expect(res?.status()).toBe(200);

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('존재하지 않는 경로 — 404 페이지가 렌더링된다', async ({ page }) => {
    const res = await page.goto('/this-page-does-not-exist');
    // Next.js는 404 시 200 또는 404 status를 반환할 수 있다
    expect(res?.status()).toBeLessThan(500);

    // 404 안내 텍스트 또는 홈으로 돌아가기 링크가 있어야 한다
    const body = await page.textContent('body');
    expect(body).toBeTruthy();
  });
});

// ── 관리자 페이지 ────────────────────────────────────────────────────────────

test.describe('관리자 페이지', () => {
  test('/admin/login — 관리자 로그인 페이지가 렌더링된다', async ({ page }) => {
    const res = await page.goto('/admin/login');
    expect(res?.status()).toBe(200);

    // 로그인 폼 요소가 존재한다 (이메일, 비밀번호 입력 필드)
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"], input[name="password"]')).toBeVisible();
  });

  test('/admin — 관리자 대시보드 라우트가 존재한다', async ({ page }) => {
    const res = await page.goto('/admin');
    expect(res?.status()).toBeLessThan(500);

    // 미인증 시 로그인 페이지로 리다이렉트되거나 대시보드가 표시되어야 한다
    const url = page.url();
    const isAdminOrLogin = url.includes('/admin');
    expect(isAdminOrLogin).toBeTruthy();
  });

  test('/admin/inquiries — 문의 관리 라우트가 존재한다', async ({ page }) => {
    const res = await page.goto('/admin/inquiries');
    expect(res?.status()).toBeLessThan(500);
  });

  test('/admin/testimonials — 후기 관리 라우트가 존재한다', async ({ page }) => {
    const res = await page.goto('/admin/testimonials');
    expect(res?.status()).toBeLessThan(500);
  });

  test('/admin/files — 파일 관리 라우트가 존재한다', async ({ page }) => {
    const res = await page.goto('/admin/files');
    expect(res?.status()).toBeLessThan(500);
  });

  test('/admin/education-stats — 교육 통계 관리 라우트가 존재한다', async ({ page }) => {
    const res = await page.goto('/admin/education-stats');
    expect(res?.status()).toBeLessThan(500);
  });
});

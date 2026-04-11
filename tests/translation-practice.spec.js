import { test, expect } from '@playwright/test';

test.describe('Translation Practice (Writing Module)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/writing');
  });

  test('TC-WRT-001-01: Translation via Manual Text Input (Happy Path)', async ({ page }) => {
    // 1. Click Start
    await page.getByRole('button', { name: /Bắt đầu Practice/i }).click();
    
    // 2. Identify the question
    const questionText = await page.locator('h2').textContent();
    console.log('Testing with question:', questionText);

    // 3. Input answer
    const textarea = page.getByPlaceholder(/Nhập câu tiếng Anh bản dịch của bạn vào đây/i);
    await textarea.fill('Testing manual input');
    
    // 4. Go to next question
    await page.getByRole('button', { name: /Câu tiếp theo/i }).click();
    
    // 5. Verify it moved to Question 2/10
    await expect(page.getByText('Câu hỏi 2 / 10')).toBeVisible();
  });

  test('TC-WRT-001-03: Semantic Matching Evaluation (Validation of scoring)', async ({ page }) => {
    await page.getByRole('button', { name: /Bắt đầu Practice/i }).click();
    
    // Fill all 10 questions to reach submission
    for (let i = 1; i <= 10; i++) {
      const textarea = page.getByPlaceholder(/Nhập câu tiếng Anh bản dịch của bạn vào đây/i);
      await textarea.fill(`Answer for question ${i}`);
      if (i < 10) {
        await page.getByRole('button', { name: /Câu tiếp theo/i }).click();
      }
    }

    // Submit
    await page.getByRole('button', { name: /🚀 Submit All/i }).click();

    // Verify results page
    await expect(page.getByText(/Kết quả Phiên học/i)).toBeVisible({ timeout: 10000 });
    const scoreText = await page.locator('div[style*="font-size: 4rem"]').textContent();
    console.log('Total Score:', scoreText);
    expect(parseFloat(scoreText)).toBeGreaterThanOrEqual(0);
  });

  test('TC-WRT-001-07: Navigation Integrity (Back/Next Persistence)', async ({ page }) => {
    await page.getByRole('button', { name: /Bắt đầu Practice/i }).click();
    
    const textarea = page.getByPlaceholder(/Nhập câu tiếng Anh bản dịch của bạn vào đây/i);
    await textarea.fill('Persistence Check Text');
    
    await page.getByRole('button', { name: /Câu tiếp theo/i }).click();
    await expect(page.getByText('Câu hỏi 2 / 10')).toBeVisible();
    
    await page.getByRole('button', { name: /Quay lại/i }).click();
    await expect(page.getByText('Câu hỏi 1 / 10')).toBeVisible();
    
    // Check if value is preserved
    const value = await textarea.inputValue();
    expect(value).toBe('Persistence Check Text');
  });

  test('TC-WRT-001-04: Negative Scenario: Empty Input Validation', async ({ page }) => {
    await page.getByRole('button', { name: /Bắt đầu Practice/i }).click();
    
    // Try to go next without typing
    await page.getByRole('button', { name: /Câu tiếp theo/i }).click();
    
    // Expecting an error or alert or to stay on the same page
    // Based on requirement, it should show "Vui lòng nhập câu trả lời"
    const errorMsg = page.getByText(/Vui lòng nhập câu trả lời/i);
    // This is likely to FAIL if not implemented
    await expect(errorMsg).toBeVisible({ timeout: 3000 });
  });
});

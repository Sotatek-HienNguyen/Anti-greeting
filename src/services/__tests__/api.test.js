import { describe, it, expect, vi } from 'vitest';
import { fetchWritingSession, submitWritingSession } from '../api';

// Mock the data import
vi.mock('../../data/sentences.json', () => ({
  default: [
    {
      id: 1,
      vn: "Xin chào",
      en: ["Hello", "Hi"]
    },
    {
      id: 2,
      vn: "Bạn khỏe không?",
      en: ["How are you?", "How's it going?"]
    }
  ]
}));

describe('api.js - Writing Session Logic', () => {
  it('fetchWritingSession should return correct structure and limit questions', async () => {
    const session = await fetchWritingSession(1);
    expect(session).toHaveProperty('sessionId');
    expect(session.questions).toHaveLength(1);
    expect(session.questions[0]).toHaveProperty('id');
    expect(session.questions[0]).toHaveProperty('vn');
    expect(session.questions[0]).toHaveProperty('hint');
  });

  it('submitWritingSession should score 1.00 for exact matches', async () => {
    const answers = [{ id: 1, userAnswer: "Hello" }];
    const result = await submitWritingSession(answers);
    
    expect(result.totalScore).toBe("1.00");
    expect(result.results[0].result).toBe('correct');
    expect(result.results[0].score).toBe("1.00");
  });

  it('submitWritingSession should score partial for similar answers', async () => {
    // "How are you" vs "How are u"
    const answers = [{ id: 2, userAnswer: "How are u" }];
    const result = await submitWritingSession(answers);
    
    const score = parseFloat(result.results[0].score);
    expect(score).toBeGreaterThan(0.55);
    expect(score).toBeLessThan(1.00);
    expect(result.results[0].result).toBe('partial');
  });

  it('submitWritingSession should handle incorrect answers', async () => {
    const answers = [{ id: 1, userAnswer: "Goodbye" }];
    const result = await submitWritingSession(answers);
    
    expect(result.results[0].result).toBe('incorrect');
    expect(parseFloat(result.results[0].score)).toBeLessThan(0.55);
  });

  it('submitWritingSession should handle empty answers', async () => {
    const answers = [{ id: 1, userAnswer: "" }];
    const result = await submitWritingSession(answers);
    
    expect(result.results[0].score).toBe("0.00");
    expect(result.results[0].result).toBe('incorrect');
  });
});

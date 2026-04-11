import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock browser globals using stubGlobal
vi.stubGlobal('speechSynthesis', {
  speak: vi.fn(),
  cancel: vi.fn(),
  getVoices: vi.fn(() => []),
});

class MockSpeechRecognition {
  constructor() {
    this.start = vi.fn();
    this.stop = vi.fn();
    this.onstart = null;
    this.onresult = null;
    this.onerror = null;
    this.onend = null;
  }
}

vi.stubGlobal('SpeechRecognition', MockSpeechRecognition);
vi.stubGlobal('webkitSpeechRecognition', MockSpeechRecognition);

class MockSpeechSynthesisUtterance {
  constructor(text) {
    this.text = text;
    this.lang = '';
    this.voice = null;
  }
}

vi.stubGlobal('SpeechSynthesisUtterance', MockSpeechSynthesisUtterance);

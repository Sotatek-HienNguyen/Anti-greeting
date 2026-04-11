import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Writing from '../Writing';
import { BrowserRouter } from 'react-router-dom';

// Mock the API services
vi.mock('../../services/api', () => ({
  fetchWritingSession: vi.fn(() => Promise.resolve({
    sessionId: 'session-123',
    questions: [
      { id: 1, vn: 'Chào bạn', hint: 'Hello' },
      { id: 2, vn: 'Tạm biệt', hint: 'Goodbye' }
    ]
  })),
  submitWritingSession: vi.fn(() => Promise.resolve({
    totalScore: '1.00',
    maxScore: 1,
    results: [
      { id: 1, userAnswer: 'Hello', result: 'correct', score: '1.00', suggestion: 'Hello', feedback: 'Good' }
    ]
  }))
}));

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Writing Page - Regression', () => {
  it('should render init screen and transition to playing', async () => {
    renderWithRouter(<Writing />);
    
    const startBtn = screen.getByText(/Bắt đầu Practice/i);
    expect(startBtn).toBeInTheDocument();
    
    fireEvent.click(startBtn);
    
    await waitFor(() => {
      expect(screen.getByText(/Dịch câu sau:/i)).toBeInTheDocument();
      expect(screen.getByText(/"Chào bạn"/i)).toBeInTheDocument();
    });
  });

  it('should preserve text when navigating between questions', async () => {
    renderWithRouter(<Writing />);
    fireEvent.click(screen.getByText(/Bắt đầu Practice/i));
    
    await screen.findByText(/"Chào bạn"/i);
    const textarea = screen.getByPlaceholderText(/Nhập câu tiếng Anh bản dịch của bạn vào đây/i);
    
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    
    fireEvent.click(screen.getByText(/Câu tiếp theo/i));
    await screen.findByText(/"Tạm biệt"/i);
    
    fireEvent.click(screen.getByText(/Quay lại/i));
    await screen.findByText(/"Chào bạn"/i);
    
    expect(screen.getByDisplayValue(/Hello/i)).toBeInTheDocument();
  });

  it('should trigger speech synthesis on hint click', async () => {
    renderWithRouter(<Writing />);
    fireEvent.click(screen.getByText(/Bắt đầu Practice/i));
    await screen.findByText(/"Chào bạn"/i);
    
    const hintBtn = screen.getByTitle(/Nghe gợi ý/i);
    fireEvent.click(hintBtn);
    
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });

  it('should show results after submission', async () => {
    renderWithRouter(<Writing />);
    fireEvent.click(screen.getByText(/Bắt đầu Practice/i));
    await screen.findByText(/"Chào bạn"/i);
    
    // Skip to the last question
    fireEvent.click(screen.getByText(/Câu tiếp theo/i));
    await screen.findByText(/"Tạm biệt"/i);
    
    const submitBtn = screen.getByText(/🚀 Submit All/i);
    fireEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(screen.queryByText(/Kết quả Phiên học/i)).toBeInTheDocument();
      // Use getAll because 1.00 appears in both summary and individual results
      const scores = screen.getAllByText(/1.00/);
      expect(scores.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });
});

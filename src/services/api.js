import stringSimilarity from 'string-similarity';
import SENTENCES from '../data/sentences.json';

// Lấy ngẫu nhiên n câu
export const fetchWritingSession = async (limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const shuffled = [...SENTENCES].sort(() => 0.5 - Math.random());
      const sessionData = shuffled.slice(0, limit).map((s) => ({
        id: s.id,
        vn: s.vn,
        hint: s.en[0] // Expose first correct answer for speech synthesis hint
      }));
      resolve({
        sessionId: Math.random().toString(36).substr(2, 9),
        questions: sessionData
      });
    }, 500); // Simulate network latency
  });
};

// Chấm điểm submit
export const submitWritingSession = async (answers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let totalScore = 0;
      const results = answers.map((ans) => {
        const question = SENTENCES.find(s => s.id === ans.id);
        if (!question) return { ...ans, result: 'incorrect', score: 0, feedback: 'Question not found' };

        const userAnswer = (ans.userAnswer || "").trim().toLowerCase().replace(/[.,!?;]/g, '');
        
        let bestMatchScore = 0;
        let suggestion = question.en[0];

        // So sánh với list đáp án đúng
        for (let target of question.en) {
           const cleanTarget = target.toLowerCase().replace(/[.,!?;]/g, '');
           const score = stringSimilarity.compareTwoStrings(userAnswer, cleanTarget);
           if (score > bestMatchScore) {
             bestMatchScore = score;
             suggestion = target;
           }
        }

        let feedback = "";
        let result = "";
        if (bestMatchScore > 0.85) {
           result = "correct";
           feedback = "Tuyệt cú mèo! Exact match!";
           totalScore += 1;
        } else if (bestMatchScore >= 0.55) {
           result = "partial";
           feedback = "Gần đúng! Có thể bạn sai thì hoặc thiết một vài từ.";
           totalScore += bestMatchScore;
        } else {
           result = "incorrect";
           feedback = "Chưa chính xác. Đừng bỏ cuộc!";
           totalScore += bestMatchScore * 0.5; // low penalty
        }

        return {
           id: ans.id,
           userAnswer: ans.userAnswer,
           score: bestMatchScore.toFixed(2),
           result,
           suggestion,
           feedback
        };
      });

      resolve({
        totalScore: totalScore.toFixed(2),
        maxScore: answers.length,
        results
      });
    }, 800);
  });
};

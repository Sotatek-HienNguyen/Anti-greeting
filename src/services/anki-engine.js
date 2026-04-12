/**
 * Anki Engine Implementation (SM-2 Algorithm)
 */

export const calculateAnkiState = (state, grade) => {
  let { repetitions, interval, efactor } = state;

  repetitions = repetitions || 0;
  interval = interval || 0;
  efactor = efactor || 2.5;

  if (grade >= 3) {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * efactor);
    }
    repetitions++;
  } else {
    repetitions = 0;
    interval = 1;
  }

  const q_mapped = grade === 1 ? 0 : (grade === 2 ? 3 : (grade === 3 ? 4 : 5));
  efactor = efactor + (0.1 - (5 - q_mapped) * (0.08 + (5 - q_mapped) * 0.02));
  
  if (efactor < 1.3) efactor = 1.3;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);
  nextDate.setHours(4, 0, 0, 0);

  return {
    repetitions,
    interval,
    efactor: parseFloat(efactor.toFixed(2)),
    nextReview: nextDate.getTime()
  };
};

export const getInitialAnkiState = () => ({
  repetitions: 0,
  interval: 0,
  efactor: 2.5,
  nextReview: Date.now()
});

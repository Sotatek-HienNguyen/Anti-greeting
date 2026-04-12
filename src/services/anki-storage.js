import WORDS from '../data/words.json';

const STATE_KEY = 'ag_anki_state';
const OVERRIDES_KEY = 'ag_user_overrides';

/**
 * Anki Storage Manager
 */

const _load = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error(`Failed to load ${key}:`, e);
    return {};
  }
};

const _save = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to save ${key}:`, e);
  }
};

export const getAnkiStates = () => _load(STATE_KEY);

export const saveAnkiState = (word, state) => {
  const states = _load(STATE_KEY);
  states[word] = state;
  _save(STATE_KEY, states);
};

export const getAnkiOverrides = () => _load(OVERRIDES_KEY);

export const saveAnkiOverride = (word, patch) => {
  const overrides = _load(OVERRIDES_KEY);
  overrides[word] = {
    ...(overrides[word] || {}),
    ...patch
  };
  _save(OVERRIDES_KEY, overrides);
};

export const getAnkiCard = (word) => {
  const states = _load(STATE_KEY);
  const overrides = _load(OVERRIDES_KEY);

  return {
    word: word,
    id: word,
    ankiState: states[word] || null,
    overrides: overrides[word] || {}
  };
};

export const getAnkiQueue = () => {
  const states = _load(STATE_KEY);
  const now = Date.now();

  const queue = WORDS.filter(word => {
    const state = states[word];
    if (!state) return true;
    return state.nextReview <= now;
  });

  return queue.sort((a, b) => {
    const sA = states[a];
    const sB = states[b];
    if (!sA && !sB) return 0;
    if (!sA) return 1;
    if (!sB) return -1;
    return sA.nextReview - sB.nextReview;
  });
};

export const clearAnkiProgress = () => {
  localStorage.removeItem(STATE_KEY);
  localStorage.removeItem(OVERRIDES_KEY);
};

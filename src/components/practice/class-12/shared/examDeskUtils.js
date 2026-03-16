export function getShuffledQuestionSet(items, seed = 1) {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const shuffled = [...items];
  let state = (seed >>> 0) || 1;

  const nextRandom = () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(nextRandom() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function pickQuestionDeskItems(items, limit, seed) {
  const indexedItems = (Array.isArray(items) ? items : []).map((item, index) => ({
    item,
    questionNumber: index + 1,
  }));

  return getShuffledQuestionSet(indexedItems, seed).slice(0, Math.min(limit, indexedItems.length));
}

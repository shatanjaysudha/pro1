export function getHubAssistantRecommendations(cards, query, synonyms, limit = 4) {
  const normalized = String(query || "").trim().toLowerCase();
  if (!normalized) {
    return cards.slice(0, limit).map((card) => ({ card, score: 1, reason: "Strong starting block." }));
  }

  const terms = normalized.split(/\s+/).filter(Boolean);
  const expanded = new Set(terms);
  terms.forEach((term) => {
    (synonyms[term] || []).forEach((entry) => expanded.add(String(entry).toLowerCase()));
  });

  return cards
    .map((card) => {
      const haystack = `${card.title} ${card.copy} ${(card.tags || []).join(" ")}`.toLowerCase();
      let score = haystack.includes(normalized) ? 10 : 0;
      const matches = [];
      expanded.forEach((term) => {
        if (!haystack.includes(term)) return;
        matches.push(term);
        score += card.title.toLowerCase().includes(term) ? 6 : 3;
      });
      if (!matches.length) return null;
      return {
        card,
        score,
        reason: `Matched on ${Array.from(new Set(matches)).slice(0, 3).join(", ")}.`
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

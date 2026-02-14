export function getSearchTerms(query) {
  return Array.from(new Set(String(query || "").toLowerCase().split(/\s+/).filter(Boolean).slice(0, 6)));
}

export function rankSearchItems(items, query, synonyms = {}, limit = 12) {
  if (!query) return items.slice(0, limit);
  const terms = getSearchTerms(query);
  const expanded = new Set(terms);
  terms.forEach((term) => (synonyms[term] || []).forEach((s) => expanded.add(String(s).toLowerCase())));

  return items
    .map((item) => {
      let score = item.searchable.includes(query) ? 12 : 0;
      expanded.forEach((term) => {
        if (item.searchable.includes(term)) score += 3;
      });
      if (item.label.toLowerCase().startsWith(query)) score += 4;
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

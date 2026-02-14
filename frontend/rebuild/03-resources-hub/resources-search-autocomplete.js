export function getResourcesHubAutocompleteOptions(items, query, limit = 10) {
  const normalized = String(query || "").trim().toLowerCase();
  const ranked = new Map();

  items.forEach((item) => {
    const values = [item.title, ...(item.tags || [])];
    values.forEach((value) => {
      const label = String(value || "").trim();
      if (!label) return;
      const key = label.toLowerCase();
      let score = key.length > 2 ? 1 : 0;
      if (normalized) {
        if (key === normalized) score += 12;
        else if (key.startsWith(normalized)) score += 8;
        else if (key.includes(normalized)) score += 5;
        else score = 0;
      }
      if (score <= 0) return;
      const prev = ranked.get(key);
      if (!prev || score > prev.score) ranked.set(key, { label, score });
    });
  });

  return Array.from(ranked.values())
    .sort((a, b) => (b.score - a.score) || a.label.localeCompare(b.label))
    .slice(0, limit)
    .map((entry) => entry.label);
}

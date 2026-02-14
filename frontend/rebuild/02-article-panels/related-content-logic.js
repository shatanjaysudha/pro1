export function getSmartRelatedRecommendations(sourceKey, post, candidates = [], limit = 3) {
  const source = String(sourceKey || "").toLowerCase();
  const baseTags = new Set((post && Array.isArray(post.tags) ? post.tags : []).map((tag) => String(tag).toLowerCase()));

  return candidates
    .filter((entry) => entry && entry.post && entry.post.id !== (post ? post.id : ""))
    .map((entry) => {
      const tags = (entry.post.tags || []).map((tag) => String(tag).toLowerCase());
      const overlap = tags.filter((tag) => baseTags.has(tag)).length;
      let score = overlap * 5;
      if (String(entry.source || "").toLowerCase() === source) score += 2;
      score += Number(entry.post.popular || 0) / 25;
      return { entry, score, overlap };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry, overlap }) => ({
      ...entry,
      why: overlap > 0 ? `Shares ${overlap} topic signal(s) with the current article.` : "Strong behavioral relevance."
    }));
}

export function getAdaptiveReadingPath(sourceKey, post, candidates = [], limit = 3) {
  const recommendations = getSmartRelatedRecommendations(sourceKey, post, candidates, limit + 2);
  return recommendations.slice(0, limit).map((entry, index) => ({
    step: index + 1,
    source: entry.source,
    post: entry.post,
    reason: entry.why,
    minutes: Number(String(entry.post.readTime || "0").replace(/[^\d]/g, "")) || 8
  }));
}

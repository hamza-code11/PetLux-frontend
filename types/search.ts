export const SEARCH_PATH = "/search";
export const SEARCH_PARAM = "q";

export function buildSearchUrl(query: string) {
  const q = query.trim();

  return q
    ? `${SEARCH_PATH}?${SEARCH_PARAM}=${encodeURIComponent(q)}`
    : SEARCH_PATH;
}
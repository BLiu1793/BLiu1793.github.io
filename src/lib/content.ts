// Helpers for reading and formatting content collections.
import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

export type Publication = CollectionEntry<'publications'>;

/** Entries with `confirmed: false` stay in the data files but are not published. */
export async function visible<C extends CollectionKey>(name: C): Promise<CollectionEntry<C>[]> {
  const all = (await getCollection(name)) as CollectionEntry<C>[];
  return all.filter((e) => (e.data as { confirmed?: boolean }).confirmed !== false);
}

const typeRank = { journal: 0, conference: 1, preprint: 2, thesis: 3 } as const;

/** Newest first; within a year, journals before conference papers. */
export async function getPublications() {
  const pubs = await visible('publications');
  return pubs.sort(
    (a, b) => b.data.year - a.data.year || typeRank[a.data.type] - typeRank[b.data.type],
  );
}

export async function getNews() {
  const news = await visible('news');
  return news.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const monthYear = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/** "2025-02-11" or "2025-02" -> "Feb 2025" */
export function formatYearMonth(s: string) {
  const [y, m] = s.split('-').map(Number);
  return monthYear(new Date(Date.UTC(y, (m || 1) - 1, 1)));
}

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;

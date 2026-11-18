// Content schemas. Every data file in src/content/ is checked against these
// rules when the site builds, so a typo or a missing field produces a clear
// error instead of a broken page. See docs/MAINTENANCE.md for how to edit content.
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// `confirmed: false` keeps an entry in the data file but hides it from the site.
// Used for CV items that could not be verified yet (see notes/CONTENT_REVIEW.md).
const confirmed = z.boolean().default(true);
const numOrStr = z.union([z.string(), z.number()]).transform(String);

const publications = defineCollection({
  loader: file('src/content/publications.yaml'),
  schema: z.object({
    type: z.enum(['journal', 'conference', 'thesis', 'preprint']),
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    year: z.number().int(),
    volume: numOrStr.optional(),
    issue: numOrStr.optional(),
    pages: z.string().optional(),
    article: numOrStr.optional(), // article number, e.g. MDPI journals
    status: z.enum(['published', 'early-access', 'accepted']).default('published'),
    doi: z.string().optional(),
    url: z.url().optional(), // landing page when there is no DOI
    pdf: z.string().optional(), // e.g. /papers/accepted-manuscript.pdf (must be allowed by the publisher)
    arxiv: z.string().optional(),
    openAccess: z.boolean().default(false),
    selected: z.boolean().default(false), // shown on the home page
    note: z.string().optional(),
    confirmed,
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    link: z.url().optional(),
    confirmed,
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    sponsor: z.string(),
    role: z.string(),
    institution: z.string(),
    period: z.string(),
    status: z.enum(['current', 'previous']),
    amount: z.number().optional(), // shown only if features.showFundingAmounts is true
    link: z.url().optional(),
    order: z.number().default(0),
    confirmed,
  }),
});

const research = defineCollection({
  loader: file('src/content/research.yaml'),
  schema: z.object({
    title: z.string(),
    short: z.string(), // one-sentence card text for the home page
    summary: z.string(),
    publications: z.array(z.string()).default([]), // ids from publications.yaml
    order: z.number(),
  }),
});

const students = defineCollection({
  loader: file('src/content/students.yaml'),
  schema: z.object({
    name: z.string(),
    degree: z.enum(['Ph.D.', 'M.S.', 'B.S.', 'Postdoc', 'Visiting']),
    status: z.enum(['current', 'alumni']),
    years: z.string().optional(),
    topic: z.string().optional(),
    now: z.string().optional(), // current position (alumni) - only with the person's consent
    link: z.url().optional(),
    confirmed,
  }),
});

const teaching = defineCollection({
  loader: file('src/content/teaching.yaml'),
  schema: z.object({
    institution: z.string(),
    code: z.string(),
    title: z.string(),
    terms: z.array(z.string()).min(1),
    role: z.string().default('Instructor'),
    description: z.string().optional(),
    order: z.number().default(0),
  }),
});

const service = defineCollection({
  loader: file('src/content/service.yaml'),
  schema: z.object({
    category: z.enum(['editorial', 'committee', 'journal-reviewer', 'conference-reviewer']),
    role: z.string(),
    venue: z.string(),
    detail: z.string().optional(),
    year: z.string().optional(),
    link: z.url().optional(),
    order: z.number().default(0),
    confirmed,
  }),
});


const awards = defineCollection({
  loader: file('src/content/awards.yaml'),
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    years: z.string(),
    confirmed,
  }),
});



export const collections = {
  publications,
  news,
  projects,
  research,
  students,
  teaching,
  service,
  awards,
};

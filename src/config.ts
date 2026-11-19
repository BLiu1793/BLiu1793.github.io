// Site-wide settings: name, titles, contact details, profile links, and feature switches.
// Edit this file to change what appears in the header, footer, home page, and contact page.

export const site = {
  name: 'Bo Liu',
  displayName: 'Bo Liu, Ph.D.',
  jobTitle: 'Assistant Professor of Electrical Engineering',
  unit: 'School of Engineering & Applied Sciences',
  institution: 'Washington State University Tri-Cities',
  institutionUrl: 'https://tricities.wsu.edu/',
  email: 'bo.liu1@wsu.edu',
  office: 'Floyd 134J (Elson S. Floyd Building)',
  address: ['Washington State University Tri-Cities', '2710 Crimson Way', 'Richland, WA 99354, USA'],

  // Used for search engines and link previews (about 150 characters).
  description:
    'Bo Liu is an Assistant Professor of Electrical Engineering at Washington State University Tri-Cities, working on smart grid cybersecurity, state estimation, and power system operation.',

  // Research interests (listed on the Home and Research pages).
  interests: [
    'Smart grid cyber-physical security',
    'Power system state estimation',
    'Modeling, optimization, and simulation of power systems',
    'Operation and planning of power systems',
  ],

  // Author spellings that are bolded in publication lists.
  selfAuthorNames: ['B. Liu'],

  // Profile links. Set show: false to hide one without deleting it.
  profiles: [
    { id: 'scholar', label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=wJ_egQ0AAAAJ&hl=en', show: true },
    { id: 'orcid', label: 'ORCID', url: 'https://orcid.org/0000-0002-2965-7714', show: false },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/bo-liu-2ab675152/', show: false },
  ],

  // CV: the PDF at public/cv/<file> is linked from the Home page (button hidden if the file is missing).
  cv: { file: 'Bo_Liu_CV.pdf' },

  features: {
    showFundingAmounts: false, // show dollar amounts on the Research page
    showProspectiveStudents: false, // show the "Prospective students" note on the Students page
  },

  prospectiveStudents:
    'Students interested in smart grid cybersecurity, state estimation, or power system operation are welcome to get in touch by email with a CV and a short description of their interests.',

  // Required by WSU guidance for AI-assisted work: byline in the footer. The statement of the
  // AI's role is in README.md ("AI assistance"), per the owner's choice on 2026-11-18.
  aiAttribution: 'Developed with Claude (AI)',
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/research/', label: 'Research' },
  { href: '/publications/', label: 'Publications' },
  { href: '/teaching/', label: 'Teaching' },
  { href: '/students/', label: 'Students' },
  { href: '/contact/', label: 'Contact' },
];

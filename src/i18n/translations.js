// UI copy for every section, keyed by language. Data-driven content
// (projects, services, nav links, contact links) carries its own
// { en, nl } fields directly in src/data — this file is everything else.
export const translations = {
  en: {
    meta: {
      title: 'Victor Wilmering — Graphic Designer Amsterdam',
      description:
        'Amsterdam-based graphic designer Victor Wilmering creates distinctive brand identities, campaigns and digital experiences, backed by over 10 years of creative experience.',
    },
    a11y: {
      skipToContent: 'Skip to content',
      heroLabel: 'Victor Wilmering — introduction',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      siteMenu: 'Site menu',
      primaryNav: 'Primary',
      mobileNav: 'Mobile',
      footerNav: 'Footer',
      language: 'Language',
      closeProject: 'Close project',
      loadingHero: (percent) => `Loading hero animation, ${percent}% ready`,
    },
    nav: {
      availableForWork: 'Available for work',
    },
    hero: {
      role: 'Graphic Designer',
      location: 'Amsterdam',
      lead: 'Creating distinctive identities, campaigns and digital experiences for over 10 years.',
      scrollCue: 'Scroll to enter my creative world',
      phrases: [
        { text: 'Ideas start with a sketch.', start: 0.16, end: 0.36 },
        { text: 'Design gives them a voice.', start: 0.52, end: 0.7 },
        { text: 'Details make them memorable.', start: 0.78, end: 0.94 },
      ],
    },
    work: {
      eyebrow: 'Selected Work',
      heading: 'A decade of ideas, made visible.',
      intro:
        'Six projects spanning identity, campaigns and digital work — each one built from a single clear idea, carried through with precision.',
      viewProject: 'View project',
      viewShort: 'View',
      modalNote:
        'Full case study coming soon — this preview shows placeholder artwork standing in for real project photography.',
      artworkAlt: (client) => `${client} — placeholder artwork`,
    },
    about: {
      eyebrow: 'About Victor',
      index: '01 / Amsterdam',
      lead: 'I’m Victor Wilmering, an Amsterdam-based graphic designer with over 10 years of experience turning ideas into clear, distinctive visual communication.',
      body: 'My work combines strong concepts with precise execution—from brand identities and campaigns to digital experiences and content. I believe the best design feels effortless, communicates instantly and stays memorable.',
    },
    services: {
      eyebrow: 'Services',
      heading: 'Where I add the most value.',
    },
    experience: {
      ariaLabel: 'Experience',
      caption: 'Years of creative experience',
      amsterdamBased: 'Amsterdam-based',
      availableFreelance: 'Available for selected freelance projects and collaborations',
    },
    contact: {
      eyebrow: 'Contact',
      heading: ['Have a project in mind?', 'Let’s make something memorable.'],
    },
    footer: {
      meta: (year) => `© ${year} Victor Wilmering. Graphic design, Amsterdam.`,
    },
  },

  nl: {
    meta: {
      title: 'Victor Wilmering — Grafisch Ontwerper Amsterdam',
      description:
        'Amsterdamse grafisch ontwerper Victor Wilmering creëert onderscheidende merkidentiteiten, campagnes en digitale ervaringen, met meer dan 10 jaar creatieve ervaring.',
    },
    a11y: {
      skipToContent: 'Naar inhoud springen',
      heroLabel: 'Victor Wilmering — introductie',
      openMenu: 'Menu openen',
      closeMenu: 'Menu sluiten',
      siteMenu: 'Sitemenu',
      primaryNav: 'Hoofdnavigatie',
      mobileNav: 'Mobiele navigatie',
      footerNav: 'Footernavigatie',
      language: 'Taal',
      closeProject: 'Project sluiten',
      loadingHero: (percent) => `Openingsanimatie laden, ${percent}% gereed`,
    },
    nav: {
      availableForWork: 'Beschikbaar voor werk',
    },
    hero: {
      role: 'Grafisch Ontwerper',
      location: 'Amsterdam',
      lead: 'Al meer dan 10 jaar maak ik onderscheidende identiteiten, campagnes en digitale ervaringen.',
      scrollCue: 'Scroll om mijn creatieve wereld te betreden',
      phrases: [
        { text: 'Ideeën beginnen met een schets.', start: 0.16, end: 0.36 },
        { text: 'Vormgeving geeft ze een stem.', start: 0.52, end: 0.7 },
        { text: 'Details maken ze onvergetelijk.', start: 0.78, end: 0.94 },
      ],
    },
    work: {
      eyebrow: 'Geselecteerd Werk',
      heading: 'Tien jaar aan ideeën, zichtbaar gemaakt.',
      intro:
        'Zes projecten op het gebied van identiteit, campagnes en digitaal werk — elk gebouwd rond één helder idee, met precisie uitgewerkt.',
      viewProject: 'Bekijk project',
      viewShort: 'Bekijk',
      modalNote:
        'Volledige case study volgt binnenkort — deze preview toont voorlopige illustraties ter vervanging van echte projectfotografie.',
      artworkAlt: (client) => `${client} — voorlopige illustratie`,
    },
    about: {
      eyebrow: 'Over Victor',
      index: '01 / Amsterdam',
      lead: 'Ik ben Victor Wilmering, een in Amsterdam gevestigde grafisch ontwerper met meer dan 10 jaar ervaring in het vertalen van ideeën naar heldere, onderscheidende visuele communicatie.',
      body: 'Mijn werk combineert sterke concepten met precieze uitvoering — van merkidentiteiten en campagnes tot digitale ervaringen en content. Ik geloof dat de beste vormgeving moeiteloos aanvoelt, direct communiceert en blijft hangen.',
    },
    services: {
      eyebrow: 'Diensten',
      heading: 'Waar ik de meeste waarde toevoeg.',
    },
    experience: {
      ariaLabel: 'Ervaring',
      caption: 'Jaar creatieve ervaring',
      amsterdamBased: 'Gevestigd in Amsterdam',
      availableFreelance: 'Beschikbaar voor geselecteerde freelanceprojecten en samenwerkingen',
    },
    contact: {
      eyebrow: 'Contact',
      heading: ['Een project in gedachten?', 'Laten we iets onvergetelijks maken.'],
    },
    footer: {
      meta: (year) => `© ${year} Victor Wilmering. Grafisch ontwerp, Amsterdam.`,
    },
  },
}

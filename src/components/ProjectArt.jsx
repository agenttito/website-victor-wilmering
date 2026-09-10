const ACCENT_VARS = {
  orange: 'var(--accent-orange)',
  blue: 'var(--accent-blue)',
  magenta: 'var(--accent-magenta)',
  teal: 'var(--accent-teal)',
}

function initialsOf(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

/**
 * Generative placeholder artwork standing in for real project photography.
 * Swap for an <img loading="lazy"> once case-study imagery exists — the
 * `project.image` field is reserved for that.
 */
export default function ProjectArt({ project }) {
  const accent = ACCENT_VARS[project.accent] ?? ACCENT_VARS.orange
  const initials = initialsOf(project.client)

  return (
    <svg
      className="project-art"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${project.client} — placeholder artwork`}
    >
      <rect width="400" height="300" fill="var(--color-grey-50)" />
      <Motif motif={project.motif} accent={accent} />
      <text
        x="24"
        y="256"
        fontFamily="var(--font-display)"
        fontSize="120"
        fontWeight="600"
        fill="var(--color-black)"
        opacity="0.06"
      >
        {initials}
      </text>
    </svg>
  )
}

function Motif({ motif, accent }) {
  switch (motif) {
    case 'circle':
      return (
        <>
          <circle cx="290" cy="120" r="98" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
          <circle cx="290" cy="120" r="46" fill={accent} opacity="0.9" />
        </>
      )
    case 'arc':
      return (
        <>
          <path
            d="M -20 300 A 340 340 0 0 1 320 -20"
            fill="none"
            stroke={accent}
            strokeWidth="42"
            opacity="0.85"
          />
          <path
            d="M -20 300 A 340 340 0 0 1 320 -20"
            fill="none"
            stroke="var(--color-black)"
            strokeWidth="1"
            opacity="0.12"
          />
        </>
      )
    case 'diagonal':
      return (
        <>
          <polygon points="400,0 400,300 120,300" fill={accent} opacity="0.88" />
          <line x1="0" y1="0" x2="400" y2="300" stroke="var(--color-black)" strokeWidth="1" opacity="0.1" />
        </>
      )
    case 'grid':
      return (
        <>
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 5 }).map((__, col) => (
              <circle
                key={`${row}-${col}`}
                cx={40 + col * 82}
                cy={40 + row * 76}
                r="3"
                fill="var(--color-black)"
                opacity="0.14"
              />
            )),
          )}
          <rect x="204" y="78" width="82" height="76" fill={accent} opacity="0.9" />
        </>
      )
    case 'stack':
      return (
        <>
          <rect x="70" y="150" width="180" height="110" rx="10" fill="var(--color-black)" opacity="0.08" />
          <rect x="110" y="110" width="180" height="110" rx="10" fill={accent} opacity="0.92" />
          <rect x="150" y="70" width="180" height="110" rx="10" fill="none" stroke="var(--color-black)" strokeWidth="1.5" opacity="0.22" />
        </>
      )
    case 'frame':
      return (
        <>
          <rect x="46" y="36" width="308" height="228" fill="none" stroke={accent} strokeWidth="10" />
          <rect x="86" y="76" width="228" height="148" fill="none" stroke="var(--color-black)" strokeWidth="1" opacity="0.16" />
        </>
      )
    default:
      return null
  }
}

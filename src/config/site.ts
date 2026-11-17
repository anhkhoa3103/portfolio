/**
 * Site-wide configuration.
 *
 * ─── SOCIAL LINKS ───────────────────────────────────────────────
 * Paste your real profile URLs below. While a value is an empty
 * string, the matching button is hidden everywhere on the site.
 * Never put a guessed URL here.
 */
export const siteConfig = {
  ownerName: 'Nguyen Anh Khoa',
  shortName: 'Khoa',
  brand: "KHOA'S ISLAND",
  tagline: 'Build. Explore. Discover.',
  role: 'Software Engineering Student · Aspiring Product Developer',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'nguynanhkhoa.cv@gmail.com',

  /** e.g. 'https://github.com/your-handle' — leave '' until you have it. */
  githubUrl: 'https://github.com/anhkhoa3103',
  /** e.g. 'https://www.linkedin.com/in/your-handle' — leave '' until you have it. */
  linkedinUrl: 'https://www.linkedin.com/in/nakhoa3135/',
} as const

export type SocialLink = { label: 'GitHub' | 'LinkedIn'; url: string }

/** Only links that have been configured with a real http(s) URL. */
export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [
    { label: 'GitHub', url: siteConfig.githubUrl },
    { label: 'LinkedIn', url: siteConfig.linkedinUrl },
  ]
  return links.filter((l) => isRealUrl(l.url))
}

export function isRealUrl(url: string | undefined): url is string {
  return typeof url === 'string' && /^https?:\/\/[^\s]+\.[^\s]+/.test(url.trim())
}

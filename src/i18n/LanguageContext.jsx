import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './context'
import { translations } from './translations'

const STORAGE_KEY = 'vw-lang'
const LANGUAGES = ['en', 'nl']

function detectInitialLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (LANGUAGES.includes(stored)) return stored
  } catch {
    /* localStorage unavailable (private mode etc.) — fall through */
  }
  const browserLang = window.navigator.language || ''
  return browserLang.toLowerCase().startsWith('nl') ? 'nl' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
    const t = translations[lang]
    document.title = t.meta.title
    const descTag = document.querySelector('meta[name="description"]')
    if (descTag) descTag.setAttribute('content', t.meta.description)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore — persistence is a nice-to-have, not required */
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

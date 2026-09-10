import { useEffect, useRef } from 'react'

/**
 * Adds `.is-visible` to elements matching `[data-reveal]` inside the
 * returned ref once they cross the viewport threshold. Pairs with the
 * `.reveal` CSS primitive. One shared observer per call site.
 */
export function useReveal(deps = []) {
  const scopeRef = useRef(null)

  useEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const targets = scope.hasAttribute('data-reveal')
      ? [scope]
      : Array.from(scope.querySelectorAll('[data-reveal]'))

    if (targets.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay
            if (delay) entry.target.style.transitionDelay = `${delay}ms`
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scopeRef
}

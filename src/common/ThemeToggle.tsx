'use client'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  console.log("Theme : ",theme)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full border border-input bg-background">
        <span className="sr-only">Loading theme toggle</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <svg
          className="h-[1.2rem] w-[1.2rem]"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg
          className="h-[1.2rem] w-[1.2rem]"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="m12 1-1 2m0 18-1 2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12l2 1m18 0 2 1M4.22 19.78l1.42-1.42m12.72-12.72 1.42-1.42" />
        </svg>
      )}
    </button>
  )
}

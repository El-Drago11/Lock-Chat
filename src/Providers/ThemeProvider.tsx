'use client'
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes'
import { ToastContainer } from 'react-toastify'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>
    {children}
     <ToastContainer />
    </NextThemesProvider>
}

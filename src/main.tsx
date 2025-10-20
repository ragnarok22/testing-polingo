import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PolingoProvider } from '@polingo/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PolingoProvider create={{
      locale: 'en',
      locales: ['en', 'es'],
      loader: { baseUrl: '/i18n' },
    }}>
      <App />
    </PolingoProvider>
  </StrictMode>,
)

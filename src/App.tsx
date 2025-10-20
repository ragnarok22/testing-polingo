import './App.css'
import { useTranslation } from '@polingo/react'

function App() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <div>
      <p>Current locale: {locale}</p>
      <button onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}>
        {t('change locale')}
      </button>

      <p>
        {t('hello')}
      </p>
    </div>
  )
}

export default App

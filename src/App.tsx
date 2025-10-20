import { useState } from 'react';
import './App.css'
import { useLocale, useTranslation } from '@polingo/react'

function App() {
  const [count, setCount] = useState(0);
  const { t, tn } = useTranslation();
  const { locale, setLocale } = useLocale();

  return (
    <div>
      <p>
        {t('Current locale: {locale}', { locale })}
      </p>
      <button onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}>
        {t('change locale')}
      </button>

      <p>
        {t('hello')}
      </p>
      <p>
        {t('hello world. How are you?')}
      </p>

      <button onClick={() => setCount(prev => prev + 1)}>
        {tn('You clicked {count} time', 'You clicked {count} times', count, { count })}
      </button>
    </div>
  )
}

export default App

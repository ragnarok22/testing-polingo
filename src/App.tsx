import { useState } from 'react';
import './App.css'
import { useLocale, useTranslation, usePolingo } from '@polingo/react'

function App() {
  const [count, setCount] = useState(0);
  const [emails, setEmails] = useState(1);
  const [sms, setSms] = useState(2);
  const { t, tn, tp, tnp } = useTranslation();
  const { locale, setLocale } = useLocale();
  const { loading, error } = usePolingo();

  const userName = 'Alice';

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{t('Polingo Feature Test Suite')}</h1>

      {/* Loading and Error States */}
      {loading && <p style={{ color: 'orange' }}>{t('Loading translations...')}</p>}
      {error && <p style={{ color: 'red' }}>{t('Error loading translations: {error}', { error: error.message })}</p>}

      {/* Locale Switcher */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #888', borderRadius: '8px', background: 'rgba(128, 128, 128, 0.1)' }}>
        <h2>{t('Locale Control')}</h2>
        <p>{t('Current locale: {locale}', { locale })}</p>
        <button onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}>
          {t('change locale')}
        </button>
      </section>

      {/* Basic Translation - t() */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #2196F3', borderRadius: '8px', background: 'rgba(33, 150, 243, 0.1)' }}>
        <h2>{t('Basic Translation - t()')}</h2>
        <p>{t('hello')}</p>
        <p>{t('hello world. How are you?')}</p>
      </section>

      {/* Multiple Variable Interpolation */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #9C27B0', borderRadius: '8px', background: 'rgba(156, 39, 176, 0.1)' }}>
        <h2>{t('Multiple Variables')}</h2>
        <p>{t('Welcome {name}, you have {count} new notifications', { name: userName, count: 5 })}</p>
      </section>

      {/* Pluralization - tn() */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #4CAF50', borderRadius: '8px', background: 'rgba(76, 175, 80, 0.1)' }}>
        <h2>{t('Pluralization - tn()')}</h2>
        <button onClick={() => setCount(prev => prev + 1)}>
          {tn('You clicked {count} time', 'You clicked {count} times', count, { count })}
        </button>
        <button onClick={() => setCount(0)} style={{ marginLeft: '1rem' }}>
          {t('Reset')}
        </button>
      </section>

      {/* Context Translation - tp() */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #FF9800', borderRadius: '8px', background: 'rgba(255, 152, 0, 0.1)' }}>
        <h2>{t('Context Translation - tp()')}</h2>
        <p><strong>{t('Menu context:')}</strong> {tp('menu', 'File')}</p>
        <p><strong>{t('Document context:')}</strong> {tp('document', 'File')}</p>
        <p><strong>{t('Toolbar context:')}</strong> {tp('toolbar', 'Save')}</p>
        <p><strong>{t('Confirmation context:')}</strong> {tp('confirmation', 'Save')}</p>
      </section>

      {/* Context + Pluralization - tnp() */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #E91E63', borderRadius: '8px', background: 'rgba(233, 30, 99, 0.1)' }}>
        <h2>{t('Context + Pluralization - tnp()')}</h2>
        <div style={{ marginBottom: '1rem' }}>
          <p>{tnp('email', 'You have {count} message', 'You have {count} messages', emails, { count: emails })}</p>
          <button onClick={() => setEmails(prev => prev + 1)}>{t('Add Email')}</button>
          <button onClick={() => setEmails(Math.max(0, emails - 1))} style={{ marginLeft: '0.5rem' }}>
            {t('Remove Email')}
          </button>
        </div>
        <div>
          <p>{tnp('sms', 'You have {count} message', 'You have {count} messages', sms, { count: sms })}</p>
          <button onClick={() => setSms(prev => prev + 1)}>{t('Add SMS')}</button>
          <button onClick={() => setSms(Math.max(0, sms - 1))} style={{ marginLeft: '0.5rem' }}>
            {t('Remove SMS')}
          </button>
        </div>
      </section>

      {/* Missing Translation Fallback */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #F44336', borderRadius: '8px', background: 'rgba(244, 67, 54, 0.1)' }}>
        <h2>{t('Missing Translation (Fallback)')}</h2>
        <p>{t('This translation does not exist in any catalog')}</p>
        <p><em>{t('(Should show the original English text)')}</em></p>
      </section>
    </div>
  )
}

export default App

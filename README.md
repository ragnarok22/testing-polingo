# Polingo Testing Application

This is a comprehensive testing application for [Polingo](https://github.com/ragnarok22/polingo) - a modern i18n library for JavaScript/TypeScript using industry-standard `.po` and `.mo` files.

## 🎯 Purpose

This project serves as a live demonstration and testing suite for all Polingo features, including:

- ✅ Basic translation - `t()`
- ✅ Pluralization - `tn()`
- ✅ Context translation - `tp()`
- ✅ Context + Pluralization - `tnp()`
- ✅ Multiple variable interpolation
- ✅ Loading and error states
- ✅ Locale switching
- ✅ Fallback behavior

## 🚀 Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd testing-polingo
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
testing-polingo/
├── src/
│   ├── App.tsx              # Main test suite component
│   ├── main.tsx             # App entry point with PolingoProvider
│   └── ...
├── locales/                 # Source .po files
│   ├── en/
│   │   └── messages.po      # English translations
│   └── es/
│       └── messages.po      # Spanish translations
├── public/
│   └── i18n/                # Compiled JSON files (served at runtime)
│       ├── en/
│       │   └── messages.json
│       └── es/
│           └── messages.json
└── package.json
```

## 🌍 Managing Translations

### Adding New Translations

There are two approaches to adding new translations:

#### Option 1: Manual Extraction (Recommended)

1. **Add translation calls in your source code:**
   ```tsx
   // In src/App.tsx or any component
   {t('My new translation string')}
   ```

2. **Extract messages from source code:**
   ```bash
   # From the main polingo project directory
   node packages/cli/dist/cli.js extract src/ --out locales/messages.pot --locales locales
   ```

   This will:
   - Scan all files in `src/` for translation calls
   - Update existing `.po` files in `locales/en/` and `locales/es/`
   - Preserve existing translations

3. **Edit the `.po` files** to add translations:
   ```po
   # locales/es/messages.po
   msgid "My new translation string"
   msgstr "Mi nueva cadena de traducción"
   ```

4. **Compile to JSON:**
   ```bash
   pnpm i18n:compile
   ```

5. **Refresh the browser** to see your new translations!

#### Option 2: Manual Editing

1. **Directly edit `.po` files** in `locales/en/` and `locales/es/`:
   ```po
   # locales/es/messages.po
   msgid "New feature title"
   msgstr "Título de nueva función"
   ```

2. **For plurals**, use `msgid_plural`:
   ```po
   msgid "You have {count} item"
   msgid_plural "You have {count} items"
   msgstr[0] "Tienes {count} elemento"
   msgstr[1] "Tienes {count} elementos"
   ```

3. **For context**, use `msgctxt`:
   ```po
   msgctxt "menu"
   msgid "File"
   msgstr "Archivo"

   msgctxt "document"
   msgid "File"
   msgstr "Expediente"
   ```

4. **Compile to JSON:**
   ```bash
   pnpm i18n:compile
   ```

### Removing Translations

1. **Remove the translation call** from source code
2. **Remove the entry** from `.po` files in `locales/en/` and `locales/es/`
3. **Recompile to JSON:**
   ```bash
   pnpm i18n:compile
   ```

### Validating Translations

Check for missing or fuzzy translations:

```bash
# Basic validation
pnpm i18n:validate

# Strict validation (fails on fuzzy entries)
pnpm i18n:validate:strict
```

## 🔧 npm Scripts Reference

This project includes convenient npm scripts for managing translations:

### First-Time Setup

```bash
# Build CLI and compile existing translations
pnpm i18n:init
```

### Extract Messages from Source Code

```bash
# Scans src/ and updates .po files in locales/
pnpm i18n:extract
```

Extracts all translation calls (`t()`, `tn()`, `tp()`, `tnp()`) from your source code and updates the `.po` files.

### Compile Translations

```bash
# Compiles .po files to JSON format for runtime
pnpm i18n:compile
```

Converts `.po` files in `locales/` to JSON files in `public/i18n/`.

### Validate Translations

```bash
# Check for missing translations
pnpm i18n:validate

# Strict mode (fails on fuzzy entries)
pnpm i18n:validate:strict
```

### Complete Update Workflow

```bash
# Extract + Compile in one command
pnpm i18n:update
```

This is useful after adding new translation strings to your code.

### Manual CLI Commands (Advanced)

If you prefer to use the CLI directly:

```bash
# Extract
polingo extract src/ --out locales/messages.pot --locales locales

# Compile
polingo compile locales/ --format json --out public/i18n

# Validate
polingo validate locales
polingo validate locales --strict
```

## 🎨 Features Tested

### Basic Translation - `t()`
Simple message translation with optional variable interpolation.
```tsx
{t('hello')}
{t('Current locale: {locale}', { locale })}
```

### Pluralization - `tn()`
Handles plural forms based on count.
```tsx
{tn('You clicked {count} time', 'You clicked {count} times', count, { count })}
```

### Context Translation - `tp()`
Disambiguates words with the same spelling but different meanings.
```tsx
{tp('menu', 'File')}      // → "Archivo" (ES)
{tp('document', 'File')}  // → "Expediente" (ES)
```

### Context + Pluralization - `tnp()`
Combines context and plural forms.
```tsx
{tnp('email', 'You have {count} message', 'You have {count} messages', emails, { count: emails })}
{tnp('sms', 'You have {count} message', 'You have {count} messages', sms, { count: sms })}
```

### Multiple Variables
Interpolate multiple variables in a single translation.
```tsx
{t('Welcome {name}, you have {count} new notifications', { name: userName, count: 5 })}
```

### Loading & Error States
The `usePolingo()` hook exposes loading and error states during catalog loading.
```tsx
const { loading, error } = usePolingo();
```

### Fallback Behavior
When a translation doesn't exist, Polingo returns the original `msgid`.

## 🛠️ Development Tips

### Cache Management

This app disables caching in development (see `src/main.tsx`). To enable caching in production:

```tsx
<PolingoProvider create={{
  locale: 'en',
  locales: ['en', 'es'],
  loader: { baseUrl: '/i18n' },
  cache: import.meta.env.PROD, // Only cache in production
}}>
  <App />
</PolingoProvider>
```

### Hot Module Replacement

Vite will automatically reload when you:
- Modify source code (`.tsx` files)
- Update compiled JSON files in `public/i18n/`

**Note:** If translations don't update, recompile with the CLI and refresh the browser.

### Dark Mode Support

All test sections use semi-transparent backgrounds with colored borders, ensuring readability in both light and dark modes.

## 📚 Learn More

- [Polingo Documentation](https://github.com/ragnarok22/polingo)
- [gettext PO Format](https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html)
- [React Integration Guide](https://github.com/ragnarok22/polingo/tree/main/packages/react)

## 🐛 Troubleshooting

### Translations not updating?

1. Make sure you compiled the `.po` files to JSON
2. Check that JSON files exist in `public/i18n/en/` and `public/i18n/es/`
3. Clear browser cache or hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
4. Restart the dev server

### CLI command not found?

Build the Polingo CLI first:
```bash
cd ../polingo
pnpm --filter @polingo/cli build
```

### Plural forms not working?

Make sure you're passing the variables correctly:
```tsx
// ❌ Wrong
{tn('You have {count} item', 'You have {count} items', count)}

// ✅ Correct
{tn('You have {count} item', 'You have {count} items', count, { count })}
```

## 📄 License

MIT

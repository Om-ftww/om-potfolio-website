# Component Setup & Integration Guidelist

This guide outlines how to ensure proper support for shadcn, Tailwind CSS, and TypeScript within this React project, and explains key layout conventions.

---

## 1. Why `src/components/ui` is Crucial

The `/src/components/ui` (or `/components/ui`) directory is the standard convention established by **shadcn/ui**. It serves a specific purpose in modern web architectures:

- **Separation of Concerns:** It isolates **reusable, atomic primitive components** (like Buttons, Dialogs, Inputs, or customized layout grids) from your main feature components or page layouts (like `Navbar.jsx`, `Hero.jsx`, `Projects.jsx`).
- **Automation Compatibility:** The shadcn CLI relies on the path defined in `components.json` to automatically install, update, and manage components directly in your workspace.
- **Maintainability:** By housing simple structural components in `/ui`, your developers always know where to find foundational blocks without wading through domain-specific codebase files.

---

## 2. Setting Up TypeScript in the Project

The codebase currently contains `.jsx` and `.js` files, and doesn't feature full TypeScript configuration. Follow these steps to fully configure TypeScript:

### Step 1: Install TypeScript Dependencies
```bash
npm install -D typescript @types/react @types/react-dom @types/node
```

### Step 2: Configure TypeScript compiler
Create a `tsconfig.json` at the project root:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path aliases mapping */
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

### Step 3: Configure Vite for TypeScript compiler checking (Optional)
If you want compile-time type-checking in Vite, install `vite-plugin-checker`:
```bash
npm install -D vite-plugin-checker
```
Then modify `vite.config.js` to include the plugin:
```js
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({ typescript: true }), // Adds TS type checking feedback in terminal
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## 3. Initializing shadcn

If you want to use the **shadcn/ui** CLI to add base components (e.g., Dialog, Sheet, Button) directly to your `/components/ui/` folder, run:

```bash
npx shadcn@latest init
```

During initialization, configure it with the following settings to match this project's structure:
- **Style:** Default
- **Base Color:** Neutral (or any of your choice)
- **CSS Variable support:** Yes (imported inside `src/index.css`)
- **App path configurations:**
  - Tailwind CSS file: `src/index.css`
  - Import alias for components: `@/components`
  - Import alias for utils: `@/lib/utils`

This command creates a `components.json` file in the root directory that standardizes component downloads.

---

## 4. Tailwind CSS v4 Setup

This project is already pre-configured with **Tailwind CSS v4** via the `@tailwindcss/vite` plugin.
If starting from scratch on a new project:

1. Install Tailwind packages:
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```
2. Add Tailwind plugin to `vite.config.js`:
   ```javascript
   import tailwindcss from '@tailwindcss/vite'
   export default defineConfig({
     plugins: [tailwindcss()],
   })
   ```
3. Import Tailwind in your entry CSS file (`src/index.css`):
   ```css
   @import "tailwindcss";
   ```

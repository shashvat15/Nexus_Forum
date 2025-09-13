---
description: Repository Information Overview
alwaysApply: true
---

# Striver Tech Summit Website Information

## Summary
A React-based website for the Striver Tech Summit event at VIT Chennai, featuring Raj Vikramaditya (Striver) from takeUforward. The site includes event details, countdown timers, and registration information for the September 19, 2025 event.

## Structure
- **public/**: Static assets including images
- **src/**: React application source code
- **.bolt/**: Configuration files for Bolt
- **root config files**: TypeScript, Vite, ESLint, and Tailwind configuration

## Language & Runtime
**Language**: TypeScript, JavaScript
**Version**: TypeScript 5.5.3
**Build System**: Vite 5.4.2
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- react: ^18.3.1
- react-dom: ^18.3.1
- framer-motion: ^11.0.0
- lucide-react: ^0.344.0
- react-intersection-observer: ^9.5.3

**Development Dependencies**:
- typescript: ^5.5.3
- vite: ^5.4.2
- @vitejs/plugin-react: ^4.3.1
- eslint: ^9.9.1
- tailwindcss: ^3.4.1
- postcss: ^8.4.35
- autoprefixer: ^10.4.18

## Build & Installation
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Main Files & Resources
**Entry Point**: src/main.tsx
**Main Component**: src/App.tsx
**HTML Template**: index.html
**CSS**: src/index.css
**Static Assets**: public/nexus_logo_png.png, public/s1.jpg

## Configuration
**TypeScript**: tsconfig.json, tsconfig.app.json, tsconfig.node.json
**Vite**: vite.config.ts
**Tailwind**: tailwind.config.js, postcss.config.js
**ESLint**: eslint.config.js
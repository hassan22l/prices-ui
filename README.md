# Price UI

## Overview

Price UI is the frontend application for the Prices project. It is a Vite + React app that consumes the Prices API to display product price information across branches and locations.

## Features

- Browse product prices
- Search products
- Responsive UI components for cards and product details

## Tech Stack

- Vite
- React (TypeScript)
- CSS modules / plain CSS

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Install

```bash
npm install
```

### Environment

The project uses Vite. Set the API base URL via an environment variable. Example (Vite expects `VITE_` prefix):

- `VITE_API_BASE_URL` — base URL for the Prices API (e.g. `http://localhost:3000`)

Create a `.env` file at the project root with the variable above.

### Run (development)

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Screenshots

![Home view](public/screenshots/home.png)

## Folder Structure (high level)

- `src/` — source code
- `src/components` — reusable components (cards, search bar, product info)
- `src/pages` — page-level views
- `public/` — static assets and screenshot images

## Deployment

Build the app (`npm run build`) and deploy the `dist` output to any static site hosting (Netlify, Vercel, GitHub Pages, etc.). Ensure the `VITE_API_BASE_URL` points to your deployed API.

## Contributing

Contributions, bug reports and feature requests are welcome. Open an issue or submit a pull request.

## License

Add a `LICENSE` file if you want to specify license terms.

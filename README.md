# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Admin API (Supabase)

The project now includes an admin backend on `Express` using Supabase auth.

### Environment

Create `.env` from `.env.example` and fill:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_API_URL` (optional, default `http://localhost:8787`)
- `API_PORT` (optional, default `8787`)
- `ADMIN_EMAIL_ALLOWLIST` (optional, comma-separated)
- `SUPABASE_STORAGE_BUCKET` (optional, default `cars`)

### Run

- Frontend: `npm run dev`
- Backend API: `npm run dev:api`

### Endpoints

- `GET /api/health`
- `POST /api/admin/login`
- `GET /api/admin/me`
- `POST /api/admin/upload-image` (multipart/form-data with `file`)

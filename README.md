# RentalOS

A web application for managing residential rental properties, built with SvelteKit, TypeScript, Tailwind CSS, and PocketBase.

## Architecture

The application follows a clean, domain-oriented architecture:

```
src/lib/
├── domain/          # Core domain models (pure TypeScript interfaces)
├── repositories/    # Repository interfaces (abstractions over data access)
├── services/        # Business logic services
├── infrastructure/  # PocketBase implementations of repository interfaces
├── providers/       # Future: auth providers, external service adapters
├── factories/       # Future: factory classes for complex object creation
├── controllers/     # Future: request/response controllers
├── components/      # Reusable Svelte UI components
└── mock/            # Mock data for development/dashboard
```

### Domain Models

- **Property** — A rental property (address, name, etc.)
- **Unit** — A rentable unit within a property
- **Tenant** — A person renting a unit
- **Lease** — Connects a tenant to a unit with terms
- **RentPayment** — Individual rent payment records
- **Expense** — Property expenses (repairs, insurance, etc.)
- **MaintenanceRequest** — Repair and maintenance tracking
- **Vendor** — Contractors and service providers
- **Document** — File/document associations
- **ActivityEvent** — Chronological activity history

### Key Principles

- Business logic lives in **services**, not in Svelte components
- PocketBase types stay in **infrastructure** — domain models are backend-agnostic
- Repository interfaces define contracts; PocketBase implementations fulfill them
- Components handle presentation and user interaction only

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) — Full-stack web framework
- [TypeScript](https://www.typescriptlang.org/) — Strict typing throughout
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [PocketBase](https://pocketbase.io/) — Backend/database/authentication
- [Netlify](https://netlify.com/) — Frontend deployment

## Local Development

### Prerequisites

- Node.js 18+
- [PocketBase](https://pocketbase.io/docs/) running locally

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/HalftimeHarry/RentalOS.git
   cd RentalOS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and set `PUBLIC_POCKETBASE_URL` to your PocketBase instance URL (default: `http://127.0.0.1:8090`).

5. Start PocketBase:
   ```bash
   ./pocketbase serve
   ```

6. Start the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:5173](http://localhost:5173).

## Deployment

### Netlify

This project is configured for Netlify deployment via `@sveltejs/adapter-netlify`.

Set the `PUBLIC_POCKETBASE_URL` environment variable in your Netlify project settings.

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PUBLIC_POCKETBASE_URL` | PocketBase server URL | `http://127.0.0.1:8090` |

See `.env.example` for the full list.

## PocketBase Collections

The following PocketBase collections should be created:

- `properties`
- `units`
- `tenants`
- `leases`
- `rent_payments`
- `expenses`
- `maintenance_requests`
- `vendors`
- `documents`
- `activity_events`

Refer to the domain models in `src/lib/domain/` for field definitions.

## Project Status

This is the initial foundation. The dashboard uses mock data. Future pull requests will:

- Connect the UI to live PocketBase data
- Add CRUD forms for each entity
- Implement authentication
- Add reporting and analytics

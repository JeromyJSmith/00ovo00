# 00ovo00 Project

A monorepo containing research, documentation, and the Global OHM application.

## Structure

```
.
├── global-ohm/          # Next.js application with 3D visualization, state management, and Neo4j integration
├── outreach/            # Partnership and outreach documentation
├── repomix-skill/       # Repomix skill documentation
├── 0ovo0.md            # Main project documentation
└── research files      # Research proposals and analysis documents
```

## Global OHM Application

A Next.js 16+ application featuring:

- **3D Visualization**: React Three Fiber with Drei for 3D graphics
- **State Management**: XState for complex state machines
- **Data Rendering**: JSON Render for flexible component rendering
- **Graph Database**: Neo4j integration for knowledge graphs
- **Animation**: Remotion for video rendering
- **Styling**: Tailwind CSS v4
- **Database**: Supabase integration

### Getting Started

```bash
cd global-ohm
npm install
npm run dev
```

The application runs on `http://localhost:3000`

### Build & Deploy

```bash
npm run build
npm start      # Production server
```

## Development

- **Runtime**: Node.js 20.17.0+
- **Package Manager**: npm (see root rules for pnpm)
- **TypeScript**: ^5
- **Next.js**: 16.1.6

### Code Quality

```bash
cd global-ohm
npm run lint
```

## Notes

- The project uses monorepo structure for documentation and research alongside the main application
- All dependencies should be kept at latest stable versions
- See individual directories for specific documentation

## Contributing

Please ensure:
1. Code passes linting
2. TypeScript types are correct
3. Environment variables are properly documented
4. Documentation is updated with changes

---

Created: March 11, 2026

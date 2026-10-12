# Contributing to Product Store Frontend

Thank you for your interest in contributing! Here's how you can help:

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Start development server:**
   ```bash
   npm start
   ```

## Development Workflow

### Running Tests
```bash
npm test
```

### Linting Code
```bash
npm run lint
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Code Standards

- **ES6+ JavaScript** with no TypeScript
- **React 18** functional components with hooks
- **ESLint** rules defined in `.eslintrc.json`
- **No external state management** (keep it simple)

## Component Structure

Each component should:
- Have clear prop documentation
- Handle loading and error states
- Be responsive (mobile-first)
- Follow naming conventions (PascalCase for components)

### Example Component
```jsx
import React from 'react';

const MyComponent = ({ prop1, prop2 }) => {
  // Component logic
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

## Commit Messages

Use clear, descriptive commit messages:
- `feat: Add new feature description`
- `fix: Fix bug description`
- `docs: Update documentation`
- `test: Add or update tests`
- `style: Code style changes`
- `refactor: Code refactoring`

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit
3. Push to your branch: `git push origin feature/your-feature`
4. Create a Pull Request with a clear description

## Testing Requirements

- Test files should be in `src/__tests__/` directory
- File naming: `*.test.jsx` or `*.test.js`
- Use Vitest framework
- Run `npm test` to execute tests

## Performance Considerations

1. **Caching**: Implement 1-hour TTL for API responses
2. **Debouncing**: Use debounce for search (300ms)
3. **Lazy Loading**: Implement lazy loading where possible
4. **Code Splitting**: Components load on demand

## API Integration

- Base URL: `https://itx-frontend-test.onrender.com`
- Use utility functions from `src/utils/api.js`
- Handle errors gracefully
- Display user-friendly messages

## Docker Development

Build and run with Docker:
```bash
docker-compose up --build
```

Access at `http://localhost:3000`

## Questions or Issues?

- Check existing issues first
- Create a new issue with clear description
- Use the issue template if provided

Thank you for contributing!

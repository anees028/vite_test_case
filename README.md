# User Management Application

A React TypeScript application that displays user data fetched from JSONPlaceholder API with a modern, responsive UI.

## Features

- Fetch and display user data from JSONPlaceholder API
- Responsive grid layout for user cards
- Loading and error states
- Detailed user information display including:
  - Basic user information (name, username, email, phone)
  - Address information with geo coordinates
  - Company information
- Modern UI with hover effects and smooth transitions

## Tech Stack

- React
- TypeScript
- CSS
- Jest & React Testing Library for testing

## Project Structure

```
src/
├── components/
│   └── Datamanagment/
│       ├── DataManagment.tsx       # Main component
│       ├── DataManagment.css       # Component styles
│       └── DataManagment.test.tsx  # Test file
└── setupTests.ts                # Test setup configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anees028/vite_test_case
cd vite_test_case
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:5173`

## Testing

### Setup Testing Environment

1. Install testing dependencies:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @types/jest jest jest-environment-jsdom ts-jest identity-obj-proxy
```

2. Add test scripts to `package.json`:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

3. Create `jest.config.cjs` in the project root:
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json'
    }]
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
```

4. Create `tsconfig.jest.json` in the project root:
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "module": "commonjs",
    "types": ["jest", "node"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.test.ts", "src/**/*.test.tsx"]
}
```

5. Create `src/setupTests.js`:
```javascript
// jest-dom adds custom jest matchers for asserting on DOM tests.
require('@testing-library/jest-dom');

// Mock global fetch
global.fetch = jest.fn();

// Add any other global test setup here
```

### Running Tests

- Run all tests:
```bash
npm run test
```

- Run tests in watch mode:
```bash
npm run test:watch
```

### Test Coverage

The test suite covers:
- Component mounting
- Loading states
- Error handling
- Data rendering
- Empty state handling
- User information display
- Address information
- Company information

## Component Details

### DataManagement Component

The main component that handles:
- Data fetching from JSONPlaceholder API
- State management using React hooks
- Loading and error states
- Rendering user information in a grid layout

#### Props
None (currently self-contained)

#### State
- `users`: Array of user objects
- `loading`: Boolean for loading state
- `error`: String for error messages

## API Integration

The application uses the JSONPlaceholder API endpoint:
```
https://jsonplaceholder.typicode.com/users
```

Response structure:
```typescript
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}
```

## Styling

The application uses CSS with:
- Responsive grid layout
- Card-based design
- Hover effects
- Modern typography
- Consistent spacing
- Mobile-first approach

## Future Improvements

Potential enhancements:
1. Add search functionality
2. Implement sorting options
3. Add pagination
4. Include user filtering
5. Add edit/delete capabilities
6. Implement user authentication
7. Add dark mode support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

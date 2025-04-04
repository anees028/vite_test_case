import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataManagement from '../../components/Datamanagment/DataManagment';

// Mock fetch globally
global.fetch = jest.fn();

// Mock data that matches the API response structure
const mockUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496"
      }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
    }
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618"
      }
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains"
    }
  }
];

describe('DataManagement Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Mock fetch to return a promise that never resolves
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    render(<DataManagement />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state when API call fails', async () => {
    // Mock fetch to reject
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));
    
    render(<DataManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch users')).toBeInTheDocument();
    });
  });

  it('renders user data when API call succeeds', async () => {
    // Mock fetch to return mock data
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });
    
    render(<DataManagement />);
    
    // Wait for the data to be rendered
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    });

    // Verify user details are rendered
    expect(screen.getByText('Bret')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
    expect(screen.getByText('1-770-736-8031 x56442')).toBeInTheDocument();
  });

  it('displays correct address information', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });
    
    render(<DataManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('Kulas Light, Apt. 556')).toBeInTheDocument();
      expect(screen.getByText('Gwenborough, 92998-3874')).toBeInTheDocument();
      expect(screen.getByText('Location: -37.3159, 81.1496')).toBeInTheDocument();
    });
  });

  it('displays correct company information', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });
    
    render(<DataManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument();
      expect(screen.getByText('Multi-layered client-server neural-net')).toBeInTheDocument();
      expect(screen.getByText('harness real-time e-markets')).toBeInTheDocument();
    });
  });

  it('handles empty response from API', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });
    
    render(<DataManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('User Management')).toBeInTheDocument();
      expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument();
    });
  });
}); 
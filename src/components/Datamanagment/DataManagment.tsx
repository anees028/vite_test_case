import React, { useState, useEffect } from 'react';
import './DataManagment.css';

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

const DataManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="data-management">
      <h1>User Management</h1>
      <div className="data-list">
          <div className='flex flex-row w-full gap-4'>
        {users.map(user => (
                <div key={user.id} className="data-item ">
                    <h3>{user.name}</h3>
                    <div className="user-details">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Website:</strong> {user.website}</p>
                    <div className="address-section">
                        <h4>Address:</h4>
                        <p>{user.address.street}, {user.address.suite}</p>
                        <p>{user.address.city}, {user.address.zipcode}</p>
                        <p>Location: {user.address.geo.lat}, {user.address.geo.lng}</p>
                    </div>
                    <div className="company-section">
                        <h4>Company:</h4>
                        <p><strong>Name:</strong> {user.company.name}</p>
                        <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
                        <p><strong>BS:</strong> {user.company.bs}</p>
                    </div>
                    </div>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default DataManagement;

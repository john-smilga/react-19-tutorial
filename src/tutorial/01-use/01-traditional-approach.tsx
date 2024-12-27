import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils';

type User = {
  id: string;
  name: string;
  email: string;
};

const Component = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Users</h1>
      {isLoading ? (
        <p className='text-gray-600'>Loading...</p>
      ) : (
        <ul className='space-y-3'>
          {users.map((user) => (
            <li
              key={user.id}
              className='p-4 rounded-lg bg-white shadow hover:shadow-md transition-shadow'
            >
              <span className='font-medium'>{user.name}</span>
              <span className='text-gray-600 ml-2'>- {user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Component;

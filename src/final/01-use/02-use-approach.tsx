import { use, Suspense, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils';

type User = {
  id: string;
  name: string;
  email: string;
};

// Move the data fetching logic outside the component
const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data as User[];
};

const Component = () => {
  // Use the 'use' hook to directly consume the promise
  const users = use(fetchUsers());
  const [count, setCount] = useState(0);

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md mb-4'
        onClick={() => setCount(count + 1)}
      >
        Count: {count}
      </button>
      <h1 className='text-3xl font-bold mb-6'>Users</h1>
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
    </div>
  );
};

// Wrap the component with Suspense to handle the loading state
const UsersPage = () => {
  return (
    <Suspense
      fallback={
        <p className='p-6 max-w-4xl mx-auto text-gray-600'>Loading...</p>
      }
    >
      <Component />
    </Suspense>
  );
};

export default UsersPage;

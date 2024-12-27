import { useState, FormEvent } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils';
type Status = 'success' | 'error' | 'idle';

const Component = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setStatus('idle');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (name === 'bobo') {
        throw new Error('Name is invalid');
      }
      const response = await axios.post(`${API_URL}/users`, {
        name,
        email,
      });
      console.log(response.data);
      // Clear form after successful submission
      setName('');
      setEmail('');
      setStatus('success');
    } catch (err) {
      setStatus('error');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={formStyles.container}>
      <input
        type='text'
        name='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={formStyles.input}
        placeholder='name'
      />
      <input
        type='email'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={formStyles.input}
        placeholder='email'
      />
      <button type='submit' className={formStyles.button} disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {status === 'error' && <p className='text-red-500 mt-2'>Error !!!</p>}
      {status === 'success' && (
        <p className='text-green-500 mt-2'>Success !!!</p>
      )}
    </form>
  );
};
export default Component;

const formStyles = {
  container: 'max-w-md mx-auto mt-24 p-8 space-y-4 bg-white rounded shadow',
  input:
    'w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
  button:
    'w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200',
};

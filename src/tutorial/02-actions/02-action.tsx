import axios from 'axios';
import { API_URL } from '../../utils';

const Component = () => {
  return (
    <form className={formStyles.container}>
      <input
        type='text'
        name='name'
        required
        className={formStyles.input}
        placeholder='name'
      />
      <input
        type='email'
        name='email'
        required
        className={formStyles.input}
        placeholder='email'
      />
      <button type='submit' className={formStyles.button}>
        Submit
      </button>
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

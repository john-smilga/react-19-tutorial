import { memo, useState } from 'react';

const Parent = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  return (
    <div className='container mx-auto pt-8 text-center'>
      <h1 className='text-2xl font-bold mb-4'>Parent Component</h1>
      <p className='mb-2'>Count: {count}</p>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded mb-8'
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
      <Child value={value} setValue={setValue} />
      {/* <OptimizedChild value={value} setValue={setValue} /> */}
    </div>
  );
};

type ChildProps = {
  value: number;
  setValue: (value: number) => void;
};

const Child = ({ value, setValue }: ChildProps) => {
  console.log('Child rendered');
  return (
    <div className='mt-8'>
      <h1 className='text-xl font-bold mb-4'>Child Component</h1>
      <p className='mb-2'>Value: {value}</p>
      <button
        className='bg-green-500 text-white px-4 py-2 rounded'
        onClick={() => setValue(value + 1)}
      >
        Increment
      </button>
    </div>
  );
};
const OptimizedChild = memo(Child);

export default Parent;

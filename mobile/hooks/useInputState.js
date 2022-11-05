import { useState } from 'react';

const useInputState = (init) => {
  const initialState = init || '';

  const [value, setValue] = useState(initialState);
  const handleChange = (val) => setValue(val);
  const handleReset = () => setValue(initialState);

  const props = { value, onChangeText: handleChange };

  return { value, props, handleReset, setValue };
};

export default useInputState;

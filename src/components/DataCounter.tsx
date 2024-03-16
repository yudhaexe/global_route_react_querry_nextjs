// components/DataCounter.tsx
import React from 'react';
import useCountData from '../store/CountData'; // Adjust the import path according to your file structure

const DataCounter = () => {
  const usersCount = useCountData(state => state.usersCount);

  return (
    <div>
      <h2>Total Users : {usersCount}</h2>
    </div>
  );
};

export default DataCounter;

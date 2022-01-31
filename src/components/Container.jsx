import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="h-screen flex justify-center items-center">
      { children }
    </div>
  );
};

export default Container;

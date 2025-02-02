import React from 'react'

const Loader = () => {
  return (
    <div className="flex h-[100vh] justify-center items-center mt-6 mb-6">
      <div className="relative flex items-center">
        <div className="relative w-12 h-12 border-4 border-t-4 border-r-4 border-transparent rounded-full animate-spin">
          <div className="absolute inset-0 w-12 h-12 border-b-4 border-cyan-500 border-l-4 rounded-full"></div>
        </div>
        <p className="ml-4 text-4xl font-semibold text-cyan-500">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;

import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full">
        <img 
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Pet Adoption Header" 
          className="w-full h-96 object-cover object-center" 
        />
      </header>
      <main className="flex-grow">
        <section className="text-center py-16 bg-gray-100">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to Pet Adoption Portal</h1>
          <p className="mt-4 text-lg text-gray-600">Find your perfect companion today!</p>
        </section>
      </main>
    </div>
  );
}

export default Home;

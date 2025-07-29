import React from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <div>
      <h1>Home Page</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <p>Department: {user.department}</p>
        </div>
      ) : (
        <h2>User not logged in.</h2>
      )}
    </div>
  );
}

export default Home;

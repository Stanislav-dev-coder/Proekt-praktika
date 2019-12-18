import React from 'react';

function UserPage({ userName }) {
  return (
    <div className="UserPage">
      <h1>User name: {userName}</h1>
    </div>
  );
}

export default UserPage;

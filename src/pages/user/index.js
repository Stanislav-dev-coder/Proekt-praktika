import React from 'react';

function UserPage({ slug }) {
  return (
    <div className="UserPage">
      <h1>User name: {slug}</h1>
    </div>
  );
}

UserPage.getInitialProps = ({ query }) => ({ slug: query.slug });

export default UserPage;

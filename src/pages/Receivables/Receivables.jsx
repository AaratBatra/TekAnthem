import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Receivables = () => {
  const location = useLocation();

  // Determine if the current path is exactly "/ledger"
  const isRoot = location.pathname === '/receivables' || location.pathname === '/receivables/';

  return (
    <div>
      {isRoot ? (
        // Render Ledger content if the path is exactly "/ledger"
        <div>
          <h2>Receivables</h2>
          {/* Add any other content you want to show on the root ledger page */}
        </div>
      ) : (
        // Render Outlet (child component) if the path is a nested route
        <Outlet />
      )}
    </div>
  );
};

export default Receivables;

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Inventory = () => {
  const location = useLocation();

  // Determine if the current path is exactly "/ledger"
  const isRoot = location.pathname === '/inventory' || location.pathname === '/inventory/';

  return (
    <div>
      {isRoot ? (
        // Render Ledger content if the path is exactly "/ledger"
        <div>
          <h2>Inventory</h2>
          {/* Add any other content you want to show on the root ledger page */}
        </div>
      ) : (
        // Render Outlet (child component) if the path is a nested route
        <Outlet />
      )}
    </div>
  );
};

export default Inventory;

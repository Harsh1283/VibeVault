import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import { checkAuthStatus } from './features/auth/authSlice';

function App() {
  const { initialLoad } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // This effect runs only once when the app starts.
  // It dispatches the action to check if a valid auth cookie exists.
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // While we are checking the auth status, show a simple loading message.
  if (initialLoad) {
    return <div>Loading...</div>;
  }

  // Once the check is complete, render the main router and routes.
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
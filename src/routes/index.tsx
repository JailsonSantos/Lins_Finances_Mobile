import React from 'react';

// NavigationContainer
import { NavigationContainer } from '@react-navigation/native';

// Routes
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

// Context de autenticação
import { useAuth } from '../hooks/auth';

export function Routes() {
  const { user } = useAuth();

  console.log(user);

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
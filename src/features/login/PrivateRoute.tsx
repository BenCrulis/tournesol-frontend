import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectLogin } from './loginSlice';
import { hasValidToken } from './tokenValidity';
import { Route, Redirect } from 'react-router-dom';
import RedirectState from './RedirectState';

interface Props {
  children?: React.ReactNode;
  [propName: string]: unknown;
}

export const PrivateRoute = ({ children, ...rest }: Props) => {
  const login = useAppSelector(selectLogin);
  const a = 5;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasValidToken(login) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location } as RedirectState,
            }}
          />
        )
      }
    />
  );
};

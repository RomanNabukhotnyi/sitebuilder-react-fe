import React from 'react';

import { SignUp } from '../features/sign-up/SignUp';
import { Login } from '../features/login/Login';
import { Main } from '../features/main/Main';
import { Projects } from '../features/projects/Projects';

import { RouteObject, redirect } from 'react-router-dom';

export const routes: RouteObject[] = [
    {
        path: '/sign-up',
        element: <SignUp />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: 'projects',
                element: <Projects />
            }
        ]
    }
];

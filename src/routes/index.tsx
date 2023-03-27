import React from 'react';

import { SignUp } from '../features/sign-up/SignUp';
import { Main } from '../features/main/Main';

import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
    {
        path: '/sign-up',
        element: <SignUp />,
    },
    {
        path: '/',
        element: <Main />,
    }
];

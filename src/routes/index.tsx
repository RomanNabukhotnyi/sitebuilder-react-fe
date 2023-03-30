import React from 'react';

import { SignUp } from '../features/sign-up/SignUp';
import { Login } from '../features/login/Login';
import { Main } from '../features/main/Main';
import { Projects } from '../features/projects/Projects';
import { Pages } from '../features/pages/Pages';
import { Slots } from '../features/slots/Slots';

import { RouteObject } from 'react-router-dom';

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
            },
            {
                path: 'projects/:projectId',
                element: <Pages />
            },
            {
                path: 'projects/:projectId/pages/:pageId',
                element: <Slots />
            }
        ]
    }
];

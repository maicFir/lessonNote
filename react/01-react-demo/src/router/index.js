
import { createBrowserRouter } from 'react-router-dom';
import Hello from '../pages/HelloWorld'
import ErrorPage from '../components/ErrorPage'
import ListPage from '../pages/List'
import About from '../pages/About'
import { BaseLayOut as ListBaseLayout } from '../pages/List/Emptyout'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Hello />,
        errorElement: <ErrorPage />
    },
    {
        path: '/list',
        element: <ListBaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <ListPage />
            },
            {
                path: 'about',
                element: <About />
            }
        ]
    },
])
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DirectionProvider } from '@radix-ui/react-direction';
import RootLayout from './layouts/rootLayout';

import { GlobalProvider } from './context/globalContext';
import { Centers, Floors, Test, Wings } from './pages';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element:
        // <ProtectedRoutes>
        <GlobalProvider>
          <RootLayout />
        </GlobalProvider>,
      // </ProtectedRoutes>,
      children: [
        {
          index: 'true',
          element: <Centers />,
        },

        {
          path: '/floors',
          element: <Floors />,
        },
        {
          path: '/wings',
          element: <Wings />,
        },
        {
          path: 'test',
          element: <Test />,
        },

      ],

    },
    {
      path: '*',
      element: <Navigate to='/' />
    }
  ]);

  return (

    <DirectionProvider dir="rtl">
      <RouterProvider router={router} />
    </DirectionProvider>
  )

}

export default App

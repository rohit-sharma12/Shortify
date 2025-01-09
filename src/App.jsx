import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landing';
import Dashboard from './pages/dashboard';
import Auth from './pages/auth';
import Link from './pages/link';
import RedirectLink from './pages/redirect-link';
// import { Route, Routes } from 'react-router-dom';
// import Header from './components/ui/header';
// import Footer from './components/footer';
import UrlProvider from './context';
import RequireAuth from "./components/require-auth";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
])
function App() {
  return (
    // <div className='m-4'>
    //   <Header />
    //   <UrlProvider>
    //     <Routes>
    //       <Route path="/" element={<LandingPage />} />
    //       <Route path="/dashboard" element={<Dashboard />} />
    //       <Route path="/auth" element={<Auth />} />
    //       <Route path="/link/:id" element={<Link />} />
    //       <Route path="/:id" element={<RedirectLink />} />
    //     </Routes>
    //   </UrlProvider>
    //   <Footer />
    // </div>
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  )

}

export default App

import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ConverterPage = lazy(() => import('./pages/ConverterPage'));
const CalculatorsPage = lazy(() => import('./pages/CalculatorsPage'));
const TextToolsPage = lazy(() => import('./pages/TextToolsPage'));
const GeneratorsPage = lazy(() => import('./pages/GeneratorsPage'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const AdminPanel = lazy(() => import('./pages/admin/AdminPanel'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loader component
const PageLoader = () => (
  <div className="page-loader">
    <div className="spinner"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<PageLoader />}><Home /></Suspense>,
      },
      {
        path: 'categories',
        element: <Suspense fallback={<PageLoader />}><CategoriesPage /></Suspense>,
      },
      {
        path: 'category/:slug',
        element: <Suspense fallback={<PageLoader />}><CategoryPage /></Suspense>,
      },
      {
        path: 'converter/:slug',
        element: <Suspense fallback={<PageLoader />}><ConverterPage /></Suspense>,
      },
      {
        path: 'calculators',
        element: <Suspense fallback={<PageLoader />}><CalculatorsPage /></Suspense>,
      },
      {
        path: 'calculators/:slug',
        element: <Suspense fallback={<PageLoader />}><ToolPage type="calculator" /></Suspense>,
      },
      {
        path: 'text-tools',
        element: <Suspense fallback={<PageLoader />}><TextToolsPage /></Suspense>,
      },
      {
        path: 'text-tools/:slug',
        element: <Suspense fallback={<PageLoader />}><ToolPage type="text-tool" /></Suspense>,
      },
      {
        path: 'generators',
        element: <Suspense fallback={<PageLoader />}><GeneratorsPage /></Suspense>,
      },
      {
        path: 'generators/:slug',
        element: <Suspense fallback={<PageLoader />}><ToolPage type="generator" /></Suspense>,
      },
      {
        path: 'login',
        element: <Suspense fallback={<PageLoader />}><Login /></Suspense>,
      },
      {
        path: 'register',
        element: <Suspense fallback={<PageLoader />}><Register /></Suspense>,
      },
      {
        path: 'forgot-password',
        element: <Suspense fallback={<PageLoader />}><ForgotPassword /></Suspense>,
      },
      {
        path: 'dashboard',
        element: <Suspense fallback={<PageLoader />}><Dashboard /></Suspense>,
      },
      {
        path: 'admin',
        element: <Suspense fallback={<PageLoader />}><AdminPanel /></Suspense>,
      },
      {
        path: '*',
        element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense>,
      },
    ],
  },
]);

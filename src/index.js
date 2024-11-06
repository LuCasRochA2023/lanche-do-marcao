import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import App from './App';
import { ProdutoCarrinhoContext } from './context/ProdutoContext';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/cadastro', element: <Cadastro /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ProdutoCarrinhoContext>

      
        <RouterProvider router={router} />
      </ProdutoCarrinhoContext>

  </React.StrictMode>
);

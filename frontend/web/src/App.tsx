/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { OrdersListPage } from './pages/OrdersListPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { AuthPage } from './pages/AuthPage';
import { AuthModal } from './components/modals/AuthModal';
import { AddAddressModal } from './components/modals/AddAddressModal';
import { AddCardModal } from './components/modals/AddCardModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainRouter: React.FC = () => {
  const { currentPath, socks, openProductModal } = useApp();

  // If a direct URL to /product/:id was hit, trigger the modal over Catalogue/Home
  React.useEffect(() => {
    if (currentPath.startsWith('/product/')) {
      const sockId = currentPath.split('/product/')[1];
      const target = socks.find((s) => s.id === sockId);
      if (target) {
        openProductModal(target);
      }
    }
  }, [currentPath, socks, openProductModal]);

  const renderCurrentView = () => {
    // 1. Home (also handles /product/ if opened from home)
    if (currentPath === '/' || currentPath === '' || currentPath.startsWith('/product/')) {
      return <HomePage />;
    }

    // 2. Catalogue
    if (currentPath.startsWith('/catalogue')) {
      return <CataloguePage />;
    }

    // 3. Cart & Single-Page Checkout
    if (currentPath.startsWith('/cart')) {
      return <CartCheckoutPage />;
    }

    // 4. Orders List
    if (currentPath === '/orders' || currentPath === '/orders/') {
      return <OrdersListPage />;
    }

    // 5. Order Detail (/orders/:id)
    if (currentPath.startsWith('/orders/')) {
      const orderId = currentPath.split('/orders/')[1] || '';
      return <OrderDetailPage orderId={orderId} />;
    }

    // 6. Dedicated Auth Routes
    if (currentPath.startsWith('/login')) {
      return <AuthPage initialMode="login" />;
    }

    if (currentPath.startsWith('/register')) {
      return <AuthPage initialMode="register" />;
    }

    // Default fallback to Home
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1E293B] pb-14 sm:pb-0">
      <Header />
      <main className="flex-1">{renderCurrentView()}</main>
      <Footer />

      {/* Global Modals & Notifications */}
      <ProductDetailModal />
      <AuthModal />
      <AddAddressModal />
      <AddCardModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}

/**
 * App state for deployed Sock Shop storefront.
 * All catalogue / cart / auth / orders go through Express BFF → microservices.
 * No local mock cart/order fallbacks (those were for offline preview only).
 */
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ALL_TAGS } from '../data/mockData';
import { Address, Card, CartItem, Order, SockItem, User } from '../types';
import * as api from '../api/client';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentPath: string;
  navigate: (path: string) => void;
  goBack: () => void;
  socks: SockItem[];
  catalogueLoading: boolean;
  getSockById: (id: string) => SockItem | undefined;
  selectedProductModal: SockItem | null;
  openProductModal: (sock: SockItem) => void;
  closeProductModal: () => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'name') => void;
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  taxAmount: number;
  cartTotal: number;
  addToCart: (sock: SockItem, quantity?: number) => void;
  updateCartQty: (sockId: string, delta: number) => void;
  removeFromCart: (sockId: string) => void;
  clearCart: () => void;
  user: User | null;
  login: (username: string, password?: string) => boolean;
  register: (data: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
  }) => boolean;
  logout: () => void;
  addresses: Address[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  addAddress: (addr: Omit<Address, 'id'>) => Address | null;
  cards: Card[];
  selectedCardId: string;
  setSelectedCardId: (id: string) => void;
  addCard: (card: Omit<Card, 'id'>) => Card | null;
  orders: Order[];
  placeOrder: () => void;
  getOrderById: (id: string) => Order | undefined;
  authModal: 'login' | 'register' | null;
  setAuthModal: (modal: 'login' | 'register' | null) => void;
  showAddAddressModal: boolean;
  setShowAddAddressModal: (show: boolean) => void;
  showAddCardModal: boolean;
  setShowAddCardModal: (show: boolean) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  availableTags: string[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialPath = () => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash ? (hash.startsWith('/') ? hash : `/${hash}`) : '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [historyStack, setHistoryStack] = useState<string[]>(['/']);
  const [socks, setSocks] = useState<SockItem[]>([]);
  const [catalogueLoading, setCatalogueLoading] = useState(true);
  const [availableTags, setAvailableTags] = useState<string[]>(['all']);
  const [selectedProductModal, setSelectedProductModal] = useState<SockItem | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const removeToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const refreshCatalogue = useCallback(async () => {
    setCatalogueLoading(true);
    try {
      const list = await api.fetchCatalogue({ size: 100 });
      const fromApi = list
        .map(api.mapCatalogueToSock)
        .filter((s) => Boolean(s.imageUrl));
      setSocks(fromApi);
      const tagsRaw = await api.fetchTags();
      const tags = Array.isArray(tagsRaw)
        ? tagsRaw
        : (tagsRaw as { tags?: string[] }).tags || [];
      setAvailableTags(tags.length ? ['all', ...tags] : ['all']);
    } catch {
      setSocks([]);
      setAvailableTags(['all']);
      showToast('Catalogue unavailable — check catalogue service', 'error');
    } finally {
      setCatalogueLoading(false);
    }
  }, []);

  const refreshCart = useCallback(async () => {
    try {
      const lines = await api.fetchCart();
      const mapped: CartItem[] = [];
      for (const line of lines) {
        const sockId = line.itemId || line.id || '';
        let sock = socks.find((s) => s.id === sockId);
        if (!sock) {
          try {
            sock = api.mapCatalogueToSock(await api.fetchSock(sockId));
          } catch {
            continue;
          }
        }
        mapped.push({
          id: sockId,
          sockId,
          sock,
          quantity: line.quantity,
          unitPrice: line.unitPrice,
        });
      }
      setCart(mapped);
    } catch {
      /* keep current cart UI; next action will surface errors */
    }
  }, [socks]);

  useEffect(() => {
    refreshCatalogue();
    if (api.isLoggedInCookie()) {
      setUser({
        id: 'session',
        username: 'customer',
        email: '',
        firstName: 'Customer',
        lastName: '',
        addresses: [],
        cards: [],
      });
    }
  }, [refreshCatalogue]);

  useEffect(() => {
    if (api.isLoggedInCookie()) refreshCart();
  }, [refreshCart]);

  useEffect(() => {
    const handleHashChange = () => {
      const path = getInitialPath();
      setCurrentPath(path);
      if (path.startsWith('/product/')) {
        const id = path.split('/product/')[1];
        const targetSock = socks.find((s) => s.id === id);
        if (targetSock) setSelectedProductModal(targetSock);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [socks]);

  const navigate = (path: string) => {
    setHistoryStack((prev) => [...prev, currentPath]);
    setCurrentPath(path);
    window.location.hash = path;
    if (!path.startsWith('/product/')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (historyStack.length > 0) {
      const prev = historyStack[historyStack.length - 1];
      setHistoryStack((s) => s.slice(0, -1));
      navigate(prev);
    } else {
      navigate('/');
    }
  };

  const getSockById = (id: string) => socks.find((s) => s.id === id);
  const openProductModal = (sock: SockItem) => setSelectedProductModal(sock);
  const closeProductModal = () => setSelectedProductModal(null);

  const addToCart = (sock: SockItem, quantity = 1) => {
    void (async () => {
      try {
        for (let i = 0; i < quantity; i++) {
          await api.addToCartApi(sock.id);
        }
        await refreshCart();
        showToast(`Added ${quantity} × ${sock.name} to cart`, 'success');
      } catch {
        showToast('Could not add to cart — is carts/catalogue up?', 'error');
      }
    })();
  };

  const updateCartQty = (sockId: string, delta: number) => {
    const item = cart.find((i) => i.sockId === sockId);
    if (!item) return;
    const newQty = item.quantity + delta;
    void (async () => {
      try {
        if (newQty <= 0) {
          await api.deleteCartItemApi(sockId);
        } else {
          await api.updateCartApi(sockId, newQty);
        }
        await refreshCart();
      } catch {
        showToast('Could not update cart', 'error');
      }
    })();
  };

  const removeFromCart = (sockId: string) => {
    const target = cart.find((i) => i.sockId === sockId);
    void (async () => {
      try {
        await api.deleteCartItemApi(sockId);
        await refreshCart();
        if (target) showToast(`Removed ${target.sock.name} from cart`, 'info');
      } catch {
        showToast('Could not remove item from cart', 'error');
      }
    })();
  };

  const clearCart = () => {
    void (async () => {
      try {
        await api.clearCartApi();
        setCart([]);
      } catch {
        showToast('Could not clear cart', 'error');
      }
    })();
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const shippingFee = cartSubtotal >= 40.0 || cartSubtotal === 0 ? 0.0 : 4.5;
  const taxAmount = Number((cartSubtotal * 0.0825).toFixed(2));
  const cartTotal = Number((cartSubtotal + shippingFee + taxAmount).toFixed(2));

  const login = (username: string, password = '') => {
    if (!username.trim()) {
      showToast('Please enter a username', 'error');
      return false;
    }
    if (!password.trim()) {
      showToast('Please enter a password', 'error');
      return false;
    }
    void (async () => {
      try {
        await api.loginApi(username.trim(), password);
        setUser({
          id: 'session',
          username: username.trim(),
          email: '',
          firstName: username.trim(),
          lastName: '',
          addresses: [],
          cards: [],
        });
        setAuthModal(null);
        showToast(`Welcome back, ${username.trim()}!`, 'success');
        await refreshCart();
      } catch {
        showToast('Invalid login credentials', 'error');
      }
    })();
    return true;
  };

  const register = (data: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
  }) => {
    if (!data.username || !data.email || !data.password) {
      showToast('Username, email and password are required', 'error');
      return false;
    }
    void (async () => {
      try {
        await api.registerApi({
          username: data.username,
          email: data.email,
          firstName: data.firstName || 'Sock',
          lastName: data.lastName || 'Lover',
          password: data.password!,
        });
        setUser({
          id: 'session',
          username: data.username,
          email: data.email,
          firstName: data.firstName || 'Sock',
          lastName: data.lastName || 'Lover',
          addresses: [],
          cards: [],
        });
        setAuthModal(null);
        showToast(`Account created! Welcome, ${data.firstName || data.username}!`, 'success');
      } catch {
        showToast('Registration failed', 'error');
      }
    })();
    return true;
  };

  const logout = () => {
    api.logoutLocal();
    setUser(null);
    setCart([]);
    setAddresses([]);
    setCards([]);
    showToast('Signed out successfully', 'info');
  };

  const addAddress = (addrData: Omit<Address, 'id'>): Address | null => {
    const newAddr: Address = { ...addrData, id: `addr-${Date.now()}` };
    void (async () => {
      try {
        await api.postAddress({
          number: addrData.number,
          street: addrData.street,
          city: addrData.city,
          postcode: addrData.postcode,
          country: addrData.country,
        });
        setAddresses((prev) => [...prev, newAddr]);
        setSelectedAddressId(newAddr.id);
        setShowAddAddressModal(false);
        showToast('Shipping address saved', 'success');
      } catch {
        showToast('Could not save address — is user service up?', 'error');
      }
    })();
    return newAddr;
  };

  const addCard = (cardData: Omit<Card, 'id'>): Card | null => {
    const rawNum = cardData.longNum.replace(/\s+/g, '');
    const masked = `•••• •••• •••• ${rawNum.slice(-4) || '9999'}`;
    const newCard: Card = {
      ...cardData,
      id: `card-${Date.now()}`,
      longNum: masked,
      brand: rawNum.startsWith('4') ? 'visa' : rawNum.startsWith('5') ? 'mastercard' : 'visa',
    };
    void (async () => {
      try {
        await api.postCard({
          longNum: rawNum,
          expires: cardData.expires,
          ccv: cardData.ccv,
        });
        setCards((prev) => [...prev, newCard]);
        setSelectedCardId(newCard.id);
        setShowAddCardModal(false);
        showToast('Payment card saved', 'success');
      } catch {
        showToast('Could not save card — is user service up?', 'error');
      }
    })();
    return newCard;
  };

  const placeOrder = () => {
    if (!user && !api.isLoggedInCookie()) {
      showToast('Please sign in before placing an order', 'error');
      setAuthModal('login');
      return;
    }
    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    void (async () => {
      try {
        await api.placeOrderApi(20000);
        try {
          await api.clearCartApi();
        } catch {
          /* ignore */
        }
        setCart([]);
        showToast('Order placed successfully!', 'success');
        navigate('/orders');
        try {
          const remote = await api.fetchOrders();
          if (Array.isArray(remote)) {
            /* remote shape varies; list page can refresh later */
            setOrders((prev) => prev);
          }
        } catch {
          /* ignore */
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Order failed';
        showToast(msg || 'Order failed — check orders/payment/shipping', 'error');
      }
    })();
  };

  const getOrderById = (id: string) => orders.find((o) => o.id === id);

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        goBack,
        socks,
        catalogueLoading,
        getSockById,
        selectedProductModal,
        openProductModal,
        closeProductModal,
        selectedTag,
        setSelectedTag,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        cart,
        cartCount,
        cartSubtotal,
        shippingFee,
        taxAmount,
        cartTotal,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        user,
        login,
        register,
        logout,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        addAddress,
        cards,
        selectedCardId,
        setSelectedCardId,
        addCard,
        orders,
        placeOrder,
        getOrderById,
        authModal,
        setAuthModal,
        showAddAddressModal,
        setShowAddAddressModal,
        showAddCardModal,
        setShowAddCardModal,
        toasts,
        showToast,
        removeToast,
        availableTags,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

export { ALL_TAGS };

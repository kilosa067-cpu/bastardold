import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipos para el sistema de caja
export type PaymentMethod = 'cash' | 'card' | 'paypal';
export type TransactionType = 'income' | 'expense';
export type ServiceStatus = 'paid' | 'deposit' | 'pending';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  paymentMethod: PaymentMethod;
  date: string;
  createdAt: string;
  // Para servicios
  isService?: boolean;
  serviceStatus?: ServiceStatus;
  customerName?: string;
  barberId?: string;
  serviceId?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  cost?: number;
  stock?: number;
  category: string;
  description?: string;
}

export interface CashRegisterStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  todayIncome: number;
  todayExpenses: number;
  weekIncome: number;
  weekExpenses: number;
  monthIncome: number;
  monthExpenses: number;
  cashInRegister: number;
}

export interface CashRegisterState {
  // Transacciones
  transactions: Transaction[];
  
  // Productos/Servicios manuales
  products: Product[];
  
  // Configuración
  initialCash: number;
  
  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  setInitialCash: (amount: number) => void;
  
  // Getters
  getStats: () => CashRegisterStats;
  getTransactionsByDate: (date: string) => Transaction[];
  getTransactionsByRange: (startDate: string, endDate: string) => Transaction[];
  getIncomeByMethod: () => Record<PaymentMethod, number>;
}

// Categorías predefinidas
export const expenseCategories = [
  'Productos',
  'Suministros',
  'Renta',
  'Servicios',
  'Marketing',
  'Equipo',
  'Otros',
];

export const incomeCategories = [
  'Corte',
  'Afeitado',
  'Barba',
  'Productos',
  'Otros',
];

export const useCashRegisterStore = create<CashRegisterState>()(
  persist(
    (set, get) => ({
      transactions: [],
      products: [],
      initialCash: 0,
      
      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: `tx-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },
      
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter(t => t.id !== id),
        }));
      },
      
      updateTransaction: (id, transaction) => {
        set((state) => ({
          transactions: state.transactions.map(t =>
            t.id === id ? { ...t, ...transaction } : t
          ),
        }));
      },
      
      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          id: `prod-${Date.now()}`,
        };
        set((state) => ({
          products: [...state.products, newProduct],
        }));
      },
      
      updateProduct: (id, product) => {
        set((state) => ({
          products: state.products.map(p =>
            p.id === id ? { ...p, ...product } : p
          ),
        }));
      },
      
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter(p => p.id !== id),
        }));
      },
      
      setInitialCash: (amount) => {
        set({ initialCash: amount });
      },
      
      getStats: () => {
        const { transactions, initialCash } = get();
        const today = new Date().toISOString().split('T')[0];
        
        // Calcular fechas
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        
        // Totales
        const totalIncome = transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        
        const totalExpenses = transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
        
        // Hoy
        const todayIncome = transactions
          .filter(t => t.type === 'income' && t.date === today)
          .reduce((sum, t) => sum + t.amount, 0);
        
        const todayExpenses = transactions
          .filter(t => t.type === 'expense' && t.date === today)
          .reduce((sum, t) => sum + t.amount, 0);
        
        // Semana
        const weekIncome = transactions
          .filter(t => t.type === 'income' && new Date(t.date) >= weekAgo)
          .reduce((sum, t) => sum + t.amount, 0);
        
        const weekExpenses = transactions
          .filter(t => t.type === 'expense' && new Date(t.date) >= weekAgo)
          .reduce((sum, t) => sum + t.amount, 0);
        
        // Mes
        const monthIncome = transactions
          .filter(t => t.type === 'income' && new Date(t.date) >= monthAgo)
          .reduce((sum, t) => sum + t.amount, 0);
        
        const monthExpenses = transactions
          .filter(t => t.type === 'expense' && new Date(t.date) >= monthAgo)
          .reduce((sum, t) => sum + t.amount, 0);
        
        // Efectivo en caja
        const cashInRegister = initialCash + transactions
          .filter(t => t.paymentMethod === 'cash')
          .reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0);
        
        return {
          totalIncome,
          totalExpenses,
          balance: totalIncome - totalExpenses,
          todayIncome,
          todayExpenses,
          weekIncome,
          weekExpenses,
          monthIncome,
          monthExpenses,
          cashInRegister,
        };
      },
      
      getTransactionsByDate: (date) => {
        return get().transactions.filter(t => t.date === date);
      },
      
      getTransactionsByRange: (startDate, endDate) => {
        return get().transactions.filter(t => 
          t.date >= startDate && t.date <= endDate
        );
      },
      
      getIncomeByMethod: () => {
        const income = get().transactions.filter(t => t.type === 'income');
        return {
          cash: income.filter(t => t.paymentMethod === 'cash').reduce((sum, t) => sum + t.amount, 0),
          card: income.filter(t => t.paymentMethod === 'card').reduce((sum, t) => sum + t.amount, 0),
          paypal: income.filter(t => t.paymentMethod === 'paypal').reduce((sum, t) => sum + t.amount, 0),
        };
      },
    }),
    {
      name: 'bastard-cash-register',
    }
  )
);

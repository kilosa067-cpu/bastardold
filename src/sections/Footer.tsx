import { useState } from 'react';
import { 
  Scissors, 
  Instagram, 
  MessageCircle, 
  Calendar, 
  MapPin,
  Lock,
  DollarSign,
  Package,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Image as ImageIcon,
  Type,
  User,
  Palette,
  RefreshCw,
  GraduationCap,
  LogOut,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppointmentStore } from '@/stores/appointmentStore';
import { useConfigStore, type BarberConfig, type ServiceConfig, type SeminarioConfig } from '@/stores/configStore';
import { 
  useCashRegisterStore, 
  type PaymentMethod, 
  type TransactionType,
  expenseCategories,
  incomeCategories,
} from '@/stores/cashRegisterStore';
import { useThemeStore, presetThemes, defaultColors, type PresetThemeName } from '@/stores/themeStore';
import { useFirebaseConfigStore } from '@/stores/firebaseConfigStore';
import { sendCancellationEmail } from '@/services/emailService';
import AdminLogin from './AdminLogin';

export default function Footer() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');
  
  // Firebase Auth
  const { 
    isAuthenticated, 
    isLoading: authLoading,
    logout,
  } = useFirebaseConfigStore();

  // Config store
  const config = useConfigStore();

  const handleLogout = async () => {
    await logout();
    setIsAdminOpen(false);
  };

  return (
    <footer className="relative w-full bg-black rounded-t-[3rem] overflow-hidden border-t border-white/10">
      {/* Main Footer Content */}
      <div className="section-padding py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-clay flex items-center justify-center">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-xl text-white">BASTARD</h3>
                  <p className="text-white/50 text-sm">Old School Master Barber</p>
                </div>
              </div>
              <p className="text-white/60 max-w-md mb-6">
                Barbería tradicional con precisión moderna. Desde 2014 en Oaxaca, México. 
                Ritual, no moda.
              </p>
              
              {/* Status Indicator */}
              <div className="inline-flex items-center gap-3 bg-moss/20 rounded-full px-4 py-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-400 text-sm font-medium">Sistema de agenda activo</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-outfit font-semibold text-white mb-4">Enlaces</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#historia" className="text-white/60 hover:text-clay transition-colors text-sm">
                    Historia
                  </a>
                </li>
                <li>
                  <a href="#barberos" className="text-white/60 hover:text-clay transition-colors text-sm">
                    Barberos
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="text-white/60 hover:text-clay transition-colors text-sm">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#agenda" className="text-white/60 hover:text-clay transition-colors text-sm">
                    Agenda
                  </a>
                </li>
                <li>
                  <a href="#noticias" className="text-white/60 hover:text-clay transition-colors text-sm">
                    Noticias
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-white/60 hover:text-clay transition-colors text-sm">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-outfit font-semibold text-white mb-4">Síguenos</h4>
              <div className="flex flex-col gap-3">
                <a 
                  href={config.contact.instagram}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-clay transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
                <a 
                  href={config.contact.whatsapp}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-green-400 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a 
                  href="#agenda" 
                  className="flex items-center gap-2 text-white/60 hover:text-moss transition-colors text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Agenda
                </a>
                <a 
                  href={config.contact.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-clay transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  Ubicación
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2024 Bastard Old School Master Barber. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center gap-4">
              {/* Admin Button */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-2 bg-clay/20 hover:bg-clay text-white hover:text-white px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
              >
                <Lock className="w-4 h-4" />
                Panel Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Panel Dialog */}
      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-cream">
          <DialogHeader>
            <DialogTitle className="font-outfit font-bold text-2xl text-charcoal">
              {isAuthenticated ? 'Panel de Administración' : 'Acceso Administrativo'}
            </DialogTitle>
          </DialogHeader>

          {authLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-moss" />
            </div>
          ) : !isAuthenticated ? (
            <AdminLogin onLogin={() => {}} />
          ) : (
            <AdminPanel 
              onLogout={handleLogout}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
        </DialogContent>
      </Dialog>
    </footer>
  );
}

// Panel de Admin completo
interface AdminPanelProps {
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function AdminPanel({ onLogout, activeTab, setActiveTab }: AdminPanelProps) {
  const { user } = useFirebaseConfigStore();
  
  return (
    <div className="space-y-4 py-4">
      {/* User Info & Logout */}
      <div className="flex items-center justify-between bg-cream-dark rounded-xl p-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-moss rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-charcoal">{user?.email}</p>
            <p className="text-xs text-charcoal/50">Administrador</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onLogout}
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar sesión
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:grid-cols-7 w-full">
          <TabsTrigger value="appointments">
            <Calendar className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Citas</span>
          </TabsTrigger>
          <TabsTrigger value="cash">
            <DollarSign className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Caja</span>
          </TabsTrigger>
          <TabsTrigger value="content">
            <Type className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Contenido</span>
          </TabsTrigger>
          <TabsTrigger value="barbers">
            <User className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Barberos</span>
          </TabsTrigger>
          <TabsTrigger value="services">
            <Scissors className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Servicios</span>
          </TabsTrigger>
          <TabsTrigger value="seminarios">
            <GraduationCap className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Seminarios</span>
          </TabsTrigger>
          <TabsTrigger value="theme">
            <Palette className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Tema</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <AppointmentsTab />
        </TabsContent>

        <TabsContent value="cash" className="space-y-4">
          <CashRegisterTab />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <ContentTab />
        </TabsContent>

        <TabsContent value="barbers" className="space-y-4">
          <BarbersTab />
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <ServicesTab />
        </TabsContent>

        <TabsContent value="seminarios" className="space-y-4">
          <SeminariosTab />
        </TabsContent>

        <TabsContent value="theme" className="space-y-4">
          <ThemeTab />
        </TabsContent>
      </Tabs>

      {/* Logout */}
      <div className="flex justify-end pt-4 border-t border-charcoal/10">
        <Button
          variant="outline"
          onClick={onLogout}
          className="rounded-xl"
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

// Tab de Citas
function AppointmentsTab() {
  const { appointments, getAdminStats, cancelAppointment, shopSchedule, updateShopSchedule } = useAppointmentStore();
  const config = useConfigStore();
  const services = config.services;
  const barbers = config.barbers;
  const stats = getAdminStats();
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);

  const upcomingAppointments = appointments
    .filter(apt => apt.status === 'confirmed')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 20);

  const handleCancelWithEmail = async (apt: typeof appointments[0]) => {
    if (!confirm('¿Cancelar esta cita? Se enviará un email al cliente.')) return;
    
    setSendingEmail(apt.id);
    
    try {
      // Enviar email de cancelación
      const service = services.find(s => s.id === apt.serviceId);
      const barber = barbers.find(b => b.id === apt.barberId);
      
      if (apt.customerEmail && service && barber) {
        await sendCancellationEmail({
          customerName: apt.customerName,
          customerEmail: apt.customerEmail,
          serviceName: service.name,
          barberName: barber.name,
          date: apt.date,
          time: apt.time,
          price: apt.totalAmount,
        });
      }
      
      // Cancelar la cita
      cancelAppointment(apt.id);
      alert('Cita cancelada y email enviado al cliente.');
    } catch (error) {
      console.error('Error al enviar email:', error);
      // Aún así cancelamos la cita
      cancelAppointment(apt.id);
      alert('Cita cancelada (no se pudo enviar el email).');
    } finally {
      setSendingEmail(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-cream-dark rounded-xl p-4">
          <div className="text-charcoal/60 text-sm mb-1">Total Citas</div>
          <div className="font-outfit font-bold text-2xl text-charcoal">{stats.totalAppointments}</div>
        </div>
        <div className="bg-cream-dark rounded-xl p-4">
          <div className="text-charcoal/60 text-sm mb-1">Ingresos Totales</div>
          <div className="font-outfit font-bold text-2xl text-charcoal">${stats.totalRevenue}</div>
        </div>
        <div className="bg-cream-dark rounded-xl p-4">
          <div className="text-charcoal/60 text-sm mb-1">Pendientes</div>
          <div className="font-outfit font-bold text-2xl text-charcoal">{stats.pendingAppointments}</div>
        </div>
        <div className="bg-cream-dark rounded-xl p-4">
          <div className="text-charcoal/60 text-sm mb-1">Esta Semana</div>
          <div className="font-outfit font-bold text-2xl text-charcoal">${stats.weeklyRevenue}</div>
        </div>
      </div>

      {/* Shop Schedule */}
      <div className="bg-cream-dark rounded-xl p-4">
        <h3 className="font-outfit font-semibold text-charcoal mb-4">Horario de la Barbería</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-charcoal/60">Hora de apertura</label>
            <Input
              type="time"
              value={shopSchedule.openTime}
              onChange={(e) => updateShopSchedule({ openTime: e.target.value })}
              className="rounded-xl mt-1"
            />
          </div>
          <div>
            <label className="text-sm text-charcoal/60">Hora de cierre</label>
            <Input
              type="time"
              value={shopSchedule.closeTime}
              onChange={(e) => updateShopSchedule({ closeTime: e.target.value })}
              className="rounded-xl mt-1"
            />
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div>
        <h3 className="font-outfit font-semibold text-charcoal mb-4">Próximas Citas</h3>
        {upcomingAppointments.length === 0 ? (
          <p className="text-charcoal/60 text-center py-8">No hay citas programadas</p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="bg-cream-dark rounded-xl p-4 flex items-center justify-between">
                <div className="grid grid-cols-4 gap-4 flex-1">
                  <div>
                    <p className="text-xs text-charcoal/50">Cliente</p>
                    <p className="font-medium text-charcoal text-sm">{apt.customerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/50">Servicio</p>
                    <p className="font-medium text-charcoal text-sm">
                      {services.find(s => s.id === apt.serviceId)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/50">Fecha/Hora</p>
                    <p className="font-medium text-charcoal text-sm">
                      {apt.date} {apt.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/50">Pago</p>
                    <p className={`font-medium text-sm ${
                      apt.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {apt.paymentStatus === 'paid' ? 'Pagado' : 'Apartado'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancelWithEmail(apt)}
                  disabled={sendingEmail === apt.id}
                  className="ml-4"
                >
                  {sendingEmail === apt.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Tab de Caja
function CashRegisterTab() {
  const cashRegister = useCashRegisterStore();
  const stats = cashRegister.getStats();
  const incomeByMethod = cashRegister.getIncomeByMethod();
  
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>('income');
  const [transactionForm, setTransactionForm] = useState({
    amount: '',
    description: '',
    category: '',
    paymentMethod: 'cash' as PaymentMethod,
    isService: false,
    serviceStatus: 'paid' as 'paid' | 'deposit',
    customerName: '',
  });
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    cost: '',
    category: '',
    description: '',
  });

  const handleAddTransaction = () => {
    if (!transactionForm.amount || !transactionForm.description) return;
    
    cashRegister.addTransaction({
      type: transactionType,
      amount: parseFloat(transactionForm.amount),
      description: transactionForm.description,
      category: transactionForm.category,
      paymentMethod: transactionForm.paymentMethod,
      date: new Date().toISOString().split('T')[0],
      isService: transactionForm.isService,
      serviceStatus: transactionForm.serviceStatus,
      customerName: transactionForm.customerName || undefined,
    });
    
    setTransactionForm({
      amount: '',
      description: '',
      category: '',
      paymentMethod: 'cash',
      isService: false,
      serviceStatus: 'paid',
      customerName: '',
    });
    setShowAddTransaction(false);
  };

  const handleAddProduct = () => {
    if (!productForm.name || !productForm.price) return;
    
    cashRegister.addProduct({
      name: productForm.name,
      price: parseFloat(productForm.price),
      cost: productForm.cost ? parseFloat(productForm.cost) : undefined,
      category: productForm.category,
      description: productForm.description,
    });
    
    setProductForm({
      name: '',
      price: '',
      cost: '',
      category: '',
      description: '',
    });
    setShowAddProduct(false);
  };

  const recentTransactions = cashRegister.transactions.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-cream-dark rounded-xl p-4">
          <div className="text-charcoal/60 text-sm mb-1">Balance Total</div>
          <div className={`font-outfit font-bold text-2xl ${stats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${stats.balance}
          </div>
        </div>
        <div className="bg-cream-dark rounded-xl p-4">
          <div className="text-charcoal/60 text-sm mb-1">Ingresos Hoy</div>
          <div className="font-outfit font-bold text-2xl text-green-600">${stats.todayIncome}</div>
        </div>
        <div className="bg-cream-dark rounded-xl p-4">
          <div className="text-charcoal/60 text-sm mb-1">Gastos Hoy</div>
          <div className="font-outfit font-bold text-2xl text-red-600">${stats.todayExpenses}</div>
        </div>
        <div className="bg-cream-dark rounded-xl p-4">
          <div className="text-charcoal/60 text-sm mb-1">Efectivo en Caja</div>
          <div className="font-outfit font-bold text-2xl text-charcoal">${stats.cashInRegister}</div>
        </div>
      </div>

      {/* Income by Method */}
      <div className="bg-cream-dark rounded-xl p-4">
        <h3 className="font-outfit font-semibold text-charcoal mb-4">Ingresos por Método de Pago</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-charcoal/60 text-sm">Efectivo</div>
            <div className="font-outfit font-bold text-xl text-charcoal">${incomeByMethod.cash}</div>
          </div>
          <div className="text-center">
            <div className="text-charcoal/60 text-sm">Tarjeta</div>
            <div className="font-outfit font-bold text-xl text-charcoal">${incomeByMethod.card}</div>
          </div>
          <div className="text-center">
            <div className="text-charcoal/60 text-sm">PayPal</div>
            <div className="font-outfit font-bold text-xl text-charcoal">${incomeByMethod.paypal}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={() => { setTransactionType('income'); setShowAddTransaction(true); }}
          className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Registrar Ingreso
        </Button>
        <Button 
          onClick={() => { setTransactionType('expense'); setShowAddTransaction(true); }}
          variant="destructive"
          className="rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Registrar Gasto
        </Button>
        <Button 
          onClick={() => setShowAddProduct(true)}
          variant="outline"
          className="rounded-xl"
        >
          <Package className="w-4 h-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      {/* Add Transaction Dialog */}
      {showAddTransaction && (
        <div className="bg-cream-dark rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-outfit font-semibold text-charcoal">
              {transactionType === 'income' ? 'Nuevo Ingreso' : 'Nuevo Gasto'}
            </h4>
            <button onClick={() => setShowAddTransaction(false)}>
              <X className="w-5 h-5 text-charcoal/60" />
            </button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Monto</Label>
              <Input
                type="number"
                value={transactionForm.amount}
                onChange={(e) => setTransactionForm({...transactionForm, amount: e.target.value})}
                placeholder="0.00"
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Método de Pago</Label>
              <Select 
                value={transactionForm.paymentMethod} 
                onValueChange={(v) => setTransactionForm({...transactionForm, paymentMethod: v as PaymentMethod})}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Efectivo</SelectItem>
                  <SelectItem value="card">Tarjeta</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Categoría</Label>
              <Select 
                value={transactionForm.category} 
                onValueChange={(v) => setTransactionForm({...transactionForm, category: v})}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {(transactionType === 'income' ? incomeCategories : expenseCategories).map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Descripción</Label>
              <Input
                value={transactionForm.description}
                onChange={(e) => setTransactionForm({...transactionForm, description: e.target.value})}
                placeholder="Descripción..."
                className="rounded-xl"
              />
            </div>
          </div>

          {transactionType === 'income' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isService"
                  checked={transactionForm.isService}
                  onChange={(e) => setTransactionForm({...transactionForm, isService: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="isService">Es un servicio de barbería</Label>
              </div>
              
              {transactionForm.isService && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre del Cliente</Label>
                    <Input
                      value={transactionForm.customerName}
                      onChange={(e) => setTransactionForm({...transactionForm, customerName: e.target.value})}
                      placeholder="Cliente..."
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Estado del Pago</Label>
                    <Select 
                      value={transactionForm.serviceStatus} 
                      onValueChange={(v) => setTransactionForm({...transactionForm, serviceStatus: v as 'paid' | 'deposit'})}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Pagado completo</SelectItem>
                        <SelectItem value="deposit">Apartado (30%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          )}

          <Button onClick={handleAddTransaction} className="w-full bg-moss hover:bg-moss-dark text-white rounded-xl">
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
        </div>
      )}

      {/* Add Product Dialog */}
      {showAddProduct && (
        <div className="bg-cream-dark rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-outfit font-semibold text-charcoal">Nuevo Producto/Servicio</h4>
            <button onClick={() => setShowAddProduct(false)}>
              <X className="w-5 h-5 text-charcoal/60" />
            </button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Nombre</Label>
              <Input
                value={productForm.name}
                onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                placeholder="Nombre del producto..."
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Precio de Venta</Label>
              <Input
                type="number"
                value={productForm.price}
                onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                placeholder="0.00"
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Costo (opcional)</Label>
              <Input
                type="number"
                value={productForm.cost}
                onChange={(e) => setProductForm({...productForm, cost: e.target.value})}
                placeholder="0.00"
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Categoría</Label>
              <Input
                value={productForm.category}
                onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                placeholder="Categoría..."
                className="rounded-xl"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Descripción</Label>
              <Textarea
                value={productForm.description}
                onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                placeholder="Descripción..."
                className="rounded-xl"
              />
            </div>
          </div>

          <Button onClick={handleAddProduct} className="w-full bg-moss hover:bg-moss-dark text-white rounded-xl">
            <Save className="w-4 h-4 mr-2" />
            Guardar Producto
          </Button>
        </div>
      )}

      {/* Products List */}
      {cashRegister.products.length > 0 && (
        <div>
          <h4 className="font-outfit font-semibold text-charcoal mb-3">Productos/Servicios</h4>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {cashRegister.products.map((product) => (
              <div key={product.id} className="bg-cream-dark rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-charcoal">{product.name}</p>
                  <p className="text-sm text-charcoal/60">${product.price}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => cashRegister.deleteProduct(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div>
        <h4 className="font-outfit font-semibold text-charcoal mb-3">Movimientos Recientes</h4>
        {recentTransactions.length === 0 ? (
          <p className="text-charcoal/60 text-center py-8">No hay movimientos registrados</p>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className={`bg-cream-dark rounded-xl p-3 flex items-center justify-between ${
                tx.type === 'income' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
              }`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-charcoal">{tx.description}</p>
                    {tx.isService && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        tx.serviceStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {tx.serviceStatus === 'paid' ? 'Pagado' : 'Apartado'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-charcoal/60">
                    {tx.category} • {tx.date} • {tx.paymentMethod === 'cash' ? 'Efectivo' : tx.paymentMethod === 'card' ? 'Tarjeta' : 'PayPal'}
                  </p>
                </div>
                <div className={`font-outfit font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Tab de Contenido
function ContentTab() {
  const config = useConfigStore();
  const [editingHero, setEditingHero] = useState(false);
  const [editingHistoria, setEditingHistoria] = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const [heroForm, setHeroForm] = useState(config.hero);
  const [historiaForm, setHistoriaForm] = useState(config.historia);
  const [contactForm, setContactForm] = useState(config.contact);

  const saveHero = () => {
    config.updateHero(heroForm);
    setEditingHero(false);
  };

  const saveHistoria = () => {
    config.updateHistoria(historiaForm);
    setEditingHistoria(false);
  };

  const saveContact = () => {
    config.updateContact(contactForm);
    setEditingContact(false);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-cream-dark rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-outfit font-semibold text-charcoal flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Sección Hero
          </h3>
          <Button variant="outline" size="sm" onClick={() => setEditingHero(!editingHero)}>
            <Edit2 className="w-4 h-4 mr-2" />
            {editingHero ? 'Cancelar' : 'Editar'}
          </Button>
        </div>
        
        {editingHero ? (
          <div className="space-y-4">
            <div>
              <Label>Título Principal</Label>
              <Textarea
                value={heroForm.title}
                onChange={(e) => setHeroForm({...heroForm, title: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Subtítulo</Label>
              <Textarea
                value={heroForm.subtitle}
                onChange={(e) => setHeroForm({...heroForm, subtitle: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Texto Botón Principal</Label>
              <Input
                value={heroForm.ctaPrimary}
                onChange={(e) => setHeroForm({...heroForm, ctaPrimary: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Imagen de Fondo (URL)</Label>
              <Input
                value={heroForm.backgroundImage}
                onChange={(e) => setHeroForm({...heroForm, backgroundImage: e.target.value})}
                className="rounded-xl"
                placeholder="/images/entrada.jpg"
              />
            </div>
            <Button onClick={saveHero} className="bg-moss hover:bg-moss-dark text-white">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <p><span className="text-charcoal/60">Título:</span> {config.hero.title}</p>
            <p><span className="text-charcoal/60">Subtítulo:</span> {config.hero.subtitle}</p>
            <p><span className="text-charcoal/60">Imagen:</span> {config.hero.backgroundImage}</p>
          </div>
        )}
      </div>

      {/* Historia Section */}
      <div className="bg-cream-dark rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-outfit font-semibold text-charcoal flex items-center gap-2">
            <Type className="w-5 h-5" />
            Sección Historia
          </h3>
          <Button variant="outline" size="sm" onClick={() => setEditingHistoria(!editingHistoria)}>
            <Edit2 className="w-4 h-4 mr-2" />
            {editingHistoria ? 'Cancelar' : 'Editar'}
          </Button>
        </div>
        
        {editingHistoria ? (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={historiaForm.title}
                onChange={(e) => setHistoriaForm({...historiaForm, title: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Cita</Label>
              <Textarea
                value={historiaForm.quote}
                onChange={(e) => setHistoriaForm({...historiaForm, quote: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Párrafos (uno por línea)</Label>
              <Textarea
                value={historiaForm.paragraphs.join('\n')}
                onChange={(e) => setHistoriaForm({...historiaForm, paragraphs: e.target.value.split('\n').filter(p => p.trim())})}
                className="rounded-xl"
                rows={5}
              />
            </div>
            <div>
              <Label>Imagen (URL)</Label>
              <Input
                value={historiaForm.image}
                onChange={(e) => setHistoriaForm({...historiaForm, image: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <Button onClick={saveHistoria} className="bg-moss hover:bg-moss-dark text-white">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <p><span className="text-charcoal/60">Título:</span> {config.historia.title}</p>
            <p><span className="text-charcoal/60">Cita:</span> {config.historia.quote}</p>
            <p><span className="text-charcoal/60">Imagen:</span> {config.historia.image}</p>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-cream-dark rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-outfit font-semibold text-charcoal flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Información de Contacto
          </h3>
          <Button variant="outline" size="sm" onClick={() => setEditingContact(!editingContact)}>
            <Edit2 className="w-4 h-4 mr-2" />
            {editingContact ? 'Cancelar' : 'Editar'}
          </Button>
        </div>
        
        {editingContact ? (
          <div className="space-y-4">
            <div>
              <Label>Teléfono</Label>
              <Input
                value={contactForm.phone}
                onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Dirección</Label>
              <Input
                value={contactForm.address}
                onChange={(e) => setContactForm({...contactForm, address: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>URL Instagram</Label>
              <Input
                value={contactForm.instagram}
                onChange={(e) => setContactForm({...contactForm, instagram: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>URL WhatsApp</Label>
              <Input
                value={contactForm.whatsapp}
                onChange={(e) => setContactForm({...contactForm, whatsapp: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>URL Ubicación (Google Maps)</Label>
              <Input
                value={contactForm.locationUrl}
                onChange={(e) => setContactForm({...contactForm, locationUrl: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <Button onClick={saveContact} className="bg-moss hover:bg-moss-dark text-white">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <p><span className="text-charcoal/60">Teléfono:</span> {config.contact.phone}</p>
            <p><span className="text-charcoal/60">Email:</span> {config.contact.email}</p>
            <p><span className="text-charcoal/60">Instagram:</span> {config.contact.instagram}</p>
            <p><span className="text-charcoal/60">Ubicación:</span> {config.contact.locationUrl}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Tab de Barberos
function BarbersTab() {
  const config = useConfigStore();
  const [editingBarber, setEditingBarber] = useState<string | null>(null);
  const [showAddBarber, setShowAddBarber] = useState(false);
  const [barberForm, setBarberForm] = useState<Partial<BarberConfig>>({
    name: '',
    specialty: '',
    bio: '',
    image: '',
    isPremium: false,
    priceMultiplier: 1,
  });

  const handleSaveBarber = () => {
    if (editingBarber) {
      config.updateBarber(editingBarber, barberForm);
    } else {
      const newBarber: BarberConfig = {
        id: `barber-${Date.now()}`,
        name: barberForm.name || 'Nuevo Barbero',
        specialty: barberForm.specialty || '',
        bio: barberForm.bio || '',
        image: barberForm.image || '/images/haircut.jpg',
        isPremium: barberForm.isPremium || false,
        priceMultiplier: barberForm.priceMultiplier || 1,
      };
      config.addBarber(newBarber);
    }
    setEditingBarber(null);
    setShowAddBarber(false);
    setBarberForm({
      name: '',
      specialty: '',
      bio: '',
      image: '',
      isPremium: false,
      priceMultiplier: 1,
    });
  };

  const startEdit = (barber: BarberConfig) => {
    setEditingBarber(barber.id);
    setBarberForm(barber);
    setShowAddBarber(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar este barbero?')) {
      config.removeBarber(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-outfit font-semibold text-charcoal">Gestión de Barberos</h3>
        <Button 
          onClick={() => {
            setShowAddBarber(true);
            setEditingBarber(null);
            setBarberForm({
              name: '',
              specialty: '',
              bio: '',
              image: '',
              isPremium: false,
              priceMultiplier: 1,
            });
          }}
          className="bg-moss hover:bg-moss-dark text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Barbero
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddBarber && (
        <div className="bg-cream-dark rounded-xl p-4 space-y-4">
          <h4 className="font-outfit font-semibold text-charcoal">
            {editingBarber ? 'Editar Barbero' : 'Nuevo Barbero'}
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Nombre</Label>
              <Input
                value={barberForm.name}
                onChange={(e) => setBarberForm({...barberForm, name: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Imagen (URL)</Label>
              <Input
                value={barberForm.image}
                onChange={(e) => setBarberForm({...barberForm, image: e.target.value})}
                className="rounded-xl"
                placeholder="/images/bastard.jpg"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Especialidad</Label>
              <Input
                value={barberForm.specialty}
                onChange={(e) => setBarberForm({...barberForm, specialty: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Biografía</Label>
              <Textarea
                value={barberForm.bio}
                onChange={(e) => setBarberForm({...barberForm, bio: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Multiplicador de Precio</Label>
              <Input
                type="number"
                step="0.1"
                value={barberForm.priceMultiplier}
                onChange={(e) => setBarberForm({...barberForm, priceMultiplier: parseFloat(e.target.value)})}
                className="rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPremium"
                checked={barberForm.isPremium}
                onChange={(e) => setBarberForm({...barberForm, isPremium: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="isPremium">Servicio Premium</Label>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSaveBarber} className="bg-moss hover:bg-moss-dark text-white">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <Button variant="outline" onClick={() => setShowAddBarber(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Barbers List */}
      <div className="grid gap-4">
        {config.barbers.map((barber) => (
          <div key={barber.id} className="bg-cream-dark rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={barber.image} 
                alt={barber.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-outfit font-semibold text-charcoal">{barber.name}</p>
                  {barber.isPremium && (
                    <span className="bg-clay text-white text-xs px-2 py-0.5 rounded-full">PREMIUM</span>
                  )}
                </div>
                <p className="text-sm text-charcoal/60">{barber.specialty}</p>
                <p className="text-sm text-moss">{barber.priceMultiplier}x precio base</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => startEdit(barber)}>
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(barber.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tab de Servicios
function ServicesTab() {
  const config = useConfigStore();
  const [editingService, setEditingService] = useState<string | null>(null);
  const [showAddService, setShowAddService] = useState(false);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceConfig>>({
    name: '',
    price: 0,
    description: '',
    duration: 30,
    icon: 'Scissors',
  });

  const handleSaveService = () => {
    if (editingService) {
      config.updateService(editingService, serviceForm);
    } else {
      const newService: ServiceConfig = {
        id: `service-${Date.now()}`,
        name: serviceForm.name || 'Nuevo Servicio',
        price: serviceForm.price || 0,
        description: serviceForm.description || '',
        duration: serviceForm.duration || 30,
        icon: serviceForm.icon || 'Scissors',
      };
      config.addService(newService);
    }
    setEditingService(null);
    setShowAddService(false);
    setServiceForm({
      name: '',
      price: 0,
      description: '',
      duration: 30,
      icon: 'Scissors',
    });
  };

  const startEdit = (service: ServiceConfig) => {
    setEditingService(service.id);
    setServiceForm(service);
    setShowAddService(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar este servicio?')) {
      config.removeService(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-outfit font-semibold text-charcoal">Gestión de Servicios</h3>
        <Button 
          onClick={() => {
            setShowAddService(true);
            setEditingService(null);
            setServiceForm({
              name: '',
              price: 0,
              description: '',
              duration: 30,
              icon: 'Scissors',
            });
          }}
          className="bg-moss hover:bg-moss-dark text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Servicio
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddService && (
        <div className="bg-cream-dark rounded-xl p-4 space-y-4">
          <h4 className="font-outfit font-semibold text-charcoal">
            {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Nombre</Label>
              <Input
                value={serviceForm.name}
                onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Precio ($)</Label>
              <Input
                type="number"
                value={serviceForm.price}
                onChange={(e) => setServiceForm({...serviceForm, price: parseInt(e.target.value)})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Duración (min)</Label>
              <Input
                type="number"
                value={serviceForm.duration}
                onChange={(e) => setServiceForm({...serviceForm, duration: parseInt(e.target.value)})}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Icono</Label>
              <Select 
                value={serviceForm.icon} 
                onValueChange={(v) => setServiceForm({...serviceForm, icon: v})}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scissors">Tijeras</SelectItem>
                  <SelectItem value="Sparkles">Brillo</SelectItem>
                  <SelectItem value="RefreshCw">Refresh</SelectItem>
                  <SelectItem value="TrendingUp">Trending</SelectItem>
                  <SelectItem value="User">Usuario</SelectItem>
                  <SelectItem value="Flame">Fuego</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label>Descripción</Label>
              <Textarea
                value={serviceForm.description}
                onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSaveService} className="bg-moss hover:bg-moss-dark text-white">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <Button variant="outline" onClick={() => setShowAddService(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="grid gap-4">
        {config.services.map((service) => (
          <div key={service.id} className="bg-cream-dark rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-moss/10 flex items-center justify-center">
                <Scissors className="w-6 h-6 text-moss" />
              </div>
              <div>
                <p className="font-outfit font-semibold text-charcoal">{service.name}</p>
                <p className="text-sm text-charcoal/60">{service.description}</p>
                <p className="text-sm text-moss">${service.price} • {service.duration} min</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => startEdit(service)}>
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tab de Seminarios
function SeminariosTab() {
  const config = useConfigStore();
  const [editingSeminario, setEditingSeminario] = useState<string | null>(null);
  const [showAddSeminario, setShowAddSeminario] = useState(false);
  const [seminarioForm, setSeminarioForm] = useState<Partial<SeminarioConfig>>({
    title: '',
    description: '',
    image: '',
    date: '',
    price: 0,
  });

  const handleSaveSeminario = () => {
    if (editingSeminario) {
      config.updateSeminario(editingSeminario, seminarioForm);
    } else {
      const newSeminario: SeminarioConfig = {
        id: `seminario-${Date.now()}`,
        title: seminarioForm.title || 'Nuevo Seminario',
        description: seminarioForm.description || '',
        image: seminarioForm.image || '/images/fadeseminario.jpg',
        date: seminarioForm.date,
        price: seminarioForm.price,
      };
      config.addSeminario(newSeminario);
    }
    setEditingSeminario(null);
    setShowAddSeminario(false);
    setSeminarioForm({
      title: '',
      description: '',
      image: '',
      date: '',
      price: 0,
    });
  };

  const startEdit = (seminario: SeminarioConfig) => {
    setEditingSeminario(seminario.id);
    setSeminarioForm(seminario);
    setShowAddSeminario(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar este seminario?')) {
      config.removeSeminario(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-outfit font-semibold text-charcoal">Gestión de Seminarios</h3>
        <Button 
          onClick={() => {
            setShowAddSeminario(true);
            setEditingSeminario(null);
            setSeminarioForm({
              title: '',
              description: '',
              image: '',
              date: '',
              price: 0,
            });
          }}
          className="bg-moss hover:bg-moss-dark text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Seminario
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddSeminario && (
        <div className="bg-cream-dark rounded-xl p-4 space-y-4">
          <h4 className="font-outfit font-semibold text-charcoal">
            {editingSeminario ? 'Editar Seminario' : 'Nuevo Seminario'}
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label>Título</Label>
              <Input
                value={seminarioForm.title}
                onChange={(e) => setSeminarioForm({...seminarioForm, title: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Imagen (URL)</Label>
              <Input
                value={seminarioForm.image}
                onChange={(e) => setSeminarioForm({...seminarioForm, image: e.target.value})}
                className="rounded-xl"
                placeholder="/images/fadeseminario.jpg"
              />
            </div>
            <div>
              <Label>Fecha</Label>
              <Input
                value={seminarioForm.date}
                onChange={(e) => setSeminarioForm({...seminarioForm, date: e.target.value})}
                className="rounded-xl"
                placeholder="Ej: 15 de Enero 2025"
              />
            </div>
            <div>
              <Label>Precio ($)</Label>
              <Input
                type="number"
                value={seminarioForm.price}
                onChange={(e) => setSeminarioForm({...seminarioForm, price: parseInt(e.target.value)})}
                className="rounded-xl"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Descripción</Label>
              <Textarea
                value={seminarioForm.description}
                onChange={(e) => setSeminarioForm({...seminarioForm, description: e.target.value})}
                className="rounded-xl"
                rows={3}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSaveSeminario} className="bg-moss hover:bg-moss-dark text-white">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <Button variant="outline" onClick={() => setShowAddSeminario(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Seminarios List */}
      <div className="grid gap-4">
        {config.seminarios.map((seminario) => (
          <div key={seminario.id} className="bg-cream-dark rounded-xl p-4 flex items-center gap-4">
            <img 
              src={seminario.image} 
              alt={seminario.title}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1">
              <p className="font-outfit font-semibold text-charcoal">{seminario.title}</p>
              <p className="text-sm text-charcoal/60 line-clamp-2">{seminario.description}</p>
              <div className="flex gap-3 mt-1">
                {seminario.date && <span className="text-xs text-charcoal/50">{seminario.date}</span>}
                {seminario.price && <span className="text-xs text-moss">${seminario.price} MXN</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => startEdit(seminario)}>
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(seminario.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tab de Tema/Colores
function ThemeTab() {
  const theme = useThemeStore();
  const [selectedPreset, setSelectedPreset] = useState<string>(theme.currentThemeName || 'default');
  
  // Estado local para edición de colores
  const [customColors, setCustomColors] = useState({
    moss: theme.moss,
    mossLight: theme.mossLight,
    mossDark: theme.mossDark,
    clay: theme.clay,
    clayLight: theme.clayLight,
    clayDark: theme.clayDark,
    cream: theme.cream,
    creamDark: theme.creamDark,
    charcoal: theme.charcoal,
    charcoalDark: theme.charcoalDark,
  });

  // Aplicar preset
  const handleApplyPreset = (presetName: string) => {
    setSelectedPreset(presetName);
    if (presetName in presetThemes) {
      theme.applyPreset(presetName as PresetThemeName);
    }
    const preset = presetThemes[presetName as PresetThemeName] || defaultColors;
    setCustomColors({
      moss: preset.moss,
      mossLight: preset.mossLight,
      mossDark: preset.mossDark,
      clay: preset.clay,
      clayLight: preset.clayLight,
      clayDark: preset.clayDark,
      cream: preset.cream,
      creamDark: preset.creamDark,
      charcoal: preset.charcoal,
      charcoalDark: preset.charcoalDark,
    });
  };

  // Actualizar color individual
  const handleColorChange = (key: keyof typeof customColors, value: string) => {
    setCustomColors(prev => ({ ...prev, [key]: value }));
    theme.updateColor(key, value);
    setSelectedPreset('custom');
  };

  // Resetear a default
  const handleReset = () => {
    theme.resetToDefault();
    setSelectedPreset('default');
    setCustomColors({
      moss: defaultColors.moss,
      mossLight: defaultColors.mossLight,
      mossDark: defaultColors.mossDark,
      clay: defaultColors.clay,
      clayLight: defaultColors.clayLight,
      clayDark: defaultColors.clayDark,
      cream: defaultColors.cream,
      creamDark: defaultColors.creamDark,
      charcoal: defaultColors.charcoal,
      charcoalDark: defaultColors.charcoalDark,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-outfit font-semibold text-charcoal flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Personalizar Colores
        </h3>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Restaurar Default
        </Button>
      </div>

      {/* Presets */}
      <div className="bg-cream-dark rounded-xl p-4">
        <h4 className="font-outfit font-medium text-charcoal mb-4">Temas Predefinidos</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {(Object.keys(presetThemes) as PresetThemeName[]).map((presetName) => (
            <button
              key={presetName}
              onClick={() => handleApplyPreset(presetName)}
              className={`p-3 rounded-xl border-2 transition-all ${
                selectedPreset === presetName 
                  ? 'border-moss bg-moss/10' 
                  : 'border-charcoal/10 hover:border-moss/50'
              }`}
            >
              <div className="flex justify-center gap-1 mb-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: presetThemes[presetName].moss }}
                />
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: presetThemes[presetName].clay }}
                />
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: presetThemes[presetName].cream }}
                />
              </div>
              <p className="text-xs font-medium text-char capitalize">
                {presetName === 'default' ? 'Default' : 
                 presetName === 'dark' ? 'Oscuro' :
                 presetName === 'warm' ? 'Cálido' :
                 presetName === 'navy' ? 'Azul Marino' :
                 presetName === 'vintage' ? 'Vintage' : presetName}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Color Editor */}
      <div className="bg-cream-dark rounded-xl p-4">
        <h4 className="font-outfit font-medium text-charcoal mb-4">Colores Personalizados</h4>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Color Primario (Moss) */}
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-charcoal/70">Color Primario (Moss)</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.moss}
                  onChange={(e) => handleColorChange('moss', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <div className="flex-1">
                  <Label className="text-xs">Principal</Label>
                  <Input
                    value={customColors.moss}
                    onChange={(e) => handleColorChange('moss', e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.mossLight}
                  onChange={(e) => handleColorChange('mossLight', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <div className="flex-1">
                  <Label className="text-xs">Claro</Label>
                  <Input
                    value={customColors.mossLight}
                    onChange={(e) => handleColorChange('mossLight', e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.mossDark}
                  onChange={(e) => handleColorChange('mossDark', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <div className="flex-1">
                  <Label className="text-xs">Oscuro</Label>
                  <Input
                    value={customColors.mossDark}
                    onChange={(e) => handleColorChange('mossDark', e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Color de Acento (Clay) */}
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-charcoal/70">Color de Acento (Clay)</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.clay}
                  onChange={(e) => handleColorChange('clay', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <div className="flex-1">
                  <Label className="text-xs">Principal</Label>
                  <Input
                    value={customColors.clay}
                    onChange={(e) => handleColorChange('clay', e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.clayLight}
                  onChange={(e) => handleColorChange('clayLight', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <div className="flex-1">
                  <Label className="text-xs">Claro</Label>
                  <Input
                    value={customColors.clayLight}
                    onChange={(e) => handleColorChange('clayLight', e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.clayDark}
                  onChange={(e) => handleColorChange('clayDark', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <div className="flex-1">
                  <Label className="text-xs">Oscuro</Label>
                  <Input
                    value={customColors.clayDark}
                    onChange={(e) => handleColorChange('clayDark', e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fondos (Cream) */}
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-charcoal/70">Fondos (Cream)</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.cream}
                  onChange={(e) => handleColorChange('cream', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <div className="flex-1">
                  <Label className="text-xs">Principal</Label>
                  <Input
                    value={customColors.cream}
                    onChange={(e) => handleColorChange('cream', e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.creamDark}
                  onChange={(e) => handleColorChange('creamDark', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <div className="flex-1">
                  <Label className="text-xs">Oscuro</Label>
                  <Input
                    value={customColors.creamDark}
                    onChange={(e) => handleColorChange('creamDark', e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Textos (Charcoal) */}
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-charcoal/70">Textos (Charcoal)</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.charcoal}
                  onChange={(e) => handleColorChange('charcoal', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <div className="flex-1">
                  <Label className="text-xs">Principal</Label>
                  <Input
                    value={customColors.charcoal}
                    onChange={(e) => handleColorChange('charcoal', e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.charcoalDark}
                  onChange={(e) => handleColorChange('charcoalDark', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <div className="flex-1">
                  <Label className="text-xs">Oscuro</Label>
                  <Input
                    value={customColors.charcoalDark}
                    onChange={(e) => handleColorChange('charcoalDark', e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-cream-dark rounded-xl p-4">
        <h4 className="font-outfit font-medium text-charcoal mb-4">Vista Previa</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="space-y-1">
            <div 
              className="h-16 rounded-xl flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: customColors.moss }}
            >
              Moss
            </div>
          </div>
          <div className="space-y-1">
            <div 
              className="h-16 rounded-xl flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: customColors.clay }}
            >
              Clay
            </div>
          </div>
          <div className="space-y-1">
            <div 
              className="h-16 rounded-xl flex items-center justify-center text-sm font-medium border"
              style={{ backgroundColor: customColors.cream, color: customColors.charcoal, borderColor: customColors.charcoal + '20' }}
            >
              Cream
            </div>
          </div>
          <div className="space-y-1">
            <div 
              className="h-16 rounded-xl flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: customColors.charcoal }}
            >
              Charcoal
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-charcoal/60 text-center">
        Los cambios se aplican inmediatamente. Recarga la página para ver todos los efectos.
      </p>
    </div>
  );
}

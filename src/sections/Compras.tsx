import { useState } from 'react';
import { useConfigStore } from '@/stores/configStore';
import type { ServiceConfig } from '@/stores/configStore';
import { 
  ShoppingCart, Check, Plus, Minus, Trash2, 
  Scissors, TrendingUp, Sparkles, Flame, RefreshCw, User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.ElementType> = {
  Scissors, TrendingUp, Sparkles, Flame, RefreshCw, User
};

interface CartItem extends ServiceConfig {
  quantity: number;
}

export default function Compras() {
  const { services } = useConfigStore();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (service: ServiceConfig) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (serviceId: string) => {
    setCart(prev => prev.filter(item => item.id !== serviceId));
  };

  const updateQuantity = (serviceId: string, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === serviceId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDuration = cart.reduce((sum, item) => sum + item.duration * item.quantity, 0);

  const scrollToAgenda = () => {
    const element = document.querySelector('#agenda');
    if (element) {
      const serviceIds = cart.map(item => item.id);
      sessionStorage.setItem('cartServices', JSON.stringify(serviceIds));
      sessionStorage.setItem('cartTotal', String(totalPrice));
      element.scrollIntoView({ behavior: 'smooth' });
      setShowCart(false);
    }
  };

  return (
    <section id="compras" className="relative w-full py-24 md:py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-#CE1126/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-#CE1126 text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Reserva
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Selecciona los servicios que deseas. Puedes elegir multiples opciones.
          </p>
        </div>

        {/* Floating Cart Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative w-16 h-16 bg-#CE1126 hover:bg-#CE1126-dark rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
          >
            <ShoppingCart className="w-7 h-7 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-#2D5A27 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Cart Panel */}
        {showCart && (
          <div className="fixed inset-0 z-40 flex justify-end">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowCart(false)} />
            <div className="relative w-full max-w-md bg-charcoal border-l border-white/10 h-full overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-outfit font-bold text-2xl text-white">Tu Reserva</h3>
                  <button onClick={() => setShowCart(false)} className="text-white/50 hover:text-white">
                    ✕
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40">Selecciona servicios para comenzar</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map(item => (
                        <div key={item.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-outfit font-semibold text-white text-sm">{item.name}</h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-white/30 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-white/50 text-xs mb-3">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-3 h-3 text-white" />
                              </button>
                              <span className="text-white font-semibold w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3 h-3 text-white" />
                              </button>
                            </div>
                            <span className="text-#CE1126 font-semibold">${item.price * item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/10 pt-4 mb-6">
                      <div className="flex justify-between text-white/60 text-sm mb-2">
                        <span>Duracion estimada</span>
                        <span>{totalDuration} min</span>
                      </div>
                      <div className="flex justify-between text-white font-bold text-lg">
                        <span>Total</span>
                        <span className="text-#CE1126">${totalPrice}</span>
                      </div>
                    </div>

                    <Button
                      onClick={scrollToAgenda}
                      className="w-full bg-#CE1126 hover:bg-#CE1126-dark text-white rounded-full py-6 font-semibold text-lg"
                    >
                      Agendar Cita
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Scissors;
            const inCart = cart.find(item => item.id === service.id);
            const cartQty = inCart?.quantity || 0;

            return (
              <div
                key={service.id}
                className="group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-#2D5A27/40 transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-#2D5A27/20 flex items-center justify-center mb-4 group-hover:bg-#2D5A27 group-hover:scale-110 transition-all duration-500">
                  <Icon className="w-6 h-6 text-#2D5A27 group-hover:text-white transition-colors" />
                </div>

                {/* Info */}
                <h3 className="font-outfit font-bold text-lg text-white mb-2">{service.name}</h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">{service.description}</p>

                {/* Price */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#CE1126] font-bold text-xl">${service.price}</span>
                  <span className="text-white/40 text-sm">{service.duration} min</span>
                </div>

                {/* Add to cart button */}
                {cartQty > 0 ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(service.id, -1)}
                      className="w-8 h-8 rounded-full bg-#2D5A27/30 hover:bg-#2D5A27/50 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4 text-white" />
                    </button>
                    <span className="text-white font-semibold w-6 text-center">{cartQty}</span>
                    <button
                      onClick={() => updateQuantity(service.id, 1)}
                      className="w-8 h-8 rounded-full bg-#2D5A27 hover:bg-#2D5A27-light flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => removeFromCart(service.id)}
                      className="ml-auto text-white/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Button
                    onClick={() => addToCart(service)}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-#2D5A27 hover:border-#2D5A27 hover:text-white rounded-full transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                )}

                {/* Selected indicator */}
                {cartQty > 0 && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-#CE1126 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

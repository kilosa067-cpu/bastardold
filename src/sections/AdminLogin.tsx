import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFirebaseConfigStore } from '@/stores/firebaseConfigStore';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useFirebaseConfigStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      onLogin();
    } else {
      setError(result.error || 'Error al iniciar sesión');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-moss" />
        </div>
        <h3 className="font-outfit font-bold text-xl text-charcoal mb-2">
          Acceso Administrativo
        </h3>
        <p className="text-charcoal/60 text-sm">
          Ingresa tus credenciales para acceder al panel de administración
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bastard.com"
              className="pl-10 rounded-xl"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 pr-10 rounded-xl"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-moss hover:bg-moss-dark text-white rounded-xl py-5"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </Button>
      </form>

      <p className="text-center text-xs text-charcoal/50">
        Panel de administración protegido por Firebase Auth
      </p>
    </div>
  );
}

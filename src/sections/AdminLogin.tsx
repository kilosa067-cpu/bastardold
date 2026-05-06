import { useState } from 'react';
import { LogIn, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulación de login
    setTimeout(() => {
      if (email === 'admin@bastard.com' && password === 'admin123') {
        // Success - no implementamos panel admin completo en esta versión
        alert('Panel de administración en construcción');
      } else {
        setError('Credenciales incorrectas');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#2D5A27]/10 shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2D5A27]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-[#2D5A27]" />
          </div>
          <h1 className="font-outfit font-bold text-2xl text-[#2D5A27]">Panel de Administración</h1>
          <p className="text-[#333]/50 text-sm mt-1">Bastard Old School</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[#333]/70 text-sm mb-1 block">Correo electrónico</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bastard.com"
              className="border-[#2D5A27]/20 text-[#333] rounded-xl"
            />
          </div>
          <div>
            <label className="text-[#333]/70 text-sm mb-1 block">Contraseña</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border-[#2D5A27]/20 text-[#333] rounded-xl pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#333]/40"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-[#CE1126]/10 border border-[#CE1126]/20 rounded-xl p-3 text-[#CE1126] text-sm text-center">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-xl py-5 font-semibold disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 animate-pulse" /> Verificando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" /> Iniciar sesión
              </span>
            )}
          </Button>
        </form>

        <p className="text-center text-[#333]/40 text-xs mt-6">
          Acceso exclusivo para personal autorizado
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '@/stores/adminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Lock, LogOut, Clock, Newspaper, Video, CreditCard, Mail,
  Phone, Instagram, MessageCircle, MapPin, ChevronLeft, Eye, EyeOff,
  Plus, Trash2, Save, Check, AlertTriangle
} from 'lucide-react';

const DAYS: Record<string, string> = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miercoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sabado',
  sunday: 'Domingo',
};

type Tab = 'schedule' | 'news' | 'video' | 'paypal' | 'email' | 'contact';

export default function AdminPanel() {
  const navigate = useNavigate();
  const {
    isLoggedIn, login, logout,
    schedule, updateSchedule,
    news, addNews, updateNews, removeNews,
    heroVideoUrl, setHeroVideoUrl,
    paypalConfig, updatePaypalConfig,
    emailConfig, updateEmailConfig,
    contactInfo, updateContactInfo,
  } = useAdminStore();

  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('schedule');
  const [saved, setSaved] = useState(false);

  // New news form
  const [newNews, setNewNews] = useState({ title: '', excerpt: '', url: '', source: '', date: '', image: '' });

  const handleLogin = () => {
    if (login(password)) {
      setError('');
    } else {
      setError('Contrasena incorrecta');
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl p-8 border border-[#2D5A27]/10 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#2D5A27]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#2D5A27]" />
            </div>
            <h1 className="font-outfit font-bold text-2xl text-[#2D5A27]">Panel de Administracion</h1>
            <p className="text-[#333]/50 text-sm mt-1">Bastard Old School</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Contrasena"
                className="border-[#2D5A27]/20 text-[#333] rounded-xl pr-10"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#333]/40">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="bg-[#CE1126]/10 border border-[#CE1126]/20 rounded-xl p-3 text-[#CE1126] text-sm text-center flex items-center gap-2 justify-center">
                <AlertTriangle className="w-4 h-4" /> {error}
              </div>
            )}

            <Button onClick={handleLogin} className="w-full bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-xl py-5 font-semibold">
              <Lock className="w-4 h-4 mr-2" /> Entrar
            </Button>
          </div>

          <button onClick={() => navigate('/')} className="w-full text-center text-[#2D5A27] text-sm mt-6 hover:underline flex items-center justify-center gap-1">
            <ChevronLeft className="w-4 h-4" /> Volver al sitio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Top Bar */}
      <header className="bg-white border-b border-[#2D5A27]/10 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img src="/images/logo-nuevo.jpeg" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-outfit font-bold text-[#2D5A27]">Panel Admin</span>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-[#2D5A27] text-sm flex items-center gap-1">
                <Check className="w-4 h-4" /> Guardado
              </span>
            )}
            <Button variant="outline" size="sm" onClick={() => navigate('/')} className="rounded-full text-[#2D5A27] border-[#2D5A27]/20">
              <ChevronLeft className="w-4 h-4 mr-1" /> Ver sitio
            </Button>
            <Button variant="outline" size="sm" onClick={logout} className="rounded-full text-[#CE1126] border-[#CE1126]/20 hover:bg-[#CE1126]/5">
              <LogOut className="w-4 h-4 mr-1" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 sticky top-14 h-[calc(100vh-3.5rem)] bg-white border-r border-[#2D5A27]/10 p-4 overflow-y-auto">
          <nav className="space-y-1">
            {[
              { key: 'schedule' as Tab, label: 'Horarios', icon: Clock },
              { key: 'news' as Tab, label: 'Noticias', icon: Newspaper },
              { key: 'video' as Tab, label: 'Video Fondo', icon: Video },
              { key: 'paypal' as Tab, label: 'PayPal', icon: CreditCard },
              { key: 'email' as Tab, label: 'Correo', icon: Mail },
              { key: 'contact' as Tab, label: 'Contacto', icon: Phone },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#2D5A27] text-white'
                    : 'text-[#333]/70 hover:bg-[#2D5A27]/10 hover:text-[#2D5A27]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8">
          {/* SCHEDULE TAB */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-outfit font-bold text-2xl text-[#2D5A27] mb-1">Horarios de la Barberia</h2>
                <p className="text-[#333]/50 text-sm">Configura los horarios de apertura y cierre por dia.</p>
              </div>

              <div className="bg-white rounded-2xl border border-[#2D5A27]/10 overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 bg-[#FAFAFA] text-xs font-semibold text-[#333]/50 uppercase">
                  <span className="col-span-1">Dia</span>
                  <span>Abierto</span>
                  <span>Apertura</span>
                  <span>Cierre</span>
                  <span></span>
                </div>
                {Object.entries(DAYS).map(([key, label]) => {
                  const day = schedule[key as keyof typeof schedule];
                  return (
                    <div key={key} className="grid grid-cols-5 gap-4 p-4 border-t border-[#2D5A27]/5 items-center">
                      <span className="font-medium text-[#2D5A27]">{label}</span>
                      <Switch
                        checked={day.isOpen}
                        onCheckedChange={(v) => { updateSchedule(key, 'isOpen', v); handleSave(); }}
                      />
                      <Input
                        type="time"
                        value={day.open}
                        disabled={!day.isOpen}
                        onChange={(e) => { updateSchedule(key, 'open', e.target.value); handleSave(); }}
                        className="text-sm"
                      />
                      <Input
                        type="time"
                        value={day.close}
                        disabled={!day.isOpen}
                        onChange={(e) => { updateSchedule(key, 'close', e.target.value); handleSave(); }}
                        className="text-sm"
                      />
                      <span className={`text-xs font-medium ${day.isOpen ? 'text-[#2D5A27]' : 'text-[#333]/30'}`}>
                        {day.isOpen ? 'Abierto' : 'Cerrado'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* NEWS TAB */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-outfit font-bold text-2xl text-[#2D5A27] mb-1">Noticias y Prensa</h2>
                <p className="text-[#333]/50 text-sm">Agrega, edita o elimina noticias que aparecen en la pagina.</p>
              </div>

              {/* Add News */}
              <div className="bg-white rounded-2xl border border-[#2D5A27]/10 p-6 space-y-4">
                <h3 className="font-outfit font-semibold text-[#2D5A27] flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Agregar Noticia
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="Titulo" value={newNews.title} onChange={(e) => setNewNews({ ...newNews, title: e.target.value })} className="text-sm" />
                  <Input placeholder="Fuente (ej: NVI Noticias)" value={newNews.source} onChange={(e) => setNewNews({ ...newNews, source: e.target.value })} className="text-sm" />
                  <Input placeholder="URL del articulo" value={newNews.url} onChange={(e) => setNewNews({ ...newNews, url: e.target.value })} className="text-sm" />
                  <Input placeholder="Fecha (YYYY-MM-DD)" value={newNews.date} onChange={(e) => setNewNews({ ...newNews, date: e.target.value })} className="text-sm" />
                  <Input placeholder="URL de imagen (opcional)" value={newNews.image} onChange={(e) => setNewNews({ ...newNews, image: e.target.value })} className="text-sm sm:col-span-2" />
                  <Textarea placeholder="Resumen / excerpt" value={newNews.excerpt} onChange={(e) => setNewNews({ ...newNews, excerpt: e.target.value })} className="text-sm sm:col-span-2" />
                </div>
                <Button
                  onClick={() => {
                    if (newNews.title && newNews.url) {
                      addNews({ ...newNews, date: newNews.date || new Date().toISOString().split('T')[0] });
                      setNewNews({ title: '', excerpt: '', url: '', source: '', date: '', image: '' });
                      handleSave();
                    }
                  }}
                  className="bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-full"
                >
                  <Plus className="w-4 h-4 mr-1" /> Agregar Noticia
                </Button>
              </div>

              {/* News List */}
              <div className="space-y-3">
                {news.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-[#2D5A27]/10 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <Input
                          value={item.title}
                          onChange={(e) => { updateNews(item.id, { title: e.target.value }); handleSave(); }}
                          className="font-semibold text-[#2D5A27] border-transparent hover:border-[#2D5A27]/20"
                        />
                        <Textarea
                          value={item.excerpt}
                          onChange={(e) => { updateNews(item.id, { excerpt: e.target.value }); handleSave(); }}
                          className="text-sm text-[#333]/60 border-transparent hover:border-[#2D5A27]/20"
                        />
                        <div className="flex gap-2">
                          <Input value={item.source} onChange={(e) => { updateNews(item.id, { source: e.target.value }); handleSave(); }} className="text-xs w-32" placeholder="Fuente" />
                          <Input value={item.url} onChange={(e) => { updateNews(item.id, { url: e.target.value }); handleSave(); }} className="text-xs flex-1" placeholder="URL" />
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => { removeNews(item.id); handleSave(); }} className="text-[#CE1126] hover:bg-[#CE1126]/10 shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIDEO TAB */}
          {activeTab === 'video' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-outfit font-bold text-2xl text-[#2D5A27] mb-1">Video de Fondo</h2>
                <p className="text-[#333]/50 text-sm">Cambia el video que aparece en la seccion principal (Hero).</p>
              </div>

              <div className="bg-white rounded-2xl border border-[#2D5A27]/10 p-6 space-y-4">
                <Label className="text-[#333]/70">URL del video</Label>
                <Input
                  value={heroVideoUrl}
                  onChange={(e) => setHeroVideoUrl(e.target.value)}
                  placeholder="/videos/hero-video.mp4 o URL externa"
                  className="text-sm"
                />
                <p className="text-xs text-[#333]/40">
                  Puedes usar una URL relativa (ej: /videos/mi-video.mp4) o una URL externa.
                </p>

                <div className="aspect-video bg-black rounded-xl overflow-hidden">
                  <video
                    src={heroVideoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>

                <Button onClick={handleSave} className="bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-full">
                  <Save className="w-4 h-4 mr-1" /> Guardar cambio de video
                </Button>
              </div>
            </div>
          )}

          {/* PAYPAL TAB */}
          {activeTab === 'paypal' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-outfit font-bold text-2xl text-[#2D5A27] mb-1">Configuracion de PayPal</h2>
                <p className="text-[#333]/50 text-sm">Configura tu cuenta de PayPal para recibir pagos.</p>
              </div>

              <div className="bg-white rounded-2xl border border-[#2D5A27]/10 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#2D5A27]">Habilitar PayPal</span>
                  <Switch
                    checked={paypalConfig.enabled}
                    onCheckedChange={(v) => { updatePaypalConfig({ enabled: v }); handleSave(); }}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#333]/70">PayPal Client ID</Label>
                  <Input
                    value={paypalConfig.clientId}
                    onChange={(e) => { updatePaypalConfig({ clientId: e.target.value }); handleSave(); }}
                    placeholder="Abre tu cuenta de PayPal Developer y copia el Client ID"
                    className="text-sm"
                  />
                </div>

                <div className="bg-[#FAFAFA] rounded-xl p-4 space-y-2 text-sm">
                  <p className="font-semibold text-[#2D5A27]">Como obtener tu Client ID:</p>
                  <ol className="list-decimal list-inside text-[#333]/60 space-y-1">
                    <li>Ve a <a href="https://developer.paypal.com" target="_blank" rel="noreferrer" className="text-[#2D5A27] underline">developer.paypal.com</a></li>
                    <li>Inicia sesion con tu cuenta de PayPal Business</li>
                    <li>Ve a "Apps & Credentials"</li>
                    <li>Crea una nueva app</li>
                    <li>Copia el "Client ID" y pegalo aqui</li>
                  </ol>
                </div>

                <div className="bg-[#CE1126]/5 border border-[#CE1126]/20 rounded-xl p-4">
                  <p className="text-[#CE1126] text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Estado: {paypalConfig.enabled && paypalConfig.clientId ? 'Configurado' : 'Pendiente de configuracion'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* EMAIL TAB */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-outfit font-bold text-2xl text-[#2D5A27] mb-1">Configuracion de Correo</h2>
                <p className="text-[#333]/50 text-sm">Configura el correo para recibir notificaciones de citas.</p>
              </div>

              <div className="bg-white rounded-2xl border border-[#2D5A27]/10 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#2D5A27]">Habilitar notificaciones por correo</span>
                  <Switch
                    checked={emailConfig.enabled}
                    onCheckedChange={(v) => { updateEmailConfig({ enabled: v }); handleSave(); }}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#333]/70">Servidor SMTP</Label>
                    <Input value={emailConfig.smtpHost} onChange={(e) => { updateEmailConfig({ smtpHost: e.target.value }); handleSave(); }} placeholder="smtp.gmail.com" className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#333]/70">Puerto SMTP</Label>
                    <Input value={emailConfig.smtpPort} onChange={(e) => { updateEmailConfig({ smtpPort: e.target.value }); handleSave(); }} placeholder="587" className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#333]/70">Usuario SMTP</Label>
                    <Input value={emailConfig.smtpUser} onChange={(e) => { updateEmailConfig({ smtpUser: e.target.value }); handleSave(); }} placeholder="jahzeelbarberclassic@gmail.com" className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#333]/70">Contrasena SMTP (App Password)</Label>
                    <Input type="password" value={emailConfig.smtpPass} onChange={(e) => { updateEmailConfig({ smtpPass: e.target.value }); handleSave(); }} placeholder="**** **** **** ****" className="text-sm" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-[#333]/70">Correo de notificacion (destinatario)</Label>
                    <Input value={emailConfig.notificationEmail} onChange={(e) => { updateEmailConfig({ notificationEmail: e.target.value }); handleSave(); }} placeholder="jahzeelbarberclassic@gmail.com" className="text-sm" />
                  </div>
                </div>

                <div className="bg-[#FAFAFA] rounded-xl p-4 space-y-2 text-sm">
                  <p className="font-semibold text-[#2D5A27]">Configuracion recomendada para Gmail:</p>
                  <ul className="text-[#333]/60 space-y-1">
                    <li>SMTP: smtp.gmail.com</li>
                    <li>Puerto: 587</li>
                    <li>Usuario: jahzeelbarberclassic@gmail.com</li>
                    <li>Contrasena: <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noreferrer" className="text-[#2D5A27] underline">Genera una App Password aqui</a></li>
                  </ul>
                </div>

                <div className="bg-[#CE1126]/5 border border-[#CE1126]/20 rounded-xl p-4">
                  <p className="text-[#CE1126] text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Estado: {emailConfig.enabled && emailConfig.smtpHost && emailConfig.smtpPass ? 'Configurado' : 'Pendiente de configuracion'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-outfit font-bold text-2xl text-[#2D5A27] mb-1">Informacion de Contacto</h2>
                <p className="text-[#333]/50 text-sm">Datos que aparecen en la pagina de contacto.</p>
              </div>

              <div className="bg-white rounded-2xl border border-[#2D5A27]/10 p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#333]/70 flex items-center gap-1"><Phone className="w-3 h-3" /> Telefono</Label>
                    <Input value={contactInfo.phone} onChange={(e) => { updateContactInfo({ phone: e.target.value }); handleSave(); }} className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#333]/70 flex items-center gap-1"><MessageCircle className="w-3 h-3" /> WhatsApp (solo numero)</Label>
                    <Input value={contactInfo.whatsapp} onChange={(e) => { updateContactInfo({ whatsapp: e.target.value }); handleSave(); }} className="text-sm" placeholder="529514222457" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#333]/70 flex items-center gap-1"><Instagram className="w-3 h-3" /> Instagram URL</Label>
                    <Input value={contactInfo.instagram} onChange={(e) => { updateContactInfo({ instagram: e.target.value }); handleSave(); }} className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#333]/70 flex items-center gap-1"><Mail className="w-3 h-3" /> Gmail</Label>
                    <Input value={contactInfo.gmail} onChange={(e) => { updateContactInfo({ gmail: e.target.value }); handleSave(); }} className="text-sm" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-[#333]/70 flex items-center gap-1"><MapPin className="w-3 h-3" /> Google Maps URL</Label>
                    <Input value={contactInfo.mapsUrl} onChange={(e) => { updateContactInfo({ mapsUrl: e.target.value }); handleSave(); }} className="text-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

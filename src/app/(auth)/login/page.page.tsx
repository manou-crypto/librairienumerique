'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Eye, EyeOff, Lock, Mail, AlertCircle, Shield } from 'lucide-react';

type Role = 'super_admin' | 'manager' | 'cashier';
interface UserCredentials { email: string; password: string; role: Role; name: string; }
const DEMO_USERS: UserCredentials[] = [
  { email: 'admin@librairie.dz', password: 'Admin@2026', role: 'super_admin', name: 'Ahmed Mansouri' },
  { email: 'manager@librairie.dz', password: 'Manager@2026', role: 'manager', name: 'Sara Benali' },
  { email: 'caissier@librairie.dz', password: 'Caisse@2026', role: 'cashier', name: 'Karim Hadj' },
];
const ROLE_LABELS: Record<Role, string> = { super_admin: 'Super Admin', manager: 'Gestionnaire', cashier: 'Caissier' };
const ROLE_REDIRECTS: Record<Role, string> = { super_admin: '/dashboard', manager: '/produits', cashier: '/caisse' };

function generateFakeJWT(user: UserCredentials): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ sub: user.email, name: user.name, role: user.role, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 86400 }));
  return `${header}.${btoa('signature_placeholder')}.${payload}`;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) { setError('Email ou mot de passe incorrect. Vérifiez vos identifiants.'); setLoading(false); return; }
    const token = generateFakeJWT(user);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('auth_token', token);
    storage.setItem('auth_user', JSON.stringify({ name: user.name, email: user.email, role: user.role }));
    setLoading(false);
    router.push(ROLE_REDIRECTS[user.role]);
  };

  const fillDemo = (user: UserCredentials) => { setEmail(user.email); setPassword(user.password); setError(''); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary shadow-lg mb-4"><BookOpen size={28} className="text-white" /></div>
          <h1 className="text-2xl font-bold text-foreground">LibrairieNumerique</h1>
          <p className="text-sm text-muted-foreground mt-1">Espace de gestion interne</p>
        </div>
        <div className="card-base p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6"><Shield size={18} className="text-primary" /><h2 className="text-base font-bold text-foreground">Connexion sécurisée</h2></div>
          {error && (<div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-lg p-3 mb-5 fade-in"><AlertCircle size={16} className="text-negative shrink-0 mt-0.5" /><p className="text-xs text-negative font-medium">{error}</p></div>)}
          <form onSubmit={handleLogin} className="space-y-4">
            <div><label className="block text-xs font-semibold text-foreground mb-1.5">Adresse email</label><div className="relative"><Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" required className="input-field pl-9" autoComplete="email" /></div></div>
            <div><label className="block text-xs font-semibold text-foreground mb-1.5">Mot de passe</label><div className="relative"><Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="input-field pl-9 pr-10" autoComplete="current-password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button></div></div>
            <div className="flex items-center justify-between"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" /><span className="text-xs text-muted-foreground">Se souvenir de moi</span></label><button type="button" className="text-xs text-primary hover:underline">Mot de passe oublié ?</button></div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 flex items-center justify-center gap-2">{loading ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Connexion en cours...</>) : 'Se connecter'}</button>
          </form>
          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Accès rapide (démo)</p>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_USERS.map((user) => (<button key={user.role} onClick={() => fillDemo(user)} className="flex flex-col items-center gap-1 p-2.5 rounded-lg border border-border hover:border-primary hover:bg-blue-50 transition-all text-center group"><div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${user.role === 'super_admin' ? 'bg-primary/10 text-primary' : user.role === 'manager' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{user.name.split(' ').map(n => n[0]).join('')}</div><span className="text-[10px] font-semibold text-foreground leading-tight">{ROLE_LABELS[user.role]}</span></button>))}
            </div>
          </div>
        </div>
        <div className="mt-4 card-base p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Niveaux d'accès</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs"><span className="w-2 h-2 rounded-full bg-primary shrink-0" /><span className="font-semibold text-foreground">Super Admin</span><span className="text-muted-foreground">— Accès complet à toutes les fonctionnalités</span></div>
            <div className="flex items-center gap-2 text-xs"><span className="w-2 h-2 rounded-full bg-green-500 shrink-0" /><span className="font-semibold text-foreground">Gestionnaire</span><span className="text-muted-foreground">— Catalogue, stocks, achats, rapports</span></div>
            <div className="flex items-center gap-2 text-xs"><span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" /><span className="font-semibold text-foreground">Caissier</span><span className="text-muted-foreground">— Point de vente uniquement</span></div>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4"><a href="/catalogue" className="text-primary hover:underline">← Retour au catalogue public</a></p>
      </div>
    </div>
  );
}

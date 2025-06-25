"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Coffee, LogIn, Facebook, Mail, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // Demo login: any email/password accepted
    login({ name: 'Admin', email });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-400">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Coffee className="w-8 h-8 text-purple-700" />
            <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent tracking-tight">Nz Coffee</span>
          </div>
          <CardTitle className="text-xl font-bold text-purple-700">Welcome Back!</CardTitle>
          <p className="text-sm text-muted-foreground">Sign in to your admin dashboard</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="mt-1 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-800"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <Link href="/forgot-password" className="text-xs text-purple-600 hover:underline">Forgot password?</Link>
              </div>
            </div>
            {error && <div className="text-red-600 text-xs text-center">{error}</div>}
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-700 to-pink-500 text-white font-bold shadow-md hover:from-pink-500 hover:to-purple-700">
              <LogIn className="w-4 h-4 mr-2" /> Login
            </Button>
          </form>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gradient-to-r from-purple-300 to-pink-300" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-l from-purple-300 to-pink-300" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 border-purple-200 hover:bg-purple-50">
              <Facebook className="w-4 h-4 mr-2 text-blue-600" /> Facebook
            </Button>
            <Button variant="outline" className="flex-1 border-purple-200 hover:bg-purple-50">
              <Mail className="w-4 h-4 mr-2 text-rose-500" /> Google
            </Button>
          </div>
          <div className="text-center text-sm mt-2">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-purple-700 font-semibold hover:underline inline-flex items-center">
              <UserPlus className="w-4 h-4 mr-1" /> Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
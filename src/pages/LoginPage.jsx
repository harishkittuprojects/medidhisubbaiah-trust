import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from '../components/Icons.jsx';

const { useState } = React;

export const LoginPage = () => {
  const { loginAdmin, navigate } = useTrust();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const res = loginAdmin(username, password, rememberMe);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setUsername('admin@medidhisubbaiah.org');
    setPassword('trust2026');
    setErrorMessage('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative" data-aos="zoom-in">
        
        {/* Header with emblem */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white mx-auto shadow-lg shadow-red-600/30">
            <span className="font-extrabold text-2xl">MT</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Administrator Portal
          </h2>
          <p className="text-xs text-slate-500">
            Authorized management access for Medidhisubbaiah Trust
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="bg-red-50/70 border border-red-200 rounded-xl p-3 text-xs text-slate-700 flex items-center justify-between">
          <div>
            <span className="font-bold text-red-700 block">Demo Administrator Access:</span>
            <span className="text-slate-500 font-mono text-[11px]">admin@medidhisubbaiah.org / trust2026</span>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md hover:bg-red-700 transition"
          >
            Auto Fill
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 animate-shake">
            <Icon name="x" size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email or Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="admin@medidhisubbaiah.org"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              />
              <div className="absolute left-3 top-3 text-slate-400">
                <Icon name="mail" size={16} />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert('For this demo portal, please use the password "trust2026".')}
                className="text-[11px] font-semibold text-red-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              />
              <div className="absolute left-3 top-3 text-slate-400">
                <Icon name="lock" size={16} />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'eyeoff' : 'eye'} size={16} />
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-slate-300 rounded cursor-pointer"
            />
            <label htmlFor="remember_me" className="ml-2 block text-xs text-slate-600 cursor-pointer">
              Remember me on this browser
            </label>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-red-600/30 transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Admin Hub</span>
                  <Icon name="arrowright" size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Back to Home */}
        <div className="text-center pt-2 border-t border-slate-100">
          <button
            onClick={() => navigate('home')}
            className="text-xs font-semibold text-slate-500 hover:text-red-600 transition"
          >
            ← Return to Medidhisubbaiah Trust Website
          </button>
        </div>

      </div>
    </div>
  );
};

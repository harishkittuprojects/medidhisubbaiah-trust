import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from '../components/Icons.jsx';

const { useState } = React;

export const LoginPage = () => {
  const { loginAdmin, requestPasswordReset, navigate } = useTrust();
  const [viewMode, setViewMode] = useState('login'); // 'login' | 'forgot'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('medidhisubbaiahtrustorg@gmail.com');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');
  const [sentToken, setSentToken] = useState('');

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
    }, 300);
  };

  const handleFillDemo = () => {
    setUsername('medidhisubbaiahtrustorg@gmail.com');
    setPassword('trust2026');
    setErrorMessage('');
  };

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setForgotMsg('');
    setIsLoading(true);

    try {
      const res = await requestPasswordReset(forgotEmail);
      if (res.success) {
        setForgotSuccess(true);
        setForgotMsg(res.message || `Reset email sent to ${forgotEmail}`);
        if (res.resetToken) setSentToken(res.resetToken);
      } else {
        setErrorMessage(res.error || 'Failed to send reset link.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred while sending reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative" data-aos="zoom-in">
        
        {/* Header with emblem */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-600/30">
            <span className="font-extrabold text-2xl">MT</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {viewMode === 'login' ? 'Administrator Portal' : 'Admin Password Recovery'}
          </h2>
          <p className="text-xs text-slate-500">
            {viewMode === 'login'
              ? 'Authorized management access for Medidhisubbaiah Trust'
              : 'Password reset instructions via Gmail SMTP'}
          </p>
        </div>

        {viewMode === 'login' ? (
          <>
            {/* Error Alert */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 animate-shake">
                <Icon name="x" size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email or Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="medidhisubbaiahtrustorg@gmail.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
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
                    onClick={() => {
                      setViewMode('forgot');
                      setErrorMessage('');
                      setForgotSuccess(false);
                    }}
                    className="text-[11px] font-bold text-emerald-600 hover:underline"
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
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
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

              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="remember_me" className="ml-2 block text-xs text-slate-600 cursor-pointer">
                  Remember me on this browser
                </label>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
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
          </>
        ) : (
          /* FORGOT PASSWORD VIEW */
          <div className="space-y-4">
            {!forgotSuccess ? (
              <>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 leading-relaxed">
                  Enter your registered administrator email address. We will send a secure password reset link to your email via Gmail SMTP.
                </div>

                {errorMessage && (
                  <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2">
                    <Icon name="x" size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSendResetEmail} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Administrator Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="medidhisubbaiahtrustorg@gmail.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <span>Sending Reset Email via SMTP...</span>
                    ) : (
                      <>
                        <Icon name="mail" size={16} />
                        <span>Send Password Reset Link</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="space-y-4 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="check" size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-slate-900">Reset Email Dispatched!</h3>
                  <p className="text-xs text-slate-600">
                    We sent password reset instructions to <strong className="text-emerald-700">{forgotEmail}</strong>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const param = sentToken ? `?token=${sentToken}&email=${encodeURIComponent(forgotEmail)}` : `?email=${encodeURIComponent(forgotEmail)}`;
                    navigate(`reset-password${param}`);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Proceed to Reset Password Page →
                </button>
              </div>
            )}

            <div className="text-center pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setViewMode('login');
                  setErrorMessage('');
                  setForgotSuccess(false);
                }}
                className="text-xs font-bold text-slate-500 hover:text-emerald-600 transition"
              >
                ← Back to Administrator Login
              </button>
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center pt-2 border-t border-slate-100">
          <button
            onClick={() => navigate('home')}
            className="text-xs font-semibold text-slate-500 hover:text-emerald-600 transition"
          >
            ← Return to Medidhisubbaiah Trust Website
          </button>
        </div>

      </div>
    </div>
  );
};

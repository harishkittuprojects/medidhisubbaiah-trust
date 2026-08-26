import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from '../components/Icons.jsx';

const { useState } = React;

export const ResetPasswordPage = () => {
  const { resetAdminPassword, trustInfo, navigate, showToast } = useTrust();

  const getParam = (param) => {
    const hash = window.location.hash || '';
    const search = window.location.search || '';
    const combined = hash + '&' + search;
    const match = combined.match(new RegExp('[?&]' + param + '=([^&#]*)'));
    return match ? decodeURIComponent(match[1]) : '';
  };

  const [token, setToken] = useState(() => getParam('token') || '');
  const [email, setEmail] = useState(() => getParam('email') || 'medidhisubbaiahtrustorg@gmail.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await resetAdminPassword(token, newPassword, email);
      if (res.success) {
        setIsSuccess(true);
        showToast('Password changed successfully! You can now log in.', 'success');
      } else {
        setErrorMessage(res.error || 'Failed to update password.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during password update.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative" data-aos="zoom-in">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-600/30">
            <Icon name="lock" size={24} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Set New Password
          </h2>
          <p className="text-xs text-slate-500">
            Enter and confirm your new administrator credentials
          </p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleReset} className="space-y-4">
            {errorMessage && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 animate-shake">
                <Icon name="x" size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Administrator Email
              </label>
              <input
                type="email"
                required
                readOnly
                value={email}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl bg-slate-100 text-slate-600 font-mono text-xs cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  <Icon name={showPassword ? 'eyeoff' : 'eye'} size={16} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <span>Updating Password...</span>
              ) : (
                <>
                  <Icon name="check" size={16} />
                  <span>Update & Set Password</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Icon name="check" size={28} />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-slate-900">Password Updated Successfully!</h3>
              <p className="text-xs text-slate-600">
                You can now log in to the administrator portal with your newly set password.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('login')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg transition text-xs flex items-center justify-center space-x-2"
            >
              <span>Proceed to Administrator Login</span>
              <Icon name="arrowright" size={14} />
            </button>
          </div>
        )}

        <div className="text-center pt-2 border-t border-slate-100">
          <button
            onClick={() => navigate('login')}
            className="text-xs font-semibold text-slate-500 hover:text-emerald-600 transition"
          >
            ← Return to Login
          </button>
        </div>

      </div>
    </div>
  );
};

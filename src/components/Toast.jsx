import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from './Icons.jsx';

export const Toast = () => {
  const { toast } = useTrust();

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-emerald-800 text-white border-emerald-600',
    info: 'bg-slate-900 text-white border-slate-700',
    error: 'bg-red-700 text-white border-red-500',
    warning: 'bg-amber-600 text-white border-amber-500'
  };

  const iconName = {
    success: 'check',
    info: 'award',
    error: 'x',
    warning: 'heartpulse'
  }[toast.type] || 'check';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-3.5 rounded-xl shadow-2xl border transition-all duration-300 animate-bounce-short bg-opacity-95 backdrop-blur-md text-sm font-medium">
      <div className={`p-1.5 rounded-full ${bgStyles[toast.type] || bgStyles.success} flex items-center justify-center`}>
        <Icon name={iconName} size={16} className="text-white" />
      </div>
      <span className="text-slate-800 dark:text-white font-medium drop-shadow-sm bg-white/90 px-3 py-1.5 rounded-lg border border-slate-200 shadow-md">
        {toast.message}
      </span>
    </div>
  );
};

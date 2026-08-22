import { TrustProvider } from './context/TrustContext.jsx';
import { App } from './App.jsx';

const { createRoot } = ReactDOM;

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <TrustProvider>
      <App />
    </TrustProvider>
  );
}

import ReactDOM from 'react-dom/client';
import App from './App';
import { RtlProvider } from './contexts/ThemeAndRtlProvider';
import './i18n';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <RtlProvider>
      <App />
    </RtlProvider>
  </>
);
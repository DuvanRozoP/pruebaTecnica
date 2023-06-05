import { createRoot } from 'react-dom/client';
import Router from '@routers/routes';
import './css/index.css';

createRoot(document.getElementById('root') as HTMLElement).render(<Router />);

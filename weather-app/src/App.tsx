import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import { WeatherProvider } from './contexts/WeatherContext';
import { ColorModeProvider } from './contexts/ThemeContext';
import './i18n'; 


function App() {

  return (
    <ColorModeProvider>
      <WeatherProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

        </BrowserRouter>
      </WeatherProvider>
    </ColorModeProvider>
  )
}

export default App

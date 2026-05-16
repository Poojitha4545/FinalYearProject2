import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home.page'
import DestinationsPage from './pages/Destination.page'
import DestinationDetailPage from './pages/Destinationdetail.page'
import SearchRouter from './pages/searchrouter';
import AboutPage from './pages/about.page'
import ContactUsPage from './pages/contactus.page'
import ExperiencesPage from './pages/experiencewall.page'
import LoginPage from './pages/loging.page'
import DashboardPage from './pages/dashboard.page'
import RegistrationPage from './pages/registration.page'
import UsersettingsPage from "./pages/usersettings.page";
import UserProfilePage from "./pages/userprofile.page";
import RoutePlanner from './pages/routeplanner.page'
import { store } from './lib/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from "react-router";
import { CurrencyProvider } from './context/CurrencyContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CurrencyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:id" element={<DestinationDetailPage />} />
            <Route path="/search" element={<SearchRouter />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegistrationPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<UsersettingsPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/route-planner" element={<RoutePlanner />} />
          </Routes>
        </BrowserRouter>
      </CurrencyProvider>
    </Provider>
  </StrictMode>,
)
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from './Components/landingPage/Index.jsx';
import Navbar from './Components/Navbar.jsx';
import Dashboard from './Components/Dashboard.jsx';
import SignUpPage from './Components/SignupPage.jsx';
import NotFound from './Components/NotFound.jsx';
import Login from './Components/LoginPage.jsx';
import FoodMenu from './Pages/FoodMenuPage.jsx';
import TourMainPage from './Pages/TourMainPage.jsx';
import Aboutus from './Pages/Aboutus.jsx';
import RoyalPage from './Pages/RoyalPage.jsx';
import TrainStatusPage from './Pages/TrainStatusPage.jsx';
import Footer from './Components/Footer.jsx';
import SearchTrains from './Components/landingPage/TrainSearchPage.jsx';
import VerifyEmailPage from './Pages/VerifyEmailPage.jsx';
import CheckEmailPage from './Pages/CheckEmailPage.jsx';
import ResetPasswordPage from './Pages/ResetPasswordPage.jsx';
import RoyalBookTicketPage from './Pages/RoyalBookTicketPage.jsx';
import BookTicketPage from './Pages/BookTicketPage.jsx';
import TourBookTicketPage from './Pages/TourBookTicketPage.jsx';
import ChangePassword from './Components/ChangePassword.jsx';
import Profile from './Services/Profile.jsx';
import ExecutiveChatPage from './Pages/ExecutiveChatPage.jsx';
import DocPage from './Pages/Doc.jsx';


const router = createBrowserRouter([
  { path: '/', element: <LandingPage/> },
  { path: '/search-trains', element: <SearchTrains/> },
  { path: 'book-ticket/:trainNumber', element: <BookTicketPage />},
  { path: '/dashboard', element: <><Navbar/><Dashboard /></> },
  { path: '/login', element: <Login/> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/food-menu', element: <><Navbar/><FoodMenu /><Footer/></> },
  { path: '/tours', element: <><Navbar/><TourMainPage /></> },
  { path: '/aboutus', element: <><Navbar/><Aboutus /><Footer/></> },
  { path: '/royal-journeys', element: <><Navbar/><RoyalPage /></> },
  { path: 'royal-booking/:trainId', element: <><Navbar/><RoyalBookTicketPage /><Footer /></>},
  { path: '/tour-booking/:packageId', element: <><Navbar /><TourBookTicketPage /><Footer /></>},
  { path: '/train-status', element: <><Navbar/><TrainStatusPage /><Footer/></> },
  { path: '/check-email' , element: <CheckEmailPage />},
  { path: '/verify-email/:verificationToken' , element:<VerifyEmailPage /> },
  { path: '/reset-password/:resetToken' , element: <ResetPasswordPage />},
  { path: '/change-password', element: <ChangePassword />},
  { path: '/profile', element: <Profile />},
  { path: '/executive-chat-demo', element: <ExecutiveChatPage />},
  { path: '/doc', element: <><Navbar /><DocPage /><Footer /></> },
  { path: '*', element: <NotFound /> }

]);

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
          <Toaster position="top-center" richColors />
          <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App

import { useNavigate } from "react-router-dom";
import Logo from '../assets/ErrorLogo.png'

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">
      <div className="text-center p-8">
        <div className="bg-gray-100 p-12 rounded-lg shadow-xl max-w-md w-full">
            
            {/* Corrected line: */}
            <img src={Logo} alt="Logo" className="h-32 w-auto mx-auto rounded-xl"/>
            
            {/* Icon or large text */}
            <h1 className="text-7xl font-black text-blue-400 mt-4 items-center">404</h1>
            
            {/* Message */}
            <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
            <p className="text-gray-600 mt-2">
              Oops! The page you're looking for doesn't seem to exist.
            </p>
            
            {/* Go Home Button */}
            <button
              onClick={() => navigate('/')}
              className="mt-8 px-6 py-3 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Go Back Home
            </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
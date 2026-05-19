import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Train,Ticket,Clock,HelpCircle,Armchair,User,Utensils,Bell,History,Search,
  ChevronRight,MapPin,Calendar,CreditCard,Settings,LogOut,TrendingUp,Users,DollarSign,Zap,
  Globe2,Crown } from "lucide-react";
import LogoutButton from "./LogoutButton";
import TrainServices from "../Services/TrainServices";
import FoodServices from "../Services/FoodServices";
import Profile from "../Services/Profile";
import Help from "../Services/Help";
import CoachSeating from "../Services/CoachSeating";
import TatkalBooking from "../Services/TatkalBooking";
import TourPackages from "../Services/TourPackages";
import PNRStatus from "../Services/pnrStatus";
import Royality from "../Services/Royality";
import TrainStatus from "../Services/TrainStatus";
import BookTickets from "../Services/BookTickets";
import TrainRoute from "../Services/TrainRoute";
import Notifications from "../Services/NotificationPanel";
import BookingHistory from "../Services/BookingHistory";
import SeatAvailability from "../Services/SeatAvailability";
import axios from "axios";
import { set } from "mongoose";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [ActiveUser, setActiveUser] = useState("176K"); // it should be real value from backend
  const [TotalSpent, setTotalSpent] = useState("₹26K"); // it should be real value from backend
  const [TotalBookings, setTotalBookings] = useState("24"); // it should be real value from backend

  const [activeSection, setActiveSection] = useState("overview");
  const [recentBookings, setRecentBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    if (location.state && location.state.section) {
      setActiveSection(location.state.section);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchUser = async () => {
      // Check if user is already in storage
      const storedUser = localStorage.getItem("user");
      if (storedUser) return;

      try {
        // Try fetching user from backend (relies on cookies)
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/current-user`,
          { withCredentials: true }
        );

        if (response.data.success) {
          const user = response.data.data;
          localStorage.setItem("user", JSON.stringify(user));
          // Dispatch event to update Navbar
          window.dispatchEvent(new Event("storage"));
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
         // If fetch fails (401), redirect to login
         navigate("/login");
      }
    };

    fetchUser();

    const fetchData = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/total-users`);
        setActiveUser(response.data.data.totalUsers);
      }
      catch(error){
        console.error("Error fetching total users:", error);
      }
    }

    fetchData();
  }, []);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    const fetchRecentBookings = async () => {
      try {
        setLoadingBookings(true);
        const token = localStorage.getItem('authToken') || 
                      localStorage.getItem('token') || 
                      localStorage.getItem('accessToken');
        
        if (!token) return;

        const response = await axios.get(`${API_BASE_URL}/bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
           const sortedBookings = (response.data.bookings || []).sort((a, b) => {
              return new Date(b.bookingDate || b.createdAt) - new Date(a.bookingDate || a.createdAt);
           }).slice(0, 5);

           const normalizedBookings = sortedBookings.map(b => ({
             id: b.pnr || b.id,
             train: `${b.trainNumber} ${b.trainName}`,
             from: b.from || b.fromStation,
             to: b.to || b.toStation,
             date: new Date(b.date || b.journeyDate).toLocaleDateString('en-IN'),
             status: b.bookingStatus || b.status || 'Pending'
           }));

           setRecentBookings(normalizedBookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchRecentBookings();
  }, []);

  const quickStats = [
    // {
    //   icon: Ticket,
    //   label: "Tickets Booked",
    //   value: TotalBookings,
    //   color: "bg-blue-500",
    // },
    {
      icon: Train,
      label: "Trains Available",
      value: "14k",
      color: "bg-green-500",
    }, //  we can think of dynamic value later
    {
      icon: Users,
      label: "Passengers",
      value: ActiveUser,
      color: "bg-purple-500",
    },
    // {
    //   icon: DollarSign,
    //   label: "Total Spent",
    //   value: TotalSpent,
    //   color: "bg-orange-500",
    // },
  ];



  const trainServices = [
    { name: "AC First Class", available: 45, total: 60, price: "₹2500" },
    { name: "AC 2-Tier", available: 78, total: 120, price: "₹1200" },
    { name: "AC 3-Tier", available: 156, total: 200, price: "₹800" },
    { name: "Sleeper", available: 234, total: 300, price: "₹400" },
  ];

  const menuItems = [
    { id: "overview", icon: TrendingUp, label: "Overview" },
    { id: "train-status", icon: Search, label: "Live Train Status" },
    { id: "book-tickets", icon: Ticket, label: "Book Tickets" },
    { id: "tatkal-booking", icon: Zap, label: "Tatkal Booking" },
    { id: "pnr-status", icon: Clock, label: "PNR Status" },
    { id: "seat-availability", icon: Armchair, label: "Seat Availability" },
    { id: "coach-seating", icon: Train, label: "Coach Seating" },
    { id: "train-route", icon: MapPin, label: "Train Route" },
    { id: "train-services", icon: Settings, label: "Train Services" },
    { id: "food-services", icon: Utensils, label: "Food Services" },
    { id: "tour-packages", icon: Globe2, label: "Tour Packages" },
    { id: "royality", icon: Crown, label: "Royality" },
    { id: "history", icon: History, label: "Booking History" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "help", icon: HelpCircle, label: "Help & Support" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#1C335C]">
              Dashboard Overview
            </h2>

            {/* Quick Stats */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-[#1C335C] mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-[#1C335C] mb-4">
                Recent Bookings
              </h3>
              {loadingBookings ? (
                 <p className="text-gray-500">Loading bookings...</p>
              ) : recentBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Ticket ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Train
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Route
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-[#008BD0]">
                          {booking.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {booking.train}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {booking.from} → {booking.to}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {booking.date}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === "Confirmed" || booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              ) : (
                <p className="text-gray-500">No recent bookings found.</p>
              )}
            </div>
          </div>
        );

      case "book-tickets":
        return <BookTickets />;

      case "tatkal-booking":
        return <TatkalBooking />;

      case "pnr-status":
        return <PNRStatus />;

      case "train-status":
        return <TrainStatus />;

      case "seat-availability":
        return (
          <SeatAvailability />
        );

      case "coach-seating":
        return <CoachSeating />;

      case "train-route":
        return <TrainRoute />;

      case "train-services":
        return <TrainServices />;
      case "food-services":
        return <FoodServices />;
      case "history":
        return <BookingHistory />;

      case "notifications":
        return <Notifications />;

      case "tour-packages":
        return <TourPackages />;

      case "royality":
        return <Royality />;

      case "help":
        return <Help />;

      case "profile":
        return <Profile />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                      activeSection === item.id
                        ? "bg-[#008BD0] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {activeSection === item.id && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </button>
                ))}
                <LogoutButton />
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

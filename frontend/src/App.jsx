import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import axios from 'axios'
import { userStore } from './context/userContext'
import toast from 'react-hot-toast'

const Landing = lazy(() => import('./pages/Landing'));
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));
const Events = lazy(() => import('./pages/attendee/Events'));
const EventDetails = lazy(() => import('./pages/attendee/EventDetails'));
const Seats = lazy(() => import('./pages/attendee/Seats'));
const MyBookings = lazy(() => import('./pages/attendee/Bookings'));
const Checkout = lazy(() => import('./pages/attendee/Checkout'));
const Dashboard = lazy(() => import('./pages/organizer/Dashboard'));
const DashboardHome = lazy(() => import('./pages/organizer/DashboardHome'));
const AddEvent = lazy(() => import('./pages/organizer/AddEvent'));
const ListShows = lazy(() => import('./pages/organizer/ListShows'));
const ListBookings = lazy(() => import('./pages/organizer/ListBookings'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ShowDetails = lazy(() => import('./pages/organizer/ShowDetails'));
const EditEvent = lazy(() => import('./pages/organizer/EditEvent'));
const AboutUs = lazy(() => import('./pages/AboutUs'));

axios.defaults.withCredentials = true;

const ProtectedOrganizerRoute = ({ children }) => {
  const isAuth = userStore((state) => state.isAuth);
  const user = userStore((state) => state.user);
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  if (user?.role !== 'Organizer') {
    toast.error("You have made an Attendee account");
    return <Navigate to="/" replace />;
  }
  return children;
};

const ProtectedAttendeeRoute = ({ children }) => {
  const isAuth = userStore((state) => state.isAuth);
  const user = userStore((state) => state.user);
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  if (user?.role !== 'Attendee') {
    toast.error("You have made an Attendee account");
    return <Navigate to="/" replace />;
  }
  return children;
};


const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-transparent">
    <div className="loader"></div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/sign-up" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/my-bookings" element={<ProtectedAttendeeRoute><MyBookings /></ProtectedAttendeeRoute>} />
          <Route path="/events/:id" element={<ProtectedAttendeeRoute><EventDetails/></ProtectedAttendeeRoute>} />
          <Route path="/seats/:id" element={<ProtectedAttendeeRoute><Seats/></ProtectedAttendeeRoute>} />
          <Route path="/checkout/:id" element={<ProtectedAttendeeRoute><Checkout/></ProtectedAttendeeRoute>} />
          <Route path="/organizer" element={<ProtectedOrganizerRoute><Dashboard /></ProtectedOrganizerRoute>}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="add-event" element={<AddEvent />} />
            <Route path="list-shows" element={<ListShows />} />
            <Route path="list-bookings" element={<ListBookings />} />
            <Route path="show/:id" element={<ShowDetails />} />
            <Route path="edit-event/:id" element={<EditEvent />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer/>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
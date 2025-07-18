import React from 'react';
import { Ticket, DollarSign, CalendarPlus, Users } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const DashboardHome = () => {

  const [stats, setstats] = useState({})
  const [events, setevents] = useState([]);
  const fetchStats = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/events/getOrganizerSummary`);
      setstats(res.data.counts || dummy )
    } catch (error) {
      console.log(error.res.data.message)
    }
  }
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/events/get-my-events`);
      setevents(res.data.events)
      console.log(res.data.events)
    } catch (error) {
      console.log(error.res.data.message)
    }
  }
  useEffect(() => {
    fetchStats();
    fetchEvents();
  },[])


  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-300">Dashboard Overview</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass p-6 rounded-lg shadow-xl flex flex-col items-center justify-center text-center border border-blue-400/20">
          <Ticket className="w-10 h-10 text-blue-400 mb-3" />
          <p className="text-3xl font-bold text-white">{stats.totalBookings}</p>
          <p className="text-blue-200">Total Bookings</p>
        </div>
        <div className="glass p-6 rounded-lg shadow-xl flex flex-col items-center justify-center text-center border border-blue-400/20">
          <DollarSign className="w-10 h-10 text-green-400 mb-3" />
          <p className="text-3xl font-bold text-white">₹{stats.totalRevenue}</p>
          <p className="text-blue-200">Total Revenue</p>
        </div>
        <div className="glass p-6 rounded-lg shadow-xl flex flex-col items-center justify-center text-center border border-blue-400/20">
          <CalendarPlus className="w-10 h-10 text-purple-400 mb-3" />
          <p className="text-3xl font-bold text-white">{stats.activeShows}</p>
          <p className="text-blue-200">Active Shows</p>
        </div>
        <div className="glass p-6 rounded-lg shadow-xl flex flex-col items-center justify-center text-center border border-blue-400/20">
          <Users className="w-10 h-10 text-yellow-400 mb-3" />
          <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
          <p className="text-blue-200">Total Users</p>
        </div>
      </div>

      {/* Events Section */}
      <h2 className="text-3xl font-bold mb-6 text-blue-300">Your Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="glass rounded-lg shadow-xl overflow-hidden border border-blue-400/20">
            <img src={event.banner} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
              <p className="text-blue-200 text-sm mb-1">
                {event.eventDateTime && event.eventDateTime.length > 0
                  ? `${new Date(event.eventDateTime[0]).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} • ${new Date(event.eventDateTime[0]).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}`
                  : 'N/A'}
              </p>
              <p className="text-blue-300 text-xs mb-4">{event.location}</p>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-blue-200">Bookings:</span>
                <span className="font-semibold text-white">{event.totalBookings}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-200">Revenue:</span>
                <span className="font-semibold text-white">₹{event.totalRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardHome; 
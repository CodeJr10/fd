"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    revenue: "",
    description: "",
  });

  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  // Update localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to add a new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    const { name, date, revenue, description } = formData;

    if (!name || !date || !revenue) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEvent = {
      id: Date.now(), // Use timestamp as a unique ID
      name,
      date,
      revenue: parseFloat(revenue),
      description,
    };

    setEvents((prev) => [...prev, newEvent]);

    // Clear the form
    setFormData({
      name: "",
      date: "",
      revenue: "",
      description: "",
    });
  };

  // Handle event removal
  const handleRemoveEvent = (id) => {
    if (confirm("Are you sure you want to remove this event?")) {
      setEvents((prev) => prev.filter((event) => event.id !== id));
    }
  };

  // Sort events into upcoming and past
  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastEvents = events
    .filter((event) => new Date(event.date) < new Date())
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Event Dashboard</h1>

      {/* Event Form */}
      <div className="max-w-md mx-auto mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>
        <form onSubmit={handleAddEvent}>
          <div className="mb-4">
            <label className="block text-gray-700">Event Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Event Date & Time *</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Revenue Generated (INR) *
            </label>
            <input
              type="number"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-brown-500 text-white py-2 rounded hover:bg-brown-600 transition duration-200"
          >
            Add Event
          </button>
        </form>
      </div>

      {/* Upcoming Events */}
      <div className="max-w-5xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Date & Time</th>
                <th className="py-2 px-4 border-b">Revenue (INR)</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents.map((event) => (
                <tr key={event.id} className="text-center">
                  <td className="py-2 px-4 border-b">{event.name}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(event.date).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {event.revenue.toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleRemoveEvent(event.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No upcoming events.</p>
        )}
      </div>

      {/* Past Events */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Past Events</h2>
        {pastEvents.length > 0 ? (
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Date & Time</th>
                <th className="py-2 px-4 border-b">Revenue (INR)</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pastEvents.map((event) => (
                <tr key={event.id} className="text-center">
                  <td className="py-2 px-4 border-b">{event.name}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(event.date).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {event.revenue.toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleRemoveEvent(event.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No past events.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

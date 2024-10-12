"use client";

import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [managers, setManagers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    description: "",
  });
  const [selectedManager, setSelectedManager] = useState(null); // For viewing manager details

  // Load managers from localStorage on component mount
  useEffect(() => {
    const storedManagers = JSON.parse(localStorage.getItem("managers")) || [];
    setManagers(storedManagers);
  }, []);

  // Update localStorage whenever managers change
  useEffect(() => {
    localStorage.setItem("managers", JSON.stringify(managers));
  }, [managers]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to add a new manager
  const handleAddManager = (e) => {
    e.preventDefault();
    const { name, email, phone, role, description } = formData;

    if (!name || !email || !phone || !role) {
      alert("Please fill in all required fields.");
      return;
    }

    const newManager = {
      id: Date.now(), // Use timestamp as a unique ID
      name,
      email,
      phone,
      role,
      description,
    };

    setManagers((prev) => [...prev, newManager]);

    // Clear the form
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      description: "",
    });
  };

  // Handle manager removal
  const handleRemoveManager = (id) => {
    if (confirm("Are you sure you want to remove this manager?")) {
      setManagers((prev) => prev.filter((manager) => manager.id !== id));
      if (selectedManager && selectedManager.id === id) {
        setSelectedManager(null); // Clear selected manager if it's removed
      }
    }
  };

  // Handle viewing manager details
  const handleViewManager = (manager) => {
    setSelectedManager(manager);
  };

  // Handle closing the manager details modal
  const handleCloseModal = () => {
    setSelectedManager(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Manager Dashboard</h1>

      {/* Manager Form */}
      <div className="max-w-md mx-auto mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Manager</h2>
        <form onSubmit={handleAddManager}>
          <div className="mb-4">
            <label className="block text-gray-700">Manager Name *</label>
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
            <label className="block text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role *</label>
            <input
              type="text"
              name="role"
              value={formData.role}
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
            Add Manager
          </button>
        </form>
      </div>

      {/* Managers List */}
      <div className="max-w-5xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold mb-4">Managers</h2>
        {managers.length > 0 ? (
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager) => (
                <tr key={manager.id} className="text-center">
                  <td className="py-2 px-4 border-b">{manager.name}</td>
                  <td className="py-2 px-4 border-b">{manager.email}</td>
                  <td className="py-2 px-4 border-b">{manager.phone}</td>
                  <td className="py-2 px-4 border-b">{manager.role}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleViewManager(manager)}
                      className="bg-brown-500 text-white px-3 py-1 rounded hover:bg-brown-600 transition duration-200 mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleRemoveManager(manager.id)}
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
          <p className="text-gray-600">
            No managers found. Add a manager to get started.
          </p>
        )}
      </div>

      {/* Manager Details Modal */}
      {selectedManager && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-2xl font-semibold mb-4">Manager Details</h3>
            <p>
              <strong>Name:</strong> {selectedManager.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedManager.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedManager.phone}
            </p>
            <p>
              <strong>Assign Role:</strong> {selectedManager.role}
            </p>
            {selectedManager.description && (
              <p>
                <strong>Description:</strong> {selectedManager.description}
              </p>
            )}
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

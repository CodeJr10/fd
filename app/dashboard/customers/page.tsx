"use client";

import { CalendarIcon, StarIcon, UserIcon } from "@heroicons/react/24/outline";

import { lusitana } from "@/app/ui/fonts";

const customers = [
  {
    id: 1,
    name: "Aaditya Malap",
    email: "aa@example.com",
    phone: "9234569890",
    interactions: [
      {
        eventName: "Supper Society",
        type: "Registered",
        date: "2024-05-01",
        popularity: 90,
      },
      {
        eventName: "Moonlit Munch",
        type: "Attended",
        date: "2024-07-15",
        popularity: 80,
      },
    ],
  },
  {
    id: 2,
    name: "Bhaweak",
    email: "b@example.com",
    phone: "987565321",
    interactions: [
      {
        eventName: "Sundown Supper",
        type: "Registered",
        date: "2024-03-10",
        popularity: 95,
      },
      {
        eventName: "The Feast Below",
        type: "Feedback",
        date: "2024-08-21",
        popularity: 85,
      },
    ],
  },
  {
    id: 2,
    name: "Karan",
    email: "k@example.com",
    phone: "8384938747",
    interactions: [
      {
        eventName: "The Flavor Lab",
        type: "Registered",
        date: "2024-03-10",
        popularity: 95,
      },
      {
        eventName: "Toast & Taste",
        type: "Feedback",
        date: "2024-08-21",
        popularity: 85,
      },
    ],
  },

  // Add more customer objects as needed
];

export default function CustomerList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className={`${lusitana.className} bg-white p-6 rounded-lg shadow-md w-full max-w-lg`}
        >
          <div className="flex items-center space-x-4 mb-6">
            <UserIcon className="h-16 w-16 text-gray-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {customer.name}
              </h2>
              <p className="text-gray-500">{customer.email}</p>
              <p className="text-gray-500">{customer.phone}</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Event Interactions
          </h3>
          <div className="space-y-4">
            {customer.interactions.map((interaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-800">
                    {interaction.eventName}
                  </span>
                  <span className="text-sm text-gray-500">
                    {interaction.type}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(interaction.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-800">
                      {interaction.popularity}%
                    </span>
                  </div>
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Customer Stats
            </h4>
            <div className="flex justify-between text-gray-600">
              <div>
                <p className="text-sm">Total Interactions</p>
                <p className="font-medium">{customer.interactions.length}</p>
              </div>
              <div>
                <p className="text-sm">Average Popularity</p>
                <p className="font-medium">
                  {(
                    customer.interactions.reduce(
                      (acc, curr) => acc + curr.popularity,
                      0
                    ) / customer.interactions.length
                  ).toFixed(1)}{" "}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

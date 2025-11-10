'use client';

import React, { useState, useEffect } from "react";

const BookingSection: React.FC<{ price: number }> = ({ price }) => {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [totalNights, setTotalNights] = useState<number>(0);

  // Calculate number of nights whenever dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = end.getTime() - start.getTime();

      // Prevent negative or invalid date selections
      const nights = diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
      setTotalNights(nights);
    } else {
      setTotalNights(0);
    }
  }, [checkIn, checkOut]);

  const totalPayment = totalNights * price;

  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800">${price}/night</h3>

      {/* Check-in */}
      <div className="mt-4">
        <label className="block text-gray-600 font-medium">Check-in</label>
        <input
          type="date"
          className="border rounded-md p-2 w-full mt-1 focus:ring focus:ring-green-300"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      {/* Check-out */}
      <div className="mt-4">
        <label className="block text-gray-600 font-medium">Check-out</label>
        <input
          type="date"
          className="border rounded-md p-2 w-full mt-1 focus:ring focus:ring-green-300"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          min={checkIn || undefined}
        />
      </div>

      {/* Total payment */}
      <div className="mt-4 text-gray-700">
        {totalNights > 0 ? (
          <p>
            Total payment:{" "}
            <strong>${totalPayment.toLocaleString()}</strong> ({totalNights}{" "}
            {totalNights === 1 ? "night" : "nights"})
          </p>
        ) : (
          <p>Select valid dates to see total payment</p>
        )}
      </div>

      {/* Button */}
      <button
        className="mt-4 block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 w-full rounded-lg font-semibold transition disabled:opacity-50"
        disabled={totalNights <= 0}
      >
        Reserve now
      </button>
    </div>
  );
};

export default BookingSection;

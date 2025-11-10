const BookingSection: React.FC<{ price: number }> = ({ price }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800">${price}/night</h3>

      {/* Check-in */}
      <div className="mt-4">
        <label className="block text-gray-600 font-medium">Check-in</label>
        <input type="date" className="border rounded-md p-2 w-full mt-1 focus:ring focus:ring-green-300" />
      </div>

      {/* Check-out */}
      <div className="mt-4">
        <label className="block text-gray-600 font-medium">Check-out</label>
        <input type="date" className="border rounded-md p-2 w-full mt-1 focus:ring focus:ring-green-300" />
      </div>

      {/* Total payment */}
      <div className="mt-4 text-gray-700">
        <p>
          Total payment: <strong>${price * 7}</strong> (7 nights)
        </p>
      </div>

      {/* Button */}
      <button className="mt-4 block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 w-full rounded-lg font-semibold transition">
        Reserve now
      </button>
    </div>
  );
};

export default BookingSection;

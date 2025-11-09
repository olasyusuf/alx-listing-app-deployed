import PropertyDetail from "@/components/property/PropertyDetail";
import BookingSection from "@/components/property/BookingSection";
import ReviewSection from "@/components/property/ReviewSection";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { PropertyProps } from "@/interfaces";

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        setError("Failed to load property details. Please try again later.");
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!property) return <p className="text-center mt-10 text-gray-500">Property not found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
      onClick={() => router.back()}
      className="text-blue-600 hover:underline mb-4"
    >
      ← Back to Listings
    </button>

      {/* Property Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column (Details + Reviews) */}
        <div className="lg:col-span-2">
          <PropertyDetail property={property} />

          {/* Reviews Section */}
          <ReviewSection propertyId={property.id} />
        </div>

        {/* Right column (Booking Section) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <BookingSection price={property.price_per_night} />
          </div>
        </div>
      </div>
    </div>
  );
}

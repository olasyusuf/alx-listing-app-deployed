import { useState, useEffect } from "react";
import axios from "axios";


const ReviewSection: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  type Review = {
    name: string;
    avatar: string;
    rating: number;
    comment: string;
  };
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        reviews.map((review, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 mb-4 flex flex-col md:flex-row md:items-start"
            >
          <img
            src={review.avatar}
            alt={review.name}
            className="w-14 h-14 rounded-full mr-4 mb-3 md:mb-0 object-cover"
          />
          <div>
            <p className="font-bold text-gray-800">{review.name}</p>
            <p className="text-yellow-500">{review.rating} ★</p>
            <p className="text-gray-700 mt-1">{review.comment}</p>
          </div>
        </div>
      ))
      )}
    </div>
  );
};

export default ReviewSection;

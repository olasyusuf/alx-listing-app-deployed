import React from "react";
import { PropertyProps } from "@/interfaces";

interface PropertyCardProps {
  property: PropertyProps;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Image */}
      <div className="h-56 w-full relative">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover"
        />
        {property.discount && (
          <span className="absolute top-6 left-3 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
            {property.discount}% OFF
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold">{property.title}</h3>
        <p className="text-sm text-gray-500">
          {property.location}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-semibold">
            ${property.price_per_night.toLocaleString()}
          </span>
          <span className="text-yellow-500 font-medium">⭐ {property.avg_rating}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

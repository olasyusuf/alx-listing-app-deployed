import { PropertyProps } from "@/interfaces";

const PropertyDetail: React.FC<{ property: PropertyProps }> = ({ property }) => {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{property?.title}</h1>

        <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-600">
          <span className="text-yellow-500 font-semibold">{property?.avg_rating} ★</span>
          <span>· {property?.location}</span>
        </div>

        {property?.discount && (
          <div className="mt-2 inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-md font-medium">
            {property.discount}
          </div>
        )}
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <img
          src={property.img_url}
          alt={property.title}
          className="w-full h-64 object-cover rounded-lg sm:col-span-2 md:col-span-3"
        />
        {property?.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${property.title}-${index}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Description</h2>
        <p className="text-gray-700 leading-relaxed">{property.description}</p>
      </div>

      {/* Amenities */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">What this place offers</h2>
        <ul className="flex flex-wrap gap-3">
          {property?.category.map((amenity, index) => (
            <li
              key={index}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md text-sm text-gray-800 transition"
            >
              {amenity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyDetail;

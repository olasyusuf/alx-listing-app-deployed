'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HERO_BACKGROUND } from "@/constants/images";
import { FILTERS } from "@/constants/filters";
import { PropertyProps } from "@/interfaces";
import Pill from "@/components/common/Pill";
import PropertyCard from "@/components/common/PropertyCard";
import axios from 'axios';


const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get<PropertyProps[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`);
        setProperties(response.data);
      } catch (error) {
        setError("Failed to load properties. Please try again later.");
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    // Display the error state
    return <div className="text-red-600 text-xl p-8 text-center border border-red-300 bg-red-50 rounded-lg">{error}</div>;
  }
  
  if (properties.length === 0) {
    return <p className="text-xl p-8 text-center text-gray-500">No properties found. Try checking your API connection!</p>;
  }
  
  // Filter properties based on selected pill
  const filteredProperties: PropertyProps[] = activeFilter
    ? properties.filter((property) =>
        property.category.includes(activeFilter)
      )
    : properties;

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${HERO_BACKGROUND})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find your favorite place here!
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto">
            The best prices for over 2 million properties worldwide.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-gray-50 py-6 px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {FILTERS.map((filter) => (
            <Pill
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() =>
                setActiveFilter(activeFilter === filter ? "" : filter)
              }
            />
          ))}
        </div>
      </section>

      {/* Listing Section */}
      <section className="py-10 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Available Properties
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProperties.map((property) => (
            <Link
              key={property.id}
              href={`/property/${property.id}`}
              className="block hover:scale-105 transition-transform duration-200"
            >
              <PropertyCard property={property} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;

"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { Cloud, CloudRain, CloudSnow, Sun, Wind } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import CityNames from "./lib/citynames.json";

type CityMapping = {
  [key: string]: CityData;
};

type CityData = {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
};

const conditions = ["sunny", "cloudy", "rainy", "partly-cloudy", "snowy"];

export default function WeatherApp() {
  // Mock data for saved cities with weather information
  const [cities, setCities] = useState<string[]>(["New York City", "London"]);
  const [dataCache, setDataCache] = useState<CityMapping>({
    "New York City": {
      temperature: 72,
      condition: "sunny",
      humidity: 45,
      windSpeed: 8,
    },
    London: {
      temperature: 62,
      condition: "cloudy",
      humidity: 78,
      windSpeed: 12,
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Update suggestions based on search query
  const updateSuggestions = (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const filtered = CityNames.filter(
      (city) =>
        city.toLowerCase().includes(query.toLowerCase()) &&
        !cities.includes(city),
    );
    setSuggestions(filtered.slice(0, 5));
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateSuggestions(value);
    setShowSuggestions(true);
  };

  // Add a city from suggestions
  const addCity = (cityName: string) => {
    // Check if city already exists
    if (cities.includes(cityName)) {
      return;
    }

    // Generate random weather data for the new city
    const newData = {
      temperature: Math.floor(Math.random() * 40) + 50, // Random temp between 50-90
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      humidity: Math.floor(Math.random() * 50) + 30, // Random humidity between 30-80
      windSpeed: Math.floor(Math.random() * 15) + 3, // Random wind between 3-18
    };

    setCities([...cities, cityName]);
    setDataCache({ ...dataCache, [cityName]: newData });
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);

    // Show the new city details in dialog
    setSelectedCity(cityName);
    setDialogOpen(false);
  };

  // Add a city from suggestions
  const removeCity = (cityName: string) => {
    setCities(cities.filter((city) => city !== cityName));
    setDialogOpen(false);
  };

  // Handle city selection
  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    setDialogOpen(true);
  };

  // Function to render the appropriate weather icon based on condition
  const renderWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case "partly-cloudy":
        return <Cloud className="h-8 w-8 text-gray-400" />;
      case "snowy":
        return <CloudSnow className="h-8 w-8 text-blue-300" />;
      default:
        return <Wind className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <main className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Weather Demo</h1>

      {/* Search Bar with Autocomplete */}
      <div className="mb-6 relative">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => updateSuggestions(searchQuery)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full"
        />

        {/* Autocomplete Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
            <ul className="py-1">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* City List */}
      <div className="border rounded-lg overflow-hidden">
        <ul>
          {cities.map((city, i) => (
            <li
              key={i}
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleCitySelect(city)}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  {renderWeatherIcon(dataCache[city].condition)}
                </div>
                <span className="font-medium">{city}</span>
              </div>
              <span className="text-lg font-semibold">
                {dataCache[city].temperature}°F
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* City Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedCity && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedCity}</DialogTitle>
            </DialogHeader>
            {/* TODO: Add dialog content */}
            {cities.includes(selectedCity) ? (
              <button
                onClick={() => removeCity(selectedCity)}
                type="button"
                className="rounded-md text-sm transition-colors bg-red-400 h-9 px-4 py-2 cursor-pointer hover:bg-red-500 text-white"
              >
                Remove City
              </button>
            ) : (
              <button
                onClick={() => addCity(selectedCity)}
                type="button"
                className="rounded-md text-sm transition-colors bg-blue-200 h-9 px-4 py-2 cursor-pointer hover:bg-blue-300"
              >
                Add City
              </button>
            )}
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}

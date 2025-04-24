"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import CityNames from "./lib/citynames_full.json";
import Loader from "./components/loader";
import Info, { renderWeatherIcon } from "./components/info";
import Error from "./components/error";
import { cn } from "./lib/utils";
import GitHub from "../public/github.svg";

type CityMapping = {
  [key: string]: CityData;
};

export type CityData = {
  temperature: number;
  description: string;
  forecast: { temperature: string; wind: string }[];
  wind: number;
};

export default function WeatherApp() {
  // Data handling state
  const [cities, setCities] = useState<string[]>([]);
  const [dataCache, setDataCache] = useState<CityMapping>({});

  // Search query state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Interface state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [errorState, setErrorState] = useState(false);

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

    setCities([...cities, cityName]);
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);

    // Show the new city details in dialog
    setSelectedCity(cityName);
    setDialogOpen(false);
  };

  // Add a city from suggestions
  const removeCity = (cityName: string) => {
    setDialogOpen(false);
    setCities(cities.filter((city) => city !== cityName));
  };

  // Handle city selection
  const handleCitySelect = (cityName: string) => {
    if (!dataCache[cityName]) {
      const selectedName = cityName;
      setLoadingState(true);
      setTimeout(() => {
        if (selectedCity === selectedName && loadingState === true) {
          // No timely response, so show error
          setErrorState(true);
          setLoadingState(false);
        }
      }, 5000);
      fetchData(cityName.split(",")[0]);
    }
    setSelectedCity(cityName);
    setDialogOpen(true);
  };

  const fetchData = async (cityName: string) => {
    fetch("https://goweather.xyz/weather/" + cityName)
      .then((resp) => resp.json())
      .then((jsonResp) => {
        setLoadingState(false);
        if (jsonResp.description) {
          setDataCache({ ...dataCache, [cityName]: jsonResp });
        } else {
          setErrorState(true);
        }
        console.log(jsonResp);
      });
  };

  // Reset error state on dialog change
  useEffect(() => {
    setErrorState(false);
  }, [dialogOpen]);

  return (
    <main className="relative container mx-auto p-8 max-w-4xl">
      <a
        href="https://github.com/webimpactuw/weather-demo"
        target="_blank"
        className="absolute right-8 size-12 cursor-pointer hover:bg-gray-200 rounded-full transition-colors"
      >
        <img src={GitHub} />
      </a>
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
          className="w-full !text-lg"
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
      <ul className="border-2 border-gray-200 rounded-lg overflow-hidden">
        {cities.map((city, i) => (
          <li
            key={i}
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleCitySelect(city)}
          >
            <div className="flex items-center gap-4">
              {renderWeatherIcon(dataCache[city].description)}
              <span className="font-medium">{city}</span>
            </div>
            <span className="text-lg font-semibold">
              {dataCache[city].temperature}
            </span>
          </li>
        ))}
      </ul>

      {/* Info when no cities are saved */}
      {cities.length === 0 && (
        <p className="p-4 text-gray-500 text-lg text-center">
          You have no cities saved.
        </p>
      )}

      {/* City Information Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedCity}</DialogTitle>
          </DialogHeader>
          {errorState ? (
            <Error />
          ) : loadingState ? (
            <Loader />
          ) : (
            <Info data={dataCache[selectedCity]} />
          )}
          <div />
          <button
            onClick={() => removeCity(selectedCity)}
            type="button"
            className={cn(
              "mx-auto w-fit rounded-md text-sm transition-colors bg-red-400 h-9 px-4 py-2 cursor-pointer hover:bg-red-500 text-white",
              errorState || loadingState || !cities.includes(selectedCity)
                ? "hidden"
                : "",
            )}
          >
            Remove
          </button>
          <button
            onClick={() => addCity(selectedCity)}
            type="button"
            className={cn(
              "mx-auto w-fit rounded-md text-sm transition-colors bg-blue-400 h-9 px-4 py-2 cursor-pointer hover:bg-blue-500 text-white",
              errorState || loadingState || cities.includes(selectedCity)
                ? "hidden"
                : "",
            )}
          >
            Save
          </button>
        </DialogContent>
      </Dialog>
    </main>
  );
}

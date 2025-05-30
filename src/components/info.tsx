import {
  Cloudy,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Wind,
  CircleHelp,
  Thermometer,
  Zap,
} from "lucide-react";

export type CityData = {
  temperature: string;
  description: string;
  forecast: { temperature: string; wind: string }[];
  wind: string;
};

// Function to render the appropriate weather icon based on condition
export const renderWeatherIcon = (condition: string) => {
  switch (condition) {
    case "Clear":
    case "Sunny":
      return <Sun className="h-8 w-8 text-yellow-500" />;
    case "Cloudy":
      return <Cloudy className="h-8 w-8 text-gray-500" />;
    case "Rainy":
    case "Light Rain":
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    case "Partly cloudy":
      return <CloudSun className="h-8 w-8 text-gray-400" />;
    case "Snowy":
      return <CloudSnow className="h-8 w-8 text-blue-300" />;
    case "Wind":
      return <Wind className="h-8 w-8 text-gray-500" />;
    case "Thunderstorm in Vicinity":
    case "Thunderstorm":
      return <Zap className="h-8 w-8 text-yellow-500" />;
    default:
      return <CircleHelp className="h-8 w-8 text-gray-500" />;
  }
};

export default function InfoCard({ data }: { data: CityData }) {
  if (!data) return;

  return (
    <>
      {/* TODO: Align child elements to center */}
      <div className="flex flex-col gap-4">
        {renderWeatherIcon(data.description)}
        {/* TODO: Set font weight to bold, text side to 3xl */}
        <p className="mt-2">{data.temperature}</p>
        <p className="text-lg text-gray-500 capitalize">{data.description}</p>
      </div>
      {/* TODO: Add padding 2, blue-50 background color, lg border radius */}
      <div className="w-fit flex items-center gap-2">
        {/* TODO: Add Wind weather icon */}
        <p className="text-gray-500">Wind:</p>
        {/* TODO: Set font weight to medium, text size to lg */}
        <p>{data.wind}</p>
      </div>
      {/* TODO: Set font weight to medium, text size to xl */}
      <h3>3 Day Forecast</h3>
      <div className="flex flex-col justify-between gap-4">
        {data.forecast.map((e, i) => {
          const day = new Date();
          day.setDate(day.getDate() + i + 1);
          return (
            <div key={i} className="flex items-center gap-2">
              <p className="text-gray-500 w-8">
                {day.toLocaleDateString("en-US", { weekday: "short" })}
              </p>
              <Thermometer className="h-6 w-6 text-gray-500" />
              <p className="font-medium">{e.temperature}</p>
              <Wind className="h-6 w-6 text-gray-500" />
              <p className="font-medium">{e.wind}</p>
            </div>
          );
        })}
        {data.forecast.length === 0 && <p>No forecast found!</p>}
      </div>
    </>
  );
}

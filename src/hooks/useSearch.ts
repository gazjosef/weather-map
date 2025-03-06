import { useState } from "react";

export const useSearch = () => {
  const [city, setCity] = useState("Sydney");
  const [countryCode, setCountryCode] = useState("AU");
  const [coordinates, setCoordinates] = useState<[number, number]>([
    -33.8688, 151.2093,
  ]);

  return {
    city,
    setCity,
    countryCode,
    setCountryCode,
    coordinates,
    setCoordinates,
  };
};

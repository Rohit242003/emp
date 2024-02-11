import { useState } from "react";
import axios from "axios";

export default function Temp() {
  const [userLocation, setUserLocation] = useState(null);
  const [msg, setMsg] = useState("");
  
  const getUserTemp = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a545abc9120eb877583e354cd31116c5&units=metric`;
          
          axios.get(url)
            .then(res => {
              setMsg(`Current Temperature: ${res.data.main.temp}°C`);
            })
            .catch(err => {
              console.error("Error fetching temperature:", err);
              setMsg("Error fetching temperature");
            });
        },
        (error) => {
          console.error('Error getting user location:', error);
          setMsg("Error getting user location");
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setMsg("Geolocation is not supported by this browser");
    }
  };

  return (
    <>
      <button onClick={getUserTemp}>Get User Temperature</button>
      <p>{msg}</p>
    </>
  );
}

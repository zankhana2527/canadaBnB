import { IWeatherInfo } from "@/types/weather";

class WeatherService {
  /**
   * @returns list of available rooms based on filters
   */
  async get(lat: number, long: number): Promise<IWeatherInfo> {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=52b3917b31b0715a26cdd16992005a7c`
    );

    const parsed = await result.json();
    return parsed;
  }
}

const Weather = new WeatherService();
export default Weather;

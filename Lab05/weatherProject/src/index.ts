import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));

type WeatherResp = {
  coord: { lon: number; lat: number };
  main: { temp: number };
  weather: { description: string; icon: string }[];
};

type PollutionResp = {
  list: {
    main: { aqi: number };
    components: { pm2_5: number; pm10: number };
  }[];
};

app.get("/api/weather", async (req: Request, res: Response) => {
  const city = (req.query.city as string) || "London";
  const appKey = process.env.OPENWEATHER_KEY;

  if (!appKey)
    return res.status(500).json({ message: "Missing OPENWEATHER_KEY" });

  try {
    const weatherUrl =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}` + `&appid=${appKey}&units=metric`;

    const wRes = await fetch(weatherUrl);
    const wData = (await wRes.json()) as WeatherResp;

    const lat = wData.coord.lat;
    const lon = wData.coord.lon;
    console.log(lat, lon);
    const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${appKey}`;

    const pRes = await fetch(pollutionUrl);
    const pData = (await pRes.json()) as PollutionResp;

    const desc = wData.weather?.[0]?.description ?? "No description";
    const icon = wData.weather?.[0]?.icon ?? "01d";

    res.json({
      city,
      temp: wData.main.temp,
      desc,
      iconUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      aqi: pData.list?.[0]?.main?.aqi ?? 0,
      pm25: pData.list?.[0]?.components?.pm2_5 ?? 0,
      pm10: pData.list?.[0]?.components?.pm10 ?? 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

app.listen(port, () => console.log(`http://localhost:${port}`));

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // 🔑 Replace with your key

function WeatherApp() {
  const [city, setCity] = React.useState("Hyderabad");
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState("");

  async function fetchWeather() {
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  }

  React.useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="container">
      <h1 className="title">🌤️ WeatherVista</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="weather-card">
          <h2>
            {data.name}, {data.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].main}
          />
          <h3>{Math.round(data.main.temp)}°C</h3>
          <p>{data.weather[0].description}</p>
          <div className="details">
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind: {data.wind.speed} m/s</p>
            <p>Pressure: {data.main.pressure} hPa</p>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WeatherApp />);

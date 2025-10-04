# 🌦️ Weather App (React + Vite) [Demo](https://weather-appnadin.netlify.app/).

A simple weather application built with **React**, **Vite**, and **Material UI**.  
It fetches real-time weather data from [WeatherAPI](https://www.weatherapi.com/).

---

## 🚀 Features
- Search for current weather by city name 🌍  
- Support for English & Persian (RTL) languages 🌐  
- Dark/Light mode theme 🎨  
- Responsive design for desktop and mobile 📱  

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aliahanch70/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   - Create a `.env` file in the root of the project.  
   - Get a free API key from [WeatherAPI](https://www.weatherapi.com/).  
   - Add the following line inside `.env`:  
     ```env
     VITE_WEATHER_API_KEY=your_api_key_here
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```

---

## 🛠️ Build for Production
```bash
npm run build
```

---

## 📂 Project Structure
```
src/
 ├── components/    # Reusable UI components
 ├── contexts/      # React Context for weather state
 ├── i18n/          # Translation files (English/Persian)
 ├── App.tsx        # Main App component
 └── main.tsx       # Entry point
```

---

## ⚡ Tech Stack
- [React](https://react.dev/)  
- [Vite](https://vitejs.dev/)  
- [Material UI](https://mui.com/)  
- [React i18next](https://react.i18next.com/)  
- [WeatherAPI](https://www.weatherapi.com/)  

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).  

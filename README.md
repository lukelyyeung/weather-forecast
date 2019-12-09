# Weather Forecast Web Application


## Introduction

Web app using api provided by [OpenWeatherMap](https://openweathermap.org/current) to provide 5 days and 3hourly weather forecast data

<hr/>

## 🚀 Getting Started


### 📲 Development

> ⚠️ Please use `Node v10.15` for below process
Using <strong>yarn</strong> to develop is recommended.

> Installation of dependencies
```bash
  yarn install
```

> Download country data for autocomplete
```bash
  yarn download:data
```

> Set up environment
Prepare a .env in root directory
```
  REACT_APP_WEATHER_API_KEY=<YOUR_OWN_API_KEY>
```

> Start development server
```bash
  yarn start
```

<hr/>

### 💻 Build

> ⚠️ Please use `Node v10.15` for build process
> ⚠️ You need to go through all steps on Development section first

```bash
  yarn build
```

> Serve your build file
```bash
  yarn global add serve
  serve -s build
```

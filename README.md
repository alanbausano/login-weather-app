## Project info
#### Front-end challenge of a weather app.

#### The app brings weather data from the OpenWeatherMap API, of a city of your choice, that you get through a search input and add it to the dashboard. The data is being refetched after 3 minutes and showing notifications in case the temperature of an added city is above 22°C.
#### Previously you must sign up and log in with a dummy username and password. The authentication is provided by Firebase, mocking a backend API.
#### The data is stored in the localStorage API and persists even after the browser is closed or reloaded. Some assets are precached aswell and the cities are being cached once fetched, allowing an offline usage. Once offline login or signup won't be possible because these requests are being made to Firebase.

## Front technologies
React - TypeScript - Context API

## Dependencies
AntDesign, styled-components, React Query, Axios.

## To run locally:
### Install dependencies with npm and run start command:
```
$ npm install
$ npm start
```

# MyTry-Frontend
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) 	![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white) 
<br/><br/>
[Backend](https://github.com/cherlesmd/MyTry) for this project

## Why?
Your out with friends after dinner but dont want the night to end. You look for places you have saved in your different socials you wanted to try but the long list isn't helping you see whats actually near you so you give up and everyone ends up home early.<br/><br/>
**Solution**: Consolidate all those places here and see what you have saved in your immediate vicinity and save the night out.<br/>
(*ignore that Google Maps already has this functionality*)<br/>
<img  src="/assets/try-dash.png" />

## Installatin & Usage
* Acquire Mapbox token and set as env variable <br/>
```bash
npm i
```
```bash
npm start
```
Change api call to your backend and all endpoints in api calls
```javascript
export const axiosInstance = axios.create({
  baseURL: "https://www.yourbackend.code",
  timeout: 20000,
  withCredentials: true,
});
```

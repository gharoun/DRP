import axios from "axios";

export const apiClient = axios.create({
  baseURL: " https://api.seatgeek.com/2",
  params: {
    client_id: "MzI3OTU1NjV8MTY4MDM4MzM5NS4xNzU3Nw",
    "venue.state": "KS",
    per_page: 100,
  },
});

export const apiHospitality = axios.create({
  baseURL: " https://travel-advisor.p.rapidapi.com/locations",
  params: {
    query: "Kansas",
    limit: "100",
    offset: "0",
    units: "mi",
    currency: "USD",
    sort: "relevance",
    lang: "en_US",
  },
  headers: {
    "X-RapidAPI-Key": "48fd9328cdmshb16441292acf001p173acfjsn7cb832539843",
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
});

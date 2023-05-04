import axios from "axios";

export const apiClient = axios.create({
  baseURL: " https://api.seatgeek.com/2",
  params: {
    client_id: "MzI3OTU1NjV8MTY4MDM4MzM5NS4xNzU3Nw",
    "venue.state": "KS",
    per_page: 100,
  },
});

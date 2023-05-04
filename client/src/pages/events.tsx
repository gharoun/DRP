import { useEffect, useState } from "react";
import { apiClient } from "services/api-client";
import EventsCard from "./EventsCard";
import { Box, Typography } from "@pankod/refine-mui";

export interface Events {
  id: number;
  title: string;
  url: string;
  datetime_local: string;
  performers: [{ name: string; image: string }];
  venue: {
    address: string;
    extended_address: string;
  };
}
const Events = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get("/events", { signal: controller.signal })
      .then((res) => {
        console.log(res.data);
        setData(res.data.events);
        console.log(data);
      })
      .catch(function (error) {
        console.error(error);
      });
    return () => controller.abort();
  }, []);
  return (
    <div>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {!data.length ? "There are no events" : "Upcoming events"}
      </Typography>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {data.map((event: Events) => (
          <EventsCard key={event.id} events={event} />
        ))}
      </Box>
    </div>
  );
};

export default Events;

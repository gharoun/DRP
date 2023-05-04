import { Events } from "./events";
import {
  Card,
  Stack,
  Typography,
  CardMedia,
  CardContent,
} from "@pankod/refine-mui";
import { Place } from "@mui/icons-material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
interface Props {
  events: Events;
}

const EventsCard = ({ events }: Props) => {
  return (
    <Card
      component="a"
      href={"/"}
      sx={{
        width: "300px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
        },
        cursor: "pointer",
      }}
    >
      <CardMedia
        component="img"
        image={events.performers[0].image}
        height={210}
        alt="card image"
        sx={{ borderRadius: "10px", padding: "5px" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",
          paddingX: "5px",
        }}
      >
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#11142d">
            {events.title}
          </Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <DateRangeIcon
              sx={{
                fontSize: 18,
                color: "#11142d",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={14} color="#808191">
              {events.datetime_local.split("T")[0]}
            </Typography>
          </Stack>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <AccessTimeIcon
              sx={{
                fontSize: 18,
                color: "#11142d",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={14} color="#808191">
              {events.datetime_local.split("T")[1]}
            </Typography>
          </Stack>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place
              sx={{
                fontSize: 18,
                color: "#11142d",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={14} color="#808191">
              {`${events.venue.address} ${events.venue.extended_address}`}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EventsCard;

import { Place } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@pankod/refine-mui";

import { PropertyCardProps } from "interfaces/property";

const PropertyCard = ({
  type,
  id,
  title,
  location,
  photo,
}: PropertyCardProps) => {
  const isProperty = type === "property";
  return (
    <Card
      component={isProperty ? Link : "a"}
      to={isProperty ? `/properties/show/${id}` : ""}
      href={!isProperty ? "https://www.facebook.com" : ""}
      target={!isProperty ? "_blank" : ""}
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
        height={210}
        image={photo}
        alt="card image"
        sx={{ borderRadius: "10px" }}
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
            {title}
          </Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place
              sx={{
                fontSize: 18,
                color: "#11142d",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={14} color="#808191">
              {location}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;

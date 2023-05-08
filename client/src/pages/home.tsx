import { useGetIdentity, useList } from "@pankod/refine-core";
import {
  Typography,
  Box,
  Stack,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
} from "@pankod/refine-mui";

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
} from "components";
import ExpectedClientApril from "components/charts/expectedClient_april";
import ExpectedClientJune from "components/charts/expectedClient_june";
import ExpectedClientMay from "components/charts/expectedClient_may";
import { useState } from "react";

const Home = () => {
  const [monthlySelect, setmonthlySelect] = useState("june");
  const { data: user } = useGetIdentity();

  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: {
      pagination: {
        pageSize: 1,
      },
    },
  });

  const latestProperties = data?.data ?? [];
  console.log(user);
  console.log(latestProperties[0]?.creator);
  if (user?.userid !== latestProperties[0]?.creator)
    return <h1>You Have to register a Property!</h1>;

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>
      <Typography marginTop={3} fontSize={25} fontWeight={700} color="#11142D">
        Event Name
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Full Capacity"
          value={1546}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Ticket Sold"
          value={550}
          series={[60, 40]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Expected Capacity"
          value={1250}
          series={[80, 20]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="last Event clients Attading"
          value={1100}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
      </Box>
      <Typography marginTop={3} fontSize={25} fontWeight={700} color="#11142D">
        Property details
      </Typography>
      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>

      <Stack direction="row" gap={4}>
        <FormControl sx={{ flex: 1 }}>
          <FormHelperText
            sx={{
              fontWeight: 500,
              margin: "10px 0",
              fontSize: 16,
              color: "#11142d",
            }}
          >
            Select Previews Data by Month
          </FormHelperText>
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue="June"
            onChange={(e) => setmonthlySelect(e.target.value)}
          >
            <MenuItem value="april">April</MenuItem>
            <MenuItem value="may">May</MenuItem>
            <MenuItem value="june">June</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Box marginTop={3}>
        {monthlySelect === "april" && <ExpectedClientApril />}
        {monthlySelect === "may" && <ExpectedClientMay />}
        {monthlySelect === "june" && <ExpectedClientJune />}
      </Box>

      <Box
        flex={1}
        borderRadius="1px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Latest Properties
        </Typography>

        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {latestProperties.map((property) => (
            <PropertyCard
              type="property"
              key={property._id}
              id={property._id}
              title={property.title}
              location={property.location}
              photo={property.photo}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

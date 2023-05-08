import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@pankod/refine-mui";
import { ArrowCircleUpRounded } from "@mui/icons-material";

import {
  aprilTotalClient,
  aprilTotalClientOptions,
} from "./expected_april_config";

const ExpectedClientApril = () => {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        April Clients
      </Typography>

      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize={28} fontWeight={700} color="#11142d"></Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: 25, color: "#475be8" }} />
          <Stack>
            <Typography fontSize={15} color="#475be8">
              1.9%
            </Typography>
            <Typography fontSize={12} color="#808191">
              Than Last Year
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ReactApexChart
        series={aprilTotalClient}
        type="line"
        height={310}
        options={aprilTotalClientOptions}
      />
    </Box>
  );
};

export default ExpectedClientApril;

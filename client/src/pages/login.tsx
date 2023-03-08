import { Box, Container, Typography, Divider } from "@mui/material";
import { yariga } from "../assets";
import { GoogleButton } from "utils/google-loging";
import LoginForm from "./../components/login/LoginForm";

export const Login: React.FC = () => {
  return (
    <Box component="div" className="login-page">
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fcfcfc",
            borderRadius: "10px",
            gap: "10px",
            padding: "10px",
          }}
        >
          <Box
            width="100px"
            sx={{ display: "flex", justifyContent: "center", gap: "30px" }}
          >
            <img src={yariga} alt="Yariga Logo" />
            <Typography
              component="h1"
              variant="h5"
              align="center"
              sx={{ color: "#43a34e", fontSize: "20px", hyphens: "manual" }}
            >
              Demande Prediction Report
            </Typography>
          </Box>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            className="login_title"
          >
            Sign in to your account
          </Typography>

          <Box>
            <GoogleButton />
          </Box>
          <Divider style={{ fontSize: 20 }}>or</Divider>
          <Box pl="15px" pr="15px">
            <LoginForm />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

import { Box, Container, Typography, Divider } from "@mui/material";
import { yariga } from "../assets";
import { GoogleButton } from "utils/google-loging";
import RegisterForm from "components/login/registerForm";

export const Register: React.FC = () => {
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
          <Box>
            <img src={yariga} alt="Yariga Logo" />
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
          <Divider style={{ fontSize: 20 }}>Or Register</Divider>
          <Box pl="15px" pr="15px">
            <RegisterForm />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

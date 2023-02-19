import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";

import {
  Button,
  BoxProps,
  Box,
  Checkbox,
  Container,
  Card,
  CardContent,
  CardContentProps,
  FormControlLabel,
  TextField,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import { yariga } from "../assets";

import { CredentialResponse } from "../interfaces/google";
import LoginForm from "./../components/login/LoginForm";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "large",
          type: "standard",
          shape: "pill",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div style={{ width: "100%" }} ref={divRef} />;
  };

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
          <Divider style={{ fontSize: 20 }}>or</Divider>
          <Box pl="15px" pr="15px">
            <LoginForm />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

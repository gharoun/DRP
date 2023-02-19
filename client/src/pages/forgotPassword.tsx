import { yariga } from "../assets";
import { useForgotPassword, useRouterContext } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";
import {
  Stack,
  Button,
  Container,
  Box,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
export const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate, isLoading } = useForgotPassword();
  const { Link } = useRouterContext();
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
          component="form"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            return mutate(data);
          })}
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
            Forgot your password
          </Typography>

          <Box width="80%">
            <TextField
              {...register("email", {
                required: true,
              })}
              id="email"
              margin="normal"
              fullWidth
              label={"Email"}
              error={!!errors.email}
              name="email"
              type="email"
              color="info"
              autoComplete="email"
            />
          </Box>
          <Box textAlign="right">
            <Typography variant="body2" component="span">
              Have an account?
            </Typography>{" "}
            <MuiLink
              variant="body2"
              color="info"
              component={Link}
              underline="none"
              to="/login"
              fontWeight="bold"
            >
              Sign in
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

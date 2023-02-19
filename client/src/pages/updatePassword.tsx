import { yariga } from "../assets";
import { useUpdatePassword, useRouterContext } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";
import {
  Button,
  Container,
  Box,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
export const UpdatePassword: React.FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: update, isLoading } = useUpdatePassword();
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
            return update(data);
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
            Set New Password
          </Typography>

          <Box width="80%">
            <TextField
              {...register("password", {
                required: true,
              })}
              id="password"
              margin="normal"
              fullWidth
              color="info"
              name="password"
              label={"New Password"}
              error={!!errors.password}
              type="password"
              placeholder="●●●●●●●●"
              autoComplete="current-password"
            />
          </Box>

          <Box width="80%">
            <TextField
              {...register("confirmPassword", {
                required: true,
                validate: (value: string) => {
                  if (watch("password") !== value)
                    return "Passwords do not match";
                },
              })}
              id="confirmPassword"
              margin="normal"
              fullWidth
              color="info"
              name="confirmPassword"
              label={"Confirm New Password"}
              error={!!errors.password}
              type="password"
              placeholder="●●●●●●●●"
              autoComplete="current-confirm-password"
            />
          </Box>

          <Box width="80%">
            <Button
              type="submit"
              fullWidth
              color="info"
              variant="contained"
              sx={{
                mt: "8px",
              }}
              disabled={isLoading}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

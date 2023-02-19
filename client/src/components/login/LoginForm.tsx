import {
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useLogin, useRouterContext } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: login, isLoading } = useLogin();

  const { Link } = useRouterContext();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        return login(data);
      })}
      gap="16px"
    >
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
      <TextField
        {...register("password", {
          required: true,
        })}
        id="password"
        margin="normal"
        fullWidth
        color="info"
        name="password"
        label={"Password"}
        error={!!errors.password}
        type="password"
        placeholder="●●●●●●●●"
        autoComplete="current-password"
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pl="2px"
        pr="5px"
      >
        <FormControlLabel
          sx={{
            span: {
              fontSize: "14px",
              color: "text.secondary",
            },
          }}
          color="secondary"
          control={
            <Checkbox size="small" id="remember" {...register("remember")} />
          }
          label={"Remember me"}
        />
        <MuiLink
          variant="body2"
          color="info"
          component={Link}
          underline="none"
          to="/forgot-password"
        >
          Forgot password?
        </MuiLink>
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="info"
        sx={{
          mt: "8px",
          mb: "10px",
        }}
        disabled={isLoading}
      >
        Sign in
      </Button>
      <Box style={{ marginTop: 8 }}>
        <Typography variant="body2" component="span" fontSize={15}>
          Don’t have an account?
        </Typography>
        <MuiLink
          ml="8px"
          variant="body2"
          color="info"
          component={Link}
          underline="none"
          to="/register"
          fontWeight="bold"
          fontSize={17}
        >
          Sign up
        </MuiLink>
      </Box>
    </Box>
  );
};

export default LoginForm;

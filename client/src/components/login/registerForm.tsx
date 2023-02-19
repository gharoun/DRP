import {
  Stack,
  Button,
  Box,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useRegister, useRouterContext } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: registerMutate, isLoading } = useRegister();

  const { Link } = useRouterContext();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        return registerMutate(data);
      })}
      gap="16px"
    >
      <Stack display="flex" direction="row" gap={2}>
        <TextField
          {...register("firstName", {
            required: true,
          })}
          id="firstName"
          margin="normal"
          fullWidth
          label={"First Name"}
          error={!!errors.email}
          name="firstName"
          type="text"
          color="info"
          autoComplete="on"
        />
        <TextField
          {...register("lastName", {
            required: true,
          })}
          id="lastName"
          margin="normal"
          fullWidth
          label={"Last Name"}
          error={!!errors.lastName}
          name="lastName"
          type="text"
          color="info"
          autoComplete="on"
        />
      </Stack>

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
        {...register("businessName", {
          required: false,
        })}
        id="businessName"
        margin="normal"
        fullWidth
        label={"business Name"}
        name="businessName"
        type="text"
        color="info"
        autoComplete="on"
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
      <TextField
        {...register("confirmPassword", {
          required: true,
        })}
        id="confirmPassword"
        margin="normal"
        fullWidth
        color="info"
        name="confirm"
        label={"Confirm Password"}
        error={!!errors.confirm}
        type="password"
        placeholder="●●●●●●●●"
        autoComplete="current-password"
      />
      <Box display="flex" justifyContent="flex-end">
        <Typography variant="body2" component="span">
          Have an account?
        </Typography>
        <MuiLink
          ml="6px"
          variant="body2"
          component={Link}
          underline="none"
          to="/login"
          fontWeight="bold"
          color="info"
        >
          Sign in
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
        Sign Up
      </Button>
    </Box>
  );
};

export default RegisterForm;

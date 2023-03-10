import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// @mui
import {Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Snackbar, Alert} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState()
  const [formData, setFormData] = useState({
      email: "",
      password: ""
  })

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = (e) => {
      e.preventDefault();
      axios.post('https://charity-backend.helpulstudio.com/api/login-admin', formData)
          .then((response) => {
                console.log(response.data.token)
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard/app")
          }).catch((error) => {
              console.log(error.response.data.errors[0])
              setOpenSnackbar(true)
      })
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address"
            onChange={(e) => {
                setFormData({...formData, email: e.target.value})
                console.log(formData.email)
            }}
        />

        <TextField
          onChange={(e) => {
              setFormData({...formData, password: e.target.value})
          }}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
          <Alert severity="error">Data kamu tidak valid!</Alert>
      </Snackbar>
    </>
  );
}

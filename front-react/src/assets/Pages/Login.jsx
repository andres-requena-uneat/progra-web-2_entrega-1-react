import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert
 } from "@mui/material"
import {
  Link, useNavigate
} from 'react-router-dom'
import { login } from '../Service/login';


const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await login(username, password)
    
    if (response) {
      setSnackMessage(response)
      setSnackState(true)
    } else {
      navigate('/home')
    }

  }

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [snackState, setSnackState] = useState(false)
  const [snackMessage, setSnackMessage] = useState("")

  return (
    <>
      <Snackbar
        anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}
        open={snackState}
        onClose={() => setSnackState(!snackState)}
        autoHideDuration={2000}
      >
        <Alert severity='warning' variant="filled">
          { snackMessage }
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="text"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>

            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Login;
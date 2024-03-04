import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  MenuItem
 } from "@mui/material"
import {
  Link, redirect, useNavigate
} from 'react-router-dom'
import { signup } from '../Service/signup';



const Signup = () => {
  
  const navigate = useNavigate();

  const roles = [
    "user",
    "moderator",
    "admin",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(username, email, password, role)
      .then(response => {
        if (response.status === 200) {
          setSnackSeverity('success')
        } else {
          setSnackSeverity('warning')
        }
        setSnackMessage(response.message)
        setSnackState(true)

        setTimeout(() => {
          navigate("/login")
        }, 2000)
      })    
  }

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [snackState, setSnackState] = useState(false)
  const [snackMessage, setSnackMessage] = useState("")
  const [snackSeverity, setSnackSeverity] = useState("warning")

  return (
    <>
      <Snackbar
        anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}
        open={snackState}
        onClose={() => setSnackState(!snackState)}
        autoHideDuration={2000}
      >
        <Alert severity={snackSeverity} variant="outlined">
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
          Sign up
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
            id="email"
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <TextField
            margin="normal"
            required
            select
            fullWidth
            name="rols"
            label="Role"
            id="role"
            onChange={e => setRole(e.target.value)}
          >
            {
              roles.map(role => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))
            }
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
          <Grid container>

            <Grid item>
              <Link to="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
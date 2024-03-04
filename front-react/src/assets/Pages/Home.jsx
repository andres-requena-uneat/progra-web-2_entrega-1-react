import React, { useEffect, useState } from "react";
import getCookie from '../Utils/getCookie'
import getUsers from '../Service/getUsers'
import {
  useNavigate
} from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Fab,
  Button,
  Tooltip
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';

const Home = () => {
  const [userList, setUserList] = useState([])
  const navigate = useNavigate()

  const logout = () => {
    document.cookie = "accessToken=; Max-Age=-99999"
    navigate('/login')
  }

  useEffect(() => {
    const accessToken = getCookie("accessToken")
    if (accessToken) {

      const fetchUsers = async () => {
        const users = await getUsers(accessToken)
        setUserList(users)
      }
      fetchUsers()

    } else {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <Tooltip>
        <Button
          onClick={() => logout()}
        >
          Logout
        </Button>
      </Tooltip>

      <Typography align="center" variant="h5" sx={{mt: 5}}>
        User list
      </Typography>

      <TableContainer align="center" sx={{mt: 2}}>
        <Table sx={{ width: 650, mt: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Roles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              userList.length > 0 && userList.map(user => {
                return (
                  <TableRow>
                    <TableCell> {user.id} </TableCell>
                    <TableCell> {user.username} </TableCell>
                    <TableCell> {user.email} </TableCell>
                    <TableCell> {user.roles.map(role => <p>{role}</p>)} </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )

}

export default Home
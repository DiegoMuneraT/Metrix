// react
import React from "react";
// @mui/material
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
// media
import logo from "media/images/logopng.png";
// components
import theme from 'components/theme/getTheme'

function Copyright(props) {
  return(
      <Typography variant='body2' color='text.secondary' align='center' {...props}>
          {'Copyright @ '}
          <Link color="inherit" href='#'>
              Metrix
          </Link> {' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
  );
}
function Connector() {

return (
  <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline/>
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

            <Box component='img' sx={{ height: 110, width: 180, maxHeight: { xs: 110, md: 180 }, maxWidth: { xs: 180, md: 180} }} src={logo}/>

            <Typography component='h1' variant='h5'>
                Tomar Pedido
            </Typography>
        </Box>
        <Copyright sx={{ mt:5 }}/>
      </Container>

  </ThemeProvider>

);
}

export default Connector
import React from 'react'
import { Button, CssBaseline, Link, Box, Typography, Container, createTheme, ThemeProvider } from '@mui/material'
import logo from 'media/images/logopng.png'

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

const theme = createTheme({
    palette: {
        background: {
            default: '#282c34'
        },
        text: {
            primary: '#ffff',
            secondary: '#ffff'
        },
        primary:  {
            main: '#8bc34a'
        },
        secondary: {
            main: '#8bc34a'
        },
    },
});

function Seller() {

    return (
    <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    
                <Box component='img' sx={{ height: 110, width: 180, maxHeight: { xs: 110, md: 180 }, maxWidth: { xs: 180, md: 180} }} src={logo}/>

                <Typography component='h1' variant='h5'>
                    Agregar Un Paquete
                </Typography>
            </Box>
            <Copyright sx={{ mt:5 }}/>
        </Container>

    </ThemeProvider>

    );
}

export default Seller
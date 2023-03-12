import React from 'react'
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, createTheme, ThemeProvider } from '@mui/material'
import logo from '../../../media/images/logopng.png'

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

function Login() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline/>
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    
                    <img src={logo} className="App-logo" alt="logo" />

                    <Typography component='h1' variant='h5'>
                        Iniciar Sesión
                    </Typography>

                    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField required fullWidth id='email' label='Correo Electronico' name='email' autoComplete='email'/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField required fullWidth name='password' label='Contraseña' type='password' id='password' autoComplete='new-password'/>
                            </Grid>
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}> Iniciar Sesión </Button>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt:5 }}/>
            </Container>

        </ThemeProvider>
    );
}

export default Login
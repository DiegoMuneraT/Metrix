import React from 'react'
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, createTheme, ThemeProvider, Select, MenuItem, InputLabel,FormControl } from '@mui/material'
import logo from 'media/images/logopng.png'
import { writeUserData } from 'services/database/firebaseCalls';
import { IdField } from 'services/hooks/useID';


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

function Signup() {

    // ! - - ESTA FUNCION DEBE SER UN COMPONENTE A PARTE DE LA VISTA - - !
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
                        Usuario, registrate
                    </Typography>

                    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete='given-name' name='firstName' required fullWidth id='firstName' label='Nombre' autoFocus/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField required autoComplete='family-name' fullWidth id='lastName' label='Apellido'/>
                            </Grid>
                            
                            <Grid item xs={49} >
                                <FormControl fullWidth>
                                    <InputLabel  id="demo-simple-select-label">Tipo De Usuario</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={'typeuser'}
                                            label="Age"
                                        >
                                            <MenuItem value={'vendedor'}>Vendedor</MenuItem>
                                            <MenuItem value={'conector'}>Conector</MenuItem>
                                            <MenuItem value={'receptor'}>Receptor</MenuItem>
                                        </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField required fullWidth id='email' label='Correo Electronico' name='email' autoComplete='email'/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField required fullWidth name='password' label='Contraseña' type='password' id='password' autoComplete='new-password'/>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel control={<Checkbox value='allowExtraEmails' color='primary' />} label='Quiero recibir informacion, promociones y actualizaciones a mi correo.'/>
                            </Grid>

                        </Grid>

                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}> Registrarse </Button>
                        
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link href="" variant='body2'>
                                    Ya tienes una cuenta? Inicia Sesion
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
                <Copyright sx={{ mt:5 }}/>
            </Container>

        </ThemeProvider>
    );
}

export default Signup
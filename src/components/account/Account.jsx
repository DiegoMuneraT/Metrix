// react
import React from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { 
    Box, 
    ThemeProvider, 
    Container, 
    CssBaseline, 
    Typography, 
    Grid, 
    Button 
} from '@mui/material';
// componentes
import { UserAuth } from 'context/authContext';
import theme from 'components/theme/getTheme';
import Copyright from 'components/copyright/Copyright';

const Account = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            console.log('You are logged out');
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            component="h6"
                            variant="h6"
                            sx={{ fontWeight: "500", color: "#ffff", mt: 3.4, mb: 0.6 }}
                            align="center"
                        >
                            ID: {user.uid}
                        </Typography>

                        <Typography
                            component="h6"
                            variant="h6"
                            sx={{ fontWeight: "500", color: "#ffff", mt: 3.4, mb: 0.6 }}
                            align="center"
                        >
                            Usuario: {user && user.email} 
                        </Typography>
                        
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{ fontWeight: "600", color: "#8BC34A", mt: 3.4, mb: 0.6 }}
                            align="center"
                        >
                            Selecciona tu categoria
                        </Typography>

                        <Grid item>
                        <Button variant="contained" fullWidth sx={{ mt: 3, mb: 2 }} href='account/connector'>Conector</Button>
                        </Grid>

                        <Grid item>
                        <Button variant="contained" fullWidth sx={{ mt: 3, mb: 2 }} href='account/seller'>Vendedor</Button>
                        </Grid>

                        <Grid item>
                        <Button variant="contained" fullWidth sx={{ mt: 3, mb: 2 }} href='account/buyer'>Comprador</Button>
                        </Grid>

                        <Grid item>
                        <Button color='error' variant="contained" fullWidth sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>Salir</Button>
                        </Grid>
                    </Box>
                <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider> 
        </div>
    );
};

export default Account;
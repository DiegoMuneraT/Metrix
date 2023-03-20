// react
import React, { useEffect, useState, useId } from "react";
// @mui/material
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  ThemeProvider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
} from "@mui/material";
// firebase
import { getDatabase, onValue } from "firebase/database";
// media
import logo from "media/images/logopng.png";
// components
import theme from "components/theme/getTheme";
import Copyright from "components/copyright/Copyright";
import SetOrder from "components/pages/seller/SetOrder";

function Seller() {

  const [productType, setProductType] = useState("");

  const handleChange = (event) => {
    if(event.target.name === "productType") {
      setProductType(event.target.value);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              height: 110,
              width: 180,
              maxHeight: { xs: 110, md: 180 },
              maxWidth: { xs: 180, md: 180 },
            }}
            src={logo}
          />

          <Typography component="h1" variant="h5">
            Ingrese el Pedido
          </Typography>

          <Box
            component='form'
            autoComplete="off"
            onSubmit={SetOrder}
            sx={{ mt: 3}}
          >
            <Grid container spacing={2}>

              <Grid item xs={49}>
                <Box
                  sx={{
                    minWidth: 120,
                    background: '#282c34',
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Tipo de producto</InputLabel>
                    <ThemeProvider theme={theme}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productType}
                        label="productType"
                        onChange={handleChange}
                        name="productType"
                        required
                      >
                        <MenuItem value={'Electronica'}>Electronica</MenuItem>
                        <MenuItem value={'Textiles'}>Textiles</MenuItem>
                        <MenuItem value={'Belleza'}>Belleza</MenuItem>
                        <MenuItem value={'Juguetes'}>Juguetes</MenuItem>
                      </Select>
                    </ThemeProvider>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label='Precio'
                  name='price'
                />                  
              </Grid>

              <Grid item xs={49}>
                <Box
                  sx={{
                    minWidth: 120,
                    background: '#282c34',
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Estación inicio</InputLabel>
                    <ThemeProvider theme={theme}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="start"
                        onChange={handleChange}
                        name="start"
                        required
                      >
                        <MenuItem value={'Aguacatala'}>Aguacatala</MenuItem>
                        <MenuItem value={'San Antonio'}>San Antonio</MenuItem>
                        <MenuItem value={'Niquia'}>Niquia</MenuItem>
                        <MenuItem value={'Caribe'}>Caribe</MenuItem>
                      </Select>
                    </ThemeProvider>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={49}>
                <Box
                  sx={{
                    minWidth: 120,
                    background: '#282c34',
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Estación destino</InputLabel>
                    <ThemeProvider theme={theme}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="end"
                        onChange={handleChange}
                        name="end"
                        required
                      >
                        <MenuItem value={'San Antonio'}>San Antonio</MenuItem>
                        <MenuItem value={'Niquia'}>Niquia</MenuItem>
                        <MenuItem value={'Aguacatala'}>Aguacatala</MenuItem>
                        <MenuItem value={'Caribe'}>Caribe</MenuItem>
                      </Select>
                    </ThemeProvider>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label='ID Comprador'
                  name='idBuyer'
                />                  
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt:3, mb: 2}}
            >
              {" "}
              Subir pedido{" "}
            </Button>

          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Seller;


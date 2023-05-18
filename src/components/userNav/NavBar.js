// react 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// mui
import { Typography, Grid, Button, Box, Avatar, Popover, Divider, MenuItem } from "@mui/material";
// componentes
import { ReactComponent as CoinSvg } from "media/images/coin.svg";
import { UserAuth } from "context/authContext";


const NavBar = ({
  userType = "vendedor",
  userName = "Cargando Usuario",
  handleTokens,
  tokens = "0",
}) => {
  const profileLetter = userName[0];
  const myRe =
    userName.length > 23 || userName.split(" ").length === 2
      ? /\w+\s\w+/
      : /\w+\s\w+\s\w+/;
  const name = myRe.exec(userName);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  }

  const handleClose = () => {
    setOpen(null);
  }

  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    window.location = "/account/statistics";
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 375,
        maxWidth: { xs: 400, md: 400 },
      }}
    >
      <Grid
        container
        sx={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "17px",
          borderBottom: "0.6px solid #1F1F1F",
        }}
      >
        <Grid xs={1.6} item={true}>
          <Avatar onClick={handleOpen} >{profileLetter}</Avatar>

          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >

            <MenuItem onClick={handleNavigate} sx={{ m: 1 }}>
              Estadísticas
            </MenuItem>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
              Salir
            </MenuItem>

          </Popover>
        </Grid>
        
        <Grid item={true} sx={{ mt: 0.6 }}>
          <Typography component="h3" variant="p">
            {name}
          </Typography>
        </Grid>
        <Grid
          xs={3}
          item={true}
          sx={{
            textAlign: "right",
          }}
        >
          {userType === "comprador" ? (
            ""
          ) : (
            <Button
              variant="contained"
              size="small"
              sx={{ padding: 0.3 }}
              onClick={() => handleTokens(userType)}
            >
              <Grid
                container
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid xs={5} item={true}>
                  <Typography
                    component="h3"
                    variant="p"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {tokens}
                  </Typography>
                </Grid>
                <Grid item={true} sx={{ mt: 0.5 }}>
                  <CoinSvg />
                </Grid>
              </Grid>
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default NavBar;

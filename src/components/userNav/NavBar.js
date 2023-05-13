import React from "react";
import { Typography, Grid, Button, Box, Avatar } from "@mui/material";
import { ReactComponent as CoinSvg } from "media/images/coin.svg";

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
          <Avatar>{profileLetter}</Avatar>
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

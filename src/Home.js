import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import Avatar from "@mui/material/Avatar";

// TODO remove, this demo shouldn't need to reset the theme.
// ปรับแต่ง theme ของ Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: "#fcbd4b", // สีหลักของเว็บ
    },
    secondary: {
      main: "#06e274", // สีรองของเว็บ
    },
    background: {
      paper: "#ffff", // สีพื้นหลังของ Paper
    },
  },
  typography: {
    fontFamily: "Tilt Prism", // เลือก font ที่คุณต้องการ
  },
});

export default function Home() {
  const [items, setItems] = useState([]);
  const loginid = localStorage.getItem("Owner");

  useEffect(() => {
    const token = localStorage.getItem("token");
    // authentication
    fetch("http://localhost:4400/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          getStoreData(loginid);
        } else {
          alert("login Failed");
          localStorage.removeItem("token");
          window.location = "/login";
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [loginid]);

  // getstore with loginId
  const getStoreData = (id) => {
    fetch("http://localhost:4400/getStore/" + id)
      .then((response) => response.json())
      .then((result) => {
        setItems(result.massage);
      })
      .catch((error) => console.log("error", error));
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/login";
  };

  const DeleStore = (storesid) => {
    const confirmDelete = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการลบร้านค้านี้?"
    );

    if (confirmDelete) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: storesid,
      });

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:4400/delete/stores", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result["status"] === "ok") {
            const updatedItems = items.filter(
              (item) => item.storesid !== storesid
            );
            setItems(updatedItems);
          } else {
            alert("การลบไม่สำเร็จ");
          }
          alert(result["message"]);
        })
        .catch((error) => {
          console.log("error", error);
          alert("เกิดข้อผิดพลาดขณะพยายามลบร้านค้า");
        });
    }
  };

  const EditStore = (storesid) => {
    window.location = "/editStore/" + storesid;
  };

  const Products = (storesid) => {
    window.location = "/product/" + storesid;
  };

  const Promotion = (storesid) => {
    window.location = "/promotion/" + storesid;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: "#fcbd4b" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MEGA bangna
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            backgroundImage:
              'url("https://image-tc.galaxy.tf/wijpeg-czdsx9f1abi76zgldjkt2w8z3/mega-bangna.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center", // จัดตำแหน่งภาพพื้นหลัง
            minHeight: "100vh", // ความสูงขั้นต่ำเท่ากับความสูงของหน้าจอ
            pt: 4,
            pb: 6,
          }}
        >
          <Container maxWidth="xl">
            <React.Fragment>
              <CssBaseline />
              <Container maxWidth="lm">
                <Paper sx={{ p: 2 }}>
                  <Box display="flex">
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">
                        STORE
                      </Typography>
                    </Box>
                    <Link href="/createstore">
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#fcbd4b" }}
                      >
                        Create Store
                      </Button>
                    </Link>
                  </Box>
                  <TableContainer component={Paper} sx={{ my: 4, mx: "auto" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Stores Image</TableCell>
                          <TableCell align="center">Store Name</TableCell>
                          <TableCell align="center">Logo Image</TableCell>
                          <TableCell align="center">Description</TableCell>
                          <TableCell align="center">Address</TableCell>
                          <TableCell align="center">Product</TableCell>
                          <TableCell align="center">Promotion</TableCell>
                          <TableCell align="center">Action Store</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(items) && items.length > 0 ? (
                          items.map((row) => (
                            <TableRow
                              key={row.imagepath}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                <Box display="flex" justifyContent="center">
                                  <Avatar
                                    alt={row.storesid}
                                    src={row.imagepath}
                                    sx={{ width: 56, height: 56 }}
                                  />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                {row.storename}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                <Box display="flex" justifyContent="center">
                                  <Avatar
                                    alt={row.storesid}
                                    src={row.logopath}
                                    sx={{ width: 56, height: 56 }}
                                  />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                {row.description}
                              </TableCell>
                              <TableCell align="center">
                                {row.address}
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  variant="outlined"
                                  sx={{
                                    color: "#06e274",
                                    borderColor: "#06e274",
                                  }}
                                  onClick={() => Products(row.storesid)}
                                >
                                  Product
                                </Button>
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  variant="outlined"
                                  sx={{
                                    color: "#06e274",
                                    borderColor: "#06e274",
                                  }}
                                  onClick={() => Promotion(row.storesid)}
                                >
                                  Promotion
                                </Button>
                              </TableCell>
                              <TableCell align="center">
                                <ButtonGroup
                                  variant="outlined"
                                  aria-label="outlined button group"
                                >
                                  <Button
                                    sx={{
                                      color: "#06e274",
                                      borderColor: "#fcbd4b",
                                    }}
                                    onClick={() => EditStore(row.storesid)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    sx={{
                                      color: "#ff0000",
                                      borderColor: "#fcbd4b",
                                    }}
                                    onClick={() => DeleStore(row.storesid)}
                                  >
                                    Delete
                                  </Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} align="center">
                              No items found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Container>
            </React.Fragment>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}

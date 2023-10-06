import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
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
import { useParams } from "react-router-dom";

const defaultTheme = createTheme();

export default function Product() {
  // const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]); //set ค่าไว้ทำตาราง
  const { id } = useParams(); //id store

  useEffect(() => {
    const getProduct = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(`http://localhost:4400/get/products/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setItems(result.message);
        })
        .catch((error) => console.log("error", error));
    };

    getProduct();
  }, [id]);

  //เพิ่มสิ้นค้า
  const createProduct = () => {
    window.location = `/product/create/${id}`;
  };

  //promotion
  const Promotion = (productid) => {
    window.location = `/product/promotion/${productid}/${id}`;
  };

  //แก้ไขสิ้นค้า
  const updateProduct = (productid) => {
    localStorage.setItem("storeid", id);
    window.location = `/product/update/${productid}`;
  };

  //ลบตัวสิ้นค้า
  const deleteProduct = (productid) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: productid,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4400/delete/products", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          const updatedItems = items.filter(
            (product) => product.productsid !== productid
          );
          setItems(updatedItems);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handletostore = (event) => {
    window.location = "/home";
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: "#fcbd4b" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MEGA
          </Typography>
          <Button color="inherit" onClick={handletostore}>
            Back To Store
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Box sx={{ pt: 8, pb: 6 }}>
          <Container maxWidth="xl">
            <Paper sx={{ p: 2 }}>
              <Box display="flex">
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    PRODUCT
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#fcbd4b" }}
                  onClick={createProduct}
                >
                  Add
                </Button>
              </Box>
              <TableContainer component={Paper} sx={{ my: 4, mx: "auto" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Image</TableCell>
                      <TableCell align="center">Product Name</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Categories</TableCell>
                      <TableCell align="center">Description</TableCell>
                      <TableCell align="center">Promotion</TableCell>
                      {/* promotion store */}
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(items) && items.length > 0 ? (
                      items.map((product) => (
                        <TableRow key={product.productname}>
                          <TableCell component="th" scope="row" align="center">
                            <Box display="flex" justifyContent="center">
                              <Avatar
                                alt={product.productsid}
                                src={product.imagepath}
                                sx={{ width: 56, height: 56 }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            {product.productname}
                          </TableCell>
                          <TableCell align="center">{product.price}</TableCell>
                          <TableCell align="center">
                            {product.categories}
                          </TableCell>
                          <TableCell align="center">
                            {product.description}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              aria-label="outlined button group"
                              sx={{ color: "#06e274", borderColor: "#fcbd4b" }}
                              onClick={() => Promotion(product.productsid)}
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
                                onClick={() =>
                                  updateProduct(product.productsid)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                sx={{
                                  color: "#ff0000",
                                  borderColor: "#fcbd4b",
                                }}
                                onClick={() =>
                                  deleteProduct(product.productsid)
                                }
                              >
                                Dele
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
        </Box>
      </main>
    </ThemeProvider>
  );
}

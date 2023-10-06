import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function PromotionProduct() {
  const [items, setItems] = useState([]);
  const { id, storesid } = useParams(); //id คือของ product //storesid ตรงตามตัว

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // แปลงเป็นวันที่และเวลาในรูปแบบท้องถิ่น
  };

  useEffect(() => {
    const getpromotion = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(`http://localhost:4400/get/promotionproduct/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setItems(result.message);
        })
        .catch((error) => console.log("error", error));
    };

    getpromotion();
  }, [id]);

  //เพิ่มpromotion product
  const createPromotionProduct = () => {
    window.location = `/product/promotion/create/${id}/${storesid}`;
  };

  //update promotion product
  const updatePromotion = (promoproductsid) => {
    window.location = `/product/promotion/update/${promoproductsid}/${id}/${storesid}`;
  };

  //delete promotion product
  const deletePromotion = (promoproductsid) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `http://localhost:4400/delete/promotion/product/${promoproductsid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          const updatedItems = items.filter(
            (promotion) => promotion.promoproductsid !== promoproductsid
          );
          setItems(updatedItems);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handletoproduct = (event) => {
    window.location = `/product/${storesid}`;
  };

  return (
    <div>
      {/* Container */}
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" sx={{ backgroundColor: "#fcbd4b" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MEGA
            </Typography>
            <Button color="inherit" onClick={handletoproduct}>
              Back To Product
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ p: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex">
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  PROMOTION PRODUCT
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#fcbd4b" }}
                onClick={createPromotionProduct}
              >
                Add
              </Button>
            </Box>
            {/* table */}
            <TableContainer component={Paper} sx={{ my: 4, mx: "auto" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Discount</TableCell>
                    <TableCell align="center">StartDate</TableCell>
                    <TableCell align="center">EndDate</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(items) && items.length > 0 ? (
                    items.map((row) => (
                      <TableRow
                        key={row.promoproductsid}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{row.title}</TableCell>
                        <TableCell align="center">
                          {row.promotionPrice}
                        </TableCell>
                        <TableCell align="center">
                          {formatDate(row.startDate)}
                        </TableCell>
                        <TableCell align="center">
                          {formatDate(row.endDate)}
                        </TableCell>
                        <TableCell align="center">
                          <ButtonGroup
                            variant="outlined"
                            aria-label="outlined button group"
                          >
                            <Button
                              sx={{ color: "#06e274", borderColor: "#fcbd4b" }}
                              onClick={() =>
                                updatePromotion(row.promoproductsid)
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              sx={{ color: "#ff0000", borderColor: "#fcbd4b" }}
                              onClick={() =>
                                deletePromotion(row.promoproductsid)
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
      </React.Fragment>
    </div>
  );
}

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

export default function Promotion() {
  const [items, setItems] = useState([]);
  const { id } = useParams(); //id store

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

      fetch(`http://localhost:4400/get/promotions/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setItems(result.message);
        })
        .catch((error) => console.log("error", error));
    };

    getpromotion();
  }, [id]);

  //เพิ่มpromotion store
  const createPromotion = () => {
    window.location = `/promotion/create/${id}`;
  };

  //update promotion store
  const updatePromotion = (promotionstoreid) => {
    window.location = `/promotion/update/${promotionstoreid}`;
  };

  //delete promotion store
  const deletePromotion = (promotionstoreid) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `http://localhost:4400/delete/promotion/${promotionstoreid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          const updatedItems = items.filter(
            (promotion) => promotion.promoStoreid !== promotionstoreid
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
    <div>
      {/* Container */}
      <React.Fragment>
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
        <Container maxWidth="lg" sx={{ p: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex">
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  PROMOTION STORE
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#fcbd4b" }}
                onClick={createPromotion}
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
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">StartDate</TableCell>
                    <TableCell align="center">EndDate</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(items) && items.length > 0 ? (
                    items.map((row) => (
                      <TableRow
                        key={row.promoStoreid}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{row.title}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
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
                              onClick={() => updatePromotion(row.promoStoreid)}
                            >
                              Edit
                            </Button>
                            <Button
                              sx={{ color: "#ff0000", borderColor: "#fcbd4b" }}
                              onClick={() => deletePromotion(row.promoStoreid)}
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

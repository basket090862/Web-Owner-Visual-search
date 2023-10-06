import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

export default function CreatePromoProduct() {
  const { promoproductsid, id, storesid } = useParams();

  const formatDateForPostgres = (date) => {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedStartDate = formatDateForPostgres(startdate);
    const formattedEndDate = formatDateForPostgres(enddate);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: title,
      promotionPrice: promotionPrice,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://localhost:4400/update/promotion/product/${promoproductsid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          window.location.href = `/product/promotion/${id}/${storesid}`;
        }
      });
  };

  const [title, setTitle] = useState("");
  const [promotionPrice, setPromotionPrice] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          Update Promotion
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => setTitle(event.target.value)}
                helperText="กรุณาระบุร้อยละที่ลดลงสำหรับค่านี้ เช่น 10%"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="promotionPrice"
                label="Discount"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => setPromotionPrice(event.target.value)}
                helperText="ใส่ราคาสุทธิหลังลดราคา เช่น ถ้าเดิม 110 ลด 10% จะเหลือ 99"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="startdate"
                label="Start Date"
                variant="outlined"
                fullWidth
                type="date"
                required
                onChange={(event) => setStartdate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="enddate"
                label="End Date"
                variant="outlined"
                fullWidth
                type="date"
                required
                onChange={(event) => setEnddate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#fcbd4b" }}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}

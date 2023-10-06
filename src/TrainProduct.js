import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";

export default function TrainProduct() {
  const { id, storesId } = useParams(); // นำค่า id และ storesId จาก URL มาใช้งาน
  const [images, setImages] = useState([]); // เก็บข้อมูลไฟล์ภาพ

  console.log(id, storesId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("TrainProduct", image);
    });

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:4400/trainproduct/${id}`,
        requestOptions
      );
      const result = await response.json();

      if (result["status"] === "ok") {
        if (
          window.confirm(
            "Images uploaded successfully. Do you want to go back to the product page?"
          )
        ) {
          window.location.href = `/product/${storesId}`;
        }
      } else {
        alert(result["message"]);
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading images");
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom component="div">
          Store Picture For Training
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label>Add only 10 product images, e.g.</label>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ overflow: "auto" }}
                height={70}
              >
                <Avatar
                  alt="1"
                  src="/picture_product/1.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="2"
                  src="/picture_product/2.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="3"
                  src="/picture_product/3.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="4"
                  src="/picture_product/4.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="5"
                  src="/picture_product/5.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="6"
                  src="/picture_product/6.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="7"
                  src="/picture_product/7.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="8"
                  src="/picture_product/8.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="9"
                  src="/picture_product/9.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="10"
                  src="/picture_product/10.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/jpeg, image/png"
                name="TrainStores"
                onChange={handleImageChange}
                multiple // เพิ่ม attribute ให้รับรูปภาพได้หลายรูปพร้อมกัน
                required // เพิ่มตรวจสอบว่าต้องระบุไฟล์ภาพ
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

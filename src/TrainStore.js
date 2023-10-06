import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";

export default function TrainStore() {
  const { id } = useParams();
  const [images, setImages] = useState([]); // เก็บข้อมูลไฟล์ภาพ

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("TrainStores", image);
    });

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:4400/trainstore/${id}`,
        requestOptions
      );
      const result = await response.json();

      if (result["status"] === "ok") {
        if (
          window.confirm(
            "Images uploaded successfully. Do you want to go back to the home page?"
          )
        ) {
          window.location.href = `/home`;
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
              <label>Add only 5 store images, e.g.</label>
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
                  src="/picture/1.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="2"
                  src="/picture/2.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="3"
                  src="/picture/3.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="4"
                  src="/picture/4.jpg"
                  sx={{ width: 56, height: 56 }}
                  variant="square"
                />
                <Avatar
                  alt="5"
                  src="/picture/5.jpg"
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

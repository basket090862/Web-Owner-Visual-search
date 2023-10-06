import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

export default function EditStore() {
  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // สร้าง FormData object เพื่อรวมข้อมูลที่จะส่งไปยัง API พร้อมกับไฟล์ภาพ
    const formData = new FormData();
    formData.append("storename", storename);
    formData.append("image", image); // เพิ่มฟิลด์ image
    formData.append("logo", logo); // เพิ่มฟิลด์ logo
    formData.append("description", description);
    formData.append("address", address);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };

    fetch(`http://localhost:4400/update/stores/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          window.location.href = "/home";
        }
      });
  };
  const [storename, setStorename] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null); // เก็บข้อมูลไฟล์ภาพ
  const [logo, setLogo] = useState(null); // เก็บข้อมูลไฟล์ภาพ

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          EDIT STORE
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="storename"
                label="Storename"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => setStorename(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Store Image</label>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
                name="image"
                required // เพิ่มตรวจสอบว่าต้องระบุไฟล์ภาพ
              />
              <p style={{ fontSize: "0.8rem", color: "gray" }}>
                * รูปภาพหน้าร้านที่คุณต้องการ
              </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Store Logo</label>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleLogoChange}
                name="logo"
                required // เพิ่มตรวจสอบว่าต้องระบุไฟล์ภาพ
              />
              <p style={{ fontSize: "0.8rem", color: "gray" }}>
                * กรุณาเลือกรูปภาพโลโก้หน้าร้าน
                (หรือไม่มีเอารูปป้ายหน้าร้านก็ได้)
              </p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                label="Address"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => setAddress(event.target.value)}
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

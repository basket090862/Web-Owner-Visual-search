import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { Descriptionstores } from "./descriptionstore";

export default function CreateStore() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const owner = localStorage.getItem("Owner"); //รับค่า id ของ userowner

    // สร้าง FormData object เพื่อรวมข้อมูลที่จะส่งไปยัง API พร้อมกับไฟล์ภาพ
    const formData = new FormData();
    formData.append("loginid", owner);
    formData.append("storename", storename);
    formData.append("image", image); // เพิ่มฟิลด์ image
    if (logo) {
      // เพิ่มเงื่อนไขเช็คว่ามี logo หรือไม่
      formData.append("logo", logo);
    }
    formData.append("description", description);
    formData.append("address", address);

    var requestOptions = {
      method: "POST",
      body: formData, // ใช้ FormData object แทน JSON.stringify(raw)
      redirect: "follow",
    };

    fetch("http://localhost:4400/create/stores", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result["status"] === "ok") {
          const newStoreId = result["storesid"]; // ดึง storeid จากคำตอบ
          window.location.href = `/train-store/${newStoreId}`; // ส่ง storeid ไปยังหน้าอื่น
        } else {
          alert(result["message"]);
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
          CREATE STORE
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
              <Autocomplete
                id="description"
                options={Descriptionstores}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Description"
                    variant="outlined"
                  />
                )}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setDescription(newValue.label);
                  } else {
                    setDescription(""); // เพื่อรับค่าเป็นค่าว่างเมื่อไม่มีตัวเลือกที่ถูกเลือก
                  }
                }} // ใช้ newValue.label เพื่อกำหนดค่า description
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

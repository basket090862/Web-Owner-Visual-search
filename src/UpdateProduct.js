import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

export default function UpdateProduct() {
  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();

    // สร้าง FormData object เพื่อรวมข้อมูลที่จะส่งไปยัง API พร้อมกับไฟล์ภาพ
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("imageproduct", imageproduct);
    formData.append("price", price);
    formData.append("categories", categories);
    formData.append("description", description);

    var requestOptions = {
      method: "PUT",
      body: formData,
      redirect: "follow",
    };

    fetch(`http://localhost:4400/update/products/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          const storeId = localStorage.getItem("storeid"); // ดึงค่า storeId จาก localStorage
          localStorage.removeItem("storeid"); // ลบค่า storeId ออกจาก localStorage
          window.location.href = `/product/` + storeId; // เปลี่ยนเส้นทางไปยังหน้า `/product/${storeId}`
        }
      })
      .catch((error) => console.log("error", error));
  };

  const [productname, setProductname] = useState([]);
  const [imageproduct, setImageproduct] = useState(null);
  const [price, setPrice] = useState([]);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageproduct(file);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          Update Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="productname"
                label="Productname"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => setProductname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Product Image</label>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
                name="imageproduct"
                required // เพิ่มตรวจสอบว่าต้องระบุไฟล์ภาพ
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="price"
                label="Price"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => setPrice(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="categories"
                label="Categories"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => setCategories(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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

import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { ListCategories, ListProducts } from "./Category";

export default function CreateProduct() {
  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();

    // สร้าง FormData object เพื่อรวมข้อมูลที่จะส่งไปยัง API พร้อมกับไฟล์ภาพ
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("imageproduct", imageproduct);
    formData.append("price", price);
    formData.append("categories", categoriesproduct.label);
    formData.append("description", description);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch(`http://localhost:4400/create/products/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //alert(result["message"]);
        if (result["status"] === "ok") {
          const newProductId = result["productsid"];
          window.location.href = `/train-product/${newProductId}/${id}`;
        }
      })
      .catch((error) => console.log("error", error));
  };

  //set values
  const [productname, setProductname] = useState([]);
  const [imageproduct, setImageproduct] = useState(null);
  const [price, setPrice] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesproduct, setCategoriesProduct] = useState();
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
          CREATE Product
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
            <Grid item xs={12}>
              <label>Product Image</label>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
                name="imageproduct"
                required // เพิ่มตรวจสอบว่าต้องระบุไฟล์ภาพ
                style={{ display: "block" }}
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
                id="description"
                label="Description"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="categories"
                options={ListCategories}
                getOptionLabel={(option) =>
                  option.ThaiLable
                    ? `${option.ThaiLable}(${option.label})`
                    : option.label
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="categories"
                    variant="outlined"
                  />
                )}
                onChange={(event, newValue) => setCategories(newValue)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="listproducts"
                options={categories ? ListProducts[categories.label] : []}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="List Product"
                    variant="outlined"
                  />
                )}
                onChange={(event, newValue) => setCategoriesProduct(newValue)}
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

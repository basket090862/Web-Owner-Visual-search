import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import CreateStore from "./CreateStore";
import Product from "./Product";
import Promotion from "./Promotion";
import CreateProduct from "./CreateProduct";
import PromotionProduct from "./PromotionProduct";
import EditStore from "./EditStore";
import UpdateProduct from "./UpdateProduct";
import CreatePromotion from "./CreatePromotion";
import UpdatePromotion from "./UpdatePromotion";
import CreatePromoProduct from "./CreatePromoProduct";
import UpdatePromoProduct from "./UpdatePromoProduct";
import TrainStore from "./TrainStore";
import TrainProduct from "./TrainProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createstore" element={<CreateStore />} />
        <Route path="/editStore/:id" element={<EditStore />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product/create/:id" element={<CreateProduct />} />
        <Route path="/product/update/:id" element={<UpdateProduct />} />
        <Route
          path="/product/promotion/:id/:storesid"
          element={<PromotionProduct />}
        />
        <Route
          path="/product/promotion/create/:id/:storesid"
          element={<CreatePromoProduct />}
        />
        <Route
          path="/product/promotion/update/:promoproductsid/:id/:storesid"
          element={<UpdatePromoProduct />}
        />
        <Route path="/promotion/:id" element={<Promotion />} />
        <Route path="/promotion/create/:id" element={<CreatePromotion />} />
        <Route path="/promotion/update/:id" element={<UpdatePromotion />} />
        <Route path="/train-store/:id" element={<TrainStore />} />
        <Route path="/train-product/:id/:storesId" element={<TrainProduct />} />
      </Routes>
    </BrowserRouter>
  ); ///product/promotion
}

export default App;

import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const listaProductos = new ProductManager("./src/productos.json");

router.get("/", (req, res) => {
  const products = listaProductos.getProducts();
  res.status(200).send(products);
});

router.get("/:pid", (req, res) => {
  const { pid } = req.params;

  const result = listaProductos.getProductByID(pid);

  if (result.id) {
    res.status(200).send(result);
  } else {
    res.status(400).send(result);
  }
});

router.post("/", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  const product = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };
  const result = listaProductos.addProduct(product);
  res.status(200).send(result);
});

router.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  const result = listaProductos.updateProduct(pid, {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  });

  if (result.err) {
    res.status(400).send(result);
  } else {
    res.status(200).send(result);
  }
});

router.delete("/:pid", (req, res) => {
  const { pid } = req.params;

  const result = listaProductos.deleteProduct(pid);

  if (result.err) {
    res.status(400).send(result);
  } else {
    res.status(200).send(result);
  }
});

// module.exports = router;

export default router;

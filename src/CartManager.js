import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  createCart() {
    const cartList = this.getData();
    const cart = { products: [] };
    cart.id = cartList.length === 0 ? 1 : cartList[cartList.length - 1].id + 1;
    cartList.push(cart);
    this.writeFile(cartList);
    return cart;
  }

  getCartByID(cid) {
    const cartList = this.getData();
    const searchCart = cartList.find((cart) => cart.id == cid);
    if (!searchCart) {
      console.error(`El cart con el ID ${cid} no existe`);
      return;
    }
    return searchCart;
  }

  addProductToCart(cid, pid) {
    const cartList = this.getData();
    const indexCart = cartList.findIndex((cart) => cart.id == cid);
    if (indexCart === -1) {
      console.error(`El cart con el ID ${cid} no existe`);
      return;
    }

    const productIndex = cartList[indexCart].products.findIndex(
      (prod) => prod.id == pid
    );

    if (productIndex === -1) {
      const toAdd = { id: pid, quantity: 1 };
      cartList[indexCart].products.push(toAdd);
    } else {
      cartList[indexCart].products[productIndex].quantity += 1;
    }

    fs.writeFileSync(this.path, JSON.stringify(cartList, null, 2));
  }

  getData() {
    let data = [];
    try {
      const productos = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      data = [...productos];
    } catch {
      console.error("No existe el archivo");
    }
    return data;
  }

  writeFile(data) {
    fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
  }
}

export default CartManager;

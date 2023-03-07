import axios from "axios";
import products from "@/models/products";
import { db } from "../firebase";

class service {
  //traigo los productos de la API
  getAllProducts() {
    const url = "https://fakestoreapi.com/products";

    return axios.get(`${url}`).then(({ data }) => {
      return data.map((item) => {
        return products.fromJson(item);
      });
    });
  }
  //traigo las categorias de la api
  getAllCategories() {
    const url = "https://fakestoreapi.com/products/categories";
    return axios.get(`${url}`).then(({ data }) => {
      return data;
    });
  }

  getAllStock() {
    const stocks = db.collection("stock");
    return stocks
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          if (doc.exists) {
            return {
              stock: doc.data().stock,
              id: doc.data().id,
              enabled: doc.data().enabled,
            };
          } else {
            console.log(
              "No hay datos disponibles para el documento con ID:",
              doc.id
            );
          }
        });
      })
      .catch((error) => {
        console.log("Error al obtener los datos: ", error);
      });
  }

  async getAllSales() {
    const compras = [];
    console.log("Obteniendo compras...");
    await db.collectionGroup("compras")
      .get()
      .then((querySnapshot) => {
        console.log("Compras obtenidas:", querySnapshot.docs.length);
        querySnapshot.forEach((doc) => {
          const compra = doc.data();
          compra.id = doc.id;
          const productos = Object.values(compra.productos || {});
          const totalProducts = productos.reduce(
            (total, producto) => total + producto.quantity,
            0
          );
          compra.totalProducts = totalProducts;
          const totalPrice = productos.reduce(
            (total, producto) => total + producto.precio * producto.quantity,
            0
          );
          compra.totalPrice = totalPrice;
          compras.push(compra);
        });
      })
      .catch((error) => {
        console.error("Error al obtener compras: ", error);
      });
    return compras;
  }
  
  
  
}

export default service;

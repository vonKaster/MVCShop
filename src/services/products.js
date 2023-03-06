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
            return { stock: doc.data().stock, id: doc.data().id, enabled: doc.data().enabled };
          } else {
            console.log("No hay datos disponibles para el documento con ID:", doc.id);
          }
        });
      })
      .catch((error) => {
        console.log("Error al obtener los datos: ", error);
      });
  } 
}

export default service;

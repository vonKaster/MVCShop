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
              providerId: doc.data().providerId,
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

  getAllProviders() {
    const providers = db.collection("providers");
    return providers
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          if (doc.exists) {
            return {
              id: doc.data().id,
              name: doc.data().name,
              description: doc.data().description,
              image: doc.data().image,
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
    await db
      .collectionGroup("compras")
      .get()
      .then((querySnapshot) => {
        console.log("Compras obtenidas:", querySnapshot.docs.length);
        querySnapshot.forEach((doc) => {
          const compra = doc.data();
          compra.hash = doc.id; // Agregar el nombre del documento como hash
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
        compras.sort((a, b) => b.fecha - a.fecha); // Ordenar compras por fecha descendente
      })
      .catch((error) => {
        console.error("Error al obtener compras: ", error);
      });
    return compras;
  }

  async getVentaIndividual(hash) {
    console.log("Buscando venta con hash:", hash);
    const compras = [];
    await db
      .collectionGroup("compras")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          compras.push(doc);
        });
      })
      .catch((error) => {
        console.log("Error al obtener las compras: ", error);
      });

    const ventasEncontradas = compras.filter((compra) => {
      return compra.id === hash;
    });

    if (ventasEncontradas.length === 1) {
      const venta = ventasEncontradas[0].data();
      const productos = Object.values(venta.productos || {});
      const totalProducts = productos.reduce(
        (total, producto) => total + producto.quantity,
        0
      );
      venta.totalProducts = totalProducts;
      const totalPrice = productos.reduce(
        (total, producto) => total + producto.precio * producto.quantity,
        0
      );
      venta.totalPrice = totalPrice;
      return venta;
    } else {
      console.log("La venta no existe o hay m??s de una venta con ese hash");
      return null;
    }
  }

  async toggleStatusProduct(productId) {
    const stocks = db.collection("stock");
    stocks
      .where("id", "==", productId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            const enabled = doc.data().enabled;
            const docRef = stocks.doc(doc.id);
            docRef
              .update({ enabled: !enabled })
              .then(() => {
                console.log("Estado del producto alterado exitosamente.");
              })
              .catch((error) => {
                console.error(
                  "Error al actualizar el estado del producto:",
                  error
                );
              });
          } else {
            console.log(`No se encontr?? un producto con la id: ${productId}`);
          }
        });
      })
      .catch((error) => {
        console.error("Error al obtener los datos: ", error);
      });
  }
  async updateStock(productId, newStock, selectedProvider) {
    const stocks = db.collection("stock");
    const querySnapshot = await stocks.where("id", "==", productId).get();
    console.log("query", querySnapshot);
    querySnapshot.forEach(async (doc) => {
      if (doc.exists) {
        console.log("el doc existe");
        const docRef = stocks.doc(doc.id);
        console.log("docref", docRef);
        console.log("numero con el que se actualizaria:", newStock);
        console.log("numero provider serv:", selectedProvider);
        await docRef.update({ stock: newStock, providerId: selectedProvider });
        console.log("Stock actualizado exitosamente.");
      } else {
        console.log("No se encontr?? un producto con la id: ${productId}");
      }
    });
  }

  addProduct(data) {
    const url = "https://fakestoreapi.com/products";
    let payload = {
      title: data.title,
      price: data.price,
      description: data.description,
      image: data.image,
      category: data.category,
    };

    console.log("PAYLOAD SERVICIO: ", payload);

    return axios.post(`${url}`, payload);
  }

  async editProduct(data) {
    const url = "https://fakestoreapi.com/products/";
    let payload = {
      title: data.title,
      price: data.price,
      description: data.description,
      image: data.image,
      category: data.category,
    };

    try {
      const response = await axios.patch(`${url}${data.id}`, payload);
      return response.data;
    } catch (error) {
      throw new Error(`Error al editar producto: ${error.message}`);
    }
  }

  async deleteProduct(productId) {
    console.log("ProductID SERVICIO:", productId);
    const url = "https://fakestoreapi.com/products/";
    await axios.delete(`${url}${productId}`);
  }
}

export default service;

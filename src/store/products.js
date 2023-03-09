import Vue from "vue";
import Vuex from "vuex";
import service from "@/services/products";
import products from "@/models/products";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    service: new service(),
    allProducts: [],
    allCategories: [],
    allStock: [],
    allSales: [],
    deleteItem: {},
    new: [],
  },
  getters: {},
  mutations: {
    setAllProducts(state, data) {
      state.allProducts = data;
    },
    setAllCategories(state, data) {
      state.allCategories = data;
    },
    setAllStock(state, data) {
      state.allStock = data;
    },
    setAllSales(state, data) {
      state.allStock = data;
    },
    setDeleteItem(state, data) {
      state.deleteItem = data;
    },
  },
  actions: {
    async getProducts(state) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.getAllProducts();
          console.log(item);

          state.commit("setAllProducts", item);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
    async getCategories(state) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.getAllCategories();
          console.log(item);

          state.commit("setAllCategories", item);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
    async getStock(state) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.getAllStock();
          console.log("store stock:", item);
          state.commit("setAllSales", item);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },

    async getSales(state) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.getAllSales();
          console.log("sales stock:", item);
          state.commit("setAllStock", item);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },

    async getSale(state, hash) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.getVentaIndividual(hash);
          console.log("Venta Store", item);
          resolve(item);
        } catch (error) {
          reject(error);
        }
      });
    },

    async toggleStatusProduct(state, productId) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.toggleStatusProduct(productId);
          resolve(item);
          this.getStock();
        } catch (error) {
          reject(error);
        }
      });
    },

    async updateStock(state, { productId, newStock }) {
      return new Promise(async (resolve, reject) => {
        try {
          console.log("stock store:", newStock);
          let item = await state.state.service.updateStock(productId, newStock);
          resolve(item);
          await this.dispatch("getStock");
        } catch (error) {
          reject(error);
        }
      });
    },

    async addProduct(state, data) {
      return new Promise(async (resolve, reject) => {
        try {
          await state.state.service.addProduct(data);
          let options = state.state.allProducts;
          let newItem = products.fromJson({
            title: data.title,
            price: data.price,
            category: data.category,
            description: data.description,
            image: data.image,
          });
          options.unshift(newItem);
          state.commit("setAllProducts", options);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },

    async editProduct(state, data) {
      return new Promise(async (resolve, reject) => {
        try {
          await state.state.service.editProduct(data);
          let item = state.state.edit;
          let options = state.state.allProducts;
          options = options.map((option) => {
            if (option.id != data.id) {
              return option;
            }
            item = products.fromJson({
              id: data.id,
              title: data.title,
              price: data.price,
              category: data.category,
              description: data.description,
              image: data.image,
            });
            return item;
          });
          state.commit("setAllProducts", options);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },

    async deleteProduct(state, productId) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.deleteProduct(productId);
          let options = state.state.allProducts;

          options = options.filter((option) => {
            console.log("dentro de options");
            return option.id != productId;
          });
          console.log("product id", productId);
          console.log("options filtradas", options);
          state.commit("setAllProducts", options);
          resolve(item);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  modules: {},
});

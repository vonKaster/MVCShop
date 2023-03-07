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
    allSales: []
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
          console.log("Venta Store",item);
          resolve(item);
        } catch (error) {
          reject(error);
        }
      });
    },
    
  },
  modules: {},
});

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
  },
  getters: {},
  mutations: {
    setAllProducts(state, data) {
      state.allProducts = data;
    },
    setAllCategories(state, data) {
      state.allCategories = data;
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
  },
  modules: {},
});

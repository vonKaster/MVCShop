<template>
  <div>
    <h1>List of Users Who Made a Purchase</h1>
    <ul>
      <li v-for="(user, index) in users" :key="index">{{ user }}</li>
    </ul>
  </div>
</template>

<script>
import { db } from "../firebase";
import products from "../store/products";

export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUsers() {
      try {
        console.log("Obteniendo compras...");
        const compras = await products.dispatch("getSales");
        console.log("Compras obtenidas:", compras.length);
        const users = new Set();
        const comprasArray = Object.values(compras);
        console.log("Compras en array:", comprasArray.length);
        comprasArray.forEach((compra) => {
          const uid = compra.uid;
          console.log("UID de compra:", uid);
          if (uid) {
            users.add(uid);
          }
        });
        this.users = Array.from(users);
        console.log("Usuarios obtenidos:", this.users);
      } catch (error) {
        console.error(error);
        throw new Error("Could not fetch users");
      }
    },
  },
  created() {
    console.log("Component created");
    this.getUsers();
  },
};
</script>

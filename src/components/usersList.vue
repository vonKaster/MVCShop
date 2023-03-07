<template>
    <div>
      <h1 class="text-center mb-8">Usuarios con Compras</h1>
      <div class="text-center" v-if="!isLoaded">
        <h2>Cargando...</h2>
      </div>
      <div v-if="isLoaded">
        <v-card
          style="background-color: #e6105b; color: #ffffff"
          class="mb-4"
          v-for="user in usuarios"
          :key="user.email"
        >
          <v-card-title>{{ user.name }}</v-card-title>
          <v-card-subtitle
            class="text-overline font-weight-bol"
            style="color: #ffffff"
            >{{ user.email }}</v-card-subtitle
          >
        </v-card>
      </div>
    </div>
  </template>
  
  <script>
  import firebase from "firebase/app";
  import "firebase/firestore";
  import { mapGetters } from "vuex";
  
  export default {
    name: "UsersWithSales",
  
    data() {
      return {
        compras: [],
        usuarios: [],
        isLoaded: false,
      };
    },
  
    computed: {
      ...mapGetters("auth", ["user"]),
    },
  
    created() {
      document.title = "MVCShop | Usuarios con Compras";
  
      const db = firebase.firestore();
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const user = doc.data();
            const userRef = db.collection(user.email);
            userRef
              .get()
              .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                  this.usuarios.push(user);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });
          this.isLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  };
  </script>
  
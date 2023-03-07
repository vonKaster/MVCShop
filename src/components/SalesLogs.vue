<template>
  <div>
    <h1 class="text-center mb-8">Logs</h1>
    <div class="text-center" v-if="!isLoaded">
      <h2>Cargando...</h2>
    </div>
    <div v-if="isLoaded">
      <v-card
        style="background-color: #e6105b; color: #ffffff"
        class="mb-4"
        v-for="compra in compras"
        :key="compra.id"
      >
        <v-card-title>{{
          compra.fecha.toDate().toLocaleString()
        }}</v-card-title>
        <v-card-subtitle
          class="text-overline font-weight-bol"
          style="color: #ffffff"
          >{{ compra.totalProducts }} Productos - Precio total
          {{ compra.totalPrice }}</v-card-subtitle
        >

        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="(producto, index) in compra.productos"
              :key="index"
            >
              <v-list-item-content>
                <div class="d-flex">
                  <v-img
                    class="mr-4"
                    max-width="48px"
                    :src="producto.imagen"
                  ></v-img>
                  <v-list-item-title>{{ producto.title }}</v-list-item-title>
                  <v-list-item-subtitle
                    >Cantidad: {{ producto.quantity }}</v-list-item-subtitle
                  >
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import products from "../store/products";

export default {
  name: "CartComponent",

  data() {
    return {
      compras: [],
      isLoaded: false,
    };
  },

  created() {
    products.dispatch("getSales").then(() => {
      this.compras = products.state.allStock;
      this.isLoaded = true;
    });
  },
};
</script>

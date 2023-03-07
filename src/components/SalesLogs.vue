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
        v-for="compra in paginatedCompras"
        :key="compra.id"
      >
        <v-card-title>{{
          compra.fecha.toDate().toLocaleString()
        }}</v-card-title>
        <v-card-subtitle
          class="text-overline font-weight-bol"
          style="color: #ffffff"
          >{{ compra.totalProducts }} Productos - Precio total
          {{ compra.totalPrice }} - HASH VENTA: <router-link :to="`/sale/${compra.hash}`">{{ compra.hash }}</router-link></v-card-subtitle
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
      <v-pagination v-model="page" :length="numPages" @input="changePage" />
    </div>
  </div>
</template>

<script>
import products from "../store/products";

export default {
  name: "SalesLogs",

  data() {
    return {
      compras: [],
      isLoaded: false,
      page: 1,
      itemsPerPage: 10,
    };
  },

  computed: {
    numPages() {
      return Math.ceil(this.compras.length / this.itemsPerPage);
    },
    paginatedCompras() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.compras.slice(start, end);
    },
  },

  created() {
    document.title = "MVCShop | Ventas";
    products.dispatch("getSales").then(() => {
      this.compras = products.state.allStock.sort(
        (a, b) => b.fecha - a.fecha
      );
      this.isLoaded = true;
    });
  },

  methods: {
    changePage(page) {
      this.page = page;
    },
  },
};
</script>
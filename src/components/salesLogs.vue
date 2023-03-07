<template>
  <div>
    <div class="text-center" v-if="!isLoaded">
      <div class="text-center mt-6 text-overline">
        <h2>Cargando Contenido</h2>
        <pulse-loader :color="'#e6105b'"></pulse-loader>
      </div>
    </div>
    <div v-if="isLoaded">
      <h1 class="text-center mb-8">Logs</h1>
      <div class="mb-4">
        <v-text-field
          label="Buscar por fecha o hash"
          v-model="search"
          @input="searchSales"
        />
      </div>
      <v-card
        style="background-color: #ededed; color: #000000"
        class="mb-4"
        v-for="(compra, index) in paginatedCompras"
        :key="index"
      >
        <v-card-title>
          {{ compra.fecha.toDate().toLocaleString() }}
        </v-card-title>
        <v-card-subtitle
          class="d-flex justify-space-between text-overline font-weight-bol"
          style="color: #e6105b"
        >
          {{ compra.totalProducts }} Productos - Precio total
          {{ compra.totalPrice }}
          <router-link style="text-decoration: none; color:#e6105b" :to="`/sale/${compra.hash}`">{{
            compra.hash
          }}</router-link>
          <v-btn class="mb-4 mr-4" @click="toggleExpand(index)" small>
            <v-icon>
              {{
                expandedCompras.includes(index)
                  ? "mdi-chevron-up"
                  : "mdi-chevron-down"
              }}
            </v-icon>
          </v-btn>
        </v-card-subtitle>
        <div class="d-flex justify-space-between">
          <h1></h1>
          
        </div>

        <v-list style="background-color: #f5f5f5;" v-if="expandedCompras.includes(index)">
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
                  <v-list-item-title>{{ producto.quantity }}</v-list-item-title>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-pagination color="#e6105b" v-model="page" :length="numPages" @input="changePage" />
    </div>
  </div>
</template>

<script>
import products from "../store/products";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "SalesLogs",
  components: { PulseLoader: PulseLoader },

  data() {
    return {
      compras: [],
      isLoaded: false,
      page: 1,
      itemsPerPage: 10,
      search: "",
      expandedCompras: [], // nueva propiedad
    };
  },

  computed: {
    numPages() {
      return Math.ceil(this.compras.length / this.itemsPerPage);
    },
    paginatedCompras() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.compras
        .filter(
          (compra) =>
            compra.fecha.toDate().toLocaleString().includes(this.search) ||
            compra.hash.includes(this.search)
        )
        .slice(start, end);
    },
  },

  created() {
    document.title = "MVCShop | Ventas";
    products.dispatch("getSales").then(() => {
      this.compras = products.state.allStock.sort((a, b) => b.fecha - a.fecha);
      this.isLoaded = true;
    });
  },

  methods: {
    changePage(page) {
      this.page = page;
    },
    searchSales() {
      this.page = 1;
    },
    toggleExpand(index) {
      const pos = this.expandedCompras.indexOf(index);
      if (pos === -1) {
        this.expandedCompras.push(index);
      } else {
        this.expandedCompras.splice(pos, 1);
      }
    },
  },
};
</script>

<style scoped>
.theme--dark .v-card {
  background-color: #272727 !important;
  color: white!important;
}
</style>

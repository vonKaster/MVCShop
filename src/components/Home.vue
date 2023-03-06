<template>
  <div>
    <v-container>
      <h1 class="text-center">Productos</h1>
      <div class="d-flex flex-wrap">
        <v-card
          class="mt-3 mb-3 mx-auto"
          max-width="300"
          v-for="product in getAllProducts"
          :key="product.id"
        >
          <v-img class="productImage" :src="product.imagen" />
          <v-card-title>
            <h4 class="text-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on"
                    >{{ product.title.slice(0, 22)
                    }}{{ product.title.length > 22 ? "..." : "" }}</span
                  >
                </template>
                <span>{{ product.title }}</span>
              </v-tooltip>
            </h4>
          </v-card-title>
          <div v-for="stock in getStock" :key="stock.id">
            <p class="ms-4" v-if="stock.id === product.id">
              Stock: {{ stock.stock }}
            </p>
          </div>
          <div class="text-center">
            <v-btn text class="ms-2 mx-auto"
              ><v-icon class="mr-1">mdi-pencil</v-icon>Editar</v-btn
            >
            <v-btn text class="ms-2 mx-auto"
              ><v-icon class="mr-1">mdi-alert</v-icon>Inhabilitar</v-btn
            >
          </div>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import products from "../store/products";
export default {
  name: "HomeComponent",

  data() {
    return {};
  },

  created() {
    document.title = "MVCShop | Inicio";
  },

  mounted() {
    products.dispatch("getCategories").then(() => {});
    products.dispatch("getProducts").then(() => {});
    products.dispatch("getStock").then(() => {});
  },
  computed: {
    getAllProducts() {
      return products.state.allProducts;
    },
    getCategories() {
      return products.state.allCategories;
    },
    getStock() {
      return products.state.allStock;
    },
  },
  methods: {},
};
</script>

<style>
.productImage {
  width: 300px;
  height: 300px;
}
</style>

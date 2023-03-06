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

  mounted() {
    products.dispatch("getCategories").then(() => {});

    products.dispatch("getProducts").then(() => {});

    console.log("asd", products.state.allProducts);
  },
  computed: {
    getAllProducts() {
      return products.state.allProducts;
    },
    getCategories() {
      return products.state.allCategories;
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

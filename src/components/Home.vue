<template>
  <div>
    <v-container>
      <h1 class="text-center">Productos</h1>
      <v-card v-for=" item in getAllProducts" :key="item.id">
        <v-img text-center max-width="300" :src="item.imagen" />
        <v-card-title>
          <h2>{{item.title}}</h2>
        </v-card-title>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import products from '../store/products';
export default {
  name: "HomeComponent",

  mounted() {
    products.dispatch("getCategories").then(() => {
    });

    products.dispatch('getProducts').then(() => {       
    });

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
  methods: {
    
  }
};
</script>

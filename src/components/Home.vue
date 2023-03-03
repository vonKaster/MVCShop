<template>
  <div>
    <v-container>
      <h1 class="text-center">Productos</h1>
      <v-card v-for="(index, item) in items" :key="index"> 
        {{item.title}}
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
    })

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

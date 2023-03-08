<template>
  <div>
    <v-container>
      <div v-if="!isLoaded" class="text-center">
        <div class="text-center mt-6 text-overline">
          <h2>Cargando Contenido</h2>
          <pulse-loader :color="'#e6105b'"></pulse-loader>
        </div>
      </div>
      <div v-if="isLoaded">
        <h1 class="text-center titulo text-overline mb-4">Test Productos</h1>
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
                <h2>{{ product.id }}</h2>
              </h4>
            </v-card-title>
            <div class="text-center d-flex pa-1">
              <v-btn
                color="#e6105b"
                text
                class="mx-auto flex-grow-1"
                @click="openChangeStockDialog(product.id)"
                ><v-icon class="mr-1">mdi-pencil</v-icon>Editar</v-btn
              >
              <v-btn
                color="#e6105b"
                text
                class="mx-auto flex-grow-1"
                @click="deleteProduct(product.id)"
                ><v-icon class="mr-1">mdi-delete</v-icon>Eliminar</v-btn
              >
            </div>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import products from "../store/products";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "testProductos",
  components: { PulseLoader: PulseLoader },
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {
    async deleteProduct(productId) {
      console.log("comp", productId);
      await products.dispatch("deleteProduct", productId);
      // Eliminar el producto eliminado de la lista allProducts
      const index = products.state.allProducts.findIndex(
        (product) => product.id === productId
      );
      if (index !== -1) {
        products.state.allProducts.splice(index, 1);
      }
    },
  },
  computed: {
    getAllProducts() {
      return products.state.allProducts;
    },
  },
  created() {
    document.title = "MVCShop | Test Productos";
    console.log("Component created");
    this.isLoaded = true;
  },

  async mounted() {
    try {
      await Promise.all([
        products.dispatch("getCategories"),
        products.dispatch("getProducts"),
      ]);
      this.isLoaded = true;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.productImage {
  width: 300px;
  height: 300px;
}

.theme--dark .v-card {
  background-color: #272727 !important;
}

.titulo {
  font-size: 24px !important;
}
</style>

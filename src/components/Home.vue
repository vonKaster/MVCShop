<template>
  <div>
    <v-container>
      <div v-if="!isLoaded" class="text-center">
        <div class="text-center mt-6 text-overline">
        <h2>Cargando Contenido</h2>
        <pulse-loader :color="'#e6105b'"></pulse-loader>
      </div>
      </div>
      <h1 class="text-center" v-if="isLoaded">Productos</h1>
      <div class="d-flex flex-wrap" v-if="isLoaded">
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
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "HomeComponent",
  components: {PulseLoader: PulseLoader},

  data() {
    return {
      isLoaded: false,
    };
  },

  created() {
    document.title = "MVCShop | Inicio";
  },

  mounted() {
    Promise.all([
      products.dispatch("getCategories"),
      products.dispatch("getProducts"),
      products.dispatch("getStock"),
    ]).then(() => {
      this.isLoaded = true;
    });
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

<style scoped>
.productImage {
  width: 300px;
  height: 300px;
}

.theme--dark .v-card {
  background-color: #272727 !important;
}
</style>

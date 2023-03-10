<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <div v-if="!isLoaded" class="text-center">
            <div class="text-center mt-6 text-overline">
              <h2>Cargando Contenido</h2>
              <pulse-loader :color="'#e6105b'"></pulse-loader>
            </div>
          </div>
          <div v-if="isLoaded">
            <h1 class="titulo text-overline text-center">Proveedores</h1>
            <v-card
              style="background-color: #ededed; color: #000000"
              class="mt-4"
              v-for="(provider, index) in getProviders"
              :key="index"
            >
              <v-card-title style="color: #e6105b">
                {{ provider.name }} - N°: {{ provider.id }}
              </v-card-title>
              <v-card-subtitle
                class="d-flex justify-space-between font-weight-bol"
              >
                {{ provider.description }}
              </v-card-subtitle>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import products from "../store/products";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "Providers",
  components: { PulseLoader: PulseLoader },
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {},
  computed: {
    getProviders() {
      console.log("getProviders called");
      return products.state.allProviders;
    },
  },
  created() {
    document.title = "MVCShop | Proveedores";
    console.log("Component created");
    products.dispatch("getProviders");
    this.isLoaded = true;
  },

  async mounted() {
    try {
      await Promise.all([products.dispatch("getProviders")]);
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

.v-card__subtitle {
  color: #000000!important;
}
.theme--dark .v-card__subtitle {
  color: #ffffff !important;
}
</style>

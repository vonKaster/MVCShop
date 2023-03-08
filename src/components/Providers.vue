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
        <h1 class="titulo text-overline text-center">Proovedores</h1>
      </div>
    </v-container>
  </div>
</template>

<script>
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
  },
  created() {
    document.title = "MVCShop | Proveedores";
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

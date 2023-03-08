<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <div class="text-center" v-if="!isLoaded">
          <div class="text-center mt-6 text-overline">
            <h2>Cargando Contenido</h2>
            <pulse-loader :color="'#e6105b'"></pulse-loader>
          </div>
        </div>
          <div v-if="isLoaded">
          <v-btn @click="$router.go(-1)"
            ><v-icon color="black">mdi-chevron-left</v-icon></v-btn
          >
          <div v-if="ventaEncontrada">
            <div class="mt-4">
              <v-card color="#ededed">
                <v-card-title
                  ><h2
                    class="font-weight-bold mb-0"
                    style="color: #e6105b !important"
                  >
                    Comprador
                  </h2></v-card-title
                >

                <div class="d-flex justify-space-between">
                  <v-card-subtitle>
                    <div class="d-flex">
                      <v-avatar
                        ><v-img width="48px" :src="venta.photourl"></v-img
                      ></v-avatar>
                      <h4 class="ms-3 mt-2 text-overline">{{ venta.email }}</h4>
                    </div>
                  </v-card-subtitle>
                  <v-card-subtitle>
                    <h4
                      style="color: #e6105b !important"
                      class="text-overline mt-2"
                    >
                      {{ venta.uid }}
                    </h4>
                  </v-card-subtitle>
                </div>
                <h4 class="text-overline ms-4">{{ venta.displayName }}</h4>
              </v-card>
            </div>

            <div>
              <v-card class="mt-6" color="#ededed">
                <div class="d-flex justify-space-between">
                  <v-card-title
                    ><h2
                      style="color: #e6105b !important"
                      class="font-weight-bold mb-0"
                    >
                      Detalles
                    </h2></v-card-title
                  >
                  <v-card-title>
                    <h3>
                      {{
                        venta.fecha ? venta.fecha.toDate().toLocaleString() : ""
                      }}
                    </h3>
                  </v-card-title>
                </div>
                <h4 class="ms-4 mb-2">
                  Monto Total: ${{ venta.totalPrice }}
                </h4>
                <h4 class="ms-4 mb-2 font-weight-medium">
                  Total de productos: {{ venta.totalProducts }}
                </h4>
                <v-list style="background-color: #f5f5f5">
                  <v-list-item-group>
                    <v-list-item
                      v-for="(producto, index) in venta.productos"
                      :key="index"
                    >
                      <v-list-item-content>
                        <div class="d-flex">
                          <v-img
                            class="mr-4"
                            max-width="48px"
                            :src="producto.imagen"
                          ></v-img>
                          <div></div>
                          <v-list-item-title>{{
                            producto.title
                          }}</v-list-item-title>
                          <v-list-item-title class="font-weight-bold">[{{ producto.quantity }}]</v-list-item-title>
                        </div>
                      </v-list-item-content>
                      <div>
                      </div>
                      <div>
                        <v-list-item-content class="font-weight-bold" style="color: #e6105b!important;">
                          ${{ producto.precio }}
                        </v-list-item-content>
                      </div>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </div>
          </div>

          <div v-else>
            <h1 class="text-center">No se encontró ninguna venta</h1>
          </div>
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
  name: "SalePage",
  components: { PulseLoader: PulseLoader },

  data() {
    return {
      venta: {},
      ventaEncontrada: true,
      isLoaded: false
    };
  },

  created() {
    document.title = "MVCShop | Venta Individual";
    const hash = this.$route.params.hash;
    products
      .dispatch("getSale", hash)
      .then((venta) => {
        if (venta) {
          this.venta = venta;
          this.ventaEncontrada = true;
          console.log(this.venta);
          this.isLoaded = true;
        } else {
          this.ventaEncontrada = false;
        }
      })
      .catch((error) => {
        console.error(error);
        this.ventaEncontrada = false;
      });
  },

  mounted() {
    const hash = this.$route.params.hash;
    console.log("Hash:", hash);
  },

  methods: {},
};
</script>

<style>
.theme--dark .v-card {
  background-color: #272727 !important;
  color: white !important;
}

.theme--dark .v-list {
  background-color: #2e2e2e !important;
  color: white !important;
}
</style>

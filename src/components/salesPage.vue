<template>
  <div>
    <v-btn @click="$router.go(-1)"
      ><v-icon color="black">mdi-chevron-left</v-icon></v-btn
    >
    <div v-if="ventaEncontrada">
      <h1>{{ venta.fecha ? venta.fecha.toDate().toLocaleString() : "" }}</h1>
      <h3>
        <v-img width="48px" :src="venta.photourl"></v-img>Comprador:
        {{ venta.uid }}
      </h3>
      <p>Total de productos: {{ venta.totalProducts }}</p>
      <p>Precio total: {{ venta.totalPrice }}</p>
      <div v-for="(producto, index) in venta.productos" :key="index">
        <v-card>
          <v-img width="48px" :src="producto.imagen"></v-img>
          <p>Nombre: {{ producto.title }}</p>
          <p>Cantidad: {{ producto.quantity }}</p>
          <p>Precio Unitario: {{ producto.precio }}</p>
        </v-card>
      </div>
    </div>
    <div v-else>
      <h1 class="text-center">No se encontró ninguna venta</h1>
    </div>
  </div>
</template>

<script>
import products from "../store/products";

export default {
  name: "SalePage",

  data() {
    return {
      venta: {},
      ventaEncontrada: true,
    };
  },

  created() {
  document.title = "MVCShop | Venta Individual";
  const hash = this.$route.params.hash;
  products.dispatch("getSale", hash)
    .then(venta => {
      if (venta) {
        this.venta = venta;
        this.ventaEncontrada = true;
        console.log(this.venta);
      } else {
        this.ventaEncontrada = false;
      }
    })
    .catch(error => {
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

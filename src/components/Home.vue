<template>
  <div>
    <v-container>
      <div v-if="!isLoaded" class="text-center">
        <div class="text-center mt-6 text-overline">
          <h2>Cargando Contenido</h2>
          <pulse-loader :color="'#e6105b'"></pulse-loader>
        </div>
      </div>
      <h1 class="titulo text-center mb-4 text-overline" v-if="isLoaded">
        Productos
      </h1>
      <div class="d-flex flex-wrap" v-if="isLoaded">
        <v-dialog width="500px" v-model="disableDialog" persistent>
          <v-card class="text-center">
            <v-card-title class="headline"
              >Deshabilitar Producto [{{ productSelected }}]</v-card-title
            >
            <h3>
              <p>¿Estás seguro que deseas inhabilitar este producto?</p>
            </h3>
            <v-card-actions>
              <v-btn
                text
                @click="
                  disableDialog = false;
                  productSelected = null;
                "
                >Cancelar</v-btn
              >
              <v-btn
                color="red"
                text
                @click="
                  toggleStatusProduct(productSelected);
                  disableDialog = false;
                "
                >Confirmar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog width="500px" v-model="changeStockDialog" persistent>
          <v-card class="text-center">
            <v-form
              @submit.prevent="
                updateStock(
                  productSelected,
                  $v.newStock.$model,
                  selectedProvider
                );
                $v.$reset();
              "
            >
              <v-card-title class="headline">
                Cambiar Stock [{{ productSelected }}]
              </v-card-title>
              <h3>
                <p>Cambiar Stock</p>
                <v-text-field
                  type="number"
                  style="width: 400px"
                  class="mx-auto"
                  dense
                  solo
                  v-model="$v.newStock.$model"
                  :error-messages="stockErrors"
                  append-icon="mdi-archive-cog-outline"
                  color="white"
                ></v-text-field>
                <p>Cambiar Proveedor</p>
                <v-select
                  style="width: 400px"
                  class="mx-auto"
                  v-model="selectedProvider"
                  :items="getProviders"
                  item-text="name"
                  item-value="id"
                  label="Proveedores"
                  solo
                ></v-select>
              </h3>
              <v-card-actions>
                <v-btn
                  text
                  @click="
                    changeStockDialog = false;
                    productSelected = null;
                    providerSelected = null;
                    newStock = null;
                    $v.$reset();
                  "
                  >Cancelar</v-btn
                >
                <v-btn type="submit" :disabled="$v.$invalid" color="green" text
                  >Confirmar</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-card
          class="mt-3 mb-3 mx-auto"
          max-width="300"
          v-for="product in getAllProducts"
          :key="product.id"
        >
          <v-img class="productImage mt-2" :src="product.imagen" contain max-height="290px" />
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
            <div v-if="stock.id === product.id">
              <p class="ms-4 mb-0">Producto #{{ product.id }}</p>
              <p class="ms-4 mb-0">Stock: {{ stock.stock }}</p>
              <p class="ms-4 mb-0">
                Categoría:
                {{
                  product.categoria === "men's clothing"
                    ? "Ropa de Hombre"
                    : product.categoria === "jewelery"
                    ? "Joyería"
                    : product.categoria === "electronics"
                    ? "Electrónica"
                    : product.categoria === "women's clothing"
                    ? "Ropa de Mujer"
                    : product.categoria
                }}
              </p>
              <div>
                <div v-for="provider in getProviders" :key="provider.id">
                  <div v-if="provider.id === stock.providerId">
                    <p class="ms-4">Proveedor: {{ provider.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center d-flex pa-1">
            <v-btn
              color="#e6105b"
              text
              class="mx-auto flex-grow-1"
              @click="openChangeStockDialog(product.id)"
            >
              <v-icon class="mr-1">mdi-pencil</v-icon>Editar
            </v-btn>
            <v-btn
              v-if="isLoaded"
              :color="isProductDisabled(product) ? 'success' : 'red'"
              text
              class="mx-auto flex-grow-1"
              @click="
                isProductDisabled(product)
                  ? toggleStatusProduct(product.id)
                  : openDisableDialog(product.id)
              "
            >
              <v-icon class="mr-1">
                {{ isProductDisabled(product) ? "mdi-check" : "mdi-alert" }}
              </v-icon>
              {{ isProductDisabled(product) ? "Habilitar" : "Deshabilitar" }}
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import products from "../store/products";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "HomeComponent",
  components: { PulseLoader: PulseLoader },
  mixins: [validationMixin],

  data() {
    return {
      isLoaded: false,
      disableDialog: false,
      changeStockDialog: false,
      newStock: null,
      productSelected: null,
      selectedProvider: null,
    };
  },

  created() {
    document.title = "MVCShop | Inicio";
  },

  async mounted() {
    try {
      await Promise.all([
        products.dispatch("getCategories"),
        products.dispatch("getProducts"),
        products.dispatch("getStock"),
        products.dispatch("getProviders"),
      ]);
      this.isLoaded = true;
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    getAllProducts() {
      return products.state.allProducts;
    },
    getCategories() {
      return products.state.allCategories;
    },
    getStock() {
      console.log("getStock called");
      return products.state.allStock;
    },
    getProviders() {
      console.log("getProviders called");
      return products.state.allProviders;
    },
    stockErrors() {
      const errors = [];
      if (!this.$v.newStock.$dirty) return errors;
      !this.$v.newStock.required && errors.push("el campo es requerido");
      return errors;
    },
  },

  methods: {
    openDisableDialog(productId) {
      this.disableDialog = true;
      this.productSelected = productId;
    },
    openChangeStockDialog(productId) {
      const stock = this.getStock.find((s) => s.id === productId);
      this.newStock = stock.stock;
      this.selectedProvider = stock.providerId;
      this.changeStockDialog = true;
      this.productSelected = productId;
    },
    isProductDisabled(product) {
      return (
        this.getStock.find((stock) => stock.id === product.id)?.enabled ===
        false
      );
    },
    async toggleStatusProduct(productId) {
      await products.dispatch("toggleStatusProduct", productId);
      this.productSelected = null;
      await products.dispatch("getStock");
    },
    async updateStock(productId, newStock, selectedProvider) {
      await products.dispatch("updateStock", {
        productId,
        newStock,
        selectedProvider,
      });
      this.changeStockDialog = false;
      this.newStock = null;
      this.productSelected = null;
      this.providerSelected = null;
    },
  },
  validations: {
    newStock: { required },
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

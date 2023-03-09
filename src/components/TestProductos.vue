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
        <v-dialog width="500px" v-model="editDialog" persistent>
          <v-card class="text-center">
            <v-form
              @submit.prevent="
                editingProduct
                  ? editProduct(productData)
                  : addProduct(productData)
              "
            >
              <v-card-title class="headline">
                {{
                  editingProduct
                    ? "Editar Producto [" + productSelected + "]"
                    : "Agregar Producto"
                }}
              </v-card-title>
              <h3>
                <p>Nombre</p>
              </h3>
              <v-text-field
                type="text"
                style="width: 400px"
                class="mx-auto"
                dense
                solo
                v-model="productData.title"
                append-icon="mdi-rename-box"
              ></v-text-field>

              <h3>
                <p>Descripción</p>
              </h3>
              <v-text-field
                type="text"
                style="width: 400px"
                class="mx-auto"
                dense
                solo
                v-model="productData.description"
                append-icon="mdi-file-document-edit"
              ></v-text-field>

              <h3>
                <p>Imagen (URL)</p>
              </h3>
              <v-text-field
                type="text"
                style="width: 400px"
                class="mx-auto"
                dense
                solo
                v-model="productData.image"
                append-icon="mdi-image-edit"
              ></v-text-field>

              <h3>
                <p>Categoría</p>
              </h3>
              <v-text-field
                type="text"
                style="width: 400px"
                class="mx-auto"
                dense
                solo
                v-model="productData.category"
                append-icon="mdi-application-edit"
              ></v-text-field>

              <h3>
                <p>Precio</p>
              </h3>
              <v-text-field
                type="text"
                style="width: 400px"
                class="mx-auto"
                dense
                solo
                v-model="productData.price"
                append-icon="mdi-cash"
              ></v-text-field>

              <v-card-actions>
                <v-btn
                  text
                  @click="
                    editDialog = false;
                    if (editingProduct) editingProduct = false;
                  "
                  >Cancelar</v-btn
                >
                <v-btn type="submit" color="green" text>Confirmar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <h1 class="text-center titulo text-overline mb-4">Test Productos</h1>
        <div class="text-center mb-4">
          <v-btn color="#e6105b" style="color: #ffffff" @click="openAddDialog()"
            >Agregar Productos</v-btn
          >
        </div>

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
            <p class="ms-4 mb-2">Producto #{{ product.id }}</p>
            <p class="ms-4 mb-2" style="overflow-y: scroll; height: 100px">
              {{ product.descripcion }}
            </p>
            <p class="ms-4">
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
            <p class="ms-4 mb-2">${{ product.precio }}</p>
            <div class="text-center d-flex pa-1">
              <v-btn
                color="#e6105b"
                text
                class="mx-auto flex-grow-1"
                @click="openEditDialog(product.id)"
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
      editDialog: false,
      productSelected: null,
      productData: {
        id: null,
        title: null,
        description: null,
        image: null,
        category: null,
        price: null,
      },
      editingProduct: false,
    };
  },
  methods: {
    async deleteProduct(productId) {
      await products.dispatch("deleteProduct", productId);
    },
    openEditDialog(productId) {
      this.editingProduct = true;
      this.editDialog = true;
      this.productSelected = productId;
    },
    openAddDialog() {
      this.editDialog = true;
    },
    async addProduct(data) {
      this.editDialog = false;
      await products.dispatch("addProduct", data);
      this.productSelected = null;
      this.productData = {
        id: null,
        title: null,
        description: null,
        image: null,
        category: null,
        price: null,
      };
    },
    async editProduct(data) {
      this.editDialog = false;
      data.id = this.productSelected;
      console.log(data.id);
      console.log("DATA COMPONENTE", data);
      await products.dispatch("editProduct", data);
      this.productSelected = null;
      this.productData = {
        id: null,
        title: null,
        description: null,
        image: null,
        category: null,
        price: null,
      };
      this.editingProduct = false;
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

<template>
  <v-app>
    <navBar />
    <v-main>
      <router-view/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import navBar from './components/navBar.vue';
import Footer from "./components/Footer.vue";

export default {
  name: 'App',
  components: {navBar, Footer},

  data: () => ({
    //
  }),
};
</script>

<style>
@media (min-width: 768px) {
  main {
    padding: 96px 96px 10px 96px!important;
  }
}

.v-messages__message {
  color: #e6105b;
  font-size: 0.75rem !important;
  font-weight: 500!important;
  line-height: 2rem!important;
  letter-spacing: 0.1666666667em !important;
  font-family: "Roboto", sans-serif !important;
  text-transform: uppercase !important;
}

.v-input__icon ::before {
  color: #e6105b !important;
}

</style>

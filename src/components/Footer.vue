<template>
  <v-footer :dark="$vuetify.theme.dark" color="#ffffff" class="elevation-3" padless>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} —
      <strong
        ><a
          class="footerLink"
          target="_blank"
          href="https://github.com/vonKaster"
          >vonKaster</a
        >
        (Front-End Rookie for Digicard)</strong
      >
    </v-col>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",

};
</script>

<style>
.footerLink {
  color: #e6105b !important;
  text-decoration: none;
}

.theme--dark .v-footer {
  background-color: #272727 !important;
  color: white!important;
}
</style>

<template>
  <v-footer :dark="$vuetify.theme.dark" color="#e6105b" padless>
    <v-col class="text-center white--text" cols="12">
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
  color: black !important;
  text-decoration: none;
}
</style>

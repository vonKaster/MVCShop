<template>
  <div>
    <v-app-bar class="marginBottom elevation-0" app fixed color="white" dark>
      <v-toolbar-title>
        <router-link :to="{ name: 'home' }">
          <img class="mt-2" :src="require('../assets/logodigicard.png')" />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-menu
        offset-y
        v-if="!showMenu && $vuetify.breakpoint.smAndDown"
        bottom
        left
      >
        <template v-slot:activator="{ on }">
          <v-btn color="#e6105b" v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list color="#e6105b">
          <v-list-item
            class="px-5 white--text font-weight-bold"
            :to="{ name: 'home' }"
            >Inicio</v-list-item
          >
          <v-list-item
            v-if="!userExists"
            class="px-5 white--text font-weight-bold"
            :to="{ name: 'login' }"
            >Ingresar</v-list-item
          >
          <v-list-item
            v-if="!userExists"
            class="px-5 white--text font-weight-bold"
            :to="{ name: 'register' }"
            >Registro</v-list-item
          >
          <v-list-item
            v-if="userExists"
            class="px-5 white--text font-weight-bold"
            :to="{ name: 'profile' }"
            >Perfil</v-list-item
          >
          <v-list-item
            v-if="userExists"
            class="px-5 white--text font-weight-bold"
            @click="signOut()"
            >Cerrar Sesión</v-list-item
          >
        </v-list>
      </v-menu>
      <v-toolbar-items v-if="!showMenu && $vuetify.breakpoint.mdAndUp">
        <v-btn color="#e6105b" text v-if="userExists" :to="{ name: 'home' }"
          ><v-icon class="mr-1">mdi-home</v-icon>Inicio</v-btn
        >
        <v-btn color="#e6105b" class="text-red" text v-if="!userExists" :to="{ name: 'login' }"
          ><v-icon class="mr-1">mdi-login</v-icon>Ingresar</v-btn
        >
        <v-btn color="#e6105b" text v-if="!userExists" :to="{ name: 'register' }"
          ><v-icon class="mr-1">mdi-account-plus</v-icon>Registro</v-btn
        >
        <v-btn color="#e6105b" text v-if="userExists" :to="{ path: 'profile' }"
          ><v-avatar color="#d9d9d9" size="24" class="mr-1"><img :src="user.photosrc"/></v-avatar>Perfil</v-btn
        >
        <v-btn @click="signOut()" text v-if="userExists" color="red"
          ><v-icon class="mr-1">mdi-logout</v-icon>cerrar sesión</v-btn
        >
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "navBar",
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    ...mapActions(["signOut"]),
  },
  computed: {
    ...mapGetters(["userExists"]),
    ...mapState(["user"])
  },
};
</script>

<style>
</style>

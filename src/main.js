import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMeta from "vue-meta";
import Vuelidate from 'vuelidate'
import { auth } from "./firebase";

Vue.config.productionTip = false
Vue.use(VueMeta);
Vue.use(Vuelidate);

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    const detectedUser = {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photosrc: user.photoURL,
      provider: user.providerData[0].providerId
    };
    store.dispatch("detectUser", detectedUser);
  } else {
    store.dispatch("detectUser", user);
  }

  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
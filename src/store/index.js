import Vue from "vue";
import Vuex from "vuex";
import {
  db,
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "../firebase";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    success: null,
    loader: false,
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setSuccess(state, payload) {
      state.success = payload;
    },
  },
  actions: {
    createUser({ commit }, credentials) {
      auth
        .createUserWithEmailAndPassword(credentials.email, credentials.passwd)
        .then((res) => {
          console.log(res);
          auth.currentUser.updateProfile({
            displayName: credentials.name,
            photoURL: 'https://raw.githubusercontent.com/vonKaster/CRUDFirebase/204e35cdc01abf6dd34869facb8badcde772b7a7/src/assets/user.jpg'
          })
          const createdUser = {
            email: res.user.email,
            uid: res.additionalUserInfo.uid,
            photosrc: res.photoURL
          };
          db.collection(res.user.email).add({
              name: "Tarea de ejemplo",
            })
            
            .then((dic) => {
              commit("setUser", createdUser);
              router.push("/");
              location.reload();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
          commit("setError", err.code);
        });
    },
    signIn({ commit }, { provider, credentials }) {
      let authPromise = null;
      if (provider === "email") {
        authPromise = auth.signInWithEmailAndPassword(
          credentials.email,
          credentials.passwd
        );
      } else if (provider === "google") {
        const provider = new GoogleAuthProvider();
        authPromise = auth.signInWithPopup(provider);
      } else if (provider === "facebook") {
        const provider = new FacebookAuthProvider();
        authPromise = auth.signInWithPopup(provider);
      } else if (provider === "github") {
        const provider = new GithubAuthProvider();
        authPromise = auth.signInWithPopup(provider);
      } else {
        console.error("Invalid provider");
        return;
      }

      authPromise
        .then((res) => {
          console.log(res);
          const userLoggedIn = {
            email: res.user.email,
            uid: res.additionalUserInfo.uid,
          };
          commit("setUser", userLoggedIn);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          commit("setError", err.code);
        });
    },

    signOut({ commit }) {
      auth.signOut().then(() => {
        router.push("/login");
      });
    },
    detectUser({ commit }, user) {
      commit("setUser", user);
    },
    changeUserName({ commit }, name){
      if (name.length >= 3 && name.length < 24) {
        auth.currentUser.updateProfile({
          displayName: name
        }).then(() => {
          commit("setSuccess", "nameSuccess");
          commit("setError", null);
        }).catch((error) => {
          console.log(error)
        });
      } else {
        commit("setError", "nameErr");
        console.log("hola")
        commit("setSuccess", null);
      }
    },
    changePassword ({ commit }, newPassword) {
      auth.currentUser.updatePassword(newPassword).then(function() {
        commit("setError", null);
        commit("setSuccess", "passwdSuccess");
      }).catch(function(error) {
        console.log(error);
        commit("setError", error.code);
      });
    }
  },
  modules: {},
  getters: {
    userExists(state) {
      if (state.user === null) {
        return false;
      } else {
        return true;
      }
    },
  }
});

<template>
  <nav>
    <b-navbar toggleable="md">
      <b-navbar-brand>
        <router-link to="/" class="nav-brand">
          <ChefHat class="logo" />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link
              to="/recipes"
              class="nav-link"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              >Recipes</router-link
            >
          </b-nav-item>
          <b-nav-item>
            <a
              @click="authFunction"
              class="nav-link logout-link"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              >{{ logDisplay }}</a
            >
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </nav>
</template>

<script>
import firebase from 'firebase'
import ChefHat from '../assets/chefhat.svg'

export default {
  components: { ChefHat },
  data() {
    return {
      isAuthenticated: false,
      logDisplay: 'Sign In',
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuthenticated = true
        this.logDisplay = 'Sign Out'
      }
    })
  },
  methods: {
    authFunction() {
      if (this.isAuthenticated) {
        firebase.auth().signOut()
        this.logDisplay = 'Sign In'
        console.log('user signed out')
      }
      this.$router.push({ path: '/' })
    },
  },
}
</script>

<style lang="scss">
.nav-brand:hover {
  background: #222;
  fill: #f4f4f4;
}
</style>

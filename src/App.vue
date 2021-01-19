<template>
  <div id="app">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">Internet Cookbook</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="nav ">
        <li class="nav-item">
          <router-link to="/recipes" class="nav-link">Recipes</router-link>
        </li>
        <li class="nav-item">
          <a @click="authFunction" class="nav-link logout-link">{{logDisplay}}</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <div class="container">
    <router-view/>
  </div>
  </div>
</template>
<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      isAuthenticated: false,
      logDisplay: 'Sign In'
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.isAuthenticated = true
        this.logDisplay = "Sign Out"
      }
    })
  },
  methods: {
    authFunction() {
      if(this.isAuthenticated) {
        firebase.auth().signOut()
        this.logDisplay = "Sign In"
        console.log('user signed out')
      }
      this.$router.push({path: "/"}) 
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 300;
  // background: #fff3e6; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }
  
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.logout-link {
  cursor: pointer;
}
</style>

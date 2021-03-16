<template>
  <div id="app">
    <Navbar />
    <div>
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer'

export default {
  components: { Navbar, Footer },
}
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }
}
a {
  text-decoration: none;
  color: #222 !important;
  padding: 1rem;
  &:hover {
    color: #f4f4f4 !important;
    background: #222 !important;
    text-decoration: none !important;
  }
}

p {
  font-size: 1.2rem;
}
h1 {
  color: black;
}
</style>

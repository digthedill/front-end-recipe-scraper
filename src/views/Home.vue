<template>
  <div class="home-wrapper">
    <h1 class="title">Dill's Recipe Scrapper</h1>
    <p class="subtitle">
      A home for your favorite recipes from across the internet
    </p>
    <div class="home-content rounded">
      <ChefSvg />

      <div class="sign-in-container">
        <div class="authorization">
          <Auth />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../components/Auth'
import ChefSvg from '../assets/chefwithtray.svg'

export default {
  name: 'Home',
  components: {
    Auth,
    ChefSvg,
  },
}
</script>

<style lang="scss">
.home-wrapper {
  min-height: 100vh;
  background-color: #f0e2d050;
  background-image: -webkit-linear-gradient(70deg, #62959c 50%, #f0e2d0 50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 60%;
    max-width: 500px;
  }
}
.home-content {
  background: #f4f4f4d7;
  padding: 2rem 1rem;
  margin: 2rem;
}
.title {
  margin: 1rem 0;
  color: black;
}
.subtitle {
  margin: 0;
}
</style>

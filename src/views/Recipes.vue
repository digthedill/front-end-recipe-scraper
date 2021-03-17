<template>
  <div class="recipes-outer-shell">
    <div class="container">
      <h1>
        {{
          uid.length ? `${user.displayName}'s Cookbook` : 'Login to use the app'
        }}
      </h1>
      <img
        src="https://media.giphy.com/media/rdQQkmjvt71iE/giphy.gif"
        alt="silly food gif"
        class="img-fluid"
        v-if="uid.length === 0"
      />
      <p class="about-the-app" v-if="uid.length === 0">
        Dill's Recipe Scraper allows you to save your favorite recipes that are
        scattered across the web. After you log in, all you need to do is paste
        in the url of your favorite recipe. DR Scraper will save the recipe
        right here in the app, and it will be ready to go whenever you come
        back!
      </p>
      <form @submit.prevent="addToDatabase" v-if="uid.length > 0">
        <div class="form-group">
          <label for="recipeURL">Enter the url of your favorite recipe</label>
          <input
            class="form-control"
            type="url"
            id="recipeURL"
            v-model="recipeURL"
            name="recipeURL"
            placeholder="https://cooking.nytimes.com/recipes/1015257-falafel"
          />
          <button type="submit" id="submit-btn" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <p v-if="errorMsg.length">{{ errorMsg }}</p>

      <display-all-recipes :apiCall="sentToApi"></display-all-recipes>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import DisplayAllRecipes from '../components/Display-All-Recipes.vue'
import { EventBus } from '../helpers/event-bus'
const API_URL = 'https://still-wildwood-69551.herokuapp.com/recipe-scraper'

export default {
  name: 'recipe-page',
  components: {
    DisplayAllRecipes,
  },
  data() {
    return {
      recipeURL: '',
      user: {},
      uid: '',
      sentToApi: false,
      errorMsg: '',
    }
  },
  created() {
    EventBus.$on('cannotScrape', () => {
      this.errorMsg =
        "Sorry. Your recipe couldn't be loaded with our tech. Try another recipe from a different website."
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.uid = user.uid
      }
    })
  },
  methods: {
    async addToDatabase() {
      //setup duplicate prevention
      this.errorMsg = ''
      if (!this.recipeURL.length) {
        return new Error('nope')
      }
      this.sentToApi = true
      const request = new Request(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: this.recipeURL, uid: this.uid }),
      })

      const res = await fetch(request)
      if (res) {
        this.submitted = true
        // console.log("url sent to server!", this.recipeURL)
      }
      this.recipeURL = ''
    },
  },
}
</script>

<style lang="scss">
.recipes-outer-shell {
  min-height: 100vh;
  background-color: #f0e2d050;
  background-image: -webkit-linear-gradient(70deg, #62959c 50%, #f0e2d0 50%);
}
.container {
  padding: 7rem 0;
  background: rgba($color: #fff, $alpha: 0.5);
}
label {
  font-size: 1.2rem;
}
form {
  text-align: left;
  padding: 1rem;
}

input {
  margin: 1rem 0;
}

.about-the-app {
  max-width: 400px;
  margin: 3rem auto;
}
</style>

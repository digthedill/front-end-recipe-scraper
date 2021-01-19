<template>
  <div class="main">
    <h1>{{uid.length ? `${user.displayName}'s Cookbook` : "Login to use the app"}}</h1>
    <img src="https://media.giphy.com/media/rdQQkmjvt71iE/giphy.gif" alt="silly food gif" class="img-fluid" v-if="uid.length === 0">
    <p class="about-the-app" v-if="uid.length === 0">Internet Cookbook allows you to save your favorite recipes that are scattered across the web. After you log in, all you need to do is paste in the url of you favorite recipe. Then Internet Cookbook will save the recipe right here in the app, and it will be ready to go whenever you come back!</p>
    <form @submit.prevent="addToDatabase" v-if="uid.length > 0">
      <div class="form-group">
      <label for="recipeURL">Enter the url of your favorite recipe</label>
      <input class="form-control" type="url" id="recipeURL" v-model="recipeURL" name="recipeURL" placeholder="https://cooking.nytimes.com/recipes/1015257-falafel" />
      <button type="submit" id="submit-btn" class="btn btn-primary">Submit</button>
      </div> 
    </form>  
    <p v-if="errorMsg.length && sentToApi === true">{{errorMsg}}</p>
    <display-all-recipes :apiCall="sentToApi"></display-all-recipes>
  </div>
</template>

<script>

import firebase from 'firebase'
import DisplayAllRecipes from '../components/Display-All-Recipes.vue'
const API_URL = 'https://still-wildwood-69551.herokuapp.com/recipe-scraper'


export default {
  name: 'recipe-page',
  components: {
    DisplayAllRecipes,
  },
  data() {
    return{
      recipeURL: '',
      user: {},
      uid: '',
      sentToApi: false,
      errorMsg: ''
    }
  },
  created() {
       firebase.auth().onAuthStateChanged(user => {
           if (user) {
               this.user = user;
               this.uid = user.uid
           }
       });
   },
  methods: {
    async addToDatabase(){
      //setup duplicate prevention 
      this.errorMsg = ''
      if(!this.recipeURL.length){
        return new Error("nope")
      }
      this.sentToApi = true
      const request = new Request(API_URL, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({url: this.recipeURL, uid: this.uid})
      })

      const res = await fetch(request)
      if(res){
        this.submitted = true
        // console.log("url sent to server!", this.recipeURL)
      }
      this.recipeURL = ''
      // this.sendError()

    },
    sendError() {
      setTimeout(() => {
        if(this.sentToApi) {
          this.errorMsg = "Sorry. Your recipe couldn't be loaded with our tech. Try another recipe from a different website."
        } else {
           this.errorMsg = ""
        }
      }, 4000)
    }
  },
}
</script>


<style lang="scss">
  .main {
    margin: 4rem 0;
      }
  label {
    font-size: 1.2rem;
  }
  form{
    text-align: left;
    padding: 1rem 0;
  }

  input {
    margin: 1rem 0;
  }

  .about-the-app {
    max-width: 780px; 
	    margin: 3rem auto;
	    float: none;
  }
</style>
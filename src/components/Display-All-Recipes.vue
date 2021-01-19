<template>

<div class="container">
      <div class="spinner-border" role="status" v-if="isLoading || $attrs.apiCall">
      <span class="sr-only"></span>
      </div>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" v-if="!isLoading">
    <div v-for="(recipe, i) in userRecipes" :key="i" class="col mb-4">
      <!-- create standarized card component -->
      <div class="card bg-light" id="card-component">
      <router-link v-if="typeof recipe.id !== 'undefiend'" :to="{name: 'full recipe', path: `/recipes/${recipe.id}`, params: {recipe, recipeReference}}">
        <div class="card-body">
        <h4 class="card-title">{{recipe.title}}</h4>
        </div>
        <img :src="recipe.image" class="card-img-bottom rounded" />
      </router-link>
      </div>
    </div>
    </div>
</div>
</template>

<script>
import firebase from 'firebase/app'
import {db} from '../helpers/db'
const recipesRef = db.collection("recipes")

export default {
    name: 'recipe-gallery',
    data(){
      return {
        userId: '',
        user: {},
        userRecipes: [],
        isLoading: false,
        recipeReference: recipesRef,
      }
    },
    methods: {
      setIsLoading(bool){
        this.isLoading = bool
      }
    },
    created() {
       firebase.auth().onAuthStateChanged(user => {
           if (user) {
               this.user = user;
               this.userId = user.uid
           }
            recipesRef.where("uid", "==", this.userId)
              .onSnapshot(snap => {   
                this.setIsLoading(true)
                snap.docChanges().forEach(change => {
                  if(change.type === "added"){
                    const recipeObj = change.doc.data()
                    recipeObj.id = change.doc.id
                    this.userRecipes.push(recipeObj)
                  }
                })
                this.setIsLoading(false)
                this.$attrs.apiCall = false

            })
        })
      },
      
}
</script>
<style lang="scss">
    
    #card-component {
      // margin: 1rem;
      border: none;
      // text-align: left;
    }
  
    a {
      text-decoration: none;
    }
   

</style>
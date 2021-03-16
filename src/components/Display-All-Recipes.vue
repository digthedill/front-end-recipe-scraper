<template>
  <div class="all-recipes-wrapper">
    <div
      class="spinner-border"
      role="status"
      v-if="isLoading || $attrs.apiCall"
    >
      <span class="sr-only"></span>
    </div>
    <div
      class="row display-flex row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"
      v-if="!isLoading"
    >
      <div
        v-for="(recipe, i) in userRecipes"
        :key="i"
        class="col-xs-6 col-md-4"
      >
        <!-- standarized card component -->
        <div class="card card-component">
          <router-link
            v-if="typeof recipe.id !== 'undefiend'"
            :to="{
              name: 'full recipe',
              path: `/recipes/${recipe.id}`,
              params: { recipe, recipeReference },
            }"
          >
            <div class="">
              <div class="card-body">
                <h5 class="card-title">{{ recipe.title }}</h5>
              </div>
              <div class="img-wrapper">
                <img
                  :src="recipe.image"
                  class="card-img-top embed-responsive-item rounded"
                  id="image-square"
                  :alt="recipe.title"
                />
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '../helpers/db'
import { EventBus } from '../helpers/event-bus'
const recipesRef = db.collection('recipes')

export default {
  name: 'recipe-gallery',
  data() {
    return {
      userId: '',
      user: {},
      userRecipes: [],
      isLoading: false,
      recipeReference: recipesRef,
    }
  },
  methods: {
    setIsLoading(bool) {
      this.isLoading = bool
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.userId = user.uid
      }
      recipesRef.where('uid', '==', this.userId).onSnapshot((snap) => {
        this.setIsLoading(true)
        snap.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const recipeObj = change.doc.data()
            recipeObj.id = change.doc.id
            // add logic to see if fields were added
            if (
              recipeObj.steps.length === 0 ||
              recipeObj.ingredients.length === 0
            ) {
              //emit to parent about the error message
              EventBus.$emit('cannotScrape')
              //delete the id from the database
              recipesRef
                .doc(recipeObj.id)
                .delete()
                .then(() => console.log('Deleted the Unscrappable'))
            } else {
              this.userRecipes.push(recipeObj)
            }
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
.all-recipes-wrapper {
  min-height: 80vh;
}
.display-flex {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
}
[class*='col-'] {
  margin-bottom: 15px;
}
.card-component {
  height: 100%;
  padding: 0.7rem;
}
#image-square {
  max-height: 14rem;
  object-fit: cover;
}
a {
  text-decoration: none;
}
</style>

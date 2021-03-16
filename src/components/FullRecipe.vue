<template>
  <div class="recipe-container">
    <div class="container p-2">
      <div class="row align-items-center">
        <div class="title-description col-sm">
          <h2>{{ fullRecipe.title }}</h2>
          <p>{{ fullRecipe.description }}</p>
          <a :href="fullRecipe.srcUrl" target="_blank" class="og-recipe-link"
            >Original Recipe</a
          >
          <br /><br />
        </div>
        <div class="img-container col-sm">
          <img
            :src="fullRecipe.image"
            :alt="fullRecipe.title"
            class="img-fluid rounded main-img"
          />
        </div>
      </div>
      <hr />
      <div class="recipe-how-to row">
        <div class="ingredients-container col-sm">
          <h3>Ingredients</h3>
          <ul>
            <li v-for="(ingredient, i) in fullRecipe.ingredients" :key="i">
              {{ ingredient }}
            </li>
          </ul>
        </div>
        <div class="steps-container col-sm">
          <h3>Steps</h3>
          <ol class="recipe-steps">
            <li v-for="(step, i) in fullRecipe.steps" :key="i">
              {{ step }}
            </li>
          </ol>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col">
          <router-link to="/recipes"
            ><button class="btn btn-secondary">
              To the Cookbook
            </button></router-link
          >
        </div>
        <div class="col">
          <button class="btn btn-warning col-sm" @click="deleteRecipe">
            Delete Recipe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Full-Recipe-Component',
  data() {
    return {
      fullRecipe: this.$route.params.recipe,
      recipeRef: this.$route.params.recipeReference,
    }
  },
  methods: {
    deleteRecipe() {
      this.recipeRef
        .doc(this.fullRecipe.id)
        .delete()
        .then(function () {
          console.log('Deleted!')
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
      this.$router.push({ path: '/recipes' })
    },
  },
}
</script>

<style lang="scss">
.recipe-container {
  margin-top: 1rem;
  min-height: 100vh;
  background-color: #f0e2d050;
  background-image: -webkit-linear-gradient(70deg, #62959c 50%, #f0e2d0 50%);
  padding: 0.8rem;
  p & li {
    letter-spacing: 0.1rem;
    line-height: 2rem;
  }
}
.recipe-how-to {
  text-align: left;
  display: flex;
}

.title-img-container {
  display: flex;
}
.title-description {
  // padding: 0 6rem 0 6rem;
  margin-top: 2rem;
  h2 {
    margin: 0.7rem 0 1rem 0;
    text-transform: bold;
  }
}
.og-recipe-link {
  background: rgb(168, 168, 253);
  color: #000;
  padding: 0.5rem;
  margin: 1rem;
}
.og-recipe-link:hover {
  color: #f4f4f4;
  background: rgb(255, 101, 101);
}
.back {
  font-size: 2rem;
  font-weight: 100;
}

.ingredients-container {
  .ingredients {
    padding: 0.8rem 0;
    text-align: left;
  }
  ul {
    list-style: disc;
  }
  li {
    margin: 0.5rem 0;
    font-size: 1rem;
    line-height: 2rem;
  }
}
.recipe-steps {
  max-width: 800px;
  li {
    margin: 0.5rem 0;
  }
}
.main-img {
  max-height: 440px;
  max-width: 550px;
  padding: 1rem;
}
</style>

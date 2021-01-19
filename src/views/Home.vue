<template>
      <div class="home-content">
    <img class="img-fluid" id="hero-img" src="https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80"  />
    <div class="sign-in-container">
    <h1 class="info">Internet Cookbook</h1>
    <div class="authorization">
      <Auth />
      </div>
    </div>
   
    <div class="info-text">
       <hr>
      <p>While we're still starting out, not every site is going to work with the app. Right now we accept most websites and blogs, but know that your recipe website might not work. If you want to add your favorite recipes website, email me: digthedill@gmail.com, and I'll make sure our app can handle it! </p>
      <p><strong>Thanks for checking us out!</strong></p>
    </div>
  </div>
</template>

<script>
import Auth from '../components/Auth'

export default {
  name: 'Home',
  components: {
    Auth
  },
}
</script>

<style lang="scss">
@media only screen and (max-width: 500px){
  .home-content {
    margin-top: 3rem;
  }
}
@media only screen and (max-width: 760px){
    
      #hero-img {
        width: 100%;
       
      }
    }
@media only screen and (max-width: 1100px){
      #hero-img {
        width: 100%;
        margin: 2rem 0;
      }
    }  
  .home-content {
          margin: 4rem 0;

    img {
      width: 60%;
    }
  
  }
  .info {
    margin: 1rem 0;
  }
  .info-text {
    max-width: 780px; 
	margin: 11rem auto !important; 
	float: none !important; 
  }
</style>  
<template lang="html">
<section id="firebaseui-auth-container"></section>
</template>

<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";


export default {
    name: 'auth',
    mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    const uiConfig = {
      signInSuccessUrl: '/recipes',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
      };
    ui.start('#firebaseui-auth-container', uiConfig);
    },
}
</script>

<style>
/* @import url('../../node_modules/firebaseui/dist/firebaseui.css'); */
</style>
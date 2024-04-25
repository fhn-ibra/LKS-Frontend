<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top" v-if="$route.name != null && $route.name != 'login' && $route.name != 'register'">
    <div class="container">
      <a class="navbar-brand" href="homepage.html">Facegram</a>
      <div class="navbar-nav">
        <a class="nav-link" href="my-profile.html">@{{ username }}</a>
        <a class="nav-link" href="#" @click="logout()">Logout</a>
      </div>
    </div>
  </nav>

  <div class="alert alert-danger" v-if="$route.name == null">
    Page Not Found. <a href="/login"><b>Go Back</b></a>
  </div>

  <RouterView />
</template>

<style scoped></style>

<script>
import axios from 'axios'
import router from './router';
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username')
    }
  },

  mounted() {
      
  },


  methods: {
    logout() {
      axios.post('http://localhost:8000/api/v1/auth/logout', null, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
        .then((response) => {
          console.log(response);
          localStorage.clear();
          router.push('/login');
        })
        .catch((error) => {
          console.log(error);
        })
    },
  },
}
</script>

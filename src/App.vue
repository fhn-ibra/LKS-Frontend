<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top" v-if="$route.name != null && $route.name != 'login'">
    <div class="container">
        <a class="navbar-brand" href="homepage.html">Facegram</a>
        <div class="navbar-nav">
            <a class="nav-link" href="my-profile.html">@{{username}}</a>
            <a class="nav-link" href="#" @click="logout()">Logout</a>
        </div>
    </div>
</nav>  

  <RouterView />
</template>

<style scoped>

</style>

<script>
import axios from 'axios'
import router from './router';
export default {
  data(){
    return{
      token: '',
      username: localStorage.getItem('username')
    }
  },
  
  mounted(){
    this.token = localStorage.getItem('token');
    if(this.token == null){
      console.log(true);
      router.push('/login');
    } else {
      axios.get('http://localhost:8000/api/user', {
        'headers': {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then((response) => {
        console.log(response);

          // router.push(`/users/${response.data.username}`);
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
        router.push('/login');
      })
    }
  },


  methods: {
    logout(){
      axios.post('http://localhost:8000/api/v1/auth/logout',null, {
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
    }
  },
}
</script>

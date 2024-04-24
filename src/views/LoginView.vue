<template lang="">
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div class="container">
                <a class="navbar-brand m-auto" href="index.html">Facegram</a>
            </div>
        </nav>
        
        <main class="mt-5">
            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-md-5">
                        <div class="card">
                            <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                <h5 class="mb-0">Login</h5>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-danger" v-if="errors">{{ errors }}</div>
                                <form @submit.prevent="submit">
                                    <div class="mb-2">
                                        <label for="username">Username</label>
                                        <input type="text" class="form-control" v-model="username"/>
                                    </div>
        
                                    <div class="mb-3">
                                        <label for="password">Password</label>
                                        <input type="password" class="form-control" v-model="password"/>
                                    </div>
        
                                    <button type="submit" class="btn btn-primary w-100">
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
        
                        <div class="text-center mt-4">
                            Don't have account? <a href="register.html">Register</a>
                        </div>
        
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import axios from 'axios';
import router from '@/router';

export default {
    data(){
        return{
            'username': '',
            'password': '',
            'errors': false,
            'token': null
        }
    },

    methods: {
        submit(){
            axios.post('http://localhost:8000/api/v1/auth/login', {
                'username': this.username,
                'password': this.password
            })
            .then((response) => {
                console.log(response);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', this.username);
                router.go('/users/', this.username);
            })
            .catch((error) => {
                console.log(error);
                    this.errors = error.response.data.message;
            })
            ;
        }
    },

    mounted(){
        if(localStorage.getItem('token') != null){
            router.push(`/users/${localStorage.getItem('username')}`);
        }
    }
}
</script>
<style lang="">
    
</style>
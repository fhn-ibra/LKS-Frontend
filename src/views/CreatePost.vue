<template lang="">
    <main class="mt-5">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="alert alert-success" v-if="(error == false) && (message != null)">{{message}}</div>
                    <div class="alert alert-danger" v-if="(error == true) && (message.caption[0] != null )">{{message.caption[0]}}</div>
                    <div class="alert alert-danger" v-if="(error == true) && (message.attachments[0] != null )">{{message.attachments[0]}}</div>
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                            <h5 class="mb-0">Create new post</h5>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="submit">
                                <div class="mb-2">
                                    <label for="caption">Caption</label>
                                    <textarea class="form-control" name="caption" id="caption" cols="30" rows="3" v-model="caption" required></textarea>
                                </div>
    
                                <div class="mb-3">
                                    <label for="attachments">Image(s)</label>
                                    <!-- Pelajari Ini -->
                                    <input type="file" class="form-control" id="attachments" name="attachments" multiple @change="file"/>
                                </div>
    
                                <button type="submit" class="btn btn-primary w-100">
                                    Share
                                </button>
                            </form>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import router from '@/router';
import axios from 'axios';

export default {
    data(){
        return{
            caption: '',
            photo: [],
            token: '',
            message: null,
            error: false
        }
    },

    methods:{
        cek() {
            this.token = localStorage.getItem('token');
            if (this.token == null) {
                localStorage.clear();
                router.push('/login');
            } else {
                axios.get('http://localhost:8000/api/user', {
                    'headers': {
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                    .then((response) => {

                    })
                    .catch((error) => {

                        localStorage.clear();
                        router.push('/login');
                    })
            }
        },
        
        //Ini juga
        file(e){
            this.photo = e.target.files;
        },

        submit(){
            axios.post('http://localhost:8000/api/v1/posts', {
                caption: this.caption,
                attachments: this.photo
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    //Note : Headaers Content-type dibutuhin buat kirim file
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log(response);
                this.message = response.data.message;
            })
            .catch((error) => {
                console.log(error);
                this.message = error.response.data.errors;
                this.error = true;
            })
        }
    },

    mounted(){
        this.cek();
    }
}
</script>
<style lang="">
    
</style>
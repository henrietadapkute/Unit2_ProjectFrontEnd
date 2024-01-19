<script setup>
import { onMounted, ref } from 'vue';
import { useCookies } from 'vue3-cookies';
import { decodeCredential , googleLogout } from 'vue3-google-login';

const { cookies } = useCookies()

let isLoggedin = ref(false)
let userName = ''

let callback = (response) => {
    isLoggedin.value = true;
    const userData = decodeCredential(response.credential);
    console.log(userData);
    userName = userData.given_name;
    cookies.set('user_session', response.credential);

    fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userEmail: userData.email
        })
    })
    .then(() => {
        console.log('Session saved I guess');
    })
    .catch(err => console.error(err));
};

const checkSession = () => {
    if ( cookies.isKey('user_session') ) {
        isLoggedin.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName = userData.given_name
    }
}

const handleLogout = () => {
    googleLogout()
    cookies.remove('user_session')
    isLoggedin.value = false
}

onMounted(checkSession)

</script>

<template>
    <div class="login-container">
    <div v-if="isLoggedin">
    <h3>Hello, {{ userName }}</h3> 
    <button @click="handleLogout" type="button" class="btn btn-outline-success">Log Out</button>
    </div>
    <div v-else>
        <GoogleLogin :callback="callback" />
    </div>
</div>
</template>

<style>

.login-container {
  display: flex;
  justify-content: center;
  min-height: 20px;
  align-items: center;
  flex-direction: column;
}

</style>
<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import { decodeCredential} from 'vue3-google-login';
import NewJourney from '@/components/NewJourney.vue';


const { cookies } = useCookies()
const journeyBe = ref([])
const isLoggedin = ref(false)
let userName = ''

onMounted(() => {
    fetch(`${import.meta.env.VITE_API_URL}/journey`)
    .then( response => response.json() )
    .then( result => {
        journeyBe.value = result
        console.log(journeyBe)
    })
})


</script>

<template>
    <h1>Journey List</h1>

         <NewJourney />

</template>
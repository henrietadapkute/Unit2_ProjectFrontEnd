<script setup>
import { ref, onMounted } from 'vue';
import { useCookies } from 'vue3-cookies';
import { decodeCredential} from 'vue3-google-login';
import NewJourney from '@/components/NewJourney.vue';

const { cookies } = useCookies()
const isLoggedin = ref(false)
let userName = ''

const journeyBe = ref([])


onMounted(() => {
    fetch(`${import.meta.env.VITE_API_URL}/journey`)
    .then( response => response.json() )
    .then( result => {
        journeyBe.value = result
        console.log(journeyBe)
    })
})

const checkSession = () => {
    if ( cookies.isKey('user_session') ) {
        isLoggedin.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName = userData.given_name
    }
}

onMounted(() => {
    checkSession()
})

</script>

<template> 
<main class="text-center">
     <div v-if="isLoggedin">
        <h2>Hello {{ userName }}</h2>
        <NewJourney />
    </div>
</main>
</template>
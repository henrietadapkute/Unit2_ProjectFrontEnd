<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import { decodeCredential} from 'vue3-google-login';
const { cookies } = useCookies()
const journeyBe = ref([])
const isLoggedin = ref(false)
let userName = ''

onMounted(() => {
    fetch(`${import.meta.env.VITE_API_URL}/journey`)
    .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
    .then( result => {
        journeyBe.value = result
        console.log(journeyBe)
    })
    .catch(err => {
            console.error('Error during fetch operation:', err);
        });
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

function deleteJourney(journeyId) {
    fetch((`${import.meta.env.VITE_API_URL}/journey/${journeyId}`), {
    method: "DELETE"
    })
    .then(() => {
        alert('Journey deleted')
        
    })
    .catch(err => console.error(err))
}


</script>

<template>
    <!-- <ul>
        <li v-for="journey in journeyBe" :key="journey.id">
            <RouterLink :to="'/journey' + '/' + journey._id">{{ journey.CountryName }}</RouterLink> &nbsp;  -->
            <!-- <button @click="deleteJourney(journey._id)">Delete Journey</button> -->
            <!-- <RouterLink :to="'/book/update/' + book._id">Edit Book</RouterLink> -->
        <!-- </li>
    </ul> -->
    <!-- <div v-if="isLoggedin"> -->
         
    <!-- </div> -->
    <div v-if="isLoggedin">
    <div class="JourneyList">
    <div class="container">
        <h1>My Journeys</h1>
        <ul class="list-group mt-3" style="display: grid; grid-template-columns: repeat(4, 300px); gap: 10px;">
            <li v-for="journey in journeyBe" :key="journey._id" class="list-group-item" style="display: flex; flex-direction: column; gap: 10px;">
                <RouterLink :to="'/journey' + '/' + journey._id">{{ journey.CountryName }} <br> {{ journey.date }} </RouterLink>
                <RouterLink :to="'/journey' + '/' + journey._id" class="btn btn-primary">Edit</RouterLink>
                <button @click="deleteJourney(journey._id)" class="btn btn-danger">Delete Journey</button>
            </li>
        </ul>
    </div>
</div>
</div>
</template>
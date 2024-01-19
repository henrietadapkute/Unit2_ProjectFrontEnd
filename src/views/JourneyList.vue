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
    <div v-if="isLoggedin">
    <div class="JourneyList">
    <div class="container">
      <h1>My Journeys</h1>

      <div class="row mt-3">
   
        <div class="col-md-3 mb-3">
          <div class="card">
            <img src="https://i.imgur.com/SCuBFBp.jpeg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Add your next Adventure!</h5>
              <p class="card-text" style="font-size:14px">Here you can organise your next trip! Add details such as Hotel information, your flight details, check the weather add your essentials to the list accordingly! <br></p>
              <a href="/journey/add" class="btn btn-primary">Add a new Journey</a>
            </div>
          </div>
        </div>


        <div class="col-md-3 mb-3" v-for="journey in journeyBe" :key="journey._id">
          <div class="card">
            <img src="https://i.imgur.com/orOTb1s.jpeg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ journey.CountryName }}</h5>
              <p class="card-text">{{ journey.date }}</p>
              <p class="card-text" style="font-size:14px"> View your yourney details.. Add your essentials.. </p>
              <RouterLink :to="'/journey/' + journey._id" class="btn btn-primary">Edit</RouterLink>
              <button @click="deleteJourney(journey._id)" class="btn btn-danger">Delete Journey</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  </div>
</template>

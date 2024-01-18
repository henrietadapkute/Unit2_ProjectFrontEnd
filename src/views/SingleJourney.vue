<script setup>
import NewEssential from '@/components/NewEssential.vue';
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router';

const journey = ref({})
const isEditMode = ref(false)
const editToggles = reactive({
    country: false,
    flight: false,
    hotel: false
})
const weatherData = ref(null)
const essentials = ref({})

onMounted(() => {
    const route = useRoute()
    const id = (route.params.id)
    
    fetch(`${import.meta.env.VITE_API_URL}/journey/${id}`)
    .then(response => response.json())
    .then( result => {
    return journey.value = result
    }) 
    .then(() => {
    fetch(`${import.meta.env.VITE_WEATHER_API_KEY}&q=${journey.value.CountryName}&days=3&aqi=no&alerts=no`)
    .then(response => response.json())
    .then(data => {
      weatherData.value = data
      console.log(data)
    })
    })
    fetch(`${import.meta.env.VITE_API_URL}/essentials/${id}`)
    .then(response => response.json())
    .then(newresult => {
      console.log('Essentials data:', newresult);
      return essentials.value = newresult;
    })
    .catch(err => console.error(err))
   
})

// function deleteJourney(journeyId) {
//     fetch((`${import.meta.env.VITE_API_URL}/journey/${journeyId}`), {
//     method: "DELETE"
//     })
//     .then(() => {
//         alert('Journey deleted')
        
//     })
//     .catch(err => console.error(err))
// }

function updateJourney() {
  fetch((`${import.meta.env.VITE_API_URL}/journey/${journey.value._id}`), {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(journey.value)
})
  .then(() => {
    alert('Journey updated')
    isEditMode.value = false 
})
  .catch(err => console.error(err))
}


</script>

<template>
  <div class="d-flex flex-row gap-5 align-items-center justify-content-center">
    <div class="mb-3">
      <h1> Journey to {{ journey.CountryName }}</h1>
      <br>
        <div class="card m-3 custom-border">
            <div class="card-body">
                <h3 class="card-title">Country: {{ journey.CountryName }}</h3>
                <h4>You're travelling on: {{ journey.date }}</h4>

                <div v-if="journey.Flight">
                    <h3>Flight Details:</h3>
                    <p>Airline: {{ journey.Flight.airline }} <br>
                       Departure From: {{ journey.Flight.departureFrom }} <br>
                       Departure Time: {{ journey.Flight.departureTime }} <br>
                       Arrival To: {{ journey.Flight.arrivalTo }} <br>
                       Arrival Time: {{ journey.Flight.arrivalTime }}
                    </p>
                </div>

                <div v-if="journey.Hotel">
                    <h3>Hotel Details:</h3>
                    <p>Name: {{ journey.Hotel.name }} <br>
                       Hotel link: {{ journey.Hotel.link }} <br>
                       Hotel address: {{ journey.Hotel.address }} <br>
                       Duration of stay: {{ journey.Hotel.durationofStay }} <br>
                       Room type: {{ journey.Hotel.roomtype }}
                    </p>
                </div>
              </div>     
        </div>
       <button @click="isEditMode = true" class="btn btn-primary">Edit Journey</button>
        <div v-if="isEditMode">
            <h3>Edit Journey</h3>
            <label><input type="checkbox" v-model="editToggles.country">Country Name</label>
            <label><input type="checkbox" v-model="editToggles.flight">Flight Details</label>
            <label><input type="checkbox" v-model="editToggles.hotel">Hotel Details</label>

            <div v-if="editToggles.country">
              <input type="text" name="countryName" placeholder="Country Name" v-model="journey.CountryName">
              <input type="date" name="date" placeholder="Date" v-model="journey.date">
            </div>

            <div v-if="editToggles.flight && journey.Flight">
              <input type="text" name="airline" placeholder="Airline" v-model="journey.Flight.airline">
              <input type="text" name="departureFrom" placeholder="Departure From" v-model="journey.Flight.departureFrom">
              <input type="time" name="departureTime" placeholder="Departure Time" v-model="journey.Flight.departureTime">
              <input type="text" name="arrivalTo" placeholder="Arrival To" v-model="journey.Flight.arrivalTo">
              <input type="time" name="arrivalTime" placeholder="Arrival Time" v-model="journey.Flight.arrivalTime">
            </div>
            <div v-if="editToggles.hotel && journey.Hotel">
              <input type="text" name="name" placeholder="Hotel Name" v-model="journey.Hotel.name">
              <input type="text" name="link" placeholder="Hotel Link" v-model="journey.Hotel.link">
              <input type="text" name="address" placeholder="Hotel Address" v-model="journey.Hotel.address">
              <input type="number" name="durationofStay" placeholder="Duration of Stay" v-model="journey.Hotel.durationofStay">
              <input type="text" name="roomtype" placeholder="Room Type" v-model="journey.Hotel.roomtype">
            </div>
            <button @click="updateJourney" class="btn btn-success">Save Changes</button>
            <button @click="isEditMode = false" class="btn btn-secondary">Cancel</button>
            </div>
            
        </div>
 <NewEssential />

    <div class="card weatherBox align-top">
    <div v-if="weatherData && weatherData.forecast && weatherData.forecast.forecastday" class="mt-2">
    <h3 class="row" style="font-size: 18px">Weather in {{ journey.CountryName }}</h3>
    <div class="row" >
      <div class="col-md-4" v-for="day in weatherData.forecast.forecastday" :key="day.date">
        <div class="row align-items-end">
          <div class="">
            <h5 class="card-title">{{ day.date }}</h5>
            <img :src="day.day.condition.icon" class="card-img-top" alt="Weather Icon">
            <p class="card-text" style="font-size:14px">
              <strong>Max Temperature:</strong> {{ day.day.maxtemp_c }}°C<br>
              <strong>Min Temperature:</strong> {{ day.day.mintemp_c }}°C<br>
              <strong>Condition:</strong> {{ day.day.condition.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>

</template>

<style>
.custom-card, .weatherBox {
  width: 100%;
  max-width: 500px;
}

@media (min-width: 1024px) {
  .custom-border {
    border: 2px solid darkblue;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .weatherBox {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    background-color: #ebebeb;
  }
}
</style>

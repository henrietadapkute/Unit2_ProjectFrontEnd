<script setup>
import { ref } from 'vue';


const journeyDetails = ref({
    journey: {
        CountryName: '',
        date: ''
    },
    flight: {
        airline: '',
        departureFrom: '',
        departureTime: '',
        arrivalTo: '',
        arrivalTime: ''
    },
    hotel: {
        name: '',
        link: '',
        address: '',
        durationofStay: '',
        roomtype: ''
    }
});

function addJourney() {
    const { journey, flight, hotel } = journeyDetails.value;
    // Validate journey details
    if (!journey.CountryName || !journey.date) {
        alert('All journey fields are required');
        return;
    }

    // Validate flight details
    if (!flight.airline || !flight.departureFrom || !flight.departureTime ||
        !flight.arrivalTo || !flight.arrivalTime) {
        alert('All flight fields are required');
        return;
    }

    // Validate hotel details
    if (!hotel.name || !hotel.link || !hotel.address ||
        !hotel.durationofStay || !hotel.roomtype) {
        alert('All hotel fields are required');
        return;
    }
    
    fetch(`${import.meta.env.VITE_API_URL}/journey/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(journeyDetails.value)
    })
    .then(res => {
        if (res.ok) {
            // Reset the form fields after successful submission
            Object.keys(journey).forEach(key => journey[key] = '');
            Object.keys(flight).forEach(key => flight[key] = '');
            Object.keys(hotel).forEach(key => hotel[key] = '');
            console.log("Journey added successfully");
        } else {
            console.error("Failed to add journey");
        }
    })
    .catch(err => console.error(err));
}
  
//     function addHotel() {
//     if (hotel.value.name === '' || hotel.value.link === '' || hotel.value.address === '' ||
//         hotel.value.durationofStay === '' || hotel.value.roomtype === '') {
//           alert('All values are required')
//           return
// }
//        fetch(`${import.meta.env.VITE_API_URL}/hotel/new`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body:JSON.stringify(hotel)
//        })
//        .then(res => {
//             hotel.value.name = '';
//             hotel.value.link = '';
//             hotel.value.address = '';
//             hotel.value.durationofStay = '';
//             hotel.value.roomtype = '';
//         console.log(res)
//        })
//        .catch(err => console.error(err))
//     }

  
// function addJourney() {
//     addHotel()
//     addFlight()
//     if (journey.value.CountryName === '' || journey.value.date === '') {
//         alert('All fields are required');
//         return;
//     }
//     fetch(`${import.meta.env.VITE_API_URL}/journey/new`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(journey)
//     })
//     .then(res => {
//         if (res.ok) {
//             journey.value.CountryName = '';
//             journey.value.date = '';
//             console.log("Journey added successfully");
//         } else {
//             console.error("Failed to add journey");
//         }
//     })
//     .catch(err => console.error(err));
// }
</script>

<template>
  <div class="container py-5">
    <h3 class="mb-4">Add a new journey</h3>
    <div class="card p-4 shadow-sm">
      <form class="row g-3" @submit.prevent="addJourney">
        
        <div class="col-md-6">
          <label for="countryName" class="form-label">Country Name: *</label>
          <input type="text" class="form-control" id="countryName" placeholder="Country Name" v-model="journeyDetails.journey.CountryName" required>
        </div>
        <div class="col-md-6">
          <label for="date" class="form-label">Date: *</label>
          <input type="date" class="form-control" id="date" v-model="journeyDetails.journey.date" required>
        </div>

        <div class="col-12">
          <label for="airline" class="form-label">Airline: *</label>
          <input type="text" class="form-control" id="airline" placeholder="Airline" v-model="journeyDetails.flight.airline" required>
        </div>
        <div class="col-md-6">
          <label for="departureFrom" class="form-label">Departure From: *</label>
          <input type="text" class="form-control" id="departureFrom" placeholder="Departure From" v-model="journeyDetails.flight.departureFrom" required>
        </div>
        <div class="col-md-6">
          <label for="departureTime" class="form-label">Departure Time: *</label>
          <input type="time" class="form-control" id="departureTime" v-model="journeyDetails.flight.departureTime" required>
        </div>
        <div class="col-md-6">
          <label for="arrivalTo" class="form-label">Arrival To: *</label>
          <input type="text" class="form-control" id="arrivalTo" placeholder="Arrival To" v-model="journeyDetails.flight.arrivalTo" required>
        </div>
        <div class="col-md-6">
          <label for="arrivalTime" class="form-label">Arrival Time: *</label>
          <input type="time" class="form-control" id="arrivalTime" v-model="journeyDetails.flight.arrivalTime" required>
        </div>

        <div class="col-12">
          <label for="hotelName" class="form-label">Hotel Name: *</label>
          <input type="text" class="form-control" id="hotelName" placeholder="Hotel Name" v-model="journeyDetails.hotel.name" required>
        </div>
        <div class="col-12">
          <label for="hotelLink" class="form-label">Hotel Link: *</label>
          <input type="text" class="form-control" id="hotelLink" placeholder="Hotel Link" v-model="journeyDetails.hotel.link" required>
        </div>
        <div class="col-md-6">
          <label for="hotelAddress" class="form-label">Hotel Address: *</label>
          <input type="text" class="form-control" id="hotelAddress" placeholder="Hotel Address" v-model="journeyDetails.hotel.address" required>
        </div>
        <div class="col-md-6">
          <label for="durationofStay" class="form-label">Duration of Stay: *</label>
          <input type="number" class="form-control" id="durationofStay" placeholder="Duration of Stay" v-model="journeyDetails.hotel.durationofStay" required>
        </div>
        <div class="col-md-6">
          <label for="roomType" class="form-label">Room Type: *</label>
          <input type="text" class="form-control" id="roomType" placeholder="Room Type" v-model="journeyDetails.hotel.roomtype" required>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Add Journey</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.form-container {
  
    width: 600px;
    border: 2px solid darkblue;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
}
</style>
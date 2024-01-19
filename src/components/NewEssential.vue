<script setup>
import { ref, onMounted } from 'vue';

const essentialsList = ref({});

const newEssential = ref({
  title: '',
});

onMounted(() => {
  fetch(`${import.meta.env.VITE_API_URL}/essentials`)
    .then(response => response.json())
    .then(result => {
      essentialsList.value = result;
    })
    .catch(err => console.error('Error during fetch operation:', err));
});

function addEssential() {
  if (newEssential.value.title === '') {
    alert('Title is required');
    
  } else {
       fetch(`${import.meta.env.VITE_API_URL}/essentials/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(newEssential.value)
       })
       .then(res => {
        newEssential.value.title = '',
        console.log('Hello', res)
       })
       .catch(err => console.error(err))
    }
  }

// function updateEssential() {
//   fetch((`${import.meta.env.VITE_API_URL}/essentials/${selectedEssentialId.value}`), {
//     method: "PUT",
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(selectedEssentialId.value)
// })
//   .then(() => {
//     alert('Essential updated')
//     isEditMode.value = false 
// })
//   .catch(err => console.error(err))
// }


</script>

<template>
  <div class="card text-bg-dark mb-3" style="max-width: 18rem;">
    <div class="card-header">Essentials List</div>
    <div class="card-body">
      <ul>
        <li v-for="essential in essentialsList" :key="essential.id">
          <div style="font-size: 14px;">
      
            {{ essential.title }}
          </div>
        </li>
      </ul>

      <form class="row g-4" @submit.prevent="addEssential">
        <div class="col-md-12">
          <input type="text" class="form-control" placeholder="Add a new essential" v-model="newEssential.title" required>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-secondary">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>


<style>
.gridlook {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
}
.form-container {
  
    border: 2px solid darkblue;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(207, 207, 207, 0.1);
    display: inline;
}

.form-container li {
  margin-bottom: 10px;
  font-size: 10px; 
}

.form-container .form-control {
  width: 100%; 

}

.form-container .btn {
  margin-top: 16px;
}
</style>
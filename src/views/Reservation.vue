<template>
  <div class="reservation">
    <h1>Make a Reservation</h1>
    <form @submit.prevent="submitReservation" class="reservation-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input 
          type="text" 
          id="name" 
          v-model="form.name" 
          required
          placeholder="Your name"
        >
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email" 
          required
          placeholder="Your email"
        >
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="form.phone" 
          required
          placeholder="Your phone number"
        >
      </div>

      <div class="form-group">
        <label for="date">Date</label>
        <input 
          type="date" 
          id="date" 
          v-model="form.date" 
          required
        >
      </div>

      <div class="form-group">
        <label for="time">Time</label>
        <input 
          type="time" 
          id="time" 
          v-model="form.time" 
          required
        >
      </div>

      <div class="form-group">
        <label for="guests">Number of Guests</label>
        <input 
          type="number" 
          id="guests" 
          v-model="form.guests" 
          required
          min="1"
          max="10"
        >
      </div>

      <div class="form-group">
        <label for="notes">Special Requests</label>
        <textarea 
          id="notes" 
          v-model="form.notes"
          placeholder="Any special requests or dietary requirements"
        ></textarea>
      </div>

      <button type="submit" class="submit-btn">Make Reservation</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const API_URL = 'https://agencymanager.onrender.com'

const form = ref({
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: 1,
  notes: ''
})

const submitReservation = async () => {
  try {
    await axios.post(`${API_URL}/reservations`, form.value)
    alert('Reservation submitted successfully!')
    // Reset form
    form.value = {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 1,
      notes: ''
    }
  } catch (error) {
    console.error('Error submitting reservation:', error)
    alert('Failed to submit reservation. Please try again.')
  }
}
</script>

<style scoped>
.reservation {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.reservation-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

textarea {
  height: 100px;
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #c0392b;
}
</style> 
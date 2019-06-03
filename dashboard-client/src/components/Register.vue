<template>
    <div>
    <b-form class="mx-auto" @submit="submit">
        <h1>Register</h1>
        <b-form-input 
            v-model="form.forename"
            placeholder="Forename"
            required />
        <b-form-input 
            v-model="form.surname" placeholder="Surname" required />
        <b-form-input 
            v-model="form.email"
            type="email"
            placeholder="example@email.com"
            required />
        <b-form-input 
            v-model="form.password"
            type="password"
            required />
        <b-button type="submit" variant="primary">Register</b-button>
        <b-button href="/authentication/login" type="submit" variant="primary">
            Back to Login
        </b-button>
    </b-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Register',
    data() {
        return {
            form: {
                forename: '',
                surname: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        submit: function(event) {
            event.preventDefault()
            axios.post("/authentication/api/register", this.form).then((response) => {
                alert("Account created, please check your email to activate your account.")
                window.location = "/authentication/login"
            }
            ).catch((error) => {
                alert(error.response.data)
            })
        }
    }
}
</script>

<style scoped>
form {
    width: 26em;
    padding: 2em;
    opacity: 0.9;
}
input {
    margin-bottom: 1em;
}
</style>

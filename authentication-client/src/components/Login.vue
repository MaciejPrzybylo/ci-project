<template>
    <div>
    <b-form class="mx-auto" @submit="submit">
        <h1>Login</h1>
        <b-form-input 
            v-model="form.email"
            type="email"
            placeholder="example@email.com"
            required />
        <b-form-input 
            v-model="form.password"
            type="password"
            required />
        <b-button type="submit" variant="primary">Login</b-button>
        <b-button href="/authentication/register" type="submit" variant="primary">
            Sign Up
        </b-button>
    </b-form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    }, methods: {
        submit: function() {
            event.preventDefault()
            axios.post("/authentication/api/login", this.form).then((response) => {
                $cookies.set("Session-Token", response.data.session)
                window.location = "/dashboard"
            }).catch((error) => {
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

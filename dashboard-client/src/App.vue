<template>
  <div id="app">
      <h1>Dashboard</h1>
      {{ account.forename }}
      {{ account.surname }}
      {{ account.email }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'app',
    data() {
        return {
            account: {}
        }
    },
    created: function() {
        console.log($cookies.get("Session-Token"))
        axios.get("/dashboard/api/account", {
            headers: {
                "Session-Token": $cookies.get("Session-Token")
            }
        }).then((response) => {
            console.log("account retrieved:")
            console.log(this.account)
            this.account = response.data
        }).catch((error) => {
            alert(error.response.data)
            window.location = "/authentication/login"
        })
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

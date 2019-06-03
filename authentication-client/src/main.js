import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.config.productionTip = false

const prefix = "/authentication"
const routes = {
    "/authentication": App,
    "/authentication/register": Register,
    "/authentication/login": Login
}

new Vue({
    el: "#app",
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent() {
            return routes[this.currentRoute] || App
        }
    },
    render (h) { return h(this.ViewComponent)}
})


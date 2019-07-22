/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');


window.Vue = require('vue');

// import Vue from 'vue'
import Vuetify from 'vuetify'
// index.js or main.js
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(Vuetify)
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('navbar', require('./components/Navbar.vue'));
Vue.component('articles', require('./components/Articles.vue'));
Vue.component('datatable', require('./components/Datatable.vue'));
Vue.component('ModalTable', require('./components/ModalTable.vue'));

export const serverBus = new Vue();


const app = new Vue({
  el: '#app'
});

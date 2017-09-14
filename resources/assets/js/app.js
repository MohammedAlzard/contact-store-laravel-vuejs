
require('./bootstrap');

window.Vue = require('vue');

let axios = require('axios');

Vue.component('contacts', require('./components/Contacts.vue'));

//Vue.component('example', require('./components/Example.vue'));

const app = new Vue({
    el: '#app'
});

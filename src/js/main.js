import Vue from 'vue';
import App from './App';
import moment from 'moment';

Vue.filter('formatDate', function (value, format) {
  if (value) {
    return moment(value).format(format);
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
});
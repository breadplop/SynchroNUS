// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

window.$ = require('jquery')
window.JQuery = require('jquery')

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VAutocomplete,
  VRadioGroup,
  VSwitch,
  VOverflowBtn,
  VCard,
  VImg,
  VDivider,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VAutocomplete,
    VRadioGroup,
    VSwitch,
    VOverflowBtn,
    VCard,
    VImg,
    VDivider,
    transitions
  }
})

import VueChartkick from 'vue-chartkick'
import Highcharts from 'highcharts'
import VueResource from 'vue-resource';

Vue.use(VueChartkick, {adapter: Highcharts})
Vue.use(router)
Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  data: () => ({
    module_subclass: [
      ['Module Review', 'school'],
      ['Teaching Review', 'teacher']
    ],
    career_subclass: [
      ['Career 1', 'school'],
      ['Career 2', 'teacher']
    ],
    sep_subclass: [
      ['SEP subclass 1', 'school'],
      ['SEP subclass 2', 'teacher']
    ]

  }),
  template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
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
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import VueChartkick from 'vue-chartkick'
 
Vue.use(VueChartkick)
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
    transitions
  }
})

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

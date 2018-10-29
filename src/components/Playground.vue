<template>
  <v-app>
    <div id="app" class="container">
      <div class="page-header">
        <h1>Firebase and Vue</h1>
      </div>

      <v-component> 
        data
        {{data}}
        <br>
        <bar-chart :data="charts.m1.nofilter.data" :library="this.library"></bar-chart>
        <br>
        <bar-chart :data='charts.m2.nofilter.data'></bar-chart>
      </v-component>

      <v-component>
        <v-btn @click="fillData()">Fill data</v-btn>
        test is {{test}}
        <br>
        testm1 is {{test_m1}}

      </v-component>
    </div>
  </v-app>

</template>

<script>
  import {dataRef, db} from '../api/config';
  export default {
    name: 'app',
    firebase: {
      data: dataRef,
      test: db.ref('charts/m1/new'),
      test_m1: db.ref('charts/m1'),
      charts: {
          source: db.ref('charts'),
          asObject: true,
      }
    },
    data(){
      return {
        library: {
            chart: {backgroundColor: ''},
        },
        newMChart: {
          zero: '',
          first: ''
        }
      }
    },
    methods: {
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      fillData () {
        ref= db.ref('charts/m1/new')
        ref.push(this.newMChart)
        this.newMChart.zero = 'zero am i pushed'
        this.newMChart.first = 'first am i based'
      }
      
      // addArticle() {
      //   articlesRef.push(this.newArticle);
      //     this.newArticle.title = '';
      //     this.newArticle.author = '';
      //     this.newArticle.url = '';
      // },
      // removeArticle(article) {
      //   articlesRef.child(article['.key']).remove();
      // }
      
    }
  }
</script>

<style>
  .pointer {
    cursor: pointer;
  }
</style>
<template>
<v-content>
    <v-container id='1' grid-list-xl>
        <v-layout row wrap>
            <v-flex xs12 sm4>
                chart 1
            </v-flex>
        </v-layout>

        <v-header>Header1</v-header>
        <v-subheader>subheader1</v-subheader>
        <v-layout row wrap>
            <v-flex xs15 sm6>
                <line-chart :chart-data="data"></line-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <line-chart :chart-data="datacollection"></line-chart>
            </v-flex>
        </v-layout>

<!--second row-->

        <v-header>Header2</v-header>
        <v-subheader>subheader</v-subheader>
        <v-layout row wrap>
            <v-flex xs15 sm6>
                <line-chart :chart-data="datacollection"></line-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <chart :data="data"></chart>
            </v-flex>
        </v-layout>
    </v-container>
    <div class="small">
        <line-chart :chart-data="datacollection"></line-chart>
        <button @click="fillData()">Randomize</button>
        <line-chart :chart-data="datacollection"></line-chart>
    </div>
    <div class="small">
        <line-chart :chart-data="datacollection"></line-chart>
        <button @click="fillData()">Randomize</button>
        <line-chart :chart-data="datacollection"></line-chart>
    </div>
</v-content>
  
</template>

<script>
  import LineChart from './charts/LineChart.js'
  import Chart from './charts/BarChart.js'

  export default {
    components: {
      LineChart,
      Chart
    },
    data () {
      return {
        datacollection: null,
        data: 
            {
            labels: ['January', 'February'],
            datasets: [
                {
                label: 'GitHub Commits',
                backgroundColor: '#f87979',
                data: [40, 20]
                }
            ]
            }
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  50px auto;
  }
</style>
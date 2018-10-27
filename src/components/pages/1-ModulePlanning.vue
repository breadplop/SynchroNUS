<template>
<v-app light>
<v-content>
    <v-container>
        <h1>add filters</h1>
        <filters></filters>
    </v-container>
    <v-container id='1' grid-list-xl>
<!--first row-->        
        <!--MCQ questions -->
        <v-header><h2>Opinions of Module</h2></v-header>
        <br>
        <v-layout row wrap>
            <v-flex xs15 sm4>
                <h3>Qn: What is your overall opinion of the module?</h3>
                <hbar-chart :hbar-data="m1_data"></hbar-chart>
            </v-flex>
            <v-flex xs15 sm4>
                <h3>Qn: The grade that I am most likely to get in the module is</h3>
                <bar-chart :bar-data="m2_data"></bar-chart>
            </v-flex>
            <v-flex xs15 sm4>
                <h3>Qn: I rate this module as</h3>
                <hbar-chart :hbar-data="m3_data"></hbar-chart>
            </v-flex>
        </v-layout>

<!--second row-->

        <v-header><h2>Open Ended Questions</h2></v-header>
        <v-layout row wrap>
            <v-flex xs15 sm6>
                <h3>Qn: What I liked about the module:</h3>
                <i>what shld i put here? word cloud?</i>
                <radar-chart :radar-data="radar_data_plus"></radar-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Qn: What I did not like about the module:</h3>
                <i>what shld i put here? word cloud?</i>
                <radar-chart :radar-data="radar_data_minus"></radar-chart>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>
</v-app>
</template>

<script>
  import LineChart from '../charts/LineChart.js'
  import BarChart from '../charts/BarChart.js'
  import HbarChart from '../charts/HorizontalBar.js'
  import RadarChart from '../charts/RadarChart.js'
  import Filters from '../filters/Filters'

  export default {
    components: {
      LineChart,
      BarChart,
      HbarChart,
      RadarChart,
      Filters
    },
    data () {
      return {
        datacollection: null,
        m1_data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [
                {
                label: 'Scale of 1-5, with 1 as the lowest',
                backgroundColor: 'orange',
                data: [10, 12, 78, 102, 5]
                }
            ]
        },
        m2_data: {
            labels: ['F', 'D', 'C', 'B', 'A'],
            datasets: [
                {
                label: 'Grade',
                backgroundColor: '#f47889',
                data: [10, 30, 78, 102, 50]
                }
            ]
        },
        m3_data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [
                {
                label: 'Scale of 1-5, with 1 as the lowest',
                backgroundColor: 'silver',
                data: [10, 12, 78, 102, 5]
                }
            ]
        },
        radar_data_plus: {
            labels: ['Useful', 'Moderate', 'Prof', 'Interesting', 'Fun'],
            datasets: [
                {
                label: 'Top 5 most common positive descriptors of module',
                backgroundColor: '#B29600',
                data: [10, 10, 31, 43, 43]
                }
            ]
        },
        radar_data_minus: {
            labels: ['Difficult', 'Time', 'Tough', 'NoWebcast', 'TAs'],
            datasets: [
                {
                label: 'Top 5 most common negative descriptors of module',
                backgroundColor: '#8B4513',
                data: [23, 32, 54, 10, 10]
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
              backgroundColor: 'green',
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
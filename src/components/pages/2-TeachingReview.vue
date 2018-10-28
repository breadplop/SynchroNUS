<template>
<v-app light>
<v-content>
    <v-container>
        <filters></filters>
    </v-container>
    <v-container id='1' grid-list-xl>
<!--first row-->        
        <!--MCQ questions -->
        <v-header><h2>Opinions on Teaching</h2></v-header>
        <br>
        <v-layout row wrap>
            <v-flex xs15 sm4>
                <h3>Qn: The teacher has enhanced my thinking ability.</h3>
                <hbar-chart :chart-data="t1_data"></hbar-chart>
            </v-flex>
            <v-flex xs15 sm4>
                <h3>Qn: The teacher provided timely and useful feedback.</h3>
                <hbar-chart :chart-data="t2_data"></hbar-chart>
            </v-flex>
            <v-flex xs15 sm4>
                <h3>Qn: The teacher has increased my interest in the subject.</h3>
                <hbar-chart :chart-data="t3_data"></hbar-chart>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs15 sm6>
                <h3>What are the instructor's strengths?</h3>
                <radar-chart :chart-data="radar_data_plus"></radar-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Nominated for teaching awards</h3>
                <line-chart :chart-data="t7c_data"></line-chart>
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
        t1_data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [
                {
                label: 'Scale of 1-5, with 1 as the lowest',
                backgroundColor: '#966fd6',
                data: [10, 12, 78, 102, 5]
                }
            ]
        },
        t2_data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [
                {
                label: 'Scale of 1-5, with 1 as the lowest',
                backgroundColor: '#f47889',
                data: [10, 30, 78, 102, 50]
                }
            ]
        },
        t3_data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [
                {
                label: 'Scale of 1-5, with 1 as the lowest',
                backgroundColor: 'silver',
                data: [10, 12, 78, 102, 5]
                }
            ]
        },
        t7c_data: { //nominations for teaching award
            labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016'],
            datasets: [
                {
                label: 'Year',
                backgroundColor: '#779ecb',
                data: [0, 0, 0, 1, 2, 0, 0]
                }
            ]
        },
        radar_data_plus: {
            labels: ['Smart', 'Witty', 'Genuine', 'Interesting', 'Fun'],
            datasets: [
                {
                label: 'Top 5 most common positive descriptors',
                backgroundColor: '#B29600',
                data: [20, 18, 31, 43, 43]
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
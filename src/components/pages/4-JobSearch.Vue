<template>
<v-app light>
<v-content>
    <v-container>
        <filters></filters>
    </v-container>
    <v-container id='1' grid-list-xl>
<!--first row-->        
        <!--Breakdown of Job Search Channel by Industry and Occupation -->
        <v-header><h2>Breakdown of Job Search Channel by Industry and Occupation</h2></v-header>
        <br>
        <v-layout row wrap>
            <v-flex xs15 sm6>
                <h3>Job Search Channels by Industry</h3>
                <hbar-chart :hbar-data="industry_job_channels" :options="options" :width="100" :height="50"></hbar-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Job Search Channels by Job Title</h3>
                <hbar-chart :hbar-data="occupation_job_channels" :width="100" :height="50"></hbar-chart>
            </v-flex>
        </v-layout>
        <br>
<!--second row-->        
        <!--Amount of Time in Job Search before landing an offer -->
        <v-header><h2>Amount of Time in Job Search before landing an offer</h2></v-header>
        <v-layout>
            <v-flex xs15 sm12>
                <h3>Amount of time to get a job offer</h3>
                <v-subheader>What is the average time to get a job offer by job search channel?</v-subheader>
                <line-chart :chart-data="time_job_channels" :options="lineOptions" :width="70" :height="30"></line-chart>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs15 sm12>
                <h3>Month of start of job search</h3>
                <v-subheader>When is the best time to start looking for jobs?</v-subheader>
                <line-chart :chart-data="month_job_channels" :options="lineOptions" :width="70" :height="30"></line-chart>
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
        options: {
            scales: {
                xAxes: [{ stacked: true}],
                yAxes: [{ stacked: true}]
            }
        },
        lineOptions: {
            elements: {
                line: { fill: false}
            }
        },
        industry_job_channels: {
            labels: ['Tech', 'Finance', 'Real Estate', 'Healthcare', 'Aerospace'],
            datasets: [
                {
                label: 'NUSTalentConnect',
                backgroundColor: '#966fd6',
                data: [32, 46, 28, 32, 0]
                },
                {
                label: 'Social Media Network',
                backgroundColor: '#f17889',
                data: [25, 41, 21, 17, 0]
                },
                {
                label: 'Friends and Family',
                backgroundColor: '#779ecb',
                data: [4, 6, 8, 4, 8]
                }
            ]
        },
        occupation_job_channels: {
            labels: ['Tech Consultant', 'Financial Analyst', 'Real Estate Analyst', 'Data Analyst', 'Data Scientist'],
            datasets: [
                {
                label: 'NUSTalentConnect',
                backgroundColor: '#966fd6',
                data: [32, 13, 23, 29, 10]
                },
                {
                label: 'Social Media Network',
                backgroundColor: '#f17889',
                data: [25, 21, 41, 21, 17]
                },
                {
                label: 'Friends and Family',
                backgroundColor: '#779ecb',
                data: [12, 6, 8, 4, 10]
                }
            ]
        },
        time_job_channels: {
            labels: [0, 2, 4, 6, 8, 10],
            datasets: [
                {
                label: 'NUSTalentConnect',
                backgroundColor: '#966fd6',
                data: [32, 13, 23, 29, 10]
                },
                {
                label: 'Social Media Network',
                backgroundColor: '#f17889',
                data: [25, 21, 41, 21, 17]
                },
                {
                label: 'Friends and Family',
                backgroundColor: '#779ecb',
                data: [12, 6, 8, 4, 10]
                }
            ]
        },
        month_job_channels: {
            labels: [0, 2, 4, 6, 8, 10],
            datasets: [
                {
                label: 'Healthcare',
                backgroundColor: '#966fd6',
                data: [60, 13, 23, 40, 50]
                },
                {
                label: 'Finance',
                backgroundColor: '#f17889',
                data: [62, 17, 28, 48, 58]
                },
                {
                label: 'F&B',
                backgroundColor: '#779ecb',
                data: [55, 10, 19, 35, 45]
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
            }, 
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
<template>
<v-app light>
<v-content>
    <v-container>
        <filters></filters>
    </v-container>
    <v-container id='1' grid-list-xl>
<!--first row-->        
        <!--Breakdown of Employment by Industry and Occupation -->
        <v-header><h2>Breakdown of Employment by Industry and Occupation</h2></v-header>
        <v-subheader>How many graduates joined each industry and role?</v-subheader>
        <br>
        <v-layout row wrap>
            <v-flex xs15 sm6>
                <h3>Count by Industry</h3>
                <pie-chart :pie-data="count_industry" :width="100" :height="50"></pie-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Count by Job Title</h3>
                <pie-chart :pie-data="count_job_title" :width="100" :height="50"></pie-chart>
            </v-flex>
        </v-layout>
        <br>
<!--second row-->        
        <!--Course Relevance Rating -->
        <v-header><h2>Course Relevance Rating</h2></v-header>
        <v-subheader>How relevant is your course to your job? (1: Not Relevant 5: Very Relevant)</v-subheader>
        <v-layout>
            <v-flex xs15 sm6>
                <h3>Relevance by Industry</h3>
                <hbar-chart :hbar-data="relevance_industry" :options='options' :width="70" :height="30"></hbar-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Relevance by Job Title</h3>
                <hbar-chart :hbar-data="relevance_job_title" :options='options' :width="70" :height="30"></hbar-chart>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs15 sm6>
                <h3>Preparedness by Industry</h3>
                <hbar-chart :hbar-data="preparedness_industry" :options='options' :width="70" :height="30"></hbar-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Preparedness by Job Title</h3>
                <hbar-chart :hbar-data="preparedness_job_title" :options='options' :width="70" :height="30"></hbar-chart>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs15 sm10>
                <h3>Income Level by Job Title</h3>
                <hbar-chart :hbar-data="income_by_job_title" :options='options' :width="100" :height="40"></hbar-chart>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>
</v-app>
</template>

<script>
  import HbarChart from '../charts/HorizontalBar.js'
  import PieChart from '../charts/PieChart.js'
  import Filters from '../filters/Filters'

  export default {
    components: {
      PieChart,
      HbarChart,
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
        count_job_title: {
            labels: ['Consultant', 'Financial Analyst', 'Risk Analyst', 'Data Analyst', 'Data Scientist'],
            datasets: [
                {
                label: 'Job Title',
                backgroundColor: ['blue', 'green', 'orange', 'red', 'purple'],
                data: [50,48,40,60,42]
                }
            ]
        },
        count_industry: {
            labels: ['Finance', 'Real Estate', 'Healthcare', 'Manufacturing', 'Telecommunications', 'F&B'],
            datasets: [
                {
                label: 'Industry Name',
                backgroundColor: ['blue', 'green', 'orange', 'red', 'purple', 'pink'],
                data: [66, 34, 30, 25, 28, 23]
                }
            ]
        },
        relevance_industry: {
            labels: ['Finance', 'Real Estate', 'Healthcare', 'Manufacturing', 'Telecommunications', 'F&B'],
            datasets: [
                {
                label: 'Average Relevance Score',
                backgroundColor: ['blue', 'green', 'orange', 'red', 'purple', 'pink'],
                data: [4.5, 3.4, 4.0, 3.0, 4.2, 3.3]
                }
            ]
        },
        relevance_job_title: {
            labels: ['Consultant', 'Financial Analyst', 'Risk Analyst', 'Data Analyst', 'Data Scientist'],
            datasets: [
                {
                label: 'Average Relevance Score',
                backgroundColor: ['blue', 'green', 'orange', 'red', 'purple'],
                data: [4.5, 3.4, 4.0, 3.0, 4.2]
                }
            ]
        },
        preparedness_industry: {
            labels: ['Finance', 'Real Estate', 'Healthcare', 'Manufacturing', 'Telecommunications', 'F&B'],
            datasets: [
                {
                label: 'Average Relevance Score',
                backgroundColor: ['blue', 'green', 'orange', 'red', 'purple', 'yellow'],
                data: [4.2, 3.3, 3.8, 3.2, 4.0, 3.5]
                }
            ]
        },
        preparedness_job_title: {
            labels: ['Consultant', 'Financial Analyst', 'Risk Analyst', 'Data Analyst', 'Data Scientist'],
            datasets: [
                {
                label: 'Average Relevance Score',
                backgroundColor: ['blue', 'green', 'orange', 'red', 'purple'],
                data: [4.5, 3.4, 4.0, 3.0, 4.2]
                }
            ]
        },
        income_by_job_title: {
            labels: ['<3.5K', '3.5K to 4.0K', '4.0K to 4.5K', '4.5K to 5.0K', '5.5K>'],
            datasets: [
                {
                label: 'Data Analyst',
                backgroundColor: 'orange',
                data: [30, 55, 28, 24, 0]
                },
                {
                label: 'Data Analyst',
                backgroundColor: 'purple',
                data: [35, 63, 43, 32, 20]
                },
                {
                label: 'Data Engineer',
                backgroundColor: 'green',
                data: [20, 23, 40, 30, 18]
                }
            ]
        }
       
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
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
                <bar-chart :data='data.m1_data_ck.data'></bar-chart>
            </v-flex>
            <v-flex xs15 sm4>
                <h3>Qn: The grade that I am most likely to get in the module is</h3>
                <bar-chart :data='data.m2_data_ck.data'></bar-chart>
            </v-flex>
            <v-flex xs15 sm4>
                <h3>Qn: I rate this module as</h3>
                <bar-chart :data='data.m3_data_ck.data'></bar-chart>
            </v-flex>
        </v-layout>

<!--second row-->

        <v-header><h2>Open Ended Questions</h2></v-header>
        <v-layout row wrap>
            <v-flex xs15 sm6>
                <h3>Qn: What I liked about the module:</h3>
                <i>what shld i put here? word cloud?</i>
                <radar-chart :chart-data="radar_data_plus"></radar-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Qn: What I did not like about the module:</h3>
                <i>what shld i put here? word cloud?</i>
                <radar-chart :chart-data="radar_data_minus"></radar-chart>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>
</v-app>
</template>

<script>
  import Filters from '../filters/Filters'
  import RadarChart from '../charts/RadarChart.js'

  export default {
    components: {
      Filters,
      RadarChart
    },
    data () {
      return {
        datacollection: null,
        data: {
            m1_data_ck: {
                name: 'm1_data', 
                data: [[1, 10], [2, 12], [3, 78], [4, 102], [5,5]]
            },
            m2_data_ck: {
                name: 'm2_data',
                data: [['A', 50], ['B', 102], ['C', 78], ['D', 30], ['E', 10]]
            },
            m3_data_ck: {
                name: 'm3_data', 
                data: [[1, 12], [2, 13], [3, 72], [4, 132], [5,10]]
            }
        },
        exchange_modules: [{name: "Pass", data: [["{{mod1}} | {{mappedTo1}}",32],["1",46],["2",28],["3",21],["4",20],["5",13],["6",27]]}, {name: "Fail", data: [["{{mod1}} | {{mappedTo1}}",2],["1",4],["2",2],["3",1],["4",2],["5",3],["6",0]]}],
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
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  50px auto;
  }
</style>
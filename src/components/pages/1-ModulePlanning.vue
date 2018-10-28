<template>
<v-app light>
<v-content>
    <v-container id='1' grid-list-xl>
        <!--<filters></filters>-->
    </v-container>
    <v-container id='1' grid-list-xl>
        <v-layout row wrap mb-5>
          <v-flex xs12 sm5>
            <v-overflow-btn
              :items="semesters_filter"
              label="Choose Semester"
              target="#dropdown-example"
              v-model="filtered.semesters_filter"
              @change="navigateTo(filtered)"
              solo
            ></v-overflow-btn>
            <v-overflow-btn
              :items="faculty_filter"
              label="Choose Faculty"
              target="#dropdown-example"
              v-model="filtered.faculty_filter"
              @change="fetchUrl(filtered)"
              solo
            ></v-overflow-btn>
          </v-flex>
          <v-flex xs12 sm5>
              <v-overflow-btn
              :items="cap_filter"
              label="CAP between.."
              target="#dropdown-example"
              v-model="filtered.cap_filter"
              @change="fetchUrl(filtered)"
              solo
            ></v-overflow-btn>
          </v-flex>

        </v-layout>
<!--first row-->        
        <!--MCQ questions -->
        <v-header><h2>Opinions of Module</h2></v-header>
        <br>
        <v-layout row wrap>
            <v-flex xs15 sm4>
                <h3>Qn: What is your overall opinion of the module?</h3>
                <bar-chart :data='this.info'></bar-chart>
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
                <radar-chart :chart-data="radar_data_plus"></radar-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Qn: What I did not like about the module:</h3>
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
  import router from '../../router'
  import axios from 'axios'


  export default {
    components: {
      Filters,
      RadarChart,
      router,
      axios
    },
    data () {
      return {
        datacollection: null,
        filtered: {semester_filter: 'null', faculty_filter: 'null', cap_filter: 'null'},
        info: [[1, 10], [2, 12], [3, 78], [4, 102], [5,5]],
        errored: false,
        loading: true,
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
        },
        semesters_filter: ['All', 'Last 3 years','2016_Sem1', '2016_Sem2', '2017_Sem1', '2017_Sem2'],
        faculty_filter: ['All', 'SOC', 'FASS', 'SDE', 'BIZ', 'Science'],
        cap_filter: ['All', '<3.0', '3.0-3.5', '3.5-4.0', '4.0-4.5', '>4.5']
      }
    },
    mounted () {
        },
    methods: {
        fetchUrl: async function(filter_params) {
            let sem_param = filter_params.semesters_filter
            let cap_param = filter_params.cap_filter
            let faculty_param = filter_params.faculty_param
            let queryParam = '?semester=' + sem_param + '&cap=' + cap_param + '&faculty=' + faculty_param
            let res = await fetch('https://3gx0b3iqpg.execute-api.us-west-2.amazonaws.com/default/synchronus' + queryParam)
            let theJson = await res.json()
            this.info = theJson
            console.log(queryParam)
            console.log('json')
            console.log(theJson)
            router.push(this.$route.path + '?semester='+filter_params.semesters_filter + '&cap=' + filter_params.cap_filter + '&faculty=' + filter_params.faculty_filter)
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
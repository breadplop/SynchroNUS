<template>
<v-app light>
<v-content>
    <v-container id='1' grid-list-xl>
        <!--<filters></filters>-->
    </v-container>
    <v-container id='1' grid-list-xl>
        <h1>{{module}}</h1>  
        <v-layout row wrap mb-5>
          <v-flex xs12 sm5>
            <v-overflow-btn
              label="Choose Semester"
              :items="semesters_filter"
              target="#dropdown-example"
              @change="navigateTo(filtered)"
              v-model="filtered.semesters_filter"
              solo
            ></v-overflow-btn>
            <v-overflow-btn
              :items="faculty_filter"
              label="Choose Faculty"
              target="#dropdown-example"
              @change="fetchUrl(filtered)"
              v-model="filtered.faculty_filter"
              solo
            ></v-overflow-btn>
            </v-flex>
            <v-flex xs12 sm5>
                <v-overflow-btn
                :items="cap_filter"
                label="CAP between.."
                target="#dropdown-example"
                @change="fetchUrl(filtered)"
                v-model="filtered.cap_filter"
                solo
                ></v-overflow-btn>

                <v-switch
                    :key="similarStudentsFlag"
                    :label="'Students Similar to Me: ' + similarStudentsFlag"
                    v-model='similarStudentsFlag'
                ></v-switch>
            </v-flex>

        </v-layout>
<!--first row-->        
        <!--MCQ questions -->
        <v-header><h2>Opinions of Module: {{module}}</h2></v-header>
        <br>
        <v-layout row wrap>
            <v-flex xs15 sm4>
                <h3>Qn: What is your overall opinion of the module?</h3>
                <div v-if='similarStudentsFlag'>
                    <bar-chart :data='this.info.trueFlag' colors='black' :library="{chart: {backgroundColor: ''}}"></bar-chart>
                </div>
                <div v-else>
                    <bar-chart :data='this.info.falseFlag' :library="{chart: {backgroundColor: ''}}"></bar-chart>
                </div>
            </v-flex>
            <v-flex xs15 sm4>
                <h3>Qn: The grade that I am most likely to get in the module is</h3>
                <div v-if='similarStudentsFlag'>
                    <bar-chart :data='this.m2_data_ck.trueFlag' colors='black' :library="{chart: {backgroundColor: ''}}"></bar-chart>
                </div>
                <div v-else>
                    <bar-chart :data='this.m2_data_ck.falseFlag' :library="{chart: {backgroundColor: ''}}"></bar-chart>
                </div>
            
            </v-flex>
            <v-flex xs15 sm4>
                <h3>Qn: I rate this module as</h3>
                <div v-if='similarStudentsFlag'>
                    <bar-chart :data='this.rateModInfo.trueFlag' colors='black' :library="{chart: {backgroundColor: ''}}"></bar-chart>
                </div>
                <div v-else>
                    <bar-chart :data='this.rateModInfo.falseFlag' :library="{chart: {backgroundColor: ''}}"></bar-chart>
                </div>
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
        module: 'BT1123 Introduction to Big Data',
        similarStudentsFlag: false,
        filtered: {semesters_filter: 'All Semesters', faculty_filter: 'All Faculties', cap_filter: 'All Cap'},
        info: {
            trueFlag: [[1, 10], [2, 12], [3, 78], [4, 42], [5,5]],
            falseFlag: [[1, 2], [2, 13], [3, 74], [4, 105], [5,2]]
        },
        rateModInfo: {
            trueFlag: [[1, 12], [2, 13], [3, 72], [4, 132], [5,10]],
            falseFlag: [[1, 15], [2, 20], [3, 92], [4, 152], [5,12]]
        },
        m2_data_ck: {
            trueFlag: [['A', 40], ['B', 102], ['C', 78], ['D', 30], ['F', 10]],
            falseFlag: [['A', 70], ['B', 132], ['C', 88], ['D', 70], ['F', 40]]
        },
        errored: false,
        loading: true,
        data: {
            m1_data_ck: {
                trueFlag: {
                    name: 'm1_data', 
                    data: [[1, 10], [2, 12], [3, 78], [4, 102], [5,5]]
                },
                falseFlag: {
                    name: 'm1_data', 
                    data: [[1, 12], [2, 13], [3, 74], [4, 102], [5,2]]
                }
            },
            m2_data_ck: {
                trueFlag: {
                    name: 'm2_data',
                    data: [['A', 50], ['B', 102], ['C', 78], ['D', 30], ['E', 10]]
                },
                falseFlag: {
                    name: 'm2_data',
                    data: [['A', 70], ['B', 132], ['C', 88], ['D', 70], ['E', 40]]
                }
            },
            m3_data_ck: {
                trueFlag: {
                name: 'm3_data', 
                data: [[1, 12], [2, 13], [3, 72], [4, 132], [5,10]]
                },
                falseFlag: {
                name: 'm3_data', 
                data: [[1, 15], [2, 20], [3, 92], [4, 152], [5,12]]
                }

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
        semesters_filter: ['AY14/15 to AY18/19','AY17/18 Sem 2','AY17/18 Sem 1','AY16/17 Sem 2','AY16/17 Sem 1','AY15/16 Sem 2','AY15/16 Sem 1','AY14/15 Sem 2','AY14/15 Sem 1'],
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
            let res = await fetch(
                'https://3gx0b3iqpg.execute-api.us-west-2.amazonaws.com/default/synchronus?' + 
                $.param({semester:sem_param,cap:cap_param,faculty:faculty_param}));
            //console.log('param is=' + $.param({semester:sem_param,cap:cap_param,faculty:faculty_param}))
            let theJson = await res.json()
            this.info.trueFlag = theJson
            this.info.falseFlag = theJson
            console.log(theJson)
            //router.push(this.$route.path)
            //console.log($.param({semester:semesters_filter,cap:cap_filter,faculty:faculty_param}))
            //router.push(this.$route.path + '/?' + $.param({semester:semesters_filter,cap:cap_filter,faculty:faculty_param}))
            //router.push(this.$route.path + '?semester='+filter_params.semesters_filter + '&cap=' + filter_params.cap_filter + '&faculty=' + filter_params.faculty_filter)
            
            //for second chart
            let res2 = await fetch('https://3gx0b3iqpg.execute-api.us-west-2.amazonaws.com/default/synchronus?');
            let theJson2 = await res2.json()
            this.rateModInfo.trueFlag = theJson2
            this.rateModInfo.falseFlag = theJson2

            //third chart
            let res3 = await fetch('https://3gx0b3iqpg.execute-api.us-west-2.amazonaws.com/default/synchronus?grade_chart=3');
            let theJson3 = await res3.json()
            this.m2_data_ck.trueFlag = theJson3
            this.m2_data_ck.falseFlag = theJson3
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
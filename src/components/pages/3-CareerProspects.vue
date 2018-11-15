<template>
<v-app light>
<v-content>
    <v-container id='3' grid-list-xl>
        <br>
        <p>Please use all filters </p>
        
        <v-layout row wrap mb-5>

          <v-flex xs12 sm5>
                
            <v-overflow-btn
              label="Choose Class"
              :items="Object.keys(class_filter)"
              target="#dropdown-example"
              
              v-model="filtered.class_filter"
              solo
            ></v-overflow-btn>
            <v-overflow-btn
              :items="faculty_filter"
              label="Choose Faculty"
              target="#dropdown-example"
              
              v-model="filtered.faculty_filter"
              solo
            ></v-overflow-btn>
            </v-flex>
            <v-flex xs12 sm5>
                <v-overflow-btn
                :items="cap_filter"
                label="CAP between.."
                target="#dropdown-example"
                
                v-model="filtered.cap_filter"
                solo
                ></v-overflow-btn>

                <v-switch
                    :key="similarStudentsFlag"
                    :label="'Students Similar to Me: ' + similarStudentsFlag"
                    v-model='similarStudentsFlag'
                ></v-switch>
            </v-flex>
            <v-btn @click="fetchUrl(filtered)">Go</v-btn>
        </v-layout>
        <v-layout v-if='loading!=""'>
            <p style='color:red'>{{loading}}</p>
        </v-layout>
            <div v-if='error!=""' class='tooltip' style='color:red'>{{error}}
                <span class='tooltiptext'>No results available for filters specified.</span>
            </div>
    </v-container>
    <v-container id='1' grid-list-xl>
<!--zero row -->
        <v-layout v-if='similarStudentsFlag== true'>
            <v-flex xs12 sm12>
                <h2> Summary</h2>
                <p>
                    Characteristics of students similar to you (according to cap, course and specialization (if any)):
                    <ul>
                        <li>Most popular jobs: data analyst, software engineer, data scientist.</li>
                        <li>Average salary: $4000</li>
                        <li>Favorite industries: healthcare, Finance</li>
                    </ul>
                </p>        
                        
            </v-flex>
        </v-layout>

        <h2>How does CAP affect Income</h2>
        <v-layout row wrap>
            <v-flex xs12 sm12>
            <scatter-chart 
                title="Avg Income Level VS CAP" 
                xtitle="CAP" 
                ytitle='Avg Income Level' 
                :data= "data.cap_vs_income.data"
                :library="{chart: {backgroundColor: ''}}"
            ></scatter-chart>
            </v-flex>
        </v-layout>
<!--first row-->        
        <!--Breakdown of Employment by Industry and Occupation -->
        <h2>Breakdown of Employment by Industry and Occupation</h2>
        How many graduates joined each industry and role?
        <br>
        <v-layout row wrap>
            <v-flex xs15 sm6>
                <h3>Count by Industry</h3>
                <pie-chart 
                    :data="data.count_job_title_ck.data"
                    :library="{chart: {backgroundColor: ''}}"
                ></pie-chart>
                
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Count by Job Title</h3>
                <pie-chart 
                    :data="data.count_industry_ck.data"
                    :library="{chart: {backgroundColor: ''}}"
                ></pie-chart>
            </v-flex>
        </v-layout>
        <br>
<!--second row-->        
        <!--Course Relevance Rating -->
        <h2>Course Relevance Rating</h2>
        How relevant is your course to your job? (1: Not Relevant 5: Very Relevant)
        <v-layout>
            <v-flex xs15 sm6>
                <h3>Relevance by Industry</h3>
                <bar-chart 
                    title="Relevance by Industry" 
                    xtitle="Relevance Score" 
                    :min="0" 
                    :max="5" 
                    :data="data.relevance_industry_ck.data"
                    :library="{chart: {backgroundColor: ''}}"
                ></bar-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Relevance by Job Title</h3>
                <bar-chart 
                    title="Relevance by Job Title" 
                    xtitle="Relevance Score" 
                    :min="0" :max="5" 
                    :data="data.relevance_job_title_ck.data"
                    :library="{chart: {backgroundColor: ''}}"
                ></bar-chart>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs15 sm6>
                <h3>Preparedness by Industry</h3>
                <bar-chart 
                    title="Preparedness by Industry" 
                    xtitle="Preparedness Score" 
                    :min="0" 
                    :max="5" 
                    :data="data.preparedness_industry_ck.data"
                    :library="{chart: {backgroundColor: ''}}"
                ></bar-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Preparedness by Job Title</h3>
                <bar-chart :library="{chart: {backgroundColor: ''}}" title="Preparedness by Job Title" xtitle="Preparedness Score" :min="0" :max="5" :data="data.preparedness_job_title_ck.data"></bar-chart>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs15 sm10>
                <h3>Income Level by Job Title</h3>
                <bar-chart :library="{chart: {backgroundColor: ''}}" title="Income Level by Job Title" :stacked="true" :data=data.income_by_job_title_ck.data></bar-chart>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>
</v-app>
</template>

<script>
  import Filters from '../filters/Filters'

  export default {
    components: {
      Filters
    },
    data () {
      return {
        error: '',
        loading: '',
        filtered: {class_filter: 'Choose Class of 20XX', faculty_filter: 'Pick Faculty', cap_filter: 'Pick Cap'},
        class_filter: {
                '2014' : '2014',
                '2015' : '2015',
                '2016' :  '2016',
                '2017' : '2017'
            },
        faculty_filter: ['BIZ', 'FASS', 'FoE', 'FoS', 'SDE', 'SCALE', 'NUS', 'MDP', 'NUSMed', 'ISS', 'SoC', 'RMI', 'FoL', 'SPP', 'NGS', 'YNC', 'FoD', 'DUKE MS', 'MUS', 'SMA', 'SPH', 'TDSI', 'TLIAP'],
        cap_filter: [3,4,5], // ['All', '<3.0', '3.0-3.5', '3.5-4.0', '4.0-4.5', '>4.5'],
        similarStudentsFlag: false,
        datacollection: null,
        options: {
            scales: {
                xAxes: [{ stacked: true}],
                yAxes: [{ stacked: true}]
            }
        },
        data: {
            cap_vs_income: {
                name: 'Cap vs Income',
                data: [['4.13', '5000'], ['4.5', '4200'], ['4.5', '4200'], ['4.0', '4200'], ['4.65', '5200'], ['3.8', '4000'], ['3.65', '3800'], ['3.3', '3500'], ['4.24', '5100']]
            },
            count_job_title_ck: {
                name: 'Count Job Title',
                data: [['Consultant', "50"], ['Financial Analyst', "48"], ['Risk Analyst', "40"], ['Data Analyst', "60"], ['Data Scientist', "42"]]
            },
            count_industry_ck: {
                name: 'Count Industry',
                data: [['Finance', "66"], ['Real Estate', "34"], ['Healthcare', "30"], ['Manufacturing', "25"], ['Telecommunications', "28"], ['F&B', "23"]]
            },
            relevance_industry_ck: {
                name: 'Relevance of Industry',
                data: [['Finance', '4.4'], ['Real Estate', '3.6'], ['Healthcare', '3.6'], ['Manufacturing', '3.3'], ['Telecommunications', '3.3'], ['F&B', '3.1']]
            },
            relevance_job_title_ck: {
                name: 'Relevance of Job Title',
                data: [['Consultant', '4.2'],['Data Analyst', '4.6'], ['Data Scientist', '3.1'], ['Risk Analyst', '4.1'], ['Financial Analyst', 4.1]]
            },
            preparedness_industry_ck: {
                name: 'Preparedness Score by Industry',
                data: [['Finance', '4.0'], ['Real Estate', '3.3'], ['Healthcare', '3.6'], ['Manufacturing', '3.5'], ['Telecommunications', '3.3'], ['F&B', 3.1]]
            },
            preparedness_job_title_ck: {
                name: 'Preparedness Scoress by Job Title ',
                data: [['Consultant', '3.4'],['Data Analyst', '4.6'], ['Data Scientist', '3.1'], ['Risk Analyst', '4.1'], ['Financial Analyst', 4.0]]
            },
            income_by_job_title_ck: {
                name: '',
                data: [
                    {
                        name: "Data Analyst", 
                        data: [["<3K","32"],["3.5K to 4K","46"],["4K to 4.5K","28"],["4.5K to 5K","21"]]},
                    {
                        name: "Data Scientist", 
                        data: [["<3K","25"],["4K to 4.5K","41"],["4.5K to 5K","21"],["5K to 5.5K","17"]]},
                    {
                        name: "Data Engineer", 
                        data: [["<3K","4"],["3.5K to 4K","6"],["4K to 4.5K","8"],["4.5K to 5K","4"]]
                    }],
            }
        }
      }
    },
    methods: {
        fetchUrl: async function(filter_params) {
            try {
                // probably need to adjust the cap list and faculty list
                this.loading = 'Have you used all filters? We are pulling and aggregating the results right now...'  
                this.error = ''
                console.log('do i have filter_parsms?')
                console.log(filter_params)
                let class_param = this.$data.class_filter[filter_params.class_filter]
                let cap_param = filter_params.cap_filter
                let faculty_param = filter_params.faculty_filter
                let url = 'https://uw2gpnk5f9.execute-api.ap-southeast-1.amazonaws.com/Prod/ges?'
                let urlToFetch = url + $.param({cap:cap_param, faculty: faculty_param, class: class_param} ) + "&" 
                console.log('testing' + cap_param + class_param + faculty_param)
                
                //test first chart test random chart to delete
                // let restest = await fetch('https://3gx0b3iqpg.execute-api.us-west-2.amazonaws.com/default/synchronus?grade_chart=3')
                // console.log(restest)
                // let thejsontest = await restest.json()
                // this.data.count_industry_ck.data = thejsontest
                // comsole.log(thejsontest)

                //chart1
                let chart_name1 = 'count_job_title' //TODO
                let res = await fetch(urlToFetch + $.param({chart:chart_name1}));
                console.log('res')
                console.log(res)
                let theJson = await res.json()
                console.log('body')
                console.log(theJson)
                this.data.count_job_title_ck.data = theJson
                console.log(theJson)
    
                //chart2
                let chart_name2 = 'count_industry'
                let res2 = await fetch(urlToFetch + $.param({chart:chart_name2}));
                let theJson2 = await res2.json()
                this.data.count_industry_ck.data = theJson2
                console.log(theJson2)
    
                // //chart3
                // let chart_name3 = 'relevance_industry'
                // let res3 = await fetch(urlToFetch + $.param({chart:chart_name4}));
                // let theJson3 = await res3.json()
                // this.data.relevance_industry_ck.data = theJson3
    
                // //chart4
                // let chart_name4 = 'relevance_job_title'
                // let res4 = await fetch(urlToFetch + $.param({chart:chart_name4}));
                // let theJson4 = await res4.json()
                // this.data.relevance_job_title_ck.data = theJson4
                
                // this.loading = 'Still aggregating. We are almost done, please bear with us!'  
    
                // //chart5
                // let chart_name5 = 'income_cap'
                // let res5 = await fetch(urlToFetch + $.param({chart:chart_name5}));
                // let theJson5 = await res5.json()
                // this.data.cap_vs_income.data = theJson5
    
                // //chart6
                // let chart_name6 = 'preparedness_industry'
                // let res6 = await fetch(urlToFetch + $.param({chart:chart_name6}));
                // let theJson6 = await res6.json()
                // this.data.preparedness_industry_ck.data = theJson6
                
                // this.loading = 'Final 2 charts!'
    
                // //chart7
                // let chart_name7 = 'preparedness_job_title'
                // let res7 = await fetch(urlToFetch + $.param({chart:chart_name7}));
                // let theJson7 = await res7.json()
                // this.data.preparedness_job_title_ck.data = theJson7
    
                // //chart8
                // let chart_name8 = 'income_by_job_title'
                // let res8 = await fetch(urlToFetch + $.param({chart:chart_name8}));
                // let theJson8 = await res8.json()
                // this.data.income_by_job_title_ck.data = theJson8
    
    
                
                console.log(theJson)
                this.loading = 'Results are now fully loaded!'
                console.log('results is now fully loaded')
                
            } catch (error) {
                this.loading = ''
                this.error = 'ERROR.'
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
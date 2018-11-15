<template>
<v-app light>
<v-content>
    <v-container>
        <!-- <filters></filters> -->
                <br>
        <p>Please use all filters </p>
        <v-layout row wrap mb-5>

          <v-flex xs12 sm5>
                
            <v-overflow-btn
              label="Choose Class"
              :items="Object.keys(class_filter)"
              target="#dropdown-example"
              @change="fetchUrl(filtered)"
              v-model="filtered.class_filter"
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
            <p style='color:red'>{{loading}}</p>
            <div class='tooltip' style='color:red'>{{error}}
            <span class='tooltiptext'>Please remember to use all filters!</span>
        </div>
        </v-layout>
    </v-container>
    <v-container id='1' grid-list-xl>
<!--first row-->        
        <!--Breakdown of Job Search Channel by Industry and Occupation -->
        <h2>Breakdown of Job Search Channel by Industry and Occupation</h2>
        <br>
        <v-layout row wrap>
            <v-flex xs15 sm6>
                <h3>Job Search Channels by Industry</h3>
                <bar-chart 
                    title="Job Search Channels by Industry" 
                    :stacked="true" 
                    :data=this.industry_jobchannels
                    :library="{chart: {backgroundColor: ''}}"
                ></bar-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Job Search Channels by Job Title</h3>
                <bar-chart 
                    title="Job Search Channels by Job Title" 
                    :stacked="true" 
                    :data=this.occupation_jobchannels
                    :library="{chart: {backgroundColor: ''}}"
                ></bar-chart>
            </v-flex>
        </v-layout>
        <br>
<!--second row-->        
        <!--Amount of Time in Job Search before landing an offer -->
        <h2>Amount of Time in Job Search before landing an offer</h2>
        <v-layout>
            <v-flex xs15 sm12>
                <h3>Amount of time to get a job offer</h3>
                <v-subheader>What is the average time to get a job offer by job search channel?</v-subheader>
                <line-chart 
                    title="Amount of time to get job offer" 
                    xtitle="No. of Weeks" 
                    :data=this.time_jobchannels
                    :library="{chart: {backgroundColor: ''}}"
                ></line-chart>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs15 sm12>
                <h3>Month of start of job search</h3>
                <v-subheader>When is the best time to start looking for jobs?</v-subheader>
                <line-chart 
                    title="Month of start of job search" 
                    xtitle="Month" 
                    :stacked="true" 
                    :data=this.month_jobchannels
                    :library="{chart: {backgroundColor: ''}}"
                ></line-chart>-->

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
                    '2012' : '2012',
                    '2013' : '2013',
                    '2014' : '2014',
                    '2015' : '2015',
                    '2016' :  '2016',
                    '2017' : '2017'
                },
            faculty_filter: ['All', 'SOC', 'FASS', 'SDE', 'BIZ', 'Science'],
            cap_filter: ['All', '<3.0', '3.0-3.5', '3.5-4.0', '4.0-4.5', '>4.5'],
            similarStudentsFlag: false,
            datacollection: null,
            industry_jobchannels: [{name: "NUSTalentConnect", data: [["Tech",32],["Finance",46],["Real Estate",28],["Healthcare",21]]},
                    {name: "Social Media Network", data: [["Tech",25],["Finance",41],["Healthcare",21],["Real Estate",17]]},
                    {name: "Friends and Family", data: [["Tech",4],["Finance",6],["Aerospace",8],["Real Estate",4]]}],
            occupation_jobchannels: [{name: "NUSTalentConnect", data: [["Tech Consultant",32],["Financial Analyst",46],["Real Estate Analyst",28],["Data Analyst",21]]},
                    {name: "Social Media Network", data: [["Tech Consultant",25],["Financial Analyst",41],["Data Scientist",21],["Data Analyst",17]]},
                    {name: "Friends and Family", data: [["Tech Consultant",4],["Financial Analyst",6],["Data Scientist",8],["Real Estate Analyst",4]]}],
            time_jobchannels: [{name: "NUSTalentConnect", data: [["0",32],["2",6],["4",8],["6",21], ["8",22],["10",12]]},
                    {name: "Social Media Network", data: [["0",25],["2",4],["4",21],["6",17],["8",8],["10",21]]},
                    {name: "Friends and Family", data: [["0",4],["2",6],["4",8],["6",4],["8",17],["10",8]]}],
            month_jobchannels: [{name: "Healthcare", data: [["July",32],["Aug",6],["Sep",8],["Oct",21], ["Nov",22],["Dec",12]]},
                    {name: "Finance", data: [["July",25],["Aug",4],["Sep",21],["Oct",17],["Nov",8],["Dec",21]]},
                    {name: "F&B", data: [["July",4],["Aug",6],["Sep",8],["Oct",4],["Nov",17],["Dec",8]]}]
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
            },
            fetchUrl: async function(filter_params) {
                try {
                    
                    // probably need to adjust the cap list and faculty list
                    this.loading = 'Have you used all filters? We are pulling and aggregating the results right now...'  
                    console.log(filter_params)
                    let class_param = this.$data.class_filter[filter_params.class_filter]
                    let cap_param = filter_params.class_filter
                    let faculty_param = filter_params.faculty_filter
                    let url = 'https://uw2gpnk5f9.execute-api.ap-southeast-1.amazonaws.com/Prod/ges?'
                    let urlToFetch = url + $.param({cap:cap_param, faculty: faculty_param, class: class_param}) 
                    
                    //chart1
                    let chart_name1 = 'industry_jobchannels' //TODO
                    let res = await fetch(urlToFetch + $.param({chart:chart_name1}));
                    let theJson = await res.json()
                    this.industry_jobchannels = theJson
    
                    //chart2
                    let chart_name2 = 'occupation_jobchannels'
                    let res2 = await fetch(urlToFetch + $.param({chart:chart_name2}));
                    let theJson2 = await res2.json()
                    this.occupation_jobchannels = theJson2
    
                    this.loading = 'Still aggregating. We are almost done, please bear with us!'  
    
                    //chart3
                    let chart_name3 = 'time_jobchannels'
                    let res3 = await fetch(urlToFetch + $.param({chart:chart_name4}));
                    let theJson3 = await res3.json()
                    this.time_jobchannels = theJson3
    
                    //chart4
                    let chart_name4 = 'month_jobchannels'
                    let res4 = await fetch(urlToFetch + $.param({chart:chart_name4}));
                    let theJson4 = await res4.json()
                    this.month_jobchannels = theJson4
                    
                    this.loading = 'Results are now fully loaded!'
                
                } catch (error) {
                    this.loading = ''
                    this.error = 'ERROR.'
                    
                }}

        }
    }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  50px auto;
  }
</style>

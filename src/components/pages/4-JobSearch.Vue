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
                <bar-chart title="Job Search Channels by Industry" :stacked="true" :data=this.industry_jobchannels></bar-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Job Search Channels by Job Title</h3>
                <bar-chart title="Job Search Channels by Job Title" :stacked="true" :data=this.occupation_jobchannels></bar-chart>
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
                <line-chart title="Amount of time to get job offer" xtitle="No. of Weeks" :data=this.time_jobchannels></line-chart>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs15 sm12>
                <h3>Month of start of job search</h3>
                <v-subheader>When is the best time to start looking for jobs?</v-subheader>
                <line-chart title="Month of start of job search" xtitle="Month" :stacked="true" :data=this.month_jobchannels></line-chart>
                <geo-chart :data="[['United States', 44], ['Germany', 23], ['Brazil', 22]]"></geo-chart>

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

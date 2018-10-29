<template>
<v-app light>
<v-content>
    <v-container>
        <filters></filters>
    </v-container>
    <v-container id='1' grid-list-xl>
<!--zero row -->
        <h2>How does CAP affect Income</h2>
        <v-layout row wrap>
            <v-flex xs12 sm12>
            <scatter-chart 
                title="Avg Income Level VS CAP" 
                xtitle="CAP" 
                ytitle='Avg Income Level' 
                :data="[[4.13, 5000],[4.5, 4200],[4.5, 4200],[4.0, 4200],[4.65, 5200],[3.8, 4000],[3.65, 3800],[3.3, 3500],[4.24, 5100]]"
                :library="{chart: {backgroundColor: ''}}"
            ></scatter-chart>
            </v-flex>
        </v-layout>
<!--first row-->        
        <!--Breakdown of Employment by Industry and Occupation -->
        <v-header><h2>Breakdown of Employment by Industry and Occupation</h2></v-header>
        <v-subheader>How many graduates joined each industry and role?</v-subheader>
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
        <v-header><h2>Course Relevance Rating</h2></v-header>
        <v-subheader>How relevant is your course to your job? (1: Not Relevant 5: Very Relevant)</v-subheader>
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
                <bar-chart :library="{chart: {backgroundColor: ''}}" title="Preparedness by Industry" xtitle="Preparedness Score" :min="0" :max="5" :data="data.preparedness_job_title_ck.data"></bar-chart>
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
        datacollection: null,
        options: {
            scales: {
                xAxes: [{ stacked: true}],
                yAxes: [{ stacked: true}]
            }
        },
        data: {
            count_job_title_ck: {
                name: 'Count Job Title',
                data: [['Consultant', 50], ['Financial Analyst', 48], ['Risk Analyst', 40], ['Data Analyst', 60], ['Data Scientist', 42]]
            },
            count_industry_ck: {
                name: 'Count Industry',
                data: [['Finance', 66], ['Real Estate', 34], ['Healthcare', 30], ['Manufacturing', 25], ['Telecommunications', 28], ['F&B', 23]]
            },
            relevance_industry_ck: {
                name: 'Relevance of Industry',
                data: [['Finance', 4.4], ['Real Estate', 3.6], ['Healthcare', 3.6], ['Manufacturing', 3.3], ['Telecommunications', 3.3], ['F&B', 3.1]]
            },
            relevance_job_title_ck: {
                name: 'Relevance of Job Title',
                data: [['Consultant', 4.2],['Data Analyst', 4.6], ['Data Scientist', 3.1], ['Risk Analyst', 4.1], ['Financial Analyst', 4.1]]
            },
            preparedness_industry_ck: {
                name: 'Preparedness Score by Industry',
                data: [['Finance', 4.0], ['Real Estate', 3.3], ['Healthcare', 3.6], ['Manufacturing', 3.5], ['Telecommunications', 3.3], ['F&B', 3.1]]
            },
            preparedness_job_title_ck: {
                name: 'Preparedness Scoress by Job Title ',
                data: [['Consultant', 3.4],['Data Analyst', 4.6], ['Data Scientist', 3.1], ['Risk Analyst', 4.1], ['Financial Analyst', 4.0]]
            },
            income_by_job_title_ck: {
                name: '',
                data: [
                    {
                        name: "Data Analyst", 
                        data: [["<3K",32],["3.5K to 4K",46],["4K to 4.5K",28],["4.5K to 5K",21]]},
                    {
                        name: "Data Scientist", 
                        data: [["<3K",25],["4K to 4.5K",41],["4.5K to 5K",21],["5K to 5.5K",17]]},
                    {
                        name: "Data Engineer", 
                        data: [["<3K",4],["3.5K to 4K",6],["4K to 4.5K",8],["4.5K to 5K",4]]
                    }],
            }
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
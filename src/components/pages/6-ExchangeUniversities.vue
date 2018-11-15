<template>
  <v-app light>
    <v-content>
      <v-container id="dropdown-example2" grid-list-xl>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <v-overflow-btn
              :items="region_list"
              label="Choose region"
              v-model="defaults.region"
              @change="filter_exchange_universities(defaults.region, default_country[defaults.region], ay_val[defaults.ay], sem_val[defaults.sem])"
            ></v-overflow-btn>
          </v-flex>
          <v-flex xs12 sm4>
            <v-overflow-btn
              :items="country_list[defaults.region]"
              label="Choose country"
              v-model="default_country[defaults.region]"
              @change="filter_exchange_universities(defaults.region, default_country[defaults.region], ay_val[defaults.ay], sem_val[defaults.sem])"
            ></v-overflow-btn>
          </v-flex>
          <v-flex xs12 sm2>
            <v-overflow-btn
              :items="ay_list"
              label="Choose AY"
              v-model="defaults.ay"
              @change="filter_exchange_universities(defaults.region, default_country[defaults.region], ay_val[defaults.ay], sem_val[defaults.sem])"
            ></v-overflow-btn>
          </v-flex>
          <v-flex xs12 sm2>
            <v-overflow-btn
              :items="sem_list"
              label="Choose semester"
              v-model="defaults.sem"
              @change="filter_exchange_universities(defaults.region, default_country[defaults.region], ay_val[defaults.ay], sem_val[defaults.sem])"
            ></v-overflow-btn>
          </v-flex>
        </v-layout>
        <p>Number of students who went on exchange to <b>{{default_country[defaults.region]}}</b> in <b>{{defaults.ay}} {{defaults.sem}}</b></p>
        <v-card class="pa-3" v-if="Object.keys(exchange_uni_student_count[0]['data']).length != 0">
          <bar-chart :data='exchange_uni_student_count' :stacked="true"></bar-chart>
        </v-card>
        <v-alert
          :value="true"
          type="error"
          v-if="Object.keys(exchange_uni_student_count[0]['data']).length == 0"
        >
        Sorry, there are no records at the moment.
        </v-alert>
      </v-container>
    </v-content>
  </v-app>


</template>

<script>
  import VContent from "vuetify/lib/components/VGrid/VContent";
  export default {
    components: {
      VContent
    },
    props: ['chosen_region'],
    data() {
      return {
        exchange_uni_student_count: {},
        module_list: ['My core modules','Modules with prerequisites fulfilled', 'All modules'],
        region_list: ['All continents','Africa','Asia','Australia (Oceania)','Europe','North America','South America'],
        all_countries_list: ['All countries','China','Denmark','Germany','Hong Kong','Japan','Korea','Singapore','Sweden','Switzerland','Taiwan','United Kingdom','USA'],
        africa_list:['All countries in Africa'],
        asia_list: ['All countries in Asia','China','Hong Kong','Japan','Korea','Singapore','Taiwan'],
        australia_list: ['All countries in Australia(Oceania)'],
        europe_list: ['All countries in Europe','Denmark','Germany','Sweden','Switzerland','United Kingdom'],
        north_america_list:['All countries in North America', 'USA'],
        south_america_list: ['All countries in South America'],
        default_country: {'All continents':'All countries', 'Africa': 'All countries in Africa', 'Asia': 'All countries in Asia', 'Australia (Oceania)': 'All countries in Australia (Oceania)', 'Europe':'All countries in Europe', 'North America': 'All countries in North America', 'South America': 'All countries in South America' },
        ay_list: ['AY17/18','AY16/17','AY15/16','AY14/15','AY13/14','AY12/13','AY11/12','AY10/11','AY09/10'],
        ay_val:{'AY17/18':17,'AY16/17':16,'AY15/16':15,'AY14/15':14,'AY13/14':13,'AY12/13':12,'AY11/12':11,'AY10/11':10,'AY09/10':9},
        sem_list: ['Sem 1','Sem 2'],
        sem_val: {'Sem 1':1,'Sem 2':2},
        defaults:{'region':this.chosen_region, 'country':'All countries','ay':'AY17/18','sem':'Sem 1'},
      }
    },
    computed: {
      country_list() {
        return {
          'All continents':this.all_countries_list, 'Africa':this.africa_list, 'Asia':this.asia_list, 'Australia (Oceania)':this.australia_list, 'Europe':this.europe_list, 'North America': this.north_america_list, "South America": this.south_america_list
        }
      }
    },
    mounted () {
      this.fillData()
    },
    methods:{
      filter_exchange_universities: async function (region, country, ay, sem) {
        let params = $.param({});
        if (region == 'All continents' && country == 'All countries'){
          console.log('here');
          params = $.param({ay:ay,sem:sem});
        } else if(region == 'All continents'){
          params = $.param({country:country,ay:ay,sem:sem})
        } else if (country && country.indexOf('All countries') != -1) {
          console.log('there');
          params = $.param({continent:region,ay:ay,sem:sem});
        } else if(country){
          console.log('where');
          params = $.param({continent:region,country:country,ay:ay,sem:sem});
        } else {
          params = $.param({ay:ay,sem:sem})
        }
        let res = await fetch('https://uw2gpnk5f9.execute-api.ap-southeast-1.amazonaws.com/Prod/exchangeuni?' + params);
        let theJson = await res.json();
        this.exchange_uni_student_count = theJson
      },
      title: function(route) {
        return this.route_titles[route]
      },
      fillData() {
        this.default_country = {'All continents':'All countries', 'Africa': 'All countries in Africa', 'Asia': 'All countries in Asia', 'Australia (Oceania)': 'All countries in Australia (Oceania)', 'Europe':'All countries in Europe', 'North America': 'All countries in North America', 'South America': 'All countries in South America' };
        this.filter_exchange_universities(this.chosen_region, this.default_country[this.chosen_region], 17, 1);
      }
    }
  };

</script>

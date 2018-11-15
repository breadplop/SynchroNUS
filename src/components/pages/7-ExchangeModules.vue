<template>
  <v-app light>
    <v-content>
      <v-container id="dropdown-example" grid-list-xl>
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-overflow-btn
              :items="universities_list"
              label="Choose partner university"
              v-model="defaults.university"
              @change="filter_exchange_modules(defaults.university)"
            ></v-overflow-btn>
          </v-flex>
        </v-layout>
        <v-layout v-if="Object.keys(exchange_modules).length != 0"><bar-chart :data='this.exchange_modules' :stacked="true"></bar-chart></v-layout>
        <div v-if="Object.keys(exchange_modules).length != 0">
        <h4><u>Information about {{defaults.university}}</u></h4><br/>
          <p>Region: {{universities_data[defaults.university]['region']}}</p>
          <p>Country: {{universities_data[defaults.university]['country']}}</p>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: ['chosen_university'],
    components: {
    },
    data() {
      return {
        display_options: ['My course', 'My faculty', 'Whole of NUS'],
        universities_list: ['Columbia University', 'ETH Zurich', 'King\'s College London',
          'Nanyang Technology University', 'National Taiwan University', 'New York University',
          'Peking University','Pennsylvania State University','Purdue University', 'Seoul University',
          'Technical University of Munich','The University of Hong Kong','Tokyo University','Tsing Hua University',
          'University of California, Berkeley','University of California, Los Angeles','University of Copenhagen',
          'University of Edinburgh','University of Lund','Yale University'],
        universities_data: {'Columbia University':{region:'North America',country:'USA'}, 'ETH Zurich':{region:'Europe',country:'Switzerland'}, 'King\'s College London':{region:'Europe',country:'United Kingdom'},
          'Nanyang Technology University':{region:'Asia',country:'Singapore'}, 'National Taiwan University':{region:'Asia',country:'Taiwan'}, 'New York University':{region:'North America',country:'USA'},
          'Peking University':{region:'Asia',country:'China'},'Pennsylvania State University':{region:'North America',country:'USA'},'Purdue University':{region:'North America',country:'USA'}, 'Seoul University':{region:'Asia',country:'Korea'},
          'Technical University of Munich':{region:'Europe',country:'Germany'},'The University of Hong Kong':{region:'Asia',country:'Hong Kong'},'Tokyo University':{region:'Asia',country:'Japan'},'Tsing Hua University':{region:'Asia',country:'China'},
          'University of California, Berkeley':{region:'North America',country:'USA'},'University of California, Los Angeles':{region:'North America',country:'USA'},'University of Copenhagen':{region:'Europe',country:'Denmark'},
          'University of Edinburgh':{region:'Europe',country:'United Kingdom'},'University of Lund':{region:'Europe',country:'Sweden'},'Yale University':{region:'North America',country:'USA'}},
        exchange_modules: {},
        module_list: ['My core modules','Modules with prerequisites fulfilled', 'All modules'],
        defaults:{'university':this.chosen_university},
        }
    },
    computed: {
      currentRoute () {
        return this.$route.path
      },
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
      filter_exchange_modules: async function (uni) {
        let res = await fetch('https://uw2gpnk5f9.execute-api.ap-southeast-1.amazonaws.com/Prod/exchangemods?' + $.param({uni:uni}));
        let theJson = await res.json();
        this.exchange_modules = theJson;
      },
      title: function(route) {
        return this.route_titles[route]
      },
      fillData() {
        this.filter_exchange_modules(this.chosen_university);
      }
    }
  };

</script>

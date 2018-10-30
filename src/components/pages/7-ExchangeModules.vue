<template>
  <v-app light>
    <v-content>
      <v-container id="dropdown-example" grid-list-xl>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <v-overflow-btn
              :items="display_options"
              label="School of Computing"
              target="#dropdown-example"
              v-model="defaults.display"
              @change="filter_exchange_modules(defaults.display, defaults.university, defaults.module_type)"
            ></v-overflow-btn>
          </v-flex>
          <v-flex xs12 sm4>
            <v-overflow-btn
              :items="universities_list"
              label="Filter university"
              target="#dropdown-example"
              v-model="defaults.university"
              @change="filter_exchange_modules(defaults.display, defaults.university, defaults.module_type)"
            ></v-overflow-btn>
          </v-flex>
          <v-flex xs12 sm4>
            <v-overflow-btn
              :items="module_list"
              label="Filter type of modules"
              target="#dropdown-example"
              v-model="defaults.module_type"
              @change="filter_exchange_modules(defaults.display, defaults.university, defaults.module_type)"
            ></v-overflow-btn>
          </v-flex>
          <!--<v-flex xs12 sm1>-->
          <!--<v-btn color="info" v-on:click="filter_exchange_modules(defaults.display,defaults.university,defaults.module_type)">Go!</v-btn>-->
          <!--</v-flex>-->
        </v-layout>
          <v-layout><bar-chart :data='this.exchange_modules[defaults.university]' :stacked="true"></bar-chart></v-layout>


        <h4><u>Information about {{defaults.university}}</u></h4><br/>
          <p>Region: {{university_region}}</p>
          <p>Country: {{university_country}}</p>
      </v-container>
    </v-content>
  </v-app>


</template>

<script>

  export default {
    components: {
    },
    data() {
      return {
        options: {
          scales: {
            xAxes: [{ stacked: true}],
            yAxes: [{ stacked: true}]
          }
        },
        university_country: null,
        university_region: null,

        display_options: ['My course', 'My faculty', 'Whole of NUS'],
        universities_list: [],
        exchange_uni_student_count: {},
        students_course_data: [],
        students_others_data: [],
        module_list: ['My core modules','Modules with prerequisites fulfilled', 'All modules'],
        semester_list: ['AY14/15 to AY18/19','AY17/18 Sem 2','AY17/18 Sem 1','AY16/17 Sem 2','AY16/17 Sem 1','AY15/16 Sem 2','AY15/16 Sem 1','AY14/15 Sem 2','AY14/15 Sem 1'],
        defaults:{'display': 'My course','university':'Royal Institute of Technology (KTH)', 'module_type':'My core modules', 'country':'All countries', 'semester': 'AY14/15 to AY18/19'},
        // exchange_universities_filter_url:"https://j4e862m1ei.execute-api.us-west-2.amazonaws.com/default/synchronus?",
        exchange_universities_filter_url:"https://j4e862m1ei.execute-api.us-west-2.amazonaws.com/default/Synchronus_exchange_universities?",
        exchange_modules: {
          'Royal Institute of Technology (KTH)': [{
            name: "Pass",
            data: [["BT3102 | DD2447", 32], ["CS3244 | DD2434", 46], ["DSC3214| SF1811", 28], ["BT3103 | ID2216", 21], ["BT4240 | ID2222", 20], ["BT4222 | ID2342", 13]]
          },
            {
              name: "Fail",
              data: [["BT3102 | DD2447", 3], ["CS3244 | DD2434", 4], ["DSC3214| SF1811", 2], ["BT3103 | ID2216", 2], ["BT4240 | ID2222", 0], ["BT4222 | ID2342", 3]]
            }],
          'Technical University of Munich': [{
            name: "Pass",
            data: [["BT3102 | IH447", 21], ["CS3214 | DT274", 26], ["DSC3214| PE151", 8], ["BT3103 | ID2314", 12], ["BT4240 | MK322", 13], ["BT4222 | DY942", 1]]
          },
            {
              name: "Fail",
              data: [["BT3102 | IH447", 4], ["CS3214 | DT274", 3], ["DSC3214| PE151", 2], ["BT3103 | ID2314", 2], ["BT4240 | MK322", 2], ["BT4222 | DY942", 1]]
            }],
          'Peking University': [{
            name: "Pass",
            data: [["BT3102 | DD2447", 5], ["CS3244 | DD2434", 16], ["DSC3214| SF1811", 8], ["BT3103 | ID2216", 10], ["BT4240 | ID2222", 30], ["BT4222 | ID2342", 12]]
          },
            {
              name: "Fail",
              data: [["BT3102 | DD2447", 1], ["CS3244 | DD2434", 3], ["DSC3214| SF1811", 0], ["BT3103 | ID2216", 6], ["BT4240 | ID2222", 4], ["BT4222 | ID2342", 0]]
            }]
        },
        route_titles: {'/': 'Student Exchange Program (SEP) Planning', '/exchange_universities':'Exchange Universities', '/exchange_modules':'Module Mapping'}
      }
    },
    computed: {
      currentRoute () {
        // We will see what `params` is shortly
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
      filter_exchange_modules: async function (region, country, semester) {
        let res = await fetch(this.exchange_universities_filter_url + $.param({region:region,country:country,semester:semester}));
        let theJson = await res.json();
        this.exchange_uni_student_count = theJson;


        var universities = [];
        for(var k in theJson[0]['data']) universities.push(k);
        this.university_data = universities;
        this.universities_list = universities;

        let res2 = await fetch('https://bt3103-synchronus.firebaseio.com/Exchange/University.json');
        let theJson2 = await res2.json();
        // console.log(theJson2);
        for(var k in theJson2){
          console.log(theJson2[k]['Name']);
          console.log(this.defaults.university);
          if (theJson2[k]['Name'] == this.defaults.university){
            this.university_region = theJson2[k]['Region'];
            this.university_country = theJson2[k]['Country'];
          }
        }



      },
      title: function(route) {
        return this.route_titles[route]
      },
      navigate_exchange: function(region){
        this.defaults.region = region;
        this.filter_exchange_universities(region, this.default_country[region], this.defaults.semester);
        this.$router.push('/exchange_universities')
      },
      fillData() {
        // this.university_data = ['School 1','School 2'];
        // this.students_course_data = [1,2];
        // this.students_others_data = [4,5];
        this.filter_exchange_modules('All continents', 'All countries', 'AY14/15 to AY 18/19');
      }
    }
  };

</script>

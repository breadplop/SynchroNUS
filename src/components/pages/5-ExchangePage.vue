<template>
  <v-app light>
    <v-content>
      <v-container grid-list-xl>
        <h3> Search universities by partner university name </h3>

        <v-layout row wrap mb-5>
          <v-flex xs12 sm5>
            <v-overflow-btn
              :items="universities_list"
              label="Choose partner university"
              v-model="defaults.university"
              solo
            ></v-overflow-btn>
          </v-flex>

          <v-flex xs12 sm2>
            <v-btn color="info" v-on:click="navigate_exchange_modules(defaults.university)">Go!</v-btn>
          </v-flex>
        </v-layout>

        <h3> Search universities by region </h3>

        <v-layout row wrap>
          <v-flex
            v-for="card in cards"
            v-bind="{ [`xs${card.flex}`]: true }"
            :key="card.title"
          >
            <v-card style="border-radius: 10px; cursor: pointer;">
              <v-img
                :src="card.src"
                height="150px"
                v-on:click="navigate_exchange(card.title)"
              >
                <v-container
                  fill-height
                  fluid
                  pa-2
                  style="background-color:#443f3f59"
                >
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox pt-5 style="text-align: center;">
                      <span class="headline white--text" v-text="card.title"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-card>
          </v-flex>
        </v-layout>
        <geo-chart :data="[['United States', 7], ['Korea',1],['Taiwan',1], ['Singapore',1], ['China', 2], ['Japan',1], ['Switzerland',1],['Hong Kong',1], ['Sweden',1], ['United Kingdom',2], ['Germany', 1], ['Denmark',1]]"></geo-chart>


      </v-container>
    </v-content>
  </v-app>


</template>

<script>
  import router from '../../router'

  export default {
    props: {
      chosen_region: {
        type: String,
        default: 'All continents'
      },
    },
    components: {
      router
    },
    data() {
      return {
        universities_list: ['Columbia University', 'ETH Zurich', 'King\'s College London',
          'Nanyang Technology University', 'National Taiwan University', 'New York University',
          'Peking University','Pennsylvania State University','Purdue University', 'Seoul University',
          'Technical University of Munich','The University of Hong Kong','Tokyo University','Tsing Hua University',
          'University of California, Berkeley','University of California, Los Angeles','University of Copenhagen',
          'University of Edinburgh','University of Lund','Yale University'],
        exchange_uni_student_count: {},
        exchange_universities_filter_url:"https://j4e862m1ei.execute-api.us-west-2.amazonaws.com/default/Synchronus_exchange_universities?",
        default_country: {'All continents':'All countries', 'Africa': 'All countries in Africa', 'Asia': 'All countries in Asia', 'Australia (Oceania)': 'All countries in Australia (Oceania)', 'Europe':'All countries in Europe', 'North America': 'All countries in North America', 'South America': 'All countries in South America' },
        defaults:{'display': 'My course','university':null, 'module_type':'My core modules', 'region':'All continents', 'country':'All countries', 'semester': 'AY14/15 to AY18/19'},
        cards: [
          { title: 'All continents', src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', flex: 6},
          { title: 'Africa', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
          { title: 'Asia', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', flex: 3 },
          { title: 'Australia (Oceania)', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
          { title: 'Europe', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3},
          { title: 'North America', src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', flex: 3},
          { title: 'South America', src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', flex: 3}
        ],
        route_titles: {'/': 'Student Exchange Program (SEP) Planning', '/exchange_universities':'Exchange Universities', '/exchange_modules':'Module Mapping'}
      }
    },
    computed: {
      currentRoute () {
        return this.$route.path
      },
    },
    mounted () {
    },
    methods:{
      title: function(route) {
        return this.route_titles[route]
      },
      navigate_exchange: function(region){
        router.push({path:'/exchange-universities', name:'Exchange Universities', params:{ chosen_region: region }});
        console.log(region);
      },
      navigate_exchange_modules: function(university){
        router.push({path:'/exchange-modules', name:'Exchange Modules', params:{ chosen_university: university }});
        console.log(university);
      },
    }
  };

</script>

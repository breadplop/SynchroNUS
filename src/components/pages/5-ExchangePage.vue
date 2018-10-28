<template>
  <v-app light>
    <v-content>
      <v-container grid-list-xl>
        <h4> Search universities by partner university name </h4>

        <v-layout row wrap mb-5>
          <v-flex xs12 sm5>
            <v-overflow-btn
              :items="universities_list"
              label="Choose partner university"
              target="#dropdown-example"
              solo
            ></v-overflow-btn>
          </v-flex>

          <v-flex xs12 sm2>
            <v-btn color="info" v-on:click="filter_exchange_universities(defaults.region)">Go!</v-btn>
          </v-flex>
        </v-layout>

        <h4> Search universities by region </h4>

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

      </v-container>
    </v-content>
  </v-app>


</template>

<script>
  import router from '../../router'

  export default {
    components: {
      router
    },
    data() {
      return {
        universities_list: ['KTH', 'Technical University of Munich', 'ETH Zurich'],
        default_country: {'All continents':'All countries', 'Africa': 'All countries in Africa', 'Asia': 'All countries in Asia', 'Australia (Oceania)': 'All countries in Australia (Oceania)', 'Europe':'All countries in Europe', 'North America': 'All countries in North America', 'South America': 'All countries in South America' },
        defaults:{'display': 'My course','university':'KTH', 'module_type':'My core modules', 'region':'All continents', 'country':'All countries', 'semester': 'AY14/15 to AY18/19'},
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
        // We will see what `params` is shortly
        return this.$route.path
      },
    },
    mounted () {
    },
    methods:{
      filter_exchange_universities: async function (region, country, semester) {
        let res = await fetch(this.exchange_universities_filter_url + $.param({region:region,country:country,semester:semester}));
        let theJson = await res.json();
        this.exchange_uni_student_count = theJson;
      },
      title: function(route) {
        return this.route_titles[route]
      },
      navigate_exchange: function(region){
        this.defaults.region = region;
        this.filter_exchange_universities(region, this.default_country[region], this.defaults.semester);
        router.push('/exchange-universities')
      },
    }
  };

</script>

<template>
  <v-app light>
    <v-content>
      <v-container grid-list-xl>

        <h3> Hi John, what would you like to do today?  </h3>

        <v-layout row wrap>
          <v-flex
            v-for="card in cards"
            v-bind="{ [`xs${card.flex}`]: true }"
            :key="card.title"
          >
            <v-card v-if="!(card.title=='Exchange Planning' && !enhanced)" style="border-radius: 10px; cursor: pointer;">
              <v-img
                :src="card.src"
                height="250px"
                v-on:click="navigate(card.url)"
                :chosen_region="card.title"
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
  import router from '../router'

  export default {
    props:['enhanced'],
    components: {
      router
    },
    data() {
      return {
        cards: [
          { title: 'Module Planning', url:'/module-information', src: 'http://digitallearning.eletsonline.com/wp-content/uploads/2018/04/School-Education-Transformation-Paving-Way-for-Better-Higher-Education.jpg', flex: 4},
          { title: 'Career Planning', url:'/career-prospects', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9aqyQZC6kF0glKq1zltpi3OrfsA6J-49td6CJYFkI-noymqrP', flex: 4 },
          { title: 'Exchange Planning', url:'/exchange-page', src: 'https://www.fueltravel.com/wp-content/uploads/2016/03/travel-planning-1.jpg', flex: 4 },
        ],
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
      navigate: function(url){
        router.push({path:url});
      },
    }
  };

</script>

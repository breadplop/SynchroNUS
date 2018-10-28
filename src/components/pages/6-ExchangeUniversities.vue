<template>
  <v-app light>
    <v-content>
      <v-container id="dropdown-example2" grid-list-xl>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <v-overflow-btn
              :items="region_list"
              label="Choose region"
              target="#dropdown-example"
              v-model="defaults.region"
              @change="filter_exchange_universities(defaults.region, default_country[defaults.region], defaults.semester)"
            ></v-overflow-btn>
          </v-flex>
          <v-flex xs12 sm4>
            <v-overflow-btn
              :items="country_list[defaults.region]"
              label="Choose country"
              target="#dropdown-example"
              v-model="default_country[defaults.region]"
              @change="filter_exchange_universities(defaults.region, default_country[defaults.region], defaults.semester)"
            ></v-overflow-btn>
          </v-flex>
          <v-flex xs12 sm4>
            <v-overflow-btn
              :items="semester_list"
              label="Choose semester"
              target="#dropdown-example"
              v-model="defaults.semester"
              @change="filter_exchange_universities(defaults.region, default_country[defaults.region], defaults.semester)"
            ></v-overflow-btn>
          </v-flex>
        </v-layout>

        <p>Number of students who went on exchange to <b>{{default_country[defaults.region]}}</b> in <b>{{defaults.semester}}</b></p>

        <v-card class="pa-3">
          <bar-chart :colors="['#bab9df', '#aac7e2']" :data='exchange_uni_student_count' :stacked="true"></bar-chart>
        </v-card>

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
    data() {
      return {
        display_options: ['My course', 'My faculty', 'Whole of NUS'],
        universities_list: ['KTH', 'Technical University of Munich', 'ETH Zurich'],
        exchange_uni_student_count: {},
        university_data: [],
        students_course_data: [],
        students_others_data: [],
        module_list: ['My core modules','Modules with prerequisites fulfilled', 'All modules'],
        region_list: ['All continents','Africa','Asia','Australia (Oceania)','Europe','North America','South America'],
        all_countries_list: ["All countries","Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
          ,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands"
          ,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
          ,"Cote D'Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
          ,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
          ,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
          ,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
          ,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
          ,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
          ,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
          ,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre and Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
          ,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts and Nevis","Saint Lucia","St Vincent","Sudan"
          ,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor Leste","Togo","Tonga","Trinidad and Tobago","Tunisia"
          ,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America", "Uruguay"
          ,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"],
        africa_list:['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 'Democratic Republic of the Congo', 'Republic of the Congo', 'Cote d\'Ivoire', 'Djibouti', 'Egypt', 'Equatorial-Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Sao', 'Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'],
        asia_list: ['All countries in Asia','Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor Leste', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'],
        australia_list: ['All countries in Australia/Oceania','Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu'],
        europe_list: ['All countries in Europe','Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'],
        north_america_list: ['All countries in North America', 'Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Canada', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador', 'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Nicaragua', 'Panama', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Trinidad and Tobago', 'United States of America'],
        south_america_list: ['All countries in South America', 'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela'],
        default_country: {'All continents':'All countries', 'Africa': 'All countries in Africa', 'Asia': 'All countries in Asia', 'Australia (Oceania)': 'All countries in Australia (Oceania)', 'Europe':'All countries in Europe', 'North America': 'All countries in North America', 'South America': 'All countries in South America' },
        semester_list: ['AY14/15 to AY18/19','AY17/18 Sem 2','AY17/18 Sem 1','AY16/17 Sem 2','AY16/17 Sem 1','AY15/16 Sem 2','AY15/16 Sem 1','AY14/15 Sem 2','AY14/15 Sem 1'],
        defaults:{'display': 'My course','university':'KTH', 'module_type':'My core modules', 'region':'All continents', 'country':'All countries', 'semester': 'AY14/15 to AY18/19'},
        exchange_universities_filter_url:"https://j4e862m1ei.execute-api.us-west-2.amazonaws.com/default/Synchronus_exchange_universities?",
        exchange_modules: [{name: "Pass", data: [["BT3102 | DD2447",32],["1",46],["2",28],["3",21],["4",20],["5",13],["6",27]]}, {name: "Fail", data: [["BT3102 | DD2447",2],["1",4],["2",2],["3",1],["4",2],["5",3],["6",0]]}],
        cards: [
          { title: 'All continents', src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', flex: 6},
          { title: 'Africa', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
          { title: 'Asia', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', flex: 3 },
          { title: 'Australia (Oceania)', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
          { title: 'Europe', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3},
          { title: 'North America', src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', flex: 3},
          { title: 'South America', src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', flex: 3}
        ]
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
      filter_exchange_universities: async function (region, country, semester) {
        let res = await fetch(this.exchange_universities_filter_url + $.param({region:region,country:country,semester:semester}));
        let theJson = await res.json();
        this.exchange_uni_student_count = theJson
      },
      title: function(route) {
        return this.route_titles[route]
      },
      fillData() {
        this.filter_exchange_universities('All continents', 'All countries', 'AY14/15 to AY 18/19');
      }
    }
  };

</script>

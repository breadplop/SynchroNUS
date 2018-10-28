<template>
  <v-app>
    <v-toolbar color="indigo darken-3" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>
      <v-toolbar-title>{{currentRoute}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat dark>Search</v-btn>
        <v-btn flat dark>Home</v-btn>
        <v-btn flat dark>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
        temporary
        v-model="drawer"
        :mini-variant="mini"
        light
        absolute
    >
      <!--toolbar for name-->
      <v-toolbar>
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <!--v-list for components-->
      <v-list>
          <!--module_subclass group-->
          <v-list-group 
            no-action
            sub-group
            value="true"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>Module Planning</v-list-tile-title>
            </v-list-tile>
  
            <v-list-tile
              v-for="(admin, i) in module_subclass"
              :key="i"
              :to="admin[2]"
            >
              <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        
          <!--career_subclass group-->
          <v-list-group
            no-action
            sub-group
            value="true"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>Career</v-list-tile-title>
            </v-list-tile>
  
            <v-list-tile
              v-for="(admin, i) in career_subclass"
              :key="i"
              :to="admin[2]"
            >
              <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        
        <!--sep_subclass group-->
          <v-list-group
            no-action
            sub-group
            value="true"
          >
            <v-list-tile slot="activator" :key="'Exchange Page'" :to="'/exchange-page'">
              <v-list-tile-title>Exchange</v-list-tile-title>
            </v-list-tile>
  
            <v-list-tile
              v-for="(admin, i) in sep_subclass"
              :key="i"
              :to="admin[2]"
            >
              <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

        <!-- templates_subclass group -->
          <v-list-group
            no-action
            sub-group
            value="true"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>Exchange</v-list-tile-title>
            </v-list-tile>
  
            <v-list-tile
              v-for="(admin, i) in templates_subclass"
              :key="i"
              :to="admin[2]"
            >
              <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
      </v-list>


        
         
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
  
</template>

<script>
// import JQuery from 'jquery'
// let $ = JQuery

export default {
  name: "App",
  data() {
    return {
      drawer: false,
      module_subclass: [
      ['Module Review', 'school', '/module-review'],
      ['Teaching Review', 'how_to_reg', '/teaching-review']
      ],
      career_subclass: [
        ['Career Prospects', 'texture', '/career-prospects'],
        ['Job Search', 'category', '/job-search']
      ],
      sep_subclass: [
        ['Exchange Universities', 'edit_location', '/exchange-universities'],
        ['Exchange Modules', 'layers', '/exchange-modules']
      ],
      templates_subclass: [
        ['Templates', 'build', '/template'],
        ['New Charts', 'bar_chart', '/template-graphs'],
        ['Playground', 'delete', '/playground']
      ]
    }
  },
  computed: {
    currentRoute () {
      return this.$route.name
    }
  }

};
</script>

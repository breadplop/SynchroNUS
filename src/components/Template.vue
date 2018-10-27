<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          &#8220;This is your template page&#8221;
          <footer>
            <small>
              <em>&mdash;floorball</em>
              <v-btn><router-link to='/'>go to hello world</router-link></v-btn>
            </small>
          </footer>
        </blockquote>
      </v-layout>
    </v-slide-y-transition>

    <v-layout column align-center> 
    <v-item-group >
        <h1>How to create a new page</h1>
        <ul type='1'>
            <li>components/template.vue</li>
            <li>edit router/index.js [import + add route]</li>
        </ul>
        <br>
        <h1>How files are organized? </h1>
        <ul>
          <li>All are in the src/components folder</li>
          <li>Pages are stored in src/components/pages folder</li>
          <li>Charting libraries are stored in src/components/charts folder</li>
        </ul>
        <br>
        <h1>To do: </h1>
        <ul>
          <li>Filters.vue file is not yet done.</li>
          <li>Connect data to databse</li>
        </ul>
    </v-item-group>

      <v-item-group >
        <v-btn :to="{name: 'TemplateGraphs'}">TemplateGraphs</v-btn>
        <v-btn :to="{name: 'Template'}">Template</v-btn>
        <v-btn :to="{name: 'ByeWorld'}">ByeWorld</v-btn>
         <v-btn :to="{name: 'Playground'}">Playground</v-btn>
      </v-item-group>
    </v-layout>
  </v-container>


</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: 1;
  padding: 0;
}
a {
  color: #42b983;
}
</style>

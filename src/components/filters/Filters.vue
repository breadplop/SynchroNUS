<template>
    <v-container>
        <v-autocomplete
            id='filters'
            v-model="model"
            :hint="!isEditing? 'click the icon to edit' : 'click the icon to save'"
            :items="semesters"
            :readonly="!isEditing"
            persistent-hint
            prepend-icon='star'
            :label="'Choose Semester'"
        >
        </v-autocomplete>
        <!--testing-->
        hello autocomplete still testing filters.vue
        <v-toggle>toggle?</v-toggle>
        <!--testing switch toggle-->
        <br>
        <v-switch
        :label="`Students Similar to Me: ${similarStudentsFlag.toString()}`"
        v-model="similarStudentsFlag"
        ></v-switch>
        <br>
        <h3>did i manage to add the switch?</h3>
        <!--end of testing switch toggle-->

        <v-btn>Students similar to me</v-btn>
        <v-overflow-btn
            :items='display_options'
        ></v-overflow-btn>

        <!--testing radio buttons-->
        <v-radio-group v-model="radioGroup">
            <v-radio
                v-for="n in 3"
                :key="n"
                :label="'Radio ${n}'"
                :value="n"
            ></v-radio>
        </v-radio-group>


        
    </v-container>
</template>

<script>
export default {
    name: 'filters',
    data () {
        return {
            isEditing: true,
            model: null,
            semesters: ['2016_Sem1', '2016_Sem2', '2017_Sem1', '2017_Sem2'],
            display_options: ['My course', 'My faculty', 'Whole of NUS'],
            //radiogrouptest
            radioGroup:1,
            similarStudentsFlag: true
        }
    }    
}
</script>

<style>

</style>



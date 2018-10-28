<template>
    <v-container>
        <v-layout row wrap>
            <v-container>
            <h4>List of filters shld be here</h4>
            <section v-if="errored">Sorry error</section>
            <section v-else>
                <div v-if='loading'>loading..</div>
                <div v-else>{{info}} </div>
            </section>
            </v-container>
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
                <v-slide-x-reverse-transition
                    slot="append-outer"
                    mode="out-in"
                >
                    <v-icon
                        :color="isEditing ? 'success': 'info'"
                        :key="'icon-${isEditing}'"
                        @click="isEditing = !isEditing"
                        v-text="isEditing ? 'check' : 'check'"
                    ></v-icon>
                </v-slide-x-reverse-transition>
            </v-autocomplete>
            <v-switch
                :key="similarStudentsFlag"
                :label="'Similar Students to Me: ' + similarStudentsFlag"
                v-model='similarStudentsFlag'
            ></v-switch>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'filters',
    data () {
        return {
            model: null,
            semesters: ['2016_Sem1', '2016_Sem2', '2017_Sem1', '2017_Sem2'],
            display_options: ['My course', 'My faculty', 'Whole of NUS'],
            defaults: {'display': 'My course','university':'KTH', 'module_type':'My core modules', 'region':'Europe'},
            isEditing: false,
            similarStudentsFlag: false
        }
    }    
}
</script>

<style>

</style>



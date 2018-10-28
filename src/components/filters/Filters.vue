<template>
<v-container id='1' grid-list-xl>
    <v-layout row wrap mb-5>
        <v-flex xs12 sm5>
        <v-overflow-btn
            :items="semesters_filter"
            label="Choose Semester"
            target="#dropdown-example"
            v-model="filtered.semesters_filter"
            @change="fetchUrl(filtered)"
            solo
        ></v-overflow-btn>
        <v-overflow-btn
            :items="faculty_filter"
            label="Choose Faculty"
            target="#dropdown-example"
            v-model="filtered.faculty_filter"
            @change="fetchUrl(filtered)"
            solo
        ></v-overflow-btn>
        </v-flex>
        <v-flex xs12 sm5>
            <v-overflow-btn
            :items="cap_filter"
            label="CAP between.."
            target="#dropdown-example"
            v-model="filtered.cap_filter"
            @change="fetchUrl(filtered)"
            solo
        ></v-overflow-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import router from '../../router'

export default {
    data () {
        return {
            filtered: {semester_filter: null, faculty_filter: null, cap_filter: null},
            semesters_filter: ['All', 'Last 3 years','2016_Sem1', '2016_Sem2', '2017_Sem1', '2017_Sem2'],
            faculty_filter: ['All', 'SOC', 'FASS', 'SDE', 'BIZ', 'Science'],
            cap_filter: ['All', '<3.0', '3.0-3.5', '3.5-4.0', '4.0-4.5', '>4.5']
        }
    },
    methods: {
        fetchUrl: async function(filter_params) {
            router.push(this.$route.path + '?semester='+filter_params.semesters_filter + '&cap=' + filter_params.cap_filter + '&faculty=' + filter_params.faculty_filter)
            let res = await fetch('https://3gx0b3iqpg.execute-api.us-west-2.amazonaws.com/default/synchronus')
            console.log(res)
            let theJson = await res.json()
            this.info = theJson
            console.log('json')
            console.log(theJson)
        },
        navigateTo(filter_params) {
            axios
            //.get('https://api.npmjs.org/downloads/range/last-month/vue-chartjs')
            //.get('https://givei38ise.execute-api.us-west-2.amazonaws.com/default/test-vue-locationdata?countries=singapore,maggg')
            .get('https://3gx0b3iqpg.execute-api.us-west-2.amazonaws.com/default/synchronus')
            .then(response => (this.info = response))
            .catch(error => {
            console.log(error)
            this.errored = true
            })
            .finally(() => this.loading = false)
            let query_params = $route.params//if (filter_params.semesters_filter is null) {''}
            router.push(this.$route.path + '?'+filter_params.semesters_filter)
        }
    }
}
</script>

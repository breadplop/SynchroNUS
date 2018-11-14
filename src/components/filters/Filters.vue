<template>
<v-container id='1' grid-list-xl>
    <v-layout row wrap mb-5>
        <!-- {{hello}}
        {{bye}}
        {{test}} -->
        <v-btn @click="test='rerwe'">clickme</v-btn>
        <v-flex xs12 sm5>
            <v-overflow-btn
            :items="Object.keys(semesters_filter)"
            label="Choose Semester"
            target="#dropdown-example"
            v-model="filtered.semester_filter"
            @change="fetchUrl(filtered)"
            solo
        ></v-overflow-btn>
        <v-overflow-btn
            :items="Object.keys(semesters_filter)"
            label="Choose Semester"
            target="#dropdown-example"
            v-model="filtered.semesters_filter"
            @change="fetchUrl(filtered)"
            solo
        ></v-overflow-btn>
        </v-flex>
        <v-flex xs12 sm4>
            <v-overflow-btn
            :items="faculty_filter"
            label="Choose Faculty"
            target="#dropdown-example"
            v-model="filtered.faculty_filter"
            @change="fetchUrl(filtered)"
            solo
        ></v-overflow-btn>
            <v-overflow-btn
            :items="cap_filter"
            label="CAP between.."
            target="#dropdown-example"
            v-model="filtered.cap_filter"
            @change="fetchUrl(filtered)"
            solo
        ></v-overflow-btn>
            
        <v-switch
            :key="similarStudentsFlag"
            :label="'Students Similar to Me: ' + similarStudentsFlag"
            v-model='similarStudentsFlag'
        ></v-switch>
        </v-flex>
        
    </v-layout>
</v-container>
</template>

<script>
import router from '../../router'

export default {
    props: ['hello'],
    data () {
        return {
            // hello: 'helloworld',
            bye: this.hello,
            test: '',
            counter: this.hello + 'rrer',
            filtered: {semester_filter: null, faculty_filter: null, cap_filter: null, module_filter: null},
            semesters_filter: {
                'AY16/17 Sem 1' :  '1710',
                'AY16/17 Sem 2' : '1720',
                'AY15/16 Sem 1' :  '1610',
                'AY15/16 Sem 2' : '1620',
                'AY14/15 Sem 1' :  '1510',
                'AY14/15 Sem 2' : '1520',
                'AY13/14 Sem 1' :  '1410',
                'AY13/14 Sem 2' : '1420'
            },
            faculty_filter: ['All', 'SOC', 'FASS', 'SDE', 'BIZ', 'Science'],
            cap_filter: ['All', '<3.0', '3.0-3.5', '3.5-4.0', '4.0-4.5', '>4.5'],
            module_filter: ['ACC2002', 'PR4106', 'PL3235', 'ME3112', 'EE1003', 'SC1101E', 'MA1102R', 'SE1101E', 'CE2112', 'SSD2210', 'ST1232', 'PS3249', 'CS1231', 'PR1102', 'GE1101E', 'EG5911', 'SSS1207', 'GEM2900', 'LSM1301', 'IS2102', 'ST3131', 'LSM3212', 'ES2331', 'CN1111', 'TG1401', 'ST2131', 'RE2104', 'MD5140', 'FIN2004X', 'EU1101E', 'MA2213', 'CM1501', 'DSC2006', 'ES2007D', 'EE2012', 'GEK1006', 'CS2010', 'LSM4243', 'EE1001', 'SC2220', 'CL2280', 'CS2103', 'CS2102', 'NCC1000', 'LSM2241', 'PL3233', 'NM2216', 'MA1511', 'GEK1527', 'FAS1102', 'GEK1900', 'NM3219', 'EC3303', 'CN2125', 'ME3122', 'EE2031', 'LAJ2201', 'EN1101E', 'MA1421', 'EE6999', 'CS3241', 'PC1431', 'ME2113', 'PC1326', 'IT1005', 'MA1301', 'CL1101E', 'MLE1101', 'MA1506', 'GET1008', 'CN3135', 'NM1101E', 'ME2135', 'CS1010E', 'TS1101E', 'NM2209', 'LC2009', 'EC2101', 'PC1142', 'GER1000', 'GEK1521', 'CM1131', 'EG2401', 'EE2007', 'PH1102E', 'CM2101', 'MA3252', 'DP1001', 'LSM1104', 'SSA2204', 'ME6999', 'GEK1508', 'PC1432', 'PR4104', 'EE2011', 'BSP1004', 'MA1505', 'EC3332', 'SSA2220T', 'LAF2201', 'CE2409', 'GEH1049', 'EC3102', 'CM2121', 'ST2137', 'CN4122', 'DSC1007', 'CS1101C', 'SSA2215', 'FAS1101', 'EC2104', 'EC2102', 'SC2218', 'CH1101E', 'CM1121', 'LAC1201', 'EC2303', 'EG3611', 'EC3333', 'ACC1002X', 'LSM2101', 'BFS1001', 'LSM1401', 'PR2104', 'PC1144', 'GES1028', 'BSP2005', 'PL1101E', 'LC1003', 'GEK1007', 'MKT1003X', 'IT1001', 'CS1101', 'ME3162', 'BSP1005', 'CS1102', 'LAF1201', 'MDG5108', 'DSC2008', 'ES5002', 'EG1471', 'EG1413', 'ME3102', 'EC3351', 'CS2100', 'CN3132', 'LSM1103', 'PS2249', 'ME2101', 'MA3110', 'ES2002', 'CM3292', 'LSM2102', 'ACC1002', 'ME2112', 'JS2230', 'CFG1010', 'IE2110', 'SC2215', 'MA1104', 'LAG1201', 'PC1322', 'BSP2001', 'EC3371', 'GEK1544', 'PF1102', 'PC2232', 'CFG1001', 'EC3312', 'MA1101R', 'GEK1519', 'GEK1046', 'TG1422', 'GEK1542', 'NM3224', 'LSM1102', 'JS1101E', 'EG1111', 'NM2102', 'EC3304', 'LAG2201', 'ES5001A', 'EE1002', 'ME3101', 'CE3121', 'CE3115', 'ME2121', 'WR1401', 'NM2101', 'EC1301', 'NUR1110', 'AR2221', 'MKT1003', 'EG1109', 'LAB1201', 'SSA2202', 'EE2022', 'CM2142', 'MA1312', 'LSM3232', 'GEM2901', 'PL3242', 'ST2334', 'GE2204', 'CM1111', 'CS3230', 'IE3110', 'CS3243', 'PX3108', 'IE2130', 'MD3140', 'CN2122', 'SSA2209', 'LC1006', 'LSM2103', 'FIN3103A', 'SC2204', 'PC1221', 'EE2010', 'EG1108', 'MA2108', 'PC1222', 'ST1131', 'ME2134', 'NCC1001', 'EE2004', 'BN2201', 'PF1104', 'GES1010', 'CM1502', 'NM2201', 'EC1101E', 'SC2101', 'PL3232', 'AR1221', 'SC2214', 'GET1029', 'USS2105', 'SW1101E', 'GEQ1000', 'GEK1012', 'NUR3113', 'GE2218', 'EE2020', 'ES1102', 'LAT1201', 'SN1101E', 'CS1010', 'NM2219', 'LAK1201', 'GEK1505', 'MS1102E', 'GET1031A', 'HR2002', 'TG3001', 'FIN2004', 'PS1101E', 'PL3236', 'ME2114', 'LAJ1201', 'CN4118R', 'PL3241', 'IT1004', 'EC3101', 'EC3341', 'MA2101', 'CN2121', 'CG2271', 'MA1100', 'GE2220', 'SSA1201', 'EE2024', 'LC3001A', 'CM1401', 'ME2142', 'ST3236', 'LAJ2202', 'CN4121', 'GEK1001', 'RE1103', 'LAJ2203', 'SC3101', 'PS2237', 'FSP4003', 'CM2102', 'LC2006B', 'ME2143', 'MA2214', 'SSB2216', 'EE3204', 'LSM4199', 'PF2105', 'PC2230', 'GEK1002', 'PF2101', 'LC2004', 'CS1105', 'MNO1001', 'GES1021', 'BMA5008', 'CM3242', 'CS1020E', 'PY1106', 'CS1020', 'MNO1001X', 'AY1130', 'CE2184', 'PL2131', 'ACC1006', 'CM3291', 'GET1020', 'IT1003', 'ME2151', 'EG3601', 'MUT1122', 'IS1105', 'LSM1303', 'PS3257', 'LSM3211', 'EL1101E', 'EC3361', 'PL2132', 'LSM3214', 'PF1103', 'LAJ3201', 'NUR1117', 'CFG1000', 'PC1143', 'MNO2009', 'CM1101', 'PL3234', 'EG3602', 'PC1141', 'TR2201', 'CE3116', 'GEK1511', 'NM3215', 'SC2212', 'CN3108', 'MA2216', 'CS2105', 'CN3121', 'BN3301', 'ME2103', 'EG1112', 'TE2101', 'PF1101', 'TG2415', 'ES1601', 'LAK2201', 'GES1003', 'EE4001', 'IS1103', 'CN3109', 'PR4105', 'NM2104', 'PF2102', 'PR3102', 'LSM1106', 'EE2009', 'LSM2191', 'GEK2022', 'CM2111', 'GEK1045', 'CS3240', 'LAM1201', 'MA1512', 'LSM1302', 'MD2140', 'GEM1536', 'LC1016', 'AR1721', 'SC2211', 'EC2374', 'EE2005', 'RE2106', 'EE2032', 'SW2104', 'MD4150', 'CS1010S', 'ES1000', 'IE2130E', 'NM2220', 'CE2407', 'PR2202', 'EE2023', 'LSM2251', 'CS1101S', 'SSA2211', 'CM2191', 'AR1326', 'CE2134', 'IE2140', 'PR2102', 'LAC2201', 'PC1327', 'CE2155', 'PH1101E', 'LC1004', 'MA1521', 'ES1531', 'CE2183', 'BMA5009', 'SC2217', 'LC1007', 'CS2106', 'GEK1510', 'CN3124', 'PR3101', 'MD4140', 'EE2021', 'SSA1202', 'MA4264', 'ME4101', 'ST2132', 'EE2006', 'GE2229', 'NUR1114', 'GE2228', 'HY1101E', 'GE2221', 'SSA2219', 'GEK1055', 'MA3220', 'ME4101A', 'CN2116', 'ES1103', 'MD1140', 'AR5321', 'EC3322', 'NM2103', 'GL1101E', 'NUR2116', 'CN2108', 'GEM2027', 'MA3111', 'PR2101', 'MD2150', 'EE3331C', 'IS2103', 'PC1325', 'IE2101', 'BN2202', 'CM3212', 'LC2007', 'GEK2001', 'BMA5013', 'TG1423', 'MA4199', 'PY1105', 'CN3421', 'CE6999', 'GEH1036', 'RE2102', 'CS1102C', 'CS2103T', 'CM2192', 'SP1541', 'LSM1101', 'CN6999', 'GEK1010T', 'LAB2201', 'GEK1520', 'GEK2506', 'BSP1703', 'MNO2007', 'BMA5001', 'MDG5771', 'GEK1022', 'BSP1004X', 'CM1191', 'PR1101', 'DSC2003', 'LSM3223', 'CE3165', 'PR3103', 'NUR1118', 'PA2106', 'PA1113', 'AR2223', 'SC2213', 'ACC1701', 'PR3104', 'ACC3606', 'BMA5003', 'MA3269', 'SC2205', 'PR2105', 'CE3132', 'CS2107', 'ES1301', 'PL3239', 'EC2373', 'NM3217', 'AR2723', 'GEK1517', 'PF2103', 'ST1131A', 'CM4199A', 'AR2101'],
            similarStudentsFlag: false
        }
    },
    methods: {
        fetchUrl: async function(filter_params) {
            console.log('filter_params.semesters_filter = ' + filter_params.semesters_filter)
            console.log('find semesterfilters ' + this.semesters_filter)
            let sem_param = this.$data.semesters_filter[filter_params.semesters_filter]
            console.log('sem_pram=' + sem_param)
            let cap_param = filter_params.semesters_filter
            let faculty_param = filter_params.faculty_filter
            let module_param = filter_params.module_filter
            let url = 'https://uw2gpnk5f9.execute-api.ap-southeast-1.amazonaws.com/Prod/teaching?' //term=1710&'
            let urlToFetch = url + $.param({module:module_param, term:sem_param}) 
            let res = await fetch(urlToFetch + '&question=t1');
            console.log(urlToFetch + '&question=t1')
            let theJson = await res.json()
            this.info.trueFlag = theJson
            this.info.falseFlag = theJson
            console.log(theJson)
        }
        // navigateTo(filter_params) {
        //     axios
        //     //.get('https://api.npmjs.org/downloads/range/last-month/vue-chartjs')
        //     //.get('https://givei38ise.execute-api.us-west-2.amazonaws.com/default/test-vue-locationdata?countries=singapore,maggg')
        //     .get('https://3gx0b3iqpg.execute-api.us-west-2.amazonaws.com/default/synchronus')
        //     .then(response => (this.info = response))
        //     .catch(error => {
        //     console.log(error)
        //     this.errored = true
        //     })
        //     .finally(() => this.loading = false)
        //     let query_params = $route.params//if (filter_params.semesters_filter is null) {''}
        //     router.push(this.$route.path + '?'+filter_params.semesters_filter)
        // }
    }
}
</script>

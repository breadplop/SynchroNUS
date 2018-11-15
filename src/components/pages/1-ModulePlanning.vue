<template>
<v-app light>
<v-content>
    <!--<v-container id='1' grid-list-xl>-->
        <!--&lt;!&ndash;<filters></filters>&ndash;&gt;-->
    <!--</v-container>-->
    <v-container id='1' grid-list-xl>
        
        <h1>{{getModuleName}}</h1>  
        <!-- <v-btn @click='fetchData()'>update module name</v-btn> -->
        <p>Please use all filters </p>
        <v-layout row wrap mb-5>

          <v-flex xs12 sm5>
            <v-overflow-btn
              label="Choose Module"
              :items="module_filter"
              target="#dropdown-example"
              @change="fetchUrl(filtered)"
              placeholder="placeholder"
              v-model="filtered.module_filter"
              solo
            ></v-overflow-btn>
                
            <v-overflow-btn
              label="Choose Semester"
              :items="Object.keys(semesters_filter)"
              target="#dropdown-example"
              @change="fetchUrl(filtered)"
              v-model="filtered.semesters_filter"
              solo
            ></v-overflow-btn>
            <v-overflow-btn
              :items="faculty_filter"
              label="Choose Faculty"
              target="#dropdown-example"
              @change="fetchUrl(filtered)"
              v-model="filtered.faculty_filter"
              solo
            ></v-overflow-btn>
            </v-flex>
            <v-flex xs12 sm5>
                <v-overflow-btn
                :items="cap_filter"
                label="CAP between.."
                target="#dropdown-example"
                @change="fetchUrl(filtered)"
                v-model="filtered.cap_filter"
                solo
                ></v-overflow-btn>

                <v-switch
                    :key="similarStudentsFlag"
                    :label="'Students Similar to Me: ' + similarStudentsFlag"
                    v-model='similarStudentsFlag'
                ></v-switch>
            </v-flex>

        </v-layout>
<!--first row-->        
        <!--MCQ questions -->
        <h2>Opinions of Module: {{module}}</h2>
        <p style='color:red'>{{loading}}</p>
        <div class='tooltip' style='color:red'>{{error}}
            <span class='tooltiptext'>Please remember to use all filters!</span>
        </div>
        <br>
        <v-layout row wrap>
            <v-flex xs15 sm4>
                <h3>Qn: What is your overall opinion of the module?</h3>
                <div v-if='similarStudentsFlag'>
                    <bar-chart :data='this.info.trueFlag' colors='black' :library="{chart: {backgroundColor: ''}}"></bar-chart>
                </div>
                <div v-else>
                    <bar-chart :data='this.info.falseFlag' :library="{chart: {backgroundColor: ''}}"></bar-chart>
                </div>
            </v-flex>
            <v-flex xs15 sm4>
                <h3>Qn: The grade that I am most likely to get in the module is</h3>
                <div v-if='similarStudentsFlag'>
                    <bar-chart :data='this.m2_data_ck.trueFlag' colors='black' :library="{chart: {backgroundColor: ''}}"></bar-chart>
                </div>
                <div v-else>
                    <bar-chart :data='this.m2_data_ck.falseFlag' :library="{chart: {backgroundColor: ''}}"></bar-chart>
                </div>
            
            </v-flex>
            <v-flex xs15 sm4>
                <h3>Qn: I rate this module as</h3>
                <div v-if='similarStudentsFlag'>
                    <bar-chart :data='this.rateModInfo.trueFlag' colors='black' :library="{chart: {backgroundColor: ''}}"></bar-chart>
                </div>
                <div v-else>
                    <bar-chart :data='this.rateModInfo.falseFlag' :library="{chart: {backgroundColor: ''}}"></bar-chart>
                </div>
            </v-flex>
        </v-layout>

        <h3>Summary</h3>
        <div class='tooltip'>Most students like this module.
            <span class='tooltiptext'>More than 50% of students rated at least 4 for Qn: 'What is your overall opinion of the module?'</span>
        </div>
        <br>
        <div class='tooltip'>Students similar to you usually get a B+
            <span class='tooltiptext'>Check Student-Similar-To-Me filter above for more information</span>
        </div>
        <br><br>
<!--second row-->

        <h2>Open Ended Questions</h2>
        <v-layout row wrap>
            <v-flex xs15 sm6>
                <h3>Qn: What I liked about the module:</h3>
                <radar-chart :chart-data="radar_data_plus"></radar-chart>
            </v-flex>
            <v-flex xs15 sm6>
                <h3>Qn: What I did not like about the module:</h3>
                <radar-chart :chart-data="radar_data_minus"></radar-chart>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>
</v-app>
</template>

<script>
  import Filters from '../filters/Filters'
  import RadarChart from '../charts/RadarChart.js'
  import router from '../../router'
  import axios from 'axios'



  export default {
    components: {
      Filters,
      RadarChart,
      router,
      axios
    },
    data () {
      return {
        getModuleName: 'GER4000: Dummy Module',
        datacollection: null,
        module: 'ACC2002 Managerial Accounting',
        similarStudentsFlag: false,
        filtered: {semesters_filter: 'Pick Semesters', faculty_filter: 'Pick Faculties', cap_filter: 'Pick Cap', module_filter: 'Choose Module'},
        info: {
            trueFlag: [[1, 10], [2, 12], [3, 78], [4, 42], [5,5]],
            falseFlag: [[1, 2], [2, 13], [3, 74], [4, 105], [5,2]]
        },
        rateModInfo: {
            trueFlag: [[1, 12], [2, 13], [3, 72], [4, 132], [5,10]],
            falseFlag: [[1, 15], [2, 20], [3, 92], [4, 152], [5,12]]
        },
        m2_data_ck: {
            trueFlag: [['A', 40], ['B', 102], ['C', 78], ['D', 30], ['F', 10]],
            falseFlag: [['A', 70], ['B', 132], ['C', 88], ['D', 70], ['F', 40]]
        },
        error: '',
        loading: '',
        data: {
            m1_data_ck: {
                trueFlag: {
                    name: 'm1_data', 
                    data: [[1, 10], [2, 12], [3, 78], [4, 102], [5,5]]
                },
                falseFlag: {
                    name: 'm1_data', 
                    data: [[1, 12], [2, 13], [3, 74], [4, 102], [5,2]]
                }
            },
            m2_data_ck: {
                trueFlag: {
                    name: 'm2_data',
                    data: [['A', 50], ['B', 102], ['C', 78], ['D', 30], ['E', 10]]
                },
                falseFlag: {
                    name: 'm2_data',
                    data: [['A', 70], ['B', 132], ['C', 88], ['D', 70], ['E', 40]]
                }
            },
            m3_data_ck: {
                trueFlag: {
                name: 'm3_data', 
                data: [[1, 12], [2, 13], [3, 72], [4, 132], [5,10]]
                },
                falseFlag: {
                name: 'm3_data', 
                data: [[1, 15], [2, 20], [3, 92], [4, 152], [5,12]]
                }

            }
        },
        radar_data_plus: {
            labels: ['Useful', 'Moderate', 'Prof', 'Interesting', 'Fun'],
            datasets: [
                {
                label: 'Top 5 most common positive descriptors of module',
                backgroundColor: '#B29600',
                data: [10, 10, 31, 43, 43]
                }
            ]
        },
        radar_data_minus: {
            labels: ['Difficult', 'Time', 'Tough', 'NoWebcast', 'TAs'],
            datasets: [
                {
                label: 'Top 5 most common negative descriptors of module',
                backgroundColor: '#8B4513',
                data: [23, 32, 54, 10, 10]
                }
            ]
        },
        // semesters_filter: ['AY14/15 to AY18/19','AY17/18 Sem 2','AY17/18 Sem 1','AY16/17 Sem 2','AY16/17 Sem 1','AY15/16 Sem 2','AY15/16 Sem 1','AY14/15 Sem 2','AY14/15 Sem 1'],

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
        module_filter: ['ACC2002', 'PR4106', 'PL3235', 'ME3112', 'EE1003', 'SC1101E', 'MA1102R', 'SE1101E', 'CE2112', 'SSD2210', 'ST1232', 'PS3249', 'CS1231', 'PR1102', 'GE1101E', 'EG5911', 'SSS1207', 'GEM2900', 'LSM1301', 'IS2102', 'ST3131', 'LSM3212', 'ES2331', 'CN1111', 'TG1401', 'ST2131', 'RE2104', 'MD5140', 'FIN2004X', 'EU1101E', 'MA2213', 'CM1501', 'DSC2006', 'ES2007D', 'EE2012', 'GEK1006', 'CS2010', 'LSM4243', 'EE1001', 'SC2220', 'CL2280', 'CS2103', 'CS2102', 'NCC1000', 'LSM2241', 'PL3233', 'NM2216', 'MA1511', 'GEK1527', 'FAS1102', 'GEK1900', 'NM3219', 'EC3303', 'CN2125', 'ME3122', 'EE2031', 'LAJ2201', 'EN1101E', 'MA1421', 'EE6999', 'CS3241', 'PC1431', 'ME2113', 'PC1326', 'IT1005', 'MA1301', 'CL1101E', 'MLE1101', 'MA1506', 'GET1008', 'CN3135', 'NM1101E', 'ME2135', 'CS1010E', 'TS1101E', 'NM2209', 'LC2009', 'EC2101', 'PC1142', 'GER1000', 'GEK1521', 'CM1131', 'EG2401', 'EE2007', 'PH1102E', 'CM2101', 'MA3252', 'DP1001', 'LSM1104', 'SSA2204', 'ME6999', 'GEK1508', 'PC1432', 'PR4104', 'EE2011', 'BSP1004', 'MA1505', 'EC3332', 'SSA2220T', 'LAF2201', 'CE2409', 'GEH1049', 'EC3102', 'CM2121', 'ST2137', 'CN4122', 'DSC1007', 'CS1101C', 'SSA2215', 'FAS1101', 'EC2104', 'EC2102', 'SC2218', 'CH1101E', 'CM1121', 'LAC1201', 'EC2303', 'EG3611', 'EC3333', 'ACC1002X', 'LSM2101', 'BFS1001', 'LSM1401', 'PR2104', 'PC1144', 'GES1028', 'BSP2005', 'PL1101E', 'LC1003', 'GEK1007', 'MKT1003X', 'IT1001', 'CS1101', 'ME3162', 'BSP1005', 'CS1102', 'LAF1201', 'MDG5108', 'DSC2008', 'ES5002', 'EG1471', 'EG1413', 'ME3102', 'EC3351', 'CS2100', 'CN3132', 'LSM1103', 'PS2249', 'ME2101', 'MA3110', 'ES2002', 'CM3292', 'LSM2102', 'ACC1002', 'ME2112', 'JS2230', 'CFG1010', 'IE2110', 'SC2215', 'MA1104', 'LAG1201', 'PC1322', 'BSP2001', 'EC3371', 'GEK1544', 'PF1102', 'PC2232', 'CFG1001', 'EC3312', 'MA1101R', 'GEK1519', 'GEK1046', 'TG1422', 'GEK1542', 'NM3224', 'LSM1102', 'JS1101E', 'EG1111', 'NM2102', 'EC3304', 'LAG2201', 'ES5001A', 'EE1002', 'ME3101', 'CE3121', 'CE3115', 'ME2121', 'WR1401', 'NM2101', 'EC1301', 'NUR1110', 'AR2221', 'MKT1003', 'EG1109', 'LAB1201', 'SSA2202', 'EE2022', 'CM2142', 'MA1312', 'LSM3232', 'GEM2901', 'PL3242', 'ST2334', 'GE2204', 'CM1111', 'CS3230', 'IE3110', 'CS3243', 'PX3108', 'IE2130', 'MD3140', 'CN2122', 'SSA2209', 'LC1006', 'LSM2103', 'FIN3103A', 'SC2204', 'PC1221', 'EE2010', 'EG1108', 'MA2108', 'PC1222', 'ST1131', 'ME2134', 'NCC1001', 'EE2004', 'BN2201', 'PF1104', 'GES1010', 'CM1502', 'NM2201', 'EC1101E', 'SC2101', 'PL3232', 'AR1221', 'SC2214', 'GET1029', 'USS2105', 'SW1101E', 'GEQ1000', 'GEK1012', 'NUR3113', 'GE2218', 'EE2020', 'ES1102', 'LAT1201', 'SN1101E', 'CS1010', 'NM2219', 'LAK1201', 'GEK1505', 'MS1102E', 'GET1031A', 'HR2002', 'TG3001', 'FIN2004', 'PS1101E', 'PL3236', 'ME2114', 'LAJ1201', 'CN4118R', 'PL3241', 'IT1004', 'EC3101', 'EC3341', 'MA2101', 'CN2121', 'CG2271', 'MA1100', 'GE2220', 'SSA1201', 'EE2024', 'LC3001A', 'CM1401', 'ME2142', 'ST3236', 'LAJ2202', 'CN4121', 'GEK1001', 'RE1103', 'LAJ2203', 'SC3101', 'PS2237', 'FSP4003', 'CM2102', 'LC2006B', 'ME2143', 'MA2214', 'SSB2216', 'EE3204', 'LSM4199', 'PF2105', 'PC2230', 'GEK1002', 'PF2101', 'LC2004', 'CS1105', 'MNO1001', 'GES1021', 'BMA5008', 'CM3242', 'CS1020E', 'PY1106', 'CS1020', 'MNO1001X', 'AY1130', 'CE2184', 'PL2131', 'ACC1006', 'CM3291', 'GET1020', 'IT1003', 'ME2151', 'EG3601', 'MUT1122', 'IS1105', 'LSM1303', 'PS3257', 'LSM3211', 'EL1101E', 'EC3361', 'PL2132', 'LSM3214', 'PF1103', 'LAJ3201', 'NUR1117', 'CFG1000', 'PC1143', 'MNO2009', 'CM1101', 'PL3234', 'EG3602', 'PC1141', 'TR2201', 'CE3116', 'GEK1511', 'NM3215', 'SC2212', 'CN3108', 'MA2216', 'CS2105', 'CN3121', 'BN3301', 'ME2103', 'EG1112', 'TE2101', 'PF1101', 'TG2415', 'ES1601', 'LAK2201', 'GES1003', 'EE4001', 'IS1103', 'CN3109', 'PR4105', 'NM2104', 'PF2102', 'PR3102', 'LSM1106', 'EE2009', 'LSM2191', 'GEK2022', 'CM2111', 'GEK1045', 'CS3240', 'LAM1201', 'MA1512', 'LSM1302', 'MD2140', 'GEM1536', 'LC1016', 'AR1721', 'SC2211', 'EC2374', 'EE2005', 'RE2106', 'EE2032', 'SW2104', 'MD4150', 'CS1010S', 'ES1000', 'IE2130E', 'NM2220', 'CE2407', 'PR2202', 'EE2023', 'LSM2251', 'CS1101S', 'SSA2211', 'CM2191', 'AR1326', 'CE2134', 'IE2140', 'PR2102', 'LAC2201', 'PC1327', 'CE2155', 'PH1101E', 'LC1004', 'MA1521', 'ES1531', 'CE2183', 'BMA5009', 'SC2217', 'LC1007', 'CS2106', 'GEK1510', 'CN3124', 'PR3101', 'MD4140', 'EE2021', 'SSA1202', 'MA4264', 'ME4101', 'ST2132', 'EE2006', 'GE2229', 'NUR1114', 'GE2228', 'HY1101E', 'GE2221', 'SSA2219', 'GEK1055', 'MA3220', 'ME4101A', 'CN2116', 'ES1103', 'MD1140', 'AR5321', 'EC3322', 'NM2103', 'GL1101E', 'NUR2116', 'CN2108', 'GEM2027', 'MA3111', 'PR2101', 'MD2150', 'EE3331C', 'IS2103', 'PC1325', 'IE2101', 'BN2202', 'CM3212', 'LC2007', 'GEK2001', 'BMA5013', 'TG1423', 'MA4199', 'PY1105', 'CN3421', 'CE6999', 'GEH1036', 'RE2102', 'CS1102C', 'CS2103T', 'CM2192', 'SP1541', 'LSM1101', 'CN6999', 'GEK1010T', 'LAB2201', 'GEK1520', 'GEK2506', 'BSP1703', 'MNO2007', 'BMA5001', 'MDG5771', 'GEK1022', 'BSP1004X', 'CM1191', 'PR1101', 'DSC2003', 'LSM3223', 'CE3165', 'PR3103', 'NUR1118', 'PA2106', 'PA1113', 'AR2223', 'SC2213', 'ACC1701', 'PR3104', 'ACC3606', 'BMA5003', 'MA3269', 'SC2205', 'PR2105', 'CE3132', 'CS2107', 'ES1301', 'PL3239', 'EC2373', 'NM3217', 'AR2723', 'GEK1517', 'PF2103', 'ST1131A', 'CM4199A', 'AR2101']
      }
    },
    mounted () {
        },
    methods: {
        getObjectByValue: function (array, key, value) {
            // let array = (array: Array<Any>)
            return array.filter(function(object) {
                console.log('array is ' + array)
                return object[key] === value;
            })
        },
        
        fetchData: function () { 
            console.log('fetchData Function is called')
            var vm = this
            vm.getModuleName = 'Module not found.'
            console.log(this.getModuleName)
            // https://3gx0b3iqpg.execute-api.us-west-2.amazonaws.com/default/synchronus?
            this.$http.get('https://api.nusmods.com/2017-2018/moduleList.json').then(response => {
                console.log(response.bodyText)
                console.log(typeof(response.bodyText))
                console.log(typeof(JSON.parse(response.bodyText)))
                console.log()
                // bcos array is a string
                let test = this.getObjectByValue(JSON.parse(response.bodyText), 'ModuleCode', 'PR4106')
                console.log(test)

                let randomInt = Math.floor(Math.random() * (20))
                vm.getModuleName = test // response.body[randomInt].ModuleCode + ': ' +  response.body[randomInt].ModuleTitle
                })
        },
        fetchUrl: async function(filter_params) {
            try {
                
                this.loading = 'Have you used all filters? We are pulling and aggregating the results right now...'  
                this.error=''
                console.log('filter_params.semesters_filter = ' + filter_params.semesters_filter)
                console.log('find semesterfilters ' + this.semesters_filter)
                let sem_param = this.$data.semesters_filter[filter_params.semesters_filter]
                console.log('sem_pram=' + sem_param)
                let cap_param = filter_params.semesters_filter
                let faculty_param = filter_params.faculty_filter
                let module_param = filter_params.module_filter
                this.getModuleName = module_param
                // let queryParam = '?semester=' + sem_param + '&cap=' + cap_param + '&faculty=' + faculty_param
                let url = 'https://uw2gpnk5f9.execute-api.ap-southeast-1.amazonaws.com/Prod/test?' //term=1710&'
                let urlToFetch = url + $.param({module:module_param, term:sem_param}) 
                let res = await fetch(urlToFetch + '&question=m1');
                console.log(urlToFetch + '&question=m1')
                //console.log('param is=' + $.param({semester:sem_param,cap:cap_param,faculty:faculty_param}))
                let theJson = await res.json()
                this.info.trueFlag = theJson
                this.info.falseFlag = theJson
                console.log(theJson)
                
                //for second chart
                this.loading = 'Still aggregating. We are almost done, please bear with us!'  
                // let res2 = await fetch('https://3gx0b3iqpg.execute-api.us-west-2.amazonaws.com/default/synchronus?');
                let res2 = await fetch(urlToFetch + '&question=m2');
                let theJson2 = await res2.json()
                this.rateModInfo.trueFlag = theJson2
                this.rateModInfo.falseFlag = theJson2
    
                //third chart
                this.loading = 'Last chart, hang in there.'
                // let res3 = await fetch('https://3gx0b3iqpg.execute-api.us-west-2.amazonaws.com/default/synchronus?grade_chart=3');
                let res3 = await fetch(urlToFetch + '&question=m3');
                let theJson3 = await res3.json()
                this.m2_data_ck.trueFlag = theJson3
                this.m2_data_ck.falseFlag = theJson3
                this.loading = 'Results are now fully loaded!'
                router.push(this.$route.path + '?completed') // + '/?' + $.param({module:module_param, semester:sem_param,cap:cap_param,faculty:faculty_param}))
                
            } catch (error) {
                this.loading = ''
                this.error = 'ERROR.'
            }

        }
    }

  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  50px auto;
  }
  /* Tooltip container */
.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
    visibility: hidden;
    width: 400px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
 
    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>

<template>
  <v-app light>
    <v-content>
      <v-container>
        <h3>Select module</h3>
        <v-layout row wrap class="mb-3">
          <v-flex xs12 sm5>
            <v-overflow-btn
              :items="modules_list"
              label="Choose module"
              target="#dropdown-example"
              v-model="selected_module"
              @change="show_module_information(selected_module)"
            ></v-overflow-btn>
            <p>{{mod_description}}</p>
            <v-btn v-if="selected_module" color="info" :to="'/module-review'">View past module reviews for {{selected_module}}</v-btn>
            <v-btn v-if="selected_module" color="info" :to="'/teaching-review'">View past teaching reviews for {{selected_module}}</v-btn>
            <v-btn v-if="selected_module && enhanced" color="success" v-on:click="add_module(selected_module,10,1)">Add {{selected_module}} to workload planning</v-btn>

          </v-flex>
          <v-flex xs12 sm5 offset-sm2 v-if="selected_module">
            <div v-if="enhanced">
              <h3 v-if="webcast"><v-icon >videocam</v-icon> {{selected_module}} is likely to be webcasted.</h3>
              <h3 v-if="!webcast"><v-icon >videocam</v-icon> {{selected_module}} is not likely to be webcasted.</h3>

              <p>There were {{webcast_vids}} videos uploaded for this module with a {{webcast_watchperc}}% viewing rate.</p>
            </div>

            <h3>Students that exercised their S/U option on {{selected_module}} the last time it was offered</h3>
            <pie-chart :data="[['S/U option exercised', this.SU], ['Did not S/U', 1-this.SU]]"></pie-chart>
          </v-flex>
        </v-layout>

        <v-divider v-if="enhanced"></v-divider>

        <v-layout v-if="workload_data.length > 0 && enhanced" row wrap class="mt-5">
          <v-flex xs15 sm12>
            <h3>Combined estimated workload across the weeks(scale of 1-10 for each module)</h3>
            <v-subheader>When are the submission dates?</v-subheader>

            <area-chart :data='workload_data' height="300px" :stacked="true" ></area-chart>

          </v-flex>
        </v-layout>

      </v-container>

    </v-content>
  </v-app>
</template>

<script>
  export default {
    props:['enhanced'],
    data () {
      return {
        workload_data: [],
        modules_list: ['ACC1002','ACC1002X','ACC1006','ACC1701','ACC2002','ACC3606','AR1221','AR1326','AR1721','AR2101','AR2221','AR2223','AR2723','AR5321','AY1130','BFS1001','BMA5001','BMA5003','BMA5008','BMA5009','BMA5013','BN2201','BN2202','BN3301','BSP1004','BSP1004X','BSP1005','BSP1703','BSP2001','BSP2005','CE2112','CE2134','CE2155','CE2183','CE2184','CE2407','CE2409','CE3115','CE3116','CE3121','CE3132','CE3165','CE6999','CFG1000','CFG1001','CFG1010','CG2271','CH1101E','CL1101E','CL2280','CM1101','CM1111','CM1121','CM1131','CM1191','CM1401','CM1501','CM1502','CM2101','CM2102','CM2111','CM2121','CM2142','CM2191','CM2192','CM3212','CM3242','CM3291','CM3292','CM4199A','CN1111','CN2108','CN2116','CN2121','CN2122','CN2125','CN3108','CN3109','CN3121','CN3124','CN3132','CN3135','CN3421','CN4118R','CN4121','CN4122','CN6999','CS1010','CS1010E','CS1010S','CS1020','CS1020E','CS1101','CS1101C','CS1101S','CS1102','CS1102C','CS1105','CS1231','CS2010','CS2100','CS2102','CS2103','CS2103T','CS2105','CS2106','CS2107','CS3230','CS3240','CS3241','CS3243','DP1001','DSC1007','DSC2003','DSC2006','DSC2008','EC1101E','EC1301','EC2101','EC2102','EC2104','EC2303','EC2373','EC2374','EC3101','EC3102','EC3303','EC3304','EC3312','EC3322','EC3332','EC3333','EC3341','EC3351','EC3361','EC3371','EE1001','EE1002','EE1003','EE2004','EE2005','EE2006','EE2007','EE2009','EE2010','EE2011','EE2012','EE2020','EE2021','EE2022','EE2023','EE2024','EE2031','EE2032','EE3204','EE3331C','EE4001','EE6999','EG1108','EG1109','EG1111','EG1112','EG1413','EG1471','EG2401','EG3601','EG3602','EG3611','EG5911','EL1101E','EN1101E','ES1000','ES1102','ES1103','ES1301','ES1531','ES1601','ES2002','ES2007D','ES2331','ES5001A','ES5002','EU1101E','FAS1101','FAS1102','FIN2004','FIN2004X','FIN3103A','FSP4003','GE1101E','GE2204','GE2218','GE2220','GE2221','GE2228','GE2229','GEH1036','GEH1049','GEK1001','GEK1002','GEK1006','GEK1007','GEK1010T','GEK1012','GEK1022','GEK1045','GEK1046','GEK1055','GEK1505','GEK1508','GEK1510','GEK1511','GEK1517','GEK1519','GEK1520','GEK1521','GEK1527','GEK1542','GEK1544','GEK1900','GEK2001','GEK2022','GEK2506','GEM1536','GEM2027','GEM2900','GEM2901','GEQ1000','GER1000','GES1003','GES1010','GES1021','GES1028','GET1008','GET1020','GET1029','GET1031A','GL1101E','HR2002','HY1101E','IE2101','IE2110','IE2130','IE2130E','IE2140','IE3110','IS1103','IS1105','IS2102','IS2103','IT1001','IT1003','IT1004','IT1005','JS1101E','JS2230','LAB1201','LAB2201','LAC1201','LAC2201','LAF1201','LAF2201','LAG1201','LAG2201','LAJ1201','LAJ2201','LAJ2202','LAJ2203','LAJ3201','LAK1201','LAK2201','LAM1201','LAT1201','LC1003','LC1004','LC1006','LC1007','LC1016','LC2004','LC2006B','LC2007','LC2009','LC3001A','LSM1101','LSM1102','LSM1103','LSM1104','LSM1106','LSM1301','LSM1302','LSM1303','LSM1401','LSM2101','LSM2102','LSM2103','LSM2191','LSM2241','LSM2251','LSM3211','LSM3212','LSM3214','LSM3223','LSM3232','LSM4199','LSM4243','MA1100','MA1101R','MA1102R','MA1104','MA1301','MA1312','MA1421','MA1505','MA1506','MA1511','MA1512','MA1521','MA2101','MA2108','MA2213','MA2214','MA2216','MA3110','MA3111','MA3220','MA3252','MA3269','MA4199','MA4264','MD1140','MD2140','MD2150','MD3140','MD4140','MD4150','MD5140','MDG5108','MDG5771','ME2101','ME2103','ME2112','ME2113','ME2114','ME2121','ME2134','ME2135','ME2142','ME2143','ME2151','ME3101','ME3102','ME3112','ME3122','ME3162','ME4101','ME4101A','ME6999','MKT1003','MKT1003X','MLE1101','MNO1001','MNO1001X','MNO2007','MNO2009','MS1102E','MUT1122','NCC1000','NCC1001','NM1101E','NM2101','NM2102','NM2103','NM2104','NM2201','NM2209','NM2216','NM2219','NM2220','NM3215','NM3217','NM3219','NM3224','NUR1110','NUR1114','NUR1117','NUR1118','NUR2116','NUR3113','PA1113','PA2106','PC1141','PC1142','PC1143','PC1144','PC1221','PC1222','PC1322','PC1325','PC1326','PC1327','PC1431','PC1432','PC2230','PC2232','PF1101','PF1102','PF1103','PF1104','PF2101','PF2102','PF2103','PF2105','PH1101E','PH1102E','PL1101E','PL2131','PL2132','PL3232','PL3233','PL3234','PL3235','PL3236','PL3239','PL3241','PL3242','PR1101','PR1102','PR2101','PR2102','PR2104','PR2105','PR2202','PR3101','PR3102','PR3103','PR3104','PR4104','PR4105','PR4106','PS1101E','PS2237','PS2249','PS3249','PS3257','PX3108','PY1105','PY1106','RE1103','RE2102','RE2104','RE2106','SC1101E','SC2101','SC2204','SC2205','SC2211','SC2212','SC2213','SC2214','SC2215','SC2217','SC2218','SC2220','SC3101','SE1101E','SN1101E','SP1541','SSA1201','SSA1202','SSA2202','SSA2204','SSA2209','SSA2211','SSA2215','SSA2219','SSA2220T','SSB2216','SSD2210','SSS1207','ST1131','ST1131A','ST1232','ST2131','ST2132','ST2137','ST2334','ST3131','ST3236','SW1101E','SW2104','TE2101','TG1401','TG1422','TG1423','TG2415','TG3001','TR2201','TS1101E','USS2105','WR1401'],
        selected_module: null,
        webcast: false,
        webcast_vids:0,
        webcast_watchperc:0,
        SU: 0,
        mod_description: ''
      }
    },
    methods: {
      async show_module_information(module_code) {
        this.selected_module = module_code;

        let res1 = await fetch('https://uw2gpnk5f9.execute-api.ap-southeast-1.amazonaws.com/Prod/webcast?' + $.param({module:module_code,filter:10}));
        let webcast = await res1.json();

        if (webcast[0]=="yes"){
          this.webcast = true;
        } else {
          this.webcast = false;
        }

        this.webcast_vids = webcast[1];
        this.webcast_watchperc = Math.round(webcast[2]);


        let res2 = await fetch('https://uw2gpnk5f9.execute-api.ap-southeast-1.amazonaws.com/Prod/workload?' + $.param({module:module_code,su:'yes'}));
        let SU = await res2.json();
        this.SU = SU;


        this.mod_description = 'No module description';

        let res3 = await fetch('https://api.nusmods.com/2014-2015/2/modules/' + module_code + '.json');
        let mod = await res3.json();
        if (mod){
          this.mod_description = mod['ModuleDescription'];
        }
      },
      async add_module(module, ay, sem){
        let res = await fetch('https://uw2gpnk5f9.execute-api.ap-southeast-1.amazonaws.com/Prod/workload?' + $.param({module:module,ay:ay,sem:sem}));
        let workload = await res.json();
        this.workload_data.push({name: module, data: workload, stack: "stack 1"});
      }
    }
  }
</script>

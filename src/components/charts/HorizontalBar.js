import {HorizontalBar, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props: ['HbarData', 'options'],
  data () {
    return {
      datacollection: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One', 
            backgroundColor: '#f87979',
            data: [40, 20, 100, 50]
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.HbarData, this.options,{responsive: true, maintainAspectRatio: false})
  }
}
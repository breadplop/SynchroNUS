import {Bar, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['barData', 'options'],
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
    this.renderChart(this.barData, {responsive: true, maintainAspectRatio: true})
  }
}
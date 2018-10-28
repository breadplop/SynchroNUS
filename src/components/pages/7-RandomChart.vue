<template>
  <div id="app">
    <line-chart :data="{'2017-01-01': 11, '2017-01-02': 6}"></line-chart>
    <line-chart :data="chartData"></line-chart>
    Chart data is: {{chartData}}
    message is {{message}}
    Datase is: {{datase}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      chartData: [["Jan", 4], ["Feb", 2], ["Mar", 10], ["Apr", 5], ["May", 3]],
      message: 'hello',
      data: {
        chartData: [["Jan", 4], ["Feb", 2], ["Mar", 10], ["Apr", 5], ["May", 3]]
      }
    }
  },
  computed: {
    datase () {
      return [["Jan", 4], ["Feb", 2], ["Mar", 10], ["Apr", 5], ["May", 3]]
    }
  }
}
</script>

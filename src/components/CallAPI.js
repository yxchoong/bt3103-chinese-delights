import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: []
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            var res = response.data
            for (let i = 0; i<res["items"].length; i++) {
                this.datacollection.labels.push(res["items"][i]["timestamp"])
            }
            var region = []
            for (var k in res["items"][0]["readings"]["psi_twenty_four_hourly"]) {
                region.push(k)
            }
            var color = ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#c0c0c0"]
            for (var r = 0; r<region.length; r++) {
                var set = {data: [], label: "", borderColor: "", fill: false}
                for (let t = 0; t<res["items"].length; t++) {
                    set.data.push(res["items"][t]["readings"]["psi_twenty_four_hourly"][region[r]])
                }
                set.label = region[r]
                set.borderColor = color[r]
                this.datacollection.datasets.push(set)
            }
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}
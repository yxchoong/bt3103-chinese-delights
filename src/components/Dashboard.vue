<template>
  <div>
      <nav class = "ulorders"> 
        <li class = "liorders"><router-link to="/" exact>Home</router-link></li>
        <li class = "liorders"><router-link to="/orders" exact>Orders</router-link></li>
        <li class = "liorders"><router-link to="/dashboard" exact>Dashboard</router-link></li>
      </nav>
      <bar-chart></bar-chart>
      <callapi></callapi>
  </div> 
</template>


<script> 
import BarChart from './charts/BarChart.vue'
import CallAPI from './CallAPI.vue'

export default {
  components: {
    BarChart, 
    'callapi': CallAPI
  },
  
}
</script> 



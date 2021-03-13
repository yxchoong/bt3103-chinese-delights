<template>
  <div>
      <nav class = "ulorders"> 
        <li class = "liorders"><router-link to="/" exact>Home</router-link></li>
        <li class = "liorders"><router-link to="/orders" exact>Orders</router-link></li>
        <li class = "liorders"><router-link to="/dashboard" exact>Dashboard</router-link></li>
      </nav>
      <ul class = "ulorders"> 
          <li class ="liorders" v-for="(item, index) in orders" v-bind:key="index"> 
            <p id="orderName" v-for="(value, key, index) in item[1]" v-bind:key="index">{{ key }} : {{ value }}</p>
            <button v-bind:id="item[0]" v-on:click.prevent=deleteItem($event)>Delete</button>
            <button v-bind:id="item[0]" v-on:click.prevent=route($event)>Modify</button>
         </li> 
    </ul>
  </div>
</template>


<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            orders:[],
            id: ''
        }
    },



    methods: {
        fetchItems: function() {
            database.collection('orders').get().then((snapshot) => {
              let food = {};
              snapshot.docs.forEach((doc) => {
                food = [doc.id, doc.data()];
                this.orders.push(food);
              });
            });
        },

        deleteItem: function(event) {
          let doc_id = event.target.getAttribute("id");
          database.collection('orders').doc(doc_id).delete().then(() => {location.reload()});
        },

        route: function(event) {
          this.id = event.target.getAttribute("id");
          this.$router.push({ name: 'modify', params: {id: this.id} });
        }
        
    },

    created() {
          this.fetchItems() 
    }

}
</script>

<style> 
.ulorders {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
.liorders {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

#orderName {
  font-size: 20px;
}

</style> 
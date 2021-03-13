<template>
  <div>
          <ul>
            <p id="orderName" v-for="(value, key, index) in datapacket" v-bind:key="index">{{ key }} : {{ value }}<br><input v-bind:id="index" placeholder = 0 type="number" min="0"></p>
            <button v-on:click="updateOrder">Update Order</button>
         </ul> 
         <br>
         
    
  </div>
</template>



<script> 
import database from '../firebase.js'

export default {
    data() {
        return {
            datapacket: {}
        }
    },

    props: {
        id: {
            type: String
        }
    },



    methods: {
        fetchItems: function() {
            database.collection('orders').doc(this.id).get().then((snapshot) => {
                this.datapacket = snapshot.data();
            });
        },

        updateOrder: function() {
            var copy = {...this.datapacket}
            let i = 0;
            for (var k in copy) { 
                if (document.getElementById(i).value == "") {
                    i++;
                } else { 
                    copy[k] = Number(document.getElementById(i).value);
                    i++;

                }                
            }
            database.collection('orders').doc(this.id).set(copy).then( () => {
                this.$router.push({path: '/orders'})
            })

        }
    },

    created() {
          this.fetchItems() 
    },
}

</script> 
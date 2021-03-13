<template>
  <div id = "itemsList">
      <nav class = "ulorders"> 
        <li class = "liorders"><router-link to="/" exact>Home</router-link></li>
        <li class = "liorders"><router-link to="/orders" exact>Orders</router-link></li>
        <li class = "liorders"><router-link to="/dashboard" exact>Dashboard</router-link></li>
      </nav>
      <ul class = "ulbox"> 
          <li class ="libox" v-for="(item, index) in items" v-bind:key="index">
              <p id="itemName">{{ item.name }}</p>
              <img v-bind:src="item.imageURL">
              <p id="price"> {{ '$'+ item.price }}</p>
              <qtyCounter v-bind:item="item" v-on:counter="onCounter"></qtyCounter>
         </li> 
    </ul>
    <basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected" :allOrders="allOrders"></basket>
  </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from '../firebase.js'

export default {
    data() {
        return {
            itemsSelected: [],
            items: [],
            allOrders: {}
        }
    },
    

    components: {
    'qtyCounter': QuantityCounter,
    'basket': Basket,
    },

    methods: {
        fetchItems: function() {
            database.collection('menu').get().then((snapshot) => {
              let food = {};
              snapshot.docs.forEach((doc) => {
                food = doc.data();
                this.items.push(food);
              });
            });
        },


        onCounter: function (item, count) {
            //nothing in itemsSelected
            if (this.itemsSelected.length == 0 && count > 0) {
                this.itemsSelected.push([item.name, count, item.price]);

            } else {

                //loop through to check what is not in the basket
                for (let i = 0; i<this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];
                    if (item_name == item.name && count > 0) {
                        let updateItem = [];
                        updateItem.push(item.name, count, item.price);
                        this.itemsSelected.splice(i,1, updateItem);
                        break;
                
                    } else if (item_name == item.name && count == 0) {
                        this.itemsSelected.splice(i, 1);
                        break;

                    } else if (i == this.itemsSelected.length -1 && item.name != item_name) {
                        this.itemsSelected.push([item.name, count, item.price]);
                    }
                    
                }
            } 
            for (let i = 0; i<this.itemsSelected.length; i++) {
                this.allOrders[this.itemsSelected[i][0]] = this.itemsSelected[i][1];
            }
            for (let i = 0; i<this.items.length; i++) {
                if (!(this.items[i].name in this.allOrders)) {
                  this.allOrders[this.items[i].name] = 0;
                }

            }
          
          
        }
    },

    created() {
          this.fetchItems() 
    },
  
}
</script>

<style>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
.ulbox {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
.libox {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}

</style>
<template> 
<div> 
    <p><strong>Menu: </strong></p>
    <ul>
        <li v-for="(item, index) in itemsSelected" v-bind:key="index">
            <p>{{ item[0] }} x {{ item[1]}}</p> 
        </li> 
    </ul>
    <button v-on:click="sendOrder">Add Order</button>
    <!-- <p v-show="showValue"><strong>Subtotal: </strong>${{ subtotal.toFixed(2) }}</p> 
    <p v-show="showValue"><strong>Grand Total: </strong>${{ grandtotal }}</p>  -->
</div> 
</template> 

<script> 
import database from '../firebase.js'

export default {
    data() {
        return {
            subtotal: 0, 
            showValue: false,
        }
    },
    props: {
        itemsSelected:{
            type:Array
        },
        allOrders: {
            type:Array
        }
    },

    methods: {
        /* findTotal: function() {
            this.grandtotal = 0;
            this.subtotal = 0;
            for (let i = 0; i<this.itemsSelected.length; i++) {
                this.subtotal += (this.itemsSelected[i][2] * this.itemsSelected[i][1])
            }
            this.showValue = true;

        }, */

    

        sendOrder: function() {
            database.collection('orders').add(this.allOrders).then(() => {location.reload()});
        
        }
        
    },

    /* computed: {
        grandtotal: function() {
            return (this.subtotal * 1.07).toFixed(2);
        }
    } */
}
</script> 

<style>

</style>

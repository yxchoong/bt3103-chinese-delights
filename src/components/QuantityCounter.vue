<template>
  <div>
    <button v-on:click = "add()">+</button> 
    {{ counter }}
    <button v-on:click = "minus()">-</button> 
  </div>
</template>

<script>
export default {
  data() {
    return { 
      counter: 0
    }
  }, 
  props: {
        item:{
            type:Object
        }
    }, 
  methods: {
    add: function() {
      if (this.counter == 10) {
        alert("You cannot buy more than 10 items."); 
      } else {
        this.counter += 1;
      }
      this.$emit('counter', this.item, this.counter);
    }, 
    minus: function() {
      if (this.counter > 0) {
        this.counter -= 1;
      } else {
        this.counter == 1;
      }
      this.$emit('counter', this.item, this.counter);
    }
  }
}
</script>

<style>
div {
  font-size: 30px;
  font-family:Arial, Helvetica, sans-serif
}
button {
  background-color: #f8c2e3; 
  border-color: #808080;
  border-radius: 4px;
  color: black;
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 22px;
  cursor: pointer;
}
</style>
<template>
  <div class="hello">
    <br />
    <Button :to="{path:'/template'}">template</Button>
    <Button :to="{path:'/chessboardtest'}">chessboardtest</Button>
    <Button :to="{path:'/helloworld'}">helloworld</Button>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      msg: "This is a Chess Board",
      level: 8,
      size: 40
    };
  },
  mounted() {
    this.say("hi");
  },
  methods: {
    say: function(message) {
      // alert(message);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  text-align: center;
}
span {
  margin-left: 5px;
}
.example {
  padding: 5%;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.testtable,
table {
  border: 1px solid blue;
  margin: auto;
}
.td {
  width: 100px;
  overflow: hidden;
}
</style>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Button v-on:click="say('hi')">Refresh</Button>
    <span>level:</span>
    <InputNumber :max="100" :min="1" v-model="level" v-on:on-change="draw()"></InputNumber>
    <span>blocksize:</span>
    <InputNumber :max="500" :min="1" v-model="size" v-on:on-change="draw()"></InputNumber>

    <div id="example" class="example"></div>
  </div>
</template>

<script>
export default {
  name: "Template",
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
      this.draw();
    },
    draw: function() {
      document.getElementById("example").innerHTML = this.get_content();
    },
    get_content: function() {
      var status = this.test_array_generator();
      return this.generate_table(status);
      // return Date();
    },
    test_array_generator: function() {
      var level = this.level;
      var ret = [];
      for (var i = 0; i < level; ++i) {
        ret.push([]);
        for (var j = 0; j < level; ++j) {
          // var it = Math.floor(Math.random() * 10) % 2
          var it = (i + j) % 2;
          ret[i].push(it);
        }
      }
      return ret;
    },
    generate_table: function(status) {
      var level = status.length;
      var size = this.size;
      size = (document.body.clientWidth * 0.6) / level;
      if (size > this.size) {
        size = this.size;
      }
      var width = size + "px";
      var height = size + "px";
      // var width = "40px"
      // var height = "40px"
      var ret = "<table border=1 align='center'>";
      for (var i = 0; i < level; ++i) {
        ret += "<tr>";
        for (var j = 0; j < level; ++j) {
          ret += "<td width=" + width + " height=" + height;
          if (status[i][j] == 1) {
            ret += " bgcolor='black'";
          }
          ret += "></td>";
        }
        ret += "</tr>";
      }
      ret += "</table>";
      // console.log(ret);
      this.test_array_generator();
      return ret;
      // return Date();
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

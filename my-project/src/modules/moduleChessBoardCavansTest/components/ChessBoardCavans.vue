<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Button v-on:click="generator()">generator</Button>
    <Button v-on:click="say('hi')">Refresh</Button>

    <span>level:</span>
    <InputNumber :max="100" :min="1" v-model="level" v-on:on-change="init()"></InputNumber>
    <span>blocksize:</span>
    <InputNumber :max="500" :min="1" v-model="size" v-on:on-change="init()"></InputNumber>
    <span>step:</span>
    <InputNumber :max="500" :min="1" v-model="step" v-on:on-change="init()"></InputNumber>
    <span>delta_x:</span>
    <InputNumber :max="500" :min="1" v-model="delta_x" v-on:on-change="init()"></InputNumber>
    <span>delta_y:</span>
    <InputNumber :max="500" :min="1" v-model="delta_y" v-on:on-change="init()"></InputNumber>
    <br />

    <canvas id="cavsElem">你的浏览器不支持canvas，请升级浏览器.浏览器不支持，显示此行文本</canvas>
  </div>
</template>

<script>
//  import {drawArrow} from "./functions/drawarraw"

export default {
  name: "ChessBoardCavans",
  data() {
    return {
      msg: "This is a Chess Board",
      level: 8,
      size: 72,
      status: "",
      route: [[0, 0]],
      step: 64,
      delta_x: 1,
      delta_y: 2,
      move: "",
      intervalidlist: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      for (var i = 0; i < this.intervalidlist.length; ++i) {
        clearInterval(this.intervalidlist[i]);
      }
      this.intervalidlist = [];
      this.status = this.test_array_generator();
      this.route = [[0, 0]];
      var delta_x = this.delta_x;
      var delta_y = this.delta_y;
      this.move = [
        [delta_x, delta_y],
        [delta_x, -delta_y],
        [-delta_x, delta_y],
        [-delta_x, -delta_y],
        [delta_y, delta_x],
        [delta_y, -delta_x],
        [-delta_y, delta_x],
        [-delta_y, -delta_x]
      ];
      this.generate_table(this.status, this.route);
      // this.generator()
    },
    generator: function() {
      // this.status = this.test_array_generator();
      this.intervalidlist.push(setInterval(this.draw, 1));
    },
    say: function(message) {
      // this.status = this.test_array_generator();
      // alert(message);
      this.draw();
    },
    draw: function() {
      this.get_content();
    },
    get_content: function() {
      // this.status = this.test_array_generator();
      // 生成一条随机路径
      // this.route = this.test_route_generator()

      // 生成一条随机骑士环游路径
      // this.route = this.test_knight_route_generator();

      // 生成一条在棋盘内的骑士环游路径
      // this.route = this.test_knight_route_generator_in_chess_board();
      // step by step
      this.route = this.next_knight_route_generator_in_chess_board();
      return this.generate_table(this.status, this.route);
      // return Date();
    },
    test_array_generator: function() {
      var level = this.level;
      var ret = [];
      for (var i = 0; i < level; ++i) {
        ret.push([]);
        for (var j = 0; j < level; ++j) {
          // var it = Math.floor(Math.random() * 10) % 2;
          // var it = (i + j) % 2;
          var it = 0;
          ret[i].push(it);
        }
      }
      return ret;
    },
    test_route_generator: function() {
      var level = this.level;
      var ret = [];
      var x = 4;
      var y = 4;
      ret.push([x, y]);
      for (var k = 0; k < 5; ++k) {
        var i = Math.floor(Math.random() * level * 1000) % level;
        var j = Math.floor(Math.random() * level * 1000) % level;
        ret.push([i, j]);
      }
      return ret;
    },
    test_knight_route_generator: function() {
      var level = this.level;
      var ret = [];
      var x = Math.floor(level / 2);
      var y = Math.floor(level / 2);
      ret.push([x, y]);
      var num = this.step;
      for (var k = 0; k < num; ++k) {
        var knight_step = this.move;
        var move_num = knight_step.length;
        var seed = Math.floor(Math.random() * move_num * 1000) % move_num;
        x = x + knight_step[seed][0];
        y = y + knight_step[seed][1];

        ret.push([x, y]);
      }
      return ret;
    },
    test_knight_route_generator_in_chess_board: function() {
      var level = this.level;
      var ret = [];
      var x = Math.floor(level / 2);
      var y = Math.floor(level / 2);
      x = 0;
      y = 0;
      ret.push([x, y]);
      var tmps = 0;
      var num = this.step;
      for (var k = 0; k < num; ++k) {
        tmps++;
        if (tmps >= num * 10) {
          break;
        }
        var knight_step = this.move;
        var move_num = knight_step.length;
        var seed = Math.floor(Math.random() * move_num * 1000) % move_num;

        x += knight_step[seed][0];
        y += knight_step[seed][1];
        if (x >= level || y >= level || x < 0 || y < 0) {
          k -= 1;
          x -= knight_step[seed][0];
          y -= knight_step[seed][1];
          continue;
        }
        ret.push([x, y]);
      }
      return ret;
    },
    next_knight_route_generator_in_chess_board: function() {
      var level = this.level;
      var ret = [];
      var route_size = this.route.length;
      var x = this.route[route_size - 1][0];
      var y = this.route[route_size - 1][1];

      var tmps = 0;
      var num = 1;
      for (var k = 0; k < num; ++k) {
        tmps++;
        // if (tmps >= num * 10) {
        //   break;
        // }
        var knight_step = this.move;
        var move_num = knight_step.length;
        var seed = Math.floor(Math.random() * move_num * 1000) % move_num;

        x += knight_step[seed][0];
        y += knight_step[seed][1];

        if (x >= level || y >= level || x < 0 || y < 0) {
          k -= 1;
          x -= knight_step[seed][0];
          y -= knight_step[seed][1];
          continue;
        }

        if (tmps < num * 100 && this.status[x][y] == 1) {
          k -= 1;
          x -= knight_step[seed][0];
          y -= knight_step[seed][1];
          continue;
        }

        this.status[x][y] = 1;

        this.route.push([x, y]);
      }
      return this.route;
    },
    generate_table: function(status, route) {
      var margin = 40;
      var size = this.size;
      var level = this.level;

      var canvas = document.getElementById("cavsElem"); //获得画布
      var ctx = canvas.getContext("2d"); //注意：2d小写， 3d：webgl
      canvas.width = margin * 2 + size * level; //设置标签的属性宽高
      canvas.height = margin * 2 + size * level; //千万不要用 canvas.style.height
      canvas.style.border = "1px solid #000";

      // drawArrow(ctx, 100, 50, 250, 50, 1, 1, 10, 30, '#f36', 1);

      for (var i = 0; i <= level; ++i) {
        //绘制三角形
        var x = margin + i * size;
        var y = margin;
        ctx.beginPath(); //开始画竖线
        ctx.moveTo(x, y); // 上顶点
        ctx.lineTo(x, y + level * size); // 下顶点

        ctx.moveTo(y, x); //开始画横线
        ctx.lineTo(y + level * size, x); //左顶点
        ctx.stroke(); //右顶点
      }

      // // 画棋盘
      // for (var i = 0; i < level; ++i) {
      //   for (var j = 0; j < level; ++j) {
      //     if (status[i][j] == 1) {
      //       var x = margin + i * size;
      //       var y = margin + j * size;
      //       var rect_size = size - 2;
      //       x += (size - rect_size) / 2;
      //       y += (size - rect_size) / 2;
      //       ctx.globalAlpha = 0.3;
      //       ctx.fillRect(x, y, rect_size, rect_size);
      //       ctx.globalAlpha = 1;
      //     }
      //   }
      // }

      //  画路径
      {
        var i = route[0][0];
        var j = route[0][1];
        ctx.beginPath();
        var x = margin + i * size + size / 2;
        var y = margin + j * size + size / 2;
        ctx.moveTo(x, y);
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        for (var k = 1; k < route.length; ++k) {
          i = route[k][0];
          j = route[k][1];
          x = margin + i * size + size / 2;
          y = margin + j * size + size / 2;
          ctx.lineWidth = 2;
          ctx.lineTo(x, y);
          ctx.arc(x, y, 2, 0, 2 * Math.PI);

          var x = margin + i * size;
          var y = margin + j * size;
          var rect_size = size - 2;
          x += (size - rect_size) / 2;
          y += (size - rect_size) / 2;
          ctx.globalAlpha = 0.1;
          // ctx.fillRect(x, y, rect_size, rect_size);
          ctx.globalAlpha = 1;
        }
        ctx.stroke();
      }
      // //绘制三角形 example
      // ctx.beginPath(); //开始路径
      // ctx.moveTo(100, 100); //三角形，左顶点
      // ctx.lineTo(300, 100); //右顶点
      // ctx.lineTo(300, 300); //底部的点
      // ctx.closePath(); //结束路径
      // ctx.stroke(); //描边路径
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
canvas {
  display: inline-block;
  margin: 15px;
}
</style>

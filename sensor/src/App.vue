<template>
<div >
    <div class="bg">
    </div>
    <vue-particles
      color="#8568ca"
      :particleOpacity="0.5"
      :particlesNumber="110"
      shapeType="edge"
      :particleSize="4"
      linesColor="#8568ca"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="particle"
    />
  <div  style="height:20px"> </div>
  <el-container >
    <el-container direction="vertical" style="width:60%">
      <div align="center">  <img src="@/assets/image/title.png" alt style="
            width:500px;
            filter:drop-shadow(2px 2px 10px #409EFF);
        "/>
        
        <el-button icon="el-icon-thumb" type="primary" @click="run" style="position:relative; left:10px; bottom:25px">模拟</el-button>
        <el-button icon="el-icon-thumb" type="primary" @click="reload" style="position:relative; left:10px; bottom:25px">清空</el-button>
        </div>

      <dv-border-box-1 class="sensor_box newCheckSty">
        <div style="height:60px" ></div>
        <el-checkbox-group style="margin-top:0px"
          v-model="chosen_A">
          <el-checkbox v-for="A_sensor in A_options" :label="A_sensor" :key="A_sensor">{{A_sensor}}</el-checkbox>
        </el-checkbox-group>

        <el-checkbox-group 
          v-model="chosen_B">
          <el-checkbox v-for="B_sensor in B_options" :label="B_sensor" :key="B_sensor">{{B_sensor}}</el-checkbox>
        </el-checkbox-group>

        <el-checkbox-group 
          v-model="chosen_C">
          <el-checkbox v-for="C_sensor in C_options" :label="C_sensor" :key="C_sensor">{{C_sensor}}</el-checkbox>
        </el-checkbox-group>

        <el-checkbox-group 
          v-model="chosen_D">
          <el-checkbox v-for="D_sensor in D_options" :label="D_sensor" :key="D_sensor">{{D_sensor}}</el-checkbox>
        </el-checkbox-group>

        <el-checkbox-group 
          v-model="chosen_E">
          <el-checkbox v-for="E_sensor in E_options" :label="E_sensor" :key="E_sensor">{{E_sensor}}</el-checkbox>
        </el-checkbox-group>

        <el-checkbox-group 
          v-model="chosen_F">
          <el-checkbox v-for="F_sensor in F_options" :label="F_sensor" :key="F_sensor">{{F_sensor}}</el-checkbox>
        </el-checkbox-group>

        <el-checkbox-group 
          v-model="chosen_G">
          <el-checkbox v-for="G_sensor in G_options" :label="G_sensor" :key="G_sensor">{{G_sensor}}</el-checkbox>
        </el-checkbox-group>

        <el-checkbox-group 
          v-model="chosen_H">
          <el-checkbox v-for="H_sensor in H_options" :label="H_sensor" :key="H_sensor">{{H_sensor}}</el-checkbox>
        </el-checkbox-group>

        <el-checkbox-group  style="margin-bottom:30px"
          v-model="chosen_I">
          <el-checkbox v-for="I_sensor in I_options" :label="I_sensor" :key="I_sensor">{{I_sensor}}</el-checkbox>
        </el-checkbox-group>
      </dv-border-box-1>
    </el-container>

    <el-container direction="vertical" style="width:40%;margin-left:20px">
      <dv-decoration-11 style="height:180px;margin-bottom:10px"><h1 class="text" style="margin-bottom:4px">
        间隔距离：<el-input v-model="interval" placeholder="请输入间隔距离" style="width:50%;height:50px;"></el-input> m <br>
        传播速度：<el-input v-model="speed" placeholder="请输入传播速度" style="width:50%;height:50px;"></el-input> m/s <br>
        传播起点：<el-input v-model="start" placeholder="请输入起点 (例如A2)" style="width:50%;height:50px;"></el-input> 
      </h1></dv-decoration-11>  

      <dv-border-box-4 title="距离最短" style="height:270px;"  :color="['#3fb1e3', '#96dee8']">
        <h1 class="res_text" style="margin-top:40px;">最短距离：{{this.opt_dis}} m</h1>
        <h3 class="res_text" style="margin-top:10px">路径：{{this.opt_dis_path}} </h3>
        <h1 class="res_text">最短时间：{{this.opt_time}} s</h1>
        <h3 class="res_text" style="margin-top:10px">路径：{{this.opt_time_path}} </h3>
      </dv-border-box-4>
      <dv-border-box-4 title="时间最短" style="height:220px;" :reverse="true" :color="['#3fb1e3', '#96dee8']">
        <el-container>
        <h1 class="algo_text">请选择图中任意传感器节点，并在右上角输入相关信息，点击模拟。<br>本模拟采用图遍历的DFS算法并结合剪枝技术，输出最优路径。</h1>
        <dv-decoration-9 :color="['#3fb1e3', '#96dee8']" class="" style="width:150px;height:150px;font-size:25px">O(n²)</dv-decoration-9>
        </el-container>
      </dv-border-box-4>
    </el-container>
</el-container>
<div align="center" class="foot_text" style="margin-top:15px"> 
    @同济大学软件学院IoT期中作业 1854025杨晶
  </div>
</div>
</template>

<script>
  function Sensor(s){
    switch (s[0]) {
    case 'A':
        this.y = 0;
        break;
    case 'B':
        this.y = 1;
        break;
    case 'C':
        this.y = 2;
        break;
    case 'D':
        this.y = 3;
        break;
    case 'E':
        this.y = 4;
        break;
    case 'F':
        this.y = 5;
        break;
    case 'G':
        this.y = 6;
        break;
    case 'H':
        this.y = 7;
        break;
    case 'I':
        this.y = 7;
        break;
    }
  s = s.slice(1);
  this.x=s-'0'-1
}

  export default {
    data() {
      return {
        interval:'',
        speed:'',
        start:'',
        count:1,
        path:[],
        dis_graph:[],
        time_graph:[],
        opt_res:[],//第一个元素是最短距离，第二个为最短时间
        opt_dis:999999,
        opt_time:999999,
        dis_visited:[],
        time_visited:[],
        opt_dis_path:[],
        opt_time_path:[],
        A_options:['A1', 'A2', 'A3', 'A4','A5','A6','A7','A8','A9','A10','A11','A12'],
        B_options:['B1', 'B2', 'B3', 'B4','B5','B6','B7','B8','B9','B10','B11','B12'],
        C_options:['C1', 'C2', 'C3', 'C4','C5','C6','C7','C8','C9','C10','C11','C12'],
        D_options:['D1', 'D2', 'D3', 'D4','D5','D6','D7','D8','D9','D10','D11','D12'],
        E_options:['E1', 'E2', 'E3', 'E4','E5','E6','E7','E8','E9','E10','E11','E12'],
        F_options:['F1', 'F2', 'F3', 'F4','F5','F6','F7','F8','F9','F10','F11','F12'],
        G_options:['G1', 'G2', 'G3', 'G4','G5','G6','G7','G8','G9','G10','G11','G12'],
        H_options:['H1', 'H2', 'H3', 'H4','H5','H6','H7','H8','H9','H10','H11','H12'],
        I_options:['I1', 'I2', 'I3', 'I4','I5','I6','I7','I8','I9','I10','I11','I12'],
        //sensor:[A_options,B_options,C_options,D_options,E_options,F_options,G_options,H_options,I_options],

        chosen_A:[],
        chosen_B:[],
        chosen_C:[],
        chosen_D:[],
        chosen_E:[],
        chosen_F:[],
        chosen_G:[],
        chosen_H:[],
        chosen_I:[], 
        chosen_sensor:[]
      };
    },
    methods: {
      //计算两传感器相隔距离
      distance_between(a,b){
        var x_distance,y_distance
        var ans
        x_distance=Math.abs(a.x-b.x)
        y_distance=Math.abs(a.y-b.y)

        if (x_distance < y_distance)
          ans = (Math.sqrt(2 * x_distance * x_distance) + y_distance - x_distance);
        else
          ans = (Math.sqrt(2 * y_distance * y_distance) + x_distance - y_distance);
        return ans*this.interval;
      },
      //计算两传感器相隔时间
      time_between(a,b){
        var x_time,y_time
        var ans
        x_time=Math.abs(a.x-b.x)
        y_time=Math.abs(a.y-b.y)

        if (x_time < y_time)
          ans =  y_time ;
        else
          ans =  x_time;

        return ans*this.interval/this.speed;
      },

      //根据已选节点构建无向图
      //该函数需要返回一个费用矩阵
      graphInit(){
        this.chosen_sensor=[]

        for(var i=0; i<this.chosen_A.length; i++){
          this.chosen_sensor.push(this.chosen_A[i])
        }
        for(var i=0; i<this.chosen_B.length; i++){
          this.chosen_sensor.push(this.chosen_B[i])
        }
        for(var i=0; i<this.chosen_C.length; i++){
          this.chosen_sensor.push(this.chosen_C[i])
        }
        for(var i=0; i<this.chosen_D.length; i++){
          this.chosen_sensor.push(this.chosen_D[i])
        }
        for(var i=0; i<this.chosen_E.length; i++){
          this.chosen_sensor.push(this.chosen_E[i])
        }
        for(var i=0; i<this.chosen_F.length; i++){
          this.chosen_sensor.push(this.chosen_F[i])
        }
        for(var i=0; i<this.chosen_G.length; i++){
          this.chosen_sensor.push(this.chosen_G[i])
        }
        for(var i=0; i<this.chosen_H.length; i++){
          this.chosen_sensor.push(this.chosen_H[i])
        }
        for(var i=0; i<this.chosen_I.length; i++){
          this.chosen_sensor.push(this.chosen_I[i])
        }

        for(var i=0; i<this.chosen_sensor.length; i++){
          //console.log('我在执行行'+i+'循环')
          var role1=new Sensor(this.chosen_sensor[i])
          var dis_temp=[]
          var time_temp=[]
          for(var j=0; j<this.chosen_sensor.length; j++){
            //console.log('我在执行列'+j+'循环')
            var role2=new Sensor(this.chosen_sensor[j])
            dis_temp.push(this.distance_between(role1,role2))
            time_temp.push(this.time_between(role1,role2))
          }
          this.dis_graph.push(dis_temp)
          this.time_graph.push(time_temp)
        }
      },
      //深度优先遍历
      disDFS(cur, dis){
        //console.log('0000000')
        var i
        var n = this.chosen_sensor.length
        if (this.opt_dis <= dis){
          return;
        }

        if(this.count == n){
          // console.log(this.path)
          // console.log(dis)

          if (this.opt_dis > dis)  //更新最小路径
          {
            this.opt_dis = dis;
            for (i = 0; i < n; i++) // 记录最短路径
            {
              this.opt_dis_path[i] = this.path[i];
            }
          }
          return;
        }

        for (i = 0; i < n; i++)  //从1号城市到n号城市依次尝试
        {
          //判断城市i是否在已走过的路径中
          if ( this.dis_visited[i] == 0)
          {
            this.dis_visited[i] = 1;//标记城市i已经在路径中
            this.path[this.count] = i;//保存路径到path数组中
            this.count++;
            this.disDFS(i, dis + this.dis_graph[cur][i]);
            this.dis_visited[i] = 0;         // 之前一部探索完毕后,取消对 i 的标记以便另一条路径选择顶点
            this.path[this.count] = -1;
            this.count--;
          }
        }
      },
      timeDFS(cur, time){
        //console.log('0000000')
        var i
        var n = this.chosen_sensor.length
        if (this.opt_time <= time){
          return;
        }

        if(this.count == n){
          // console.log(this.path)
          // console.log(time)

          if (this.opt_time > time)  //更新最小路径
          {
            this.opt_time = time;
            for (i = 0; i < n; i++) // 记录最短路径
            {
              this.opt_time_path[i] = this.path[i];
            }
          }
          return;
        }

        for (i = 0; i < n; i++)  //从1号城市到n号城市依次尝试
        {
          //判断城市i是否在已走过的路径中
          if ( this.time_visited[i] == 0)
          {
            this.time_visited[i] = 1;//标记城市i已经在路径中
            this.path[this.count] = i;//保存路径到path数组中
            this.count++;
            this.timeDFS(i, time + this.time_graph[cur][i]);
            this.time_visited[i] = 0;         // 之前一部探索完毕后,取消对 i 的标记以便另一条路径选择顶点
            this.path[this.count] = -1;
            this.count--;
          }
        }
      },
      setStart(){
        console.log('起点是：')
        console.log(this.start)
        console.log('被选中的传感器名称是：')
        console.log(this.chosen_sensor)

        if(this.start==''){
          this.$alert('请输入起点', 
          '错误提示', {
            confirmButtonText: '确定',
          });
          this.clear()
          return -1
        }
        var i
        //删除start
        for ( i = 0; i < this.chosen_sensor.length; i++) { 
          if (this.chosen_sensor[i] ==this.start ) {
            this.chosen_sensor.splice(i, 1);
            //将start加到数组第一位
            this.chosen_sensor.unshift(this.start);
            return
          }; 
        } 
        if(i==this.chosen_sensor.length){
          this.$alert('输入的起点不在所选传感器中！请注意字母大写并且没有空格', 
          '错误提示', {
            confirmButtonText: '确定',
          });
          this.clear()
          return -1
        }
      },
      //主程序
      run(){
        this.count=1
        this.path=[]
        this.opt_dis=999999
        this.opt_time=999999

        if(this.interval==''|this.speed=='') {
          this.$alert('请输入距离和速度后再点击模拟按钮！', 
          '错误提示', {
            confirmButtonText: '确定',
          });
          this.clear()
          return
        }

        this.graphInit()
        

        if(this.chosen_sensor.length<3) {
          this.$alert('请至少选择三个传感器！', 
          '错误提示', {
            confirmButtonText: '确定',
          });
          this.clear()
          return
        }

        this.setStart()

        console.log('设置起点后的传感器名称是：')
        console.log(this.chosen_sensor)
        console.log('距离矩阵是：')
        console.log(this.dis_graph)
        console.log('时间矩阵是：')
        console.log(this.time_graph)

        this.dis_visited=[]
        this.path=[]
        this.opt_dis_path=[]

        for(var i=0; i<this.chosen_sensor.length; i++){
          this.dis_visited.push(0)
          this.path.push(-1)
          this.opt_dis_path.push(-1)
        }
        this.dis_visited[0] = 1; //标记0号传感器已经在路径中
        this.path[0] = 0;

        this.disDFS(0, 0);//0表示当前所在传感器标号，0表示当前已经走过的路程
        console.log('最短路径的长度和路径是：')
        console.log(this.opt_dis)
        console.log(this.opt_dis_path)
        this.opt_dis = Math.floor(this.opt_dis * 100) / 100

        var i
        for(i=0;i<this.opt_dis_path.length;i++){
          this.opt_dis_path[i]=this.chosen_sensor[this.opt_dis_path[i]]
        }

        this.count=1
        this.path=[]
        this.time_visited=[]
        this.opt_time_path=[]

        for(var i=0; i<this.chosen_sensor.length; i++){
          this.time_visited.push(0)
          this.path.push(-1)
          this.opt_time_path.push(-1)
        }
        this.time_visited[0] = 1; //标记0号传感器已经在路径中
        this.path[0] = 0;

        this.timeDFS(0, 0);//0表示当前所在传感器标号，0表示当前已经走过的路程
        console.log('最短路径的长度和路径是：')
        console.log(this.opt_time)
        console.log(this.opt_time_path)
        this.opt_time = Math.floor(this.opt_time * 100) / 100

        var i
        for(i=0;i<this.opt_time_path.length;i++){
          this.opt_time_path[i]=this.chosen_sensor[this.opt_time_path[i]]
        }
        // var sizeof = require('object-sizeof')
        // console.log(sizeof(this.opt_time_path))

      },
      clear(){
        // this.interval=''
        // this.speed=''
        // this.count=1
        // this.path=[]
        // this.dis_graph=[]
        // this.time_graph=[]
        // this.opt_res=[]//第一个元素是最短距离，第二个为最短时间
        // this.opt_dis=999999
        // this.opt_time=999999
        // this.dis_visited=[]
        // this.time_visited=[]
        // this.opt_dis_path=[]
        // this.opt_time_path=[]
        
        setTimeout(function () {
          location.reload();
        },1500);
        
      },
      reload(){
        <dv-loading>Loading...</dv-loading>
          location.reload();
      }
    },
    created () {

    },
  };
</script>

<style>
.dv-loading{
  z-index: 99999;
}
.bg {
    width: 100%;
    height: 100%;
    background-image: url("./assets/image/bg.jpg");
    background-size:100% 100%;
    margin-left: -8px;
    margin-top: -8px;
    background-repeat: no-repeat;
    background-position: right top;
    background-attachment: fixed;

    z-index: -2;
    position: absolute;
    background-color: rgb(60, 50, 82);
}
.sensor_box{
  /* height: 400px; */
  /* width: 550px; */
  background-color: rgba(50, 50, 119, 0.411);
}
.el-checkbox{
  height: 50px;
  width: 30px;
}
.el-checkbox-group{
  margin-left: 40px;
}
.particle {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #ffffff00;
  z-index: -1;
}
.text{
  color: #8DEEEE
}
.res_text{
  color: #8DEEEE;
  margin-left: 40px;
}
.title_text{
  color: #8DEEEE;
  margin-top: 20px;
}
.algo_text{
  color: #8DEEEE;
  width: 250px;
  font-size:20px;
  margin-left: 20px;
}
.dv-decoration-9{
  position:relative;
  left:30px;
  top:30px;
  color: #8DEEEE;
  font-size:30px;
  font-weight:bold;
}
/* 设置选中后的文字颜色 */
.newCheckSty .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #8DEEEE !important; 
}
/* 设置选中后对勾框的边框和背景颜色 */
.newCheckSty .el-checkbox__input.is-checked .el-checkbox__inner,
.newCheckSty .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #8DEEEE !important;
  background-color: #8DEEEE !important;
}
/* 设置带边框的checkbox，选中后边框的颜色 */
.newCheckSty.is-bordered.is-checked {
  border-color: #8DEEEE !important;
}
/* 设置checkbox获得焦点后，对勾框的边框颜色 */
.newCheckSty .el-checkbox__input.is-focus .el-checkbox__inner{
  border-color: #8DEEEE !important;
}
/* 设置鼠标经过对勾框，对勾框边框的颜色 */
.newCheckSty .el-checkbox__inner:hover{
  border-color: #8DEEEE !important;
}
.newCheckSty .el-checkbox__inner{
  background-color: #64009280;
  border: 1px solid #640092;
}
.newCheckSty .el-checkbox__label {
  display: inline-block;
  padding-left: 10px;
  line-height: 19px;
  font-size: 14px;
  color: #ae00ff;
}
.el-input__inner{
  background-color: #64009275 !important;
  border: 0px solid #DCDFE6 !important;
  color: #8DEEEE !important;
}
.el-button--primary {
    color: #FFF;
    background-color: #64009275 !important;
    border-color: #64009275 !important;
}
.foot_text{
  color: #c656fa;
}
</style>
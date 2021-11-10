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

  <el-container >
    <el-container direction="vertical" style="width:60%">
      <div align="center">  <img src="@/assets/image/title.png" alt style="
            width:500px;
    
        "/></div>
      <div>
      <el-button type="text" @click="openInfo">场景说明</el-button>
      <el-button type="text" @click="openAlgo">依赖算法</el-button>
      </div>

      <dv-border-box-1 class="sensor_box" >
        <div style="height:60px"></div>
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
      <dv-decoration-11 style="height:150px;margin-bottom:10px"><div class="info_text">
        间隔距离：<el-input v-model="interval" placeholder="请输入间隔距离" style="width:50%;height:50px;"></el-input> m <br>
        传播速度：<el-input v-model="speed" placeholder="请输入传播速度" style="width:50%;height:50px;"></el-input> m/s
        <el-button icon="el-icon-thumb" circle @click="run" style="position:relative; left:10px; bottom:25px"></el-button>
      </div></dv-decoration-11>  

      <dv-border-box-11 title="距离最短" style="height:270px;"  ></dv-border-box-11>
      <dv-border-box-11 title="时间最短" style="height:270px;"  ></dv-border-box-11>
    </el-container>

</el-container>
</div>
</template>

<script>
  var Sensor = {
    x:0,
    y:0,
    name:'A2',

    setXY:function(){
      var s=this.name
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
  }


  export default {
    data() {
      return {
        interval:'',
        speed:'',

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
        //chosen_sensor:[chosen_A,chosen_B,chosen_C,chosen_D,chosen_E,chosen_F,chosen_G,chosen_H,chosen_I]
      };
    },
    methods: {
       openInfo() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
        });
      },
       openAlgo() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
        });
      },
      //计算两传感器相隔距离
      distance_between(a,b){
        var x_distance,y_distance
        var ans
        x_distance=abs(a.x-b.x)
        y_distance=abs(a.y-b.y)

        if (x_distance < y_distance)
          ans = (sqrt(2 * x_distance * x_distance) + y_distance - x_distance);
        else
          ans = (sqrt(2 * y_distance * y_distance) + x_distance - y_distance);
        return ans*this.interval;
      },
      //计算两传感器相隔时间
      time_between(a,b){
        var x_time,y_time
        var ans
        x_time=abs(a.x-b.x)
        y_time=abs(a.y-b.y)

        if (x_time < y_time)
          ans =  y_time ;
        else
          ans =  x_time;

        return ans*this.interval/this.speed;
      },
      //根据已选节点构建无向图
      //该函数需要返回一个list包含除节点外所有需要遍历的传感器
      graphInit(){

      },
      //动态规划算法计算路径并保存
      tspDP(){

      },
      //主程序
      run(){

      }

    },
    created () {
        this.timer = setInterval(() => {
           //console.log(this.A_options[0][0])
        }, 3000) 
    },
  };
</script>

<style>
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
  height: 400px;
  width: 550px;
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
.info_text{
  color: #8DEEEE
}
.inf_text{
  color: rgb(144, 220, 255);
}
</style>
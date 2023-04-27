<template>
  <div class="home">
    <el-button @click="open">建立连接</el-button>
    <el-input v-model="inputVal"></el-input>
    <el-button @click="sendData">111</el-button>
    {{ getVal }}
    <el-button @click="close">关闭连接</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import WS from '@/http/ws';
let ws :WS

const inputVal = ref('123')
const getVal = ref('')

const open = ()=> {
  ws = new WS({url:'ws://localhost:8880/webscoket', pingMsg:'{"type":"0000","data":"heart check"}'})
}

const sendData = ()=> {
  ws.send(inputVal.value)
  ws.onmessage = evt => {
    console.log(evt.data);
  }
}
const close = ()=> {
  ws.close()
}
</script>

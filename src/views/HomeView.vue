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

const ws = new WS

const inputVal = ref('123')
const getVal = ref('')

const open = ()=> {
  ws.open()
}

// ws.open = () => {
//   console.log('WebSocket连接已打开');
// };

getVal.value = ws.getData()

const sendData = ()=> {
  ws.sendWs('', inputVal.value)
}
const close = ()=> {
  ws.close()
}
</script>

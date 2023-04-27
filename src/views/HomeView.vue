<template>
  <div class="home">
    <el-button @click="open">建立连接</el-button>
    <el-input v-model="inputValRef"></el-input>
    <el-button @click="sendData">111</el-button>
    {{ getValRef }}
    <el-button @click="close">关闭连接</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import WS from '@/http/ws';
import { ElMessage } from 'element-plus';
let ws :WS

const inputValRef = ref('123')
const getValRef = ref('')
const createdWsRef = ref(false)

const open = ()=> {
  ws = new WS({url:'ws://localhost:8880/webscoket', pingMsg:'{"type":"0000","data":"heart check"}'})
  createdWsRef.value = !createdWsRef.value;
  ElMessage.success('连上了？狠狠的向我发送信息吧')
}

const sendData = ()=> {
  if (createdWsRef.value) {
    ws.send(inputValRef.value)
    ws.onmessage = event => {
      getValRef.value = event.data
      console.log(event.data);
    }
  } else {
    ElMessage.error('先连啊！')
  }
}
const close = ()=> {
  if (createdWsRef.value) {
    ws.close()
    ElMessage.success('拜拜嘞')
    createdWsRef.value = !createdWsRef.value
  } else {
    ElMessage.error('嗯？没连你都想关！big胆！')
  }
}
</script>

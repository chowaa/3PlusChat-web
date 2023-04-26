<template>
  <div class="home">
    <el-input v-model="inputVal"></el-input>
    <el-button @click="sendData">111</el-button>
    {{ getVal }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputVal = ref('')
const getVal = ref('')
const ws = new WebSocket('ws://localhost:8880/webscoket')
ws.onopen = () => {
  console.log('WebSocket连接已打开');
};
ws.onmessage = (event) => {
  getVal.value = event.data
  console.log('收到WebSocket消息:', event.data);
};

const sendData = ()=> {
  ws.send(inputVal.value)
}
</script>

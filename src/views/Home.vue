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
// import { ElMessage } from 'element-plus';
let ws :WS

const inputValRef = ref('123')
const getValRef = ref('')
const createdWsRef = ref(false)

const open = ()=> {
  if (!createdWsRef.value) {
    ws = new WS({url:'ws://localhost:8880/webscoket'})
    createdWsRef.value = !createdWsRef.value;
    console.log('连上了!狠狠的向我发送信息吧');
    // ElMessage.success('连上了!狠狠的向我发送信息吧')
  } else {
    console.log('连上了还连？');
    // ElMessage.warning('连上了还连？')
  }
}

const sendData = ()=> {
  if (createdWsRef.value) {
    ws.send(inputValRef.value)
    ws.onmessage = (event:any) => {
      getValRef.value = event.data
      console.log(event.data);
    }
  } else {
    console.log('先连啊！');
    // ElMessage.error('先连啊！')
  }
}
const close = ()=> {
  if (createdWsRef.value && ws) {
    ws.close()
    console.log('拜拜嘞');
    // ElMessage.success('拜拜嘞')
    createdWsRef.value = !createdWsRef.value
  } else {
    console.log('嗯？没连你都想关！big胆！');
    // ElMessage.error('嗯？没连你都想关！big胆！')
  }
}


// type ExtendedObjectType<T, K extends string, V> = T & Record<K, V>;

// interface Person {
//   name: string;
//   age: number;
// }

// // 添加一个新属性 isStudent，值为 boolean
// type Student = ExtendedObjectType<Person, 'isStudent', boolean>;

// const student: Student = {
//   name: 'Alice',
//   age: 20,
//   isStudent: true,
// };
// console.log(student);

</script>

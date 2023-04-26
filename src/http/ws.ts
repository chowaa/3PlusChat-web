class WS{
  url:string;
  pingTimeout:number;
  pongTimeout:number;
  reconnectTimeout:number;
  pingMsg: string;
  ws:WebSocket
  // ws:WebSocket;
  constructor(url:string, pingTimeout: number, pongTimeout: number, reconnectTimeout: number, pingMsg: string ){
    this.ws = new WebSocket(url)
    this.url = url; // websocket服务端接口地址
    this.pingTimeout = pingTimeout || 30000; // 每隔 30 秒发送一次心跳，如果收到任何后端消息定时器将会重置
    this.pongTimeout = pongTimeout || 10000; // ping 消息发送之后，10 秒内没收到后端消息便会认为连接断开
    this.reconnectTimeout = reconnectTimeout || 30000; // 尝试重连的间隔时间
    this.pingMsg = pingMsg || '{"code":"0000","data":"heart check"}'; // 发送心跳消息
    // this.ws = null; // websocket 实例
 
    // 回调钩子
    // this.onclose = () => {};
    // this.onerror = () => {};
    // this.onopen = () => {};
    // this.onmessage = () => {};
    // this.onreconnect = () => {};
 
    // this.createWebSocket();
  }
  open(){
    const _ = this.ws
    if( _.readyState !== WebSocket.OPEN ){
      _.onopen = ()=> {
        _.send(JSON.stringify({
          message:'Establish connection'
        }))
      }
    }else{
      console.log('已开启');
    }
  }
  sendWs(name:string, data:string){
    const _ = this.ws
    console.log(data,'data');
    
    if( _.readyState === WebSocket.OPEN ){
      _.send(JSON.stringify({
        from: name,
        data: data,
        message: 200
      }))
    }
  }
  getData(): string{
    let data = ''
    const _ = this.ws
    _.onmessage = (e)=>{
      console.log(e.data,'data');
      data = e.data
    }
    return data
  }
  close(){
    this.ws.close()
  }
}
export default WS
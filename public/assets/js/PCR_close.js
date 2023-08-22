const net = require('net');

const HOST = '192.168.1.101';
const PORT = 8001;
const M536 = '500000FFFF03000D0010000114010019020090010010';
const M536_R = '500000FFFF03000D0010000114010019020090010010';
const a = Buffer.from(M536, 'hex');
const b = Buffer.from(M536_R, 'hex');

const client = net.connect(PORT, HOST, () => {
  client.write(a);
  client.write(b);
  console.log('Command sent!');
});

client.on('data', (data) => {
  //const received = data.();
  console.log('data received!');
  console.log('接收到的数据:', Buffer.from(data, 'hex'));

  // 在这里处理接收到的数据
  // ...
});
client.on('error', (error) => {
  console.log(error);
})

client.on('end', () => {
  client.end;
  console.log('已与服务器断开连接');
});

client.on('close', () => {
  console.log('Closing connection');
})

setTimeout(function () {
  console.log("Executed after 1 second");
  client.end();
}, 1000);


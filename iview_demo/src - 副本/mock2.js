import Mock from 'mockjs'

const Random = Mock.Random;

function getData(){
  let refreshCode = localStorage.getItem('refreshCode') || '-3'
  let datalist= {
    "user":"alex2222",
    "follow":112221,
    "fans":222,
    "hasSession":true,
    "status":refreshCode
  }
  
  return {
    data: datalist
  }
}
const data = Mock.mock('/msg2',getData)
export default {data};
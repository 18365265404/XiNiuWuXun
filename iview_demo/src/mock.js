import Mock from 'mockjs'

const Random = Mock.Random;

function getData(){
  let refreshCode = sessionStorage.getItem('refreshCode') || '-3'
  let datalist= {
    "user":"alex",
    "follow":111,
    "fans":22,
    "hasSession":true,
    "status":refreshCode
  }
  
  return {
    data: datalist
  }
}


const data = Mock.mock('/msg1',getData)
export default {data};
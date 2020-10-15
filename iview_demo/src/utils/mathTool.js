import {Message} from 'iview'
// json数组去重
export const listRemoveRepeat = (x)=>{
    let result = [];
    for (let i = 0; i < x.length; i++) {
      let flag = true;
      let temp = x[i];
      for (let j = 0; j < result.length; j++) {
        // 普通数组 (temp === result[j])
        if (temp.name === result[j].name) {
          flag = false;
          break;
        }
      }
      if (flag) {
        result.push(temp);
      }
    }
    return result;
}
// 验证手机号码
export const checkPhone = (phone)=>{
  if(phone==""){
    Message.warning('请先填写手机号码');
    return false; 
  }
  if(!(/^1[3456789]\d{9}$/.test(phone))){ 
    Message.warning('请填写正确的手机号码'); 

    return false; 
  } 
  return true
}
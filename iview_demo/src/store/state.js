import session_storage from '@/utils/session_storage'
let carNum = 0
let carList=session_storage.storageGet('shop-car') || []
carList.forEach((v,i)=> {
    carNum+=v.num
});
export default {
    userData:session_storage.storageGet('userData')||'',
    carNum:session_storage.storageGet('carNum')||0
}
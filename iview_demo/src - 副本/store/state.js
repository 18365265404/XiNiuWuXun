import local_storage from '@/utils/local_storage'
let carNum = 0
let carList=local_storage.storageGet('shop-car') || []
carList.forEach((v,i)=> {
    carNum+=v.num
});
export default {
    userData:local_storage.storageGet('userData')||'',
    carNum:carNum
}
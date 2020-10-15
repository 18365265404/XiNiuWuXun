import local_storage from '@/utils/local_storage'
export default {
    userData(state,payload){
        console.log('userData',payload)
        state.userData=payload
        console.log('state',state)
        local_storage.storageSet('userData',state.userData)
    },
    carNum(state,payload){
        state.carNum=payload
        
    }
}
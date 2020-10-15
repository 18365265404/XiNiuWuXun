import session_storage from '@/utils/session_storage'
export default {
    userData(state,payload){
        console.log('userData',payload)
        state.userData=payload
        console.log('state',state)
        session_storage.storageSet('userData',state.userData)
    },
    carNum(state,payload){
        state.carNum=payload
        
    }
}
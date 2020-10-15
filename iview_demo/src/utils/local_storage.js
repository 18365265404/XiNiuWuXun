let obj = {}
obj.storageSet = (key,val) =>{
    sessionStorage.setItem(key,JSON.stringify(val))
}
obj.storageGet = (key) =>{
  return JSON.parse(sessionStorage.getItem(key))
}
obj.storageDelet = (key) =>{
    sessionStorage.removeItem(key)
}
export default obj;
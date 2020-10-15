let obj = {}
obj.storageSet = (key,val) =>{
    localStorage.setItem(key,JSON.stringify(val))
}
obj.storageGet = (key) =>{
  return JSON.parse(localStorage.getItem(key))
}
obj.storageDelet = (key) =>{
    localStorage.removeItem(key)
}
export default obj;
<template>
    <div class="person">
        <div class="layout person-content">
            <left-menu class="person-left"></left-menu>
        
            <div class="person-right">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
        
        
        
    </div>
</template>

<script>
import session_storage from '@/utils/session_storage'
import leftMenu from './components/left-menu.vue'
export default {

    components: {
        leftMenu,
    },
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    computed:{
        userData(){
            return this.$store.state.a.userData;
        },
    },
    watch:{
        userData(val1,val2){
            if(!val1){
                this.$router.push("/home");
            }
            console.log(11111111111111,val1,val2)
        }
    },
    created(){
        let userData =session_storage.storageGet('userData')
        if(!userData){
            this.$router.push("/home");
            return
        }
    }
}
</script>
<style lang="less" scoped>
.person{
    background: #fafafa;
    .person-content{
        min-height: 750px;
        display: flex;
        .person-left{
            margin-right: 10px;
            margin-top: 10px;
            margin-bottom: 20px;
        }
        .person-right{
            padding: 20px;
            margin-top: 10px;
            flex: 1;
            background: white;
            margin-bottom: 20px;
        }
    }
}
</style>


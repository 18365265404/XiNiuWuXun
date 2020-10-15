​
<template>
    <div id="goTop">
        <div class="goTop" v-show="goTopShow" @click="goTop">
            <Icon class="goTopIcon" type="ios-arrow-up" />
            <span class="tagName">返回顶部</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "goTop",
    data() {
        return {
            scrollTop: "",
            goTopShow: false
        };
    },
    watch: {
        scrollTop(val) {
            if (this.scrollTop > 500) {
                this.goTopShow = true;
            } else {
                this.goTopShow = false;
            }
        }
    },
    methods: {
        handleScroll() {
            this.scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;  
            if (this.scrollTop > 500) {
                this.goTopShow = true;
            }
        },
        goTop() {
            let timer = null,
                _that = this;
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(function fn() {
                if (_that.scrollTop > 0) {
                    _that.scrollTop -= 50;
                    document.body.scrollTop = document.documentElement.scrollTop =
                        _that.scrollTop;
                    timer = requestAnimationFrame(fn);
                } else {
                    cancelAnimationFrame(timer);
                    _that.goTopShow = false;
                }
            });
        }
    },
    mounted() {
      // alert(1)
        window.addEventListener("scroll", this.handleScroll,true);
        
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>
 
<style scoped>
.goTop {
    position: fixed;
    right: 40px;
    bottom: 60px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #fff;
    padding: 15px;
    cursor: pointer;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
}
.goTop:hover .goTopIcon {
    color: rgba(51, 153, 255, 1);
}
.goTop:hover .tagName {
    display: block;
}
.goTopIcon {
    font-size: 20px;
    color: rgba(51, 153, 255, 0.8);
}
.tagName{
    background: white;
    display: none;
    position: absolute;
    right: 0px;
    top: 5px;
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 12px;
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 50%;
}
</style>
 
​
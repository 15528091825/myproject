<template>
    <div class="errorbox">
        <p @click="$router.go(-1)">返回上一页</p>
        <div class="main">
            <img src="../assets/imgs/404.jpg" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
.errorbox{
    padding: 20px;
    p{
        cursor: pointer;
        
        font-size: 24px;
        color: orange;
        &:hover{
            color: green
        }
    }
    .main{
        width:80%;
        height: 80%;
        margin: 20px auto;
    }
}
</style>
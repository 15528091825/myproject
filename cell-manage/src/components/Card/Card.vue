<template>
    <el-card class="box-card">
        <div slot="header"
             class="clearfix">
            <!-- 留插槽写头部 -->
            <slot name="title"></slot>

        </div>
        <div class="content">
            <!-- 留插槽写内容 -->
            <slot name="content"></slot>

        </div>
    </el-card>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
</style>
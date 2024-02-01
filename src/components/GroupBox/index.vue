<template>
    <view class="bg-white p-[30rpx]" :style="customStyle">
        <view class="relative mb-[20rpx] flex justify-between" v-if="title">
            <text class="u-skeleton-fillet font-bold text-xl">{{ title }}</text>
            <slot name="option" />
        </view>
        <slot name="content" class="content" />
    </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'GroupBox',
    props: {
        customStyle: {
            type: String,
        },
        title: {
            type: String,
            default: '',
        },
    },
})
</script>
<template>
    <div>
        <template v-for="item of keys">
            <svg-icon :key="item" :icon="item"></svg-icon>
        </template>
    </div>
</template>

<script>
const requireContext = require.context("../../icons/svg", false, /\.svg$/);
export default {
    name: "iconManager",
    data() {
        return {
            keys: requireContext.keys().map((item) => {
                let reg = /^\.\/(.*)\.svg$/;
                return item.match(reg)[1];
            }),
        };
    },
};
</script>

<style>
</style>
<template>
    <div />
</template>
<script>
export default {
    name: 'LogoutPage',
    async fetch(ctx) {
        await ctx.$auth.logout();
    },
};
</script>

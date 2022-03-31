<template>
    <div>
        Welcome User!
        <pre>
            {{ $auth.$state }}
        </pre>
    </div>
</template>
<script>
export default {
    name: 'ProtectedPage',
};
</script>

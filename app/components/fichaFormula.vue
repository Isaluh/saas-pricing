<template>
    <div class="flex flex-col gap-2 lg:gap-10 rounded-xl bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><span class=" font-bold text-slate-700">{{props.topico}}</span><code class="text-sm text-blue-800">{{props.calculo}}</code></div>
</template>

<script setup lang="ts">
    const props = defineProps({
        topico : String,
        calculo : String
    })
</script>
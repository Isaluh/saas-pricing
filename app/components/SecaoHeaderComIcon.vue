<template>
    <div class="flex flex-row gap-4 items-center">
        <span :class="`rounded-xl p-2 ${props.cor}`">
            <slot />
        </span>

        <div>
            <h2 class="font-bold text-xl">{{ props.titulo }}</h2>
            <p class="mt-1 text-sm text-slate-500">{{ props.descricao }}</p>
        </div>
    </div> 
</template>

<script setup lang="ts">
    const props = defineProps({
        titulo : String,
        descricao : String,
        cor : String
    })
</script>
<template>
    <div class="flex items-start justify-between">
        <div>
            <h2 class="font-bold text-xl">{{ props.titulo }}</h2>
            <p class="mt-1 text-sm text-slate-500">{{ props.descricao }}</p>
        </div>
        <slot />
    </div> 
</template>

<script setup lang="ts">
    const props = defineProps({
        titulo : String,
        descricao : String
    })
</script>
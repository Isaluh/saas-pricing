<template>
    <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p class="text-sm font-semibold text-slate-500">{{ props.categoria }}</p>
        <p class="mt-2 text-2xl font-extrabold tracking-tight" :class="{ 'text-[#192033]': props.isPositive, 'text-rose-600': !props.isPositive }">{{ props.valor }}</p>
        <p class="mt-1 text-sm font-semibold" :class="{ 'text-emerald-600': props.isPositive, 'text-rose-600': !props.isPositive }">
            {{ props.isPositive ? '↑' : '!' }} {{ props.descricaoStatus }}
        </p>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        categoria : String,
        valor : String,
        isPositive : Boolean,
        descricaoStatus : String
    })
</script>
<template>
    <label class="font-semibold text-slate-600 flex flex-col gap-0.5">{{ props.label }}
        <div class="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 focus-within:border-green-800 focus-within:ring-2 focus-within:ring-indigo-100">
            <input :type="props.inputType" class="w-full bg-transparent py-2 font-bold outline-none" v-model="model">
            <span class="text-xs text-slate-400">{{ props.spanText }}</span>
        </div>
    </label>
</template>

<script setup lang="ts">
    const model = defineModel()

    const props = defineProps({
        label : String,
        inputType : String,
        spanText : String
    })
</script>
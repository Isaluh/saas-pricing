<template>
    <label class="rounded-2xl bg-white border p-5 shadow-sm flex flex-col gap-5 cursor-pointer" :class="{'border-green-800 ring-2 ring-green-700' : model == props.inputValue, 'border-slate-200 ring-0' : model != props.inputValue}">
        <input type="radio" :name="props.inputName" :value="props.inputValue" v-model="model" hidden>
        <h3 class="text-2xl font-bold">{{ props.nomePlano }}</h3>
    
        <div class="flex flex-row gap-2 items-end">
            <p class="text-sm text-slate-400">Preço mensal</p>
            <p class="text-2xl font-bold text-green-800 flex flex-row items-center gap-1"><span class="text-sm">R$</span> {{ props.precoPlano }}</p>
        </div>
    </label>
</template>

<script setup lang="ts">
    const model = defineModel()

    const props = defineProps({
        inputName : String,
        inputValue : String,
        nomePlano : String,
        precoPlano : Number,
    }) 
</script>
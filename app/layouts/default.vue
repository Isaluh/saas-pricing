<template>
    <main class="min-h-screen bg-[#f7f8fc] text-[#192033]">
        <header class="border-b border-slate-200/80 bg-white/80 backdrop-blur">
            <div class="mx-auto flex max-w-376 items-center justify-between px-5 py-4 lg:px-8">
                <div class="flex flex-row items-center gap-2">
                    <span class="bg-green-800 rounded-2xl w-10 h-10 lg:w-14 lg:h-14 p-2">
                        <img src="/images/icon.png" alt="">
                    </span>
                    <h1 class="font-extrabold tracking-tight hidden lg:block">BambooPrice</h1>
                </div>
                <nav class="hidden lg:flex flex-row gap-6 font-medium text-slate-500">
                    <NuxtLink to="/" exact-active-class="text-green-800 font-bold" class="hover:text-green-800"><h2>Simulador</h2></NuxtLink>
                    <NuxtLink to="/funcionamento" exact-active-class="text-green-800 font-bold" class="hover:text-green-800"><h2>Como funciona</h2></NuxtLink>
                    <NuxtLink to="/sobre" exact-active-class="text-green-800 font-bold" class="hover:text-green-800"><h2>Sobre o projeto</h2></NuxtLink>
                </nav>
                <nav class="font-bold relative lg:hidden">
                    <span @click="abrirMenu = !abrirMenu" class="flex flex-row gap-2 items-center cursor-pointer text-green-800">
                        <h2>{{abaSelecionada}}</h2>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="currentColor"></path> </g></svg>
                    </span>

                    <div class="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-100 w-40 p-2 rounded-md border border-slate-200 font-medium shadow-md flex flex-col gap-2" v-if="abrirMenu">
                        <NuxtLink to="/" exact-active-class="text-green-800 font-bold" class="hover:text-green-800 border-b pb-2 border-slate-500" @click="abaSelecionada = 'Simulador'; abrirMenu = false;"><h2>Simulador</h2></NuxtLink>
                        <NuxtLink to="/funcionamento" exact-active-class="text-green-800 font-bold" class="hover:text-green-800 border-b pb-2 border-slate-500" @click="abaSelecionada = 'Como funciona'; abrirMenu = false;"><h2>Como funciona</h2></NuxtLink>
                        <NuxtLink to="/sobre" exact-active-class="text-green-800 font-bold" class="hover:text-green-800" @click="abaSelecionada = 'Sobre o projeto'; abrirMenu = false;"><h2>Sobre o projeto</h2></NuxtLink>
                    </div>
                </nav>
                <button @click="resetar = true" class="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm hover:border-green-800 hover:text-green-800 flex flex-row items-center gap-2">
                    <span>
                    <svg widths="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7071 1.29289C14.0976 1.68342 14.0976 2.31658 13.7071 2.70711L12.4053 4.00896C17.1877 4.22089 21 8.16524 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 12.4477 3.44772 12 4 12C4.55228 12 5 12.4477 5 13C5 16.866 8.13401 20 12 20C15.866 20 19 16.866 19 13C19 9.2774 16.0942 6.23349 12.427 6.01281L13.7071 7.29289C14.0976 7.68342 14.0976 8.31658 13.7071 8.70711C13.3166 9.09763 12.6834 9.09763 12.2929 8.70711L9.29289 5.70711C9.10536 5.51957 9 5.26522 9 5C9 4.73478 9.10536 4.48043 9.29289 4.29289L12.2929 1.29289C12.6834 0.902369 13.3166 0.902369 13.7071 1.29289Z" fill="currentColor"></path> </g></svg>
                    </span> 
                    Resetar
                </button>
            </div>
        </header>

        <section class="mx-auto max-w-376 px-5 py-8 lg:px-8 lg:py-12">
            <slot />
        </section>
    </main>
</template>

<script setup lang="ts">
    const resetar = useState('resetar', () => false)
    const abrirMenu = ref(false)
    const abaSelecionada = ref('Simulador')
</script>
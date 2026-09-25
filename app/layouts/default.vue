<template>
    <main class="min-h-screen bg-[#f7f8fc] text-[#192033]">
        <header class="border-b border-slate-200/80 bg-white/80 backdrop-blur flex flex-row justify-between items-center p-2">
            <div class="flex flex-row items-center gap-2">
                <span class="bg-green-200 rounded-xl w-12 h-12 p-0.5">
                    <img src="/images/icon.png" alt="">
                </span>
                <h1>BambooPrice</h1>
            </div>
            <div class="flex flex-row gap-4">
                <h2>Simulador</h2>
                <h2>Como funciona</h2>
                <h2>Sobre o projeto</h2>
            </div>
            <button><img src="" alt=""> Resetar</button>
        </header>

        <section>
            <slot />
        </section>
    </main>
</template>
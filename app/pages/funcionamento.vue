<template>
    <div class="flex flex-col gap-4 lg:gap-10">
        <div class="flex flex-col gap-3">
            <h1 class="max-w-xl text-3xl font-extrabold tracking-tight md:text-4xl">Como funciona o simulador?</h1>
            <p class="max-w-2xl text-slate-500">O BambooPrice transforma dados básicos do seu SaaS em uma comparação visual entre preços e volume de clientes.</p>
        </div>

        <div class="flex flex-col lg:grid grid-cols-2 gap-4 lg:gap-10">
            <Secao>
                <SecaoHeaderComIcon titulo="Passo a passo" descricao="Da entrada à decisão" cor="bg-green-800/30 text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                </SecaoHeaderComIcon>
                <p class="text-slate-500">
                    <strong class="text-black">1. Crie até 3 cenários:</strong> escolha nome e preço para planos mensais diferentes.<br><br>
                    <strong class="text-black">2. Informe os custos:</strong> custo fixo mensal, custo variável por cliente, volume de clientes e tributos.<br><br>
                    <strong class="text-black">3. Compare os resultados:</strong> veja qual opção gera mais resultado, margem e segurança.<br><br>
                    <strong class="text-black">4. Interprete:</strong> use o gráfico e o ponto de equilíbrio para justificar sua escolha.
                </p>
            </Secao>

            <Secao>
                <SecaoHeaderComIcon titulo="Fórmulas utilizadas" descricao="Memória de cálculo verificável" cor="bg-blue-800/30 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sigma" aria-hidden="true"><path d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"></path></svg>
                </SecaoHeaderComIcon>

                <FichaFormula topico="Receita" calculo="preço × quantidade de clientes" />
                <FichaFormula topico="Tributos" calculo="receita × taxa de tributos" />
                <FichaFormula topico="Resultado" calculo="receita − custo fixo − custo variável × quantidade de clientes − tributos" />
                <FichaFormula topico="Contribuição unitária" calculo="preço × (1 − taxa) − custo variável" />
                <FichaFormula topico="Ponto de equilíbrio" calculo="teto(custo fixo ÷ contribuição unitária)" />
                
                <div class="rounded-xl bg-amber-50 p-4 text-sm leading-5 text-amber-800 flex flex-row gap-2">
                    <svg width="80" height="24" class="lg:w-7.5 lg:h-7.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#1C274C"></circle> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                    <p>A margem só é calculada quando a receita é positiva. Se a contribuição for zero ou negativa e houver custo fixo, não existe equilíbrio pelo aumento do volume.</p>
                </div>
            </Secao>
        </div>
    </div>
</template>
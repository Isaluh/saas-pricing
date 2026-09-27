<template>
    <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-3">
            <h1 class="max-w-xl text-3xl font-extrabold tracking-tight md:text-4xl">Uma decisão econômica mais clara.</h1>
            <p class="max-w-2xl text-slate-500">O BambooPrice é um protótipo desenvolvido para aplicar conceitos de Engenharia Econômica em uma situação comum de produtos digitais: definir o preço de um SaaS.</p>
        </div>

        <div class="grid grid-cols-3 gap-10">
            <Secao>
                <SecaoHeaderComIcon cor="bg-blue-800/30 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>
                </SecaoHeaderComIcon>
                <div class="flex flex-col gap-2">
                    <h2 class="font-bold text-xl">Contexto</h2>
                    <p class="text-slate-500">
                        Ferramenta criada para apoiar a decisão de precificação de um SaaS com base em custos, volume e margem.
                    </p>
                </div>
            </Secao>

            <Secao>
                <SecaoHeaderComIcon cor="bg-blue-800/30 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                </SecaoHeaderComIcon>
                <div class="flex flex-col gap-2">
                    <h2 class="font-bold text-xl">Objetivo</h2>
                    <p class="text-slate-500">
                        Comparar cenários de preço e entender qual combinação sustenta a operação antes de lançar ou ajustar o plano.
                    </p>
                </div>
            </Secao>

            <Secao>
                <SecaoHeaderComIcon cor="bg-blue-800/30 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
                </SecaoHeaderComIcon>
                <div class="flex flex-col gap-2">
                    <h2 class="font-bold text-xl">Decisão apoiada</h2>
                    <p class="text-slate-500">
                        Identificar quando o volume esperado cobre os custos e qual cenário oferece maior segurança financeira.
                    </p>
                </div>
            </Secao>
        </div>

        <div>
            <Secao>
                <SecaoHeaderDefault titulo="O que este modelo considera?"  />
                <div class="flex flex-col gap-2">
                    <p class="text-slate-500">
                        O cálculo considera a receita do plano, os custos fixos, os custos variáveis por cliente, o volume de clientes e os tributos aplicados sobre a receita para mostrar o resultado operacional do cenário.
                    </p>
                    <p class="text-slate-500">
                        A proposta é apoiar a análise de premissas, comparar possibilidades e entender melhor o impacto de cada decisão de precificação antes de uma escolha final.
                    </p>
                </div>

                <div class="rounded-xl bg-indigo-50 p-4 text-sm text-blue-800"><b>Benefício percebido:</b> a ferramenta ajuda a traduzir a proposta de valor do serviço em uma visão mais clara de sustentabilidade e escala.</div>
            </Secao>
        </div>
    </div>
</template>
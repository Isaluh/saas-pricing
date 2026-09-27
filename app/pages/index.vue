<template>
    <!-- Cabeçalho da página com apresentação do objetivo da ferramenta -->
    <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-3">
            <h1 class="max-w-xl text-3xl font-extrabold tracking-tight md:text-4xl">Descubra o preço que <span class="text-green-800">faz sentido</span> para o seu SaaS.</h1>
            <p class="max-w-2xl text-slate-500">Compare cenários, entenda seu ponto de equilíbrio e tome decisões com mais segurança.</p>
        </div>

        <!-- Grid principal: lado esquerdo para inputs e lado direito para resultados -->
        <div class="grid grid-cols-2 gap-10 gridGeral">
            <!-- Coluna de entrada de dados -->
            <aside class="flex flex-col gap-10 w-full">
                <Secao >
                    <SecaoHeaderDefault titulo="Dados do cenário" descricao="Preencha os dados do plano" />

                    <form @submit.prevent="adicionarCenario" class="flex flex-col gap-4">
                        <InputLabel label="Nome plano" inputType="text" v-model="novoCenario.nome" />
                        <InputLabel label="Preço mensal" inputType="number" spanText="R$" v-model="novoCenario.preco" />

                        <button class="bg-green-800 text-white py-2.5 cursor-pointer font-bold rounded-md hover:bg-green-900 disabled:bg-green-800/50 disabled:cursor-not-allowed" :disabled="cenarios.length >= 3">Adicionar</button>
                    </form>
                </Secao>

                <Secao >
                    <SecaoHeaderDefault titulo="Dados do negócio" descricao="Preencha os dados da sua operação" />

                    <div class="flex flex-col gap-4">
                        <InputLabel label="Custo fixo mensal" inputType="number" spanText="R$" v-model="dados.custoFixo" />
                        <InputLabel label="Custo variável / cliente" inputType="number" spanText="R$" v-model="dados.custoVariavel" />
                        <InputLabel label="Clientes previstos" inputType="number" v-model="dados.clientesPrevistos" />
                        <InputLabel label="Tributos sobre receita" inputType="number" spanText="%" v-model="dados.tributos" />

                        <div class="rounded-xl bg-green-100/50 p-3 text-sm leading-5 text-green-800 flex flex-row gap-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#1C274C"></circle> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                            O resultado representa o saldo operacional do modelo didático.
                        </div>
                    </div>
                </Secao>
            </aside>

            <!-- Coluna de resultado e análise do cenário -->
            <div class="flex flex-col gap-10 w-full">
                <!-- Estado vazio: mostra imagem quando ainda não há cenário criado -->
                <div v-if="cenarios.length == 0" class="flex items-center justify-center h-full">
                    <img src="/images/esperandoCalcular.png" alt="" width="50%" height="50%" />
                </div>

                <!-- Lista de cenários disponíveis para seleção -->
                <section v-if="cenarios.length > 0" class="grid grid-cols-3 gap-4 grid-flow-row items-start">
                    <CenarioRadio v-for="cenario in cenarios" inputName="cenarios" :inputValue="String(cenario.id)" :precoPlano="Number(cenario.preco)" :nomePlano="cenario.nome" v-model="cenarioSelecionado" />
                </section>

                <!-- Resultados do cenário selecionado -->
                <section v-if="cenarios.length > 0" class="flex flex-col gap-10">

                    <div class="grid grid-cols-4 gap-4 grid-flow-row items-center">
                        <Cards v-for="card in cardsValores" :key="card.id" :categoria="card.categoria" :valor="card.valor" :isPositive="card.isPositive" :descricaoStatus="card.descricaoStatus" />
                    </div>

                    <Secao >
                        <SecaoHeaderDefault titulo="Resultado por volume de clientes" descricao="Veja como o resultado evolui em cada cenário">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400" aria-hidden="true"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>
                        </SecaoHeaderDefault>

                        <div class="flex flex-col gap-4">
                            <Bar
                                :data="chartData"
                                :options="chartOptions"
                                />
                        </div>
                    </Secao>

                    <Secao >
                        <SecaoHeaderDefault titulo="Leitura do cenário" descricao="Uma interpretação para apoiar sua decisão">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up text-emerald-500" aria-hidden="true"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>
                        </SecaoHeaderDefault>

                        <div class="flex flex-col gap-4">
                            <div class="flex flex-col gap-4 text-slate-600" v-html="leituraCenario?.textoEquilibrio"></div>

                            <div class="rounded-xl bg-green-100/50 p-3 text-sm leading-5 text-green-800 flex flex-row gap-2">
                                <span class="font-bold">Benefício percebido:</span> Economize tempo e dê previsibilidade para sua operação.
                            </div>

                            <span class=" bg-slate-100 w-full h-px mt-3"></span>

                            <button @click="verMemoria = !verMemoria" class="text-green-800 p-2 cursor-pointer font-bold flex flex-row justify-between items-center group">
                                Ver memória de cálculo
                                <span class="group-hover:bg-green-800 group-hover:text-white rounded-lg p-1 transform transition duration-300 ease-in-out">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right transition" :class="{'rotate-90' : verMemoria}" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                </span>
                            </button>

                            <div v-if="verMemoria" class="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
                                <p>Receita = preço × clientes · Tributos = receita × taxa · Resultado = receita − custos − tributos.</p>
                            </div>
                        </div>
                    </Secao>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Cenario, Dados } from '~/models/models';
    import { computed, ref, watch } from 'vue'
    import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
    import type { ChartOptions } from 'chart.js'
    import { Bar } from 'vue-chartjs'

    // Estado global para resetar a página quando necessário
    const resetar = useState('resetar', () => false)

    // Lista de cenários de preço cadastrados
    const cenarios = ref<Cenario[]>([])

    // Identifica qual cenário está selecionado para análise
    const cenarioSelecionado = ref('0')

    // Formulário de criação de um novo cenário (nome + preço)
    const novoCenario = ref<Cenario>({
        id: 0,
        nome: '',
        preco: null,
    })

    // Dados da operação do negócio usados no cálculo financeiro
    const dados = ref<Dados>({
        custoFixo: '',
        custoVariavel: '',
        clientesPrevistos: null,
        tributos: ''
    })

    // Controla exibição da seção de memória de cálculo
    const verMemoria = ref(false)

    // Limpa todos os dados do simulador e volta ao estado inicial
    const resetarCenarios = () => {
        cenarios.value = []
        cenarioSelecionado.value = '0'
        novoCenario.value = {
            id: 0,
            nome: '',
            preco: null,
        }
        dados.value = {
            custoFixo: '',
            custoVariavel: '',
            clientesPrevistos: null,
            tributos: ''
        }
        verMemoria.value = false
    }

    // Adiciona um cenário ao array quando o usuário envia o formulário
    function adicionarCenario() {
        if (!novoCenario.value.nome || novoCenario.value.preco === null) {
            alert('Preencha o nome e o preço do plano antes de adicionar um cenário.')
            return
        }

        const cenario: Cenario = {
            ...novoCenario.value,
            id: cenarios.value.length
        }

        cenarios.value.push(cenario)

        // Limpa o formulário após salvar
        novoCenario.value = {
            id: 0,
            nome: '',
            preco: null
        }
    }

    // Monta os cards de resultado com base no cálculo do cenário atual
    const cardsValores = computed(() => {
        if (!calculo.value) {
            return []
        }

        const resultado = calculo.value.resultado
        const margem = calculo.value.margem
        const equilibrio = calculo.value.clientesEquilibrio
        const contribuicao = calculo.value.contribuicaoUnitária

        return [
            {
                id: 'resultado-mensal',
                categoria: 'Resultado mensal',
                valor: `${resultado >= 0 ? 'R$ ' : 'R$ -'}${formatarMoeda(Math.abs(resultado))}`,
                isPositive: resultado >= 0,
                descricaoStatus:
                    resultado >= 0
                        ? 'Saldo positivo'
                        : 'Saldo negativo'
            },

            {
                id: 'margem',
                categoria: 'Margem',
                valor:
                    margem === null
                        ? '-'
                        : `${formatarNumero(margem)}%`,
                isPositive: margem !== null && margem >= 0,
                descricaoStatus: 'Sobre a receita'
            },

            {
                id: 'ponto-equilibrio',
                categoria: 'Ponto de equilíbrio',
                valor:
                    equilibrio === null
                        ? 'Sem equilíbrio'
                        : `${equilibrio} clientes`,
                isPositive:
                    equilibrio !== null && Number(dados.value.clientesPrevistos) >= equilibrio,
                descricaoStatus:
                    equilibrio === null
                        ? 'Clientes necessários'
                        : Number(dados.value.clientesPrevistos) >= equilibrio
                            ? 'Meta atingida'
                            : 'Clientes necessários'
            },

            {
                id: 'contribuicao-cliente',
                categoria: 'Contribuição / cliente',
                valor: contribuicao === null
                    ? '-'
                    : `${contribuicao >= 0 ? 'R$' : 'R$ -'}${formatarMoeda(Math.abs(contribuicao))}`,
                isPositive: contribuicao !== null && contribuicao >= 0,
                descricaoStatus: 'Após tributos e variável'
            }
        ]
    })

    // Converte valores numéricos para moeda no padrão brasileiro
    function formatarMoeda(valor: number) {
        return new Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            maximumFractionDigits: 2
        }).format(valor)
    }

    // Converte valores numéricos para exibição em porcentagem ou número simples
    function formatarNumero(valor: number) {
        return new Intl.NumberFormat('pt-BR', {
            maximumFractionDigits: 2
        }).format(valor)
    }

    // Retorna o cenário atualmente selecionado pelo usuário
    const cenarioAtual = computed(() => {
        return cenarios.value.find(
            cenario => String(cenario.id) === cenarioSelecionado.value
        ) ?? null
    })

    // Calcula os indicadores financeiros do cenário ativo
    const calculo = computed(() => {
        if (!cenarioAtual.value) {
            return null
        }

        const preco = Number(cenarioAtual.value.preco) || 0
        return calcularCenario(preco, dados.value)
    })

    // Faz o cálculo do resultado, margem e ponto de equilíbrio do negócio
    function calcularCenario(preco: number, dados: Dados) {
        const custoFixo = Number(dados.custoFixo)
        const custoVariavel = Number(dados.custoVariavel)
        const clientes = Number(dados.clientesPrevistos)
        const taxa = Number(dados.tributos) / 100

        // Valida se todos os dados mínimos foram preenchidos antes de calcular
        const dadosPreenchidos =
            preco > 0 &&
            dados.custoFixo !== '' &&
            dados.custoVariavel !== '' &&
            dados.clientesPrevistos !== null &&
            dados.clientesPrevistos !== undefined &&
            dados.tributos !== ''

        if (!dadosPreenchidos) {
            return {
                receita: 0,
                tributos: 0,
                custoVariavelTotal: 0,
                resultado: 0,
                contribuicaoUnitária: null,
                margem: null,
                clientesEquilibrio: null,
            }
        }

        // Cálculo da receita, tributos e custo variável total
        const receita = preco * clientes
        const tributos = receita * taxa
        const custoVariavelTotal = custoVariavel * clientes

        // Resultado operacional do cenário
        const resultado =
            receita -
            custoFixo -
            custoVariavelTotal -
            tributos

        // Quantidade que cada cliente ainda contribui após tributos e custo variável
        const contribuicaoUnitária =
            preco * (1 - taxa) - custoVariavel

        // Percentual de lucro ou prejuízo sobre a receita
        const margem =
            receita > 0
                ? (100 * resultado) / receita
                : null

        // Quantidade mínima de clientes para cobrir custos fixos
        let clientesEquilibrio: number | null = null

        if (custoFixo === 0) {
            clientesEquilibrio = 0
        } else if (contribuicaoUnitária > 0) {
            clientesEquilibrio = Math.ceil(
                custoFixo / contribuicaoUnitária
            )
        }

        return {
            receita,
            tributos,
            custoVariavelTotal,
            resultado,
            contribuicaoUnitária,
            margem,
            clientesEquilibrio,
        }
    }

    // Registra os módulos do Chart.js usados no gráfico
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip,
        Legend
    )

    // Monta os dados do gráfico de barras para o cenário atual
    const chartData = computed(() => {
        if (!cenarioAtual.value) {
            return {
                labels: [],
                datasets: []
            }
        }

        const preco =
            Number(cenarioAtual.value.preco) || 0

        const taxa =
            (Number(dados.value.tributos) || 0) / 100

        const custoFixo =
            Number(dados.value.custoFixo) || 0

        const custoVariavel =
            Number(dados.value.custoVariavel) || 0

        const resultados = volumesClientes.value.map(clientes => {
            const receita = preco * clientes

            const tributos = receita * taxa

            return (
                receita -
                custoFixo -
                custoVariavel * clientes -
                tributos
            )
        })

        return {
            labels: volumesClientes.value.map(String),

            datasets: [
                {
                    label: cenarioAtual.value.nome,

                    data: resultados,

                    backgroundColor: '#166534',
                    hoverBackgroundColor: '#14532d',

                    borderColor: '#166534',
                    hoverBorderColor: '#14532d',

                    borderWidth: 0,
                    borderRadius: 5,

                    barPercentage: 0.75,
                    categoryPercentage: 0.8,
                }
            ]
        }
    })

    // Define a aparência do gráfico e as configurações do tooltip/escala
    const chartOptions = computed<ChartOptions<'bar'>>(() => ({
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: true,
                position: 'bottom',

                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',

                    color: '#64748b',

                    font: {
                        size: 12,
                    },

                    padding: 20,
                },
            },

            tooltip: {
                enabled: true,

                callbacks: {
                    label: (context: any) => {
                        return formatarMoeda(context.raw)
                    }
                }
            }
        },

        scales: {
            x: {
                grid: {
                    display: false,
                },

                border: {
                    display: false,
                },

                ticks: {
                    color: '#94a3b8',

                    font: {
                        size: 10,
                    },
                },
            },

            y: {
                beginAtZero: true,

                ticks: {
                    color: '#94a3b8',

                    font: {
                        size: 10,
                    },

                    callback: (value: string | number) => {
                        return formatarMoeda(Number(value))
                    },
                },

                grid: {
                    color: '#e5e7eb',
                    borderDash: [3, 3],
                },

                border: {
                    display: false,
                },
            },
        },
    }))

    // Gera uma sequência de volumes de clientes para mostrar a evolução do resultado
    const volumesClientes = computed(() => {
        const clientesPrevistos =
            Number(dados.value.clientesPrevistos) || 100

        const maxClientes = Math.max(
            clientesPrevistos * 2,
            100
        )

        const quantidadePontos = 9

        const passo = Math.ceil(
            maxClientes / quantidadePontos
        )

        return Array.from(
            { length: quantidadePontos },
            (_, index) => (index + 1) * passo
        )
    })

    // Cria uma mensagem textual interpretando se o cenário está acima, abaixo ou no ponto de equilíbrio
    const leituraCenario = computed(() => {
        if (!cenarioAtual.value || !calculo.value) {
            return null
        }

        const clientes =
            Number(dados.value.clientesPrevistos) || 0

        const resultado =
            calculo.value.resultado

        const equilibrio =
            calculo.value.clientesEquilibrio

        let textoEquilibrio = ''

        if (equilibrio === null) {
            textoEquilibrio = `<p>Com <strong>${clientes} cliente${clientes != 1 ? 's' : ''}</strong>, o plano <strong>${cenarioAtual.value.nome}</strong> gera <span class="font-bold text-emerald-500">R$ ${formatarMoeda(resultado)}</span> de resultado mensal.</p> <p>A contribuição por cliente não cobre o custo fixo. Aumentar o volume, sozinho, não gera equilíbrio neste modelo.</p>`
        } else if (clientes >= equilibrio) {
            textoEquilibrio =
                textoEquilibrio = `<p>Com <strong>${clientes} cliente${clientes != 1 ? 's' : ''}</strong>, o plano <strong>${cenarioAtual.value.nome}</strong> gera <span class="font-bold text-emerald-500">R$ ${formatarMoeda(resultado)}</span> de resultado mensal.</p> <p>O negócio atinge o equilíbrio a partir de <strong>${equilibrio} cliente${equilibrio != null && equilibrio > 1 ? 's' : ''}</strong>. A previsão atual está acima desse ponto.</p>`
        } else {
            textoEquilibrio = `<p>Com <strong>${clientes} cliente${clientes != 1 ? 's' : ''}</strong>, o plano <strong>${cenarioAtual.value.nome}</strong> gera <span class="font-bold text-rose-600">R$ ${formatarMoeda(resultado)}</span> de resultado mensal.</p> <p>O negócio atinge o equilíbrio a partir de <strong>${equilibrio} cliente${equilibrio != null && equilibrio > 1 ? 's' : ''}</strong>. A previsão atual ainda está abaixo dessa meta.</p>`
        }

        return {
            clientes,
            resultado,
            equilibrio,
            textoEquilibrio
        }
    })

    // Observa a flag de reset e limpa os dados quando ela for ativada
    watch(resetar, (valor) => {
        if (valor) {
            resetarCenarios()
            resetar.value = false
        }
    })

</script>

<style scoped>
    .gridGeral{
        grid-template-columns: 1fr 2fr;
    }
</style>
import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

// Substitui o gráfico real por um elemento simples.
vi.mock('vue-chartjs', () => ({
  Bar: {
    template: '<div data-testid="chart" />'
  }
}))

import Index from '../app/pages/index.vue'

// Fornece versões mínimas dos componentes, somente a interface necessária para o teste.
const stubs = {
  Secao: {
    template: '<div><slot /></div>'
  },
  SecaoHeaderDefault: true,
  InputLabel: {
    props: ['modelValue', 'label'],
    emits: ['update:modelValue'],
    template: `
      <input
        :aria-label="label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    `
  },
  CenarioRadio: {
    props: ['modelValue', 'inputValue', 'nomePlano'],
    emits: ['update:modelValue'],
    template: `
      <label>
        <input
          type="radio"
          :value="inputValue"
          :checked="modelValue === inputValue"
          @change="$emit('update:modelValue', inputValue)"
        />
        {{ nomePlano }}
      </label>
    `
  },
  Cards: {
    props: ['categoria', 'valor'],
    template: '<div class="card">{{ categoria }}: {{ valor }}</div>'
  }
}

// Monta uma nova instância da página inicial para cada teste.
function montarPagina() {
  return mount(Index, { global: { stubs } })
}

// Preenche e envia o formulário responsável por cadastrar um cenário.
async function adicionarCenario(wrapper: ReturnType<typeof montarPagina>, nome: string, preco: string) {
  await wrapper.get('input[aria-label="Nome plano"]').setValue(nome)
  await wrapper.get('input[aria-label="Preço mensal"]').setValue(preco)
  await wrapper.get('form').trigger('submit')
}

// Preenche os quatro valores usados pelo cálculo financeiro.
async function preencherDadosNegocio(wrapper: ReturnType<typeof montarPagina>) {
  await wrapper.get('input[aria-label="Custo fixo mensal"]').setValue('1000')
  await wrapper.get('input[aria-label="Custo variável / cliente"]').setValue('10')
  await wrapper.get('input[aria-label="Clientes previstos"]').setValue('20')
  await wrapper.get('input[aria-label="Tributos sobre receita"]').setValue('10')
}

// Prepara as APIs globais que o componente recebe automaticamente do Nuxt.
beforeEach(() => {
  vi.stubGlobal('useState', (_key: string, initialValue: () => boolean) => ref(initialValue()))
  vi.stubGlobal('alert', vi.fn())
})

describe('Página inicial', () => {
  it('adiciona um cenário pelo formulário', async () => {
    // Confirma o fluxo básico: dados mínimos são enviados e o nome cadastrado
    // passa a aparecer na lista de cenários disponíveis.
    const wrapper = montarPagina()

    await adicionarCenario(wrapper, 'Plano Básico', '99')

    expect(wrapper.text()).toContain('Plano Básico')
  })

  it('insere os dados do negócio e exibe o resultado calculado', async () => {
    // Verifica o cálculo usando um único cenário e uma operação preenchida.
    const wrapper = montarPagina()

    await adicionarCenario(wrapper, 'Plano Básico', '100')
    await preencherDadosNegocio(wrapper)

    expect(wrapper.text()).toContain('Resultado mensal: R$ 600')
    expect(wrapper.text()).toContain('Margem: 30%')
  })

  it('muda o cálculo ao selecionar o segundo cenário sem alterar os dados', async () => {
    // Cria dois preços para a mesma operação. O primeiro cenário serve como
    // valor inicial e confirma o resultado de R$ 600 antes da troca.
    const wrapper = montarPagina()

    await adicionarCenario(wrapper, 'Plano Básico', '100')
    await adicionarCenario(wrapper, 'Plano Pro', '200')
    await preencherDadosNegocio(wrapper)

    expect(wrapper.text()).toContain('Resultado mensal: R$ 600')

    // Seleciona o rádio de id 1, que corresponde ao Plano Pro. Nenhum campo
    // dos dados do negócio é alterado nesta etapa; somente o preço do cenário
    // ativo muda de R$ 100 para R$ 200.
    await wrapper.get('input[type="radio"][value="1"]').setValue(true)

    // Com os mesmos 20 clientes, a receita passa a R$ 4.000. O resultado é
    // 4.000 - 1.000 - 200 - 400 = R$ 2.400, comprovando que a seleção foi
    // aplicada ao cálculo sem alterar os demais dados.
    expect(wrapper.text()).toContain('Resultado mensal: R$ 2.400')
  })
})
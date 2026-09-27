import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Index from '../app/pages/index.vue'

describe('Página inicial', () => {
  it('adiciona um cenário pelo formulário', async () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
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
          CenarioRadio: true,
          Cards: true,
          Bar: true
        }
      }
    })

    // Preenche o nome
    await wrapper
      .get('input[aria-label="Nome plano"]')
      .setValue('Plano Básico')

    // Preenche o preço
    await wrapper
      .get('input[aria-label="Preço mensal"]')
      .setValue('99')

    // Envia o formulário
    await wrapper.get('form').trigger('submit')

    // Verifica se o cenário apareceu na interface
    expect(wrapper.text()).toContain('Plano Básico')
  })
})
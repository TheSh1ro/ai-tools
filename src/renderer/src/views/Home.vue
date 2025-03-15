<script setup lang="ts">
import { reactive } from 'vue'
import { PromptClass } from '@/types'

export class PromptClass {
  id: number
  title: string
  description: {
    general: string
    subject: string
    hair: string
    eyes: string
    face: string
    expression: string
    clothes: string
    pose: string
  }

  constructor(id: number) {
    this.id = id
    this.title = ''
    this.description = {
      general: '',
      subject: '',
      hair: '',
      eyes: '',
      face: '',
      expression: '',
      clothes: '',
      pose: ''
    }
  }
}

// Especificando o tipo do array
const prompts = reactive<PromptClass[]>([])

function addCard() {
  const id = prompts.length + 1
  prompts.push(new PromptClass(id))
}
</script>

<template>
  <main id="cards">
    <Card v-for="prompt in prompts" :key="prompt.title" :prompt="prompt" />
    <button @click="addCard">Adicionar cartão</button>
  </main>
</template>
<style scoped></style>

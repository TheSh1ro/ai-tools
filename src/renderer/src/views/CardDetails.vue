<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { PromptClass } from '@/types'
import { useRoute, useRouter } from 'vue-router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdArrowback, MdContentcopy } from 'oh-vue-icons/icons'

addIcons(MdArrowback, MdContentcopy)

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const prompt = ref<PromptClass | null>(null)
const newTags = ref<Record<string, string>>({})

onMounted(() => {
  // In a real application, you would fetch the data from a store or API
  // This is a mock implementation for demonstration
  prompt.value = new PromptClass(id, 'Título do Card')
})

const categories = computed(() => {
  if (!prompt.value) return []

  return Object.entries(prompt.value.description).map(([key, value]) => ({
    key,
    ...value
  }))
})

const promptText = computed(() => {
  if (!prompt.value) return ''

  let result = ''

  Object.values(prompt.value.description).forEach((category) => {
    result += category.tags.join(', ') + ', '
  })

  // Remove the last comma and space
  return result.slice(0, -2)
})

function addTag(category: string) {
  if (!prompt.value || !newTags.value[category] || newTags.value[category].trim() === '') return

  const tag = newTags.value[category].trim()
  prompt.value.description[category as keyof typeof prompt.value.description].tags.push(tag)
  newTags.value[category] = ''
}

function removeTag(category: string, tagIndex: number) {
  if (!prompt.value) return

  prompt.value.description[category as keyof typeof prompt.value.description].tags.splice(
    tagIndex,
    1
  )
}

function copyToClipboard() {
  if (!promptText.value) return

  navigator.clipboard
    .writeText(promptText.value)
    .then(() => {
      alert('Prompt copiado para a área de transferência!')
    })
    .catch(() => {
      alert('Falha ao copiar. Por favor, tente novamente.')
    })
}

function goBack() {
  router.push({ name: 'home' })
}

function handleKeyDown(event: KeyboardEvent, category: string) {
  if (event.key === 'Enter') {
    event.preventDefault()
    addTag(category)
  }
}
</script>

<template>
  <main id="card-details" v-if="prompt">
    <div class="header">
      <button class="back-button" @click="goBack">
        <OhVueIcon name="md-arrowback" />
        <span>Voltar</span>
      </button>
      <h1>{{ prompt.title }}</h1>
      <button class="copy-button" @click="copyToClipboard">
        <OhVueIcon name="md-contentcopy" />
        <span>Copiar Prompt</span>
      </button>
    </div>

    <div class="categories">
      <div v-for="category in categories" :key="category.key" class="category-container">
        <h2>{{ category.label }}</h2>
        <div class="tag-input">
          <input
            type="text"
            :placeholder="`Adicionar ${category.label.toLowerCase()}`"
            v-model="newTags[category.key]"
            @keydown="(e) => handleKeyDown(e, category.key)"
          />
          <button @click="addTag(category.key)">Adicionar</button>
        </div>
        <div class="tags">
          <span
            v-for="(tag, index) in category.tags"
            :key="index"
            class="tag"
            @click="removeTag(category.key, index)"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <div class="prompt-preview">
      <h2>Preview do Prompt</h2>
      <div class="preview-content">
        {{ promptText }}
      </div>
    </div>
  </main>
  <div v-else class="loading">Carregando...</div>
</template>

<style scoped>
#card-details {
  flex: 1;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--primary-color-100);
}

.back-button,
.copy-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-color-50);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.back-button:hover,
.copy-button:hover {
  background-color: var(--primary-color-100);
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.category-container {
  background-color: var(--primary-color-50);
  padding: 1rem;
  border-radius: 4px;
}

.tag-input {
  display: flex;
  margin: 0.5rem 0;
}

.tag-input input {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem;
  border-radius: 4px 0 0 4px;
}

.tag-input button {
  background-color: var(--primary-color-100);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
}

.tag-input button:hover {
  background-color: var(--primary-color-200);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  background-color: var(--primary-color-100);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  cursor: pointer;
  font-size: 0.9rem;
}

.tag:hover {
  background-color: var(--primary-color-200);
  text-decoration: line-through;
}

.prompt-preview {
  background-color: var(--primary-color-50);
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.preview-content {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
}
</style>

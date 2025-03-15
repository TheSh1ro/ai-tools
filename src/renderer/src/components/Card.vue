<script setup lang="ts">
import { PromptClass } from '@/types'

const props = defineProps<{ prompt: PromptClass }>()
</script>

<template>
  <div class="card">
    <h2>{{ props.prompt.title }}</h2>
  </div>
</template>
<style scoped></style>

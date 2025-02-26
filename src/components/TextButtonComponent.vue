<template>
          <div class="flex flex-center">
              <span
                >{{ buttonText }}</span
              >
              <q-btn icon="search" flat @click="$emit('search-button:clicked')"/>
            </div>
</template>
<script script setup lang="ts">

    withDefaults(defineProps<{buttonText?: string}>(), {
        buttonText: 'Easily search and book accommodations, flights, and tours.',

    })

    defineEmits(['search-button:clicked'])
</script>
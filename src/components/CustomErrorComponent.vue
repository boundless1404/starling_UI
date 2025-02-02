<template>
    <div v-if="hasError" class="text-negative"><q-icon v-if="showErrorIcon" name="error" /><span>{{ message }}</span></div>
    <div v-else-if="model && field" class="text-negative" ><q-icon v-if="showErrorIcon" name="error" /><span>{{ $getFieldError(model, field) }}</span></div>
</template>
<script setup lang="ts">
import { BaseModel } from 'src/models/base.model';
import { computed } from 'vue';

    const props = withDefaults(defineProps<{message?: string; model?: BaseModel; field?: string}>(),{
        message: '',
    })

    const hasError = computed(() => Boolean(props.message?.trim().length > 0));
    const showErrorIcon = computed(() => hasError.value)
</script>
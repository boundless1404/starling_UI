<template>
    <div class="select-container" v-bind="restProps">
      <div class="selected-option" :style="{...(!borderless ? {} : {border: 'none'}),  ...($q.screen.xl ? {padding: '16px 8px 8px 8px'} : { padding: '16px 2px 2px 2px'})}" @click.stop="toggleDropdown">
        <q-icon name="arrow_drop_down" />
        <img :class="[$q.screen.xl ? 'q-px-xs' : '']"
          :src="'https:'+selectedCountry?.flageUrl"
          alt="flag"
          width="20"
          height="12"
          v-if="selectedCountry"
        />
        <span>{{ selectedCountry?.name }}</span>
      </div>
      <div class="dropdown" v-if="dropdownOpen">
        <q-input
                    ref="searchInput"
          id="searchInput"
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="search-input"
        />
        <div class="options">
          <div
            v-for="option in filteredOptions"
            :key="option.value"
            class="option"
            @click.stop="selectOption(option)"
          >
            <img
              id="flag-img"
              :src="'https:' + option.flageUrl"
              alt="flag"
              width="24"
              height="16"
              style="border: 1px solid #ddd;"
            />
            <span>{{ option.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
  import { PhoneCode } from 'src/lib/types';
  import { ref, computed, useAttrs } from 'vue';
  
  
const props = withDefaults(defineProps<{ phoneCodes: PhoneCode[], selectedPhonCodeId: string, borderless?: boolean}>(), {borderless: false});
const emits = defineEmits(['update:selectedPhonCodeId']);

// const {registerTick} = useTick();

const dropdownOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref<HTMLInputElement | null>();

defineExpose({
  searchInput
})

const phoneCodesForSelection = computed(() => props.phoneCodes.map((phoneCode) => ({
    label: phoneCode.name,
    value: phoneCode.id,
    flageUrl: phoneCode.flageUrl
})));

// Track other undeclared props such as class, style, etc.
const { ...restProps } = useAttrs();

//   const clickedOut = 
  
  const filteredOptions = computed(() => {
    return phoneCodesForSelection.value.filter(option =>
      option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  const selectedCountry = ref<PhoneCode | undefined>();
  
  async function toggleDropdown() {
    // if (!dropdownOpen.value) {

    //   registerTick(() => {
    //     console.log('searchInput.value: ', searchInput.value);
    //     searchInput.value?.focus();
    //     console.log('searchInput.value: ', searchInput.value,document.getElementById('searchInput'), document.getElementById('flag-img'));
    //   });
    //   registerTick(() => {
    //     console.log('searchInput.value: ', searchInput.value);
    //     searchInput.value?.focus();
    //     console.log('searchInput.value: ', searchInput.value,document.getElementById('searchInput'), document.getElementById('flag-img'));
    //   });

    // }
    dropdownOpen.value = !dropdownOpen.value;
  }
  
  function selectOption(option: { label: string, value: string, flageUrl: string }) {
    selectedCountry.value = props.phoneCodes.find(phoneCode => phoneCode.id === option.value);
    emits('update:selectedPhonCodeId', option.value);
    dropdownOpen.value = false;
  }

</script>
  

<style scoped lang="scss">
  .select-container {
    position: relative;
  }
  
  .selected-option {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: var(--q-input-border-radius);
    cursor: pointer;
    height: calc(2rem + 3vh)
  }
  
  .dropdown {
    position: absolute;
    top: 0%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    z-index: 10;
  }
  
  .search-input {
    width: 92%;
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
  
  .options {
    max-height: 200px;
    overflow-y: auto;
  }
  
  .option {
    display: flex;
    align-items: center;
    padding: 8px;
    cursor: pointer;
  }
  
  .option:hover {
    background: #f0f0f0;
  }
  
  .option img {
    margin-right: 8px;
  }
</style>

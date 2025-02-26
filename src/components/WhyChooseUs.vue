<template>
  <div :class="['wrapper q-mt-sm', $q.screen.gt.md ? '' : $q.screen.lt.md ? 'padding-sm' : 'padding-md']">
    <div class="row">
      <div v-for="(icon, index) in allIcons" :key="index" class="col-lg-4 col-md-6 col-sm-6 col-xs-12 q-pa-md">
        <div class="cards text-overlay-container">
          <q-img :src="icon.iconUrl" class="icon-img" />
          <div class="text-overlay">
            <h3>{{ icon.title }}</h3>
            <p>{{ icon.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const allIcons = ref([
  { iconUrl: 'icons/thinkglobe.png', title: 'Global Reach', description: 'We provide services worldwide.' },
  { iconUrl: 'icons/starjournal.png', title: 'Innovative Solutions', description: 'Cutting-edge strategies for progress.' },
  { iconUrl: 'icons/securecheck.png', title: 'Secure Transactions', description: 'Keeping your data and payments safe.' },
  { iconUrl: 'icons/thinksupport.png', title: 'Dedicated Support', description: '24/7 assistance when you need it.' },
  { iconUrl: 'icons/handheart.png', title: 'Community Engagement', description: 'Building stronger local connections.' },
  { iconUrl: 'icons/plane.png', title: 'Seamless Travel', description: 'Hassle-free experiences worldwide.' },
]);

defineComponent({ name: 'WhyChooseUs' });
</script>

<style lang="scss" scoped>
@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap';

.wrapper {
  width: 100%;
  padding: 2rem 10rem;
  &.padding-md { padding: 2rem 5rem; }
  &.padding-sm { padding: 2rem 2rem; }
}

.cards {
  aspect-ratio: 1/1;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  }
}

.icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-overlay-container {
  position: relative;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 16px;
}

.cards:hover .text-overlay {
  opacity: 1;
}
</style>

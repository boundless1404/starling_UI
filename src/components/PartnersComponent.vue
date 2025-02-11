<template>
  <!-- The .slider-wrapper hides the overflowing content -->
  <!-- Adding the 'pause-hover' class conditionally allows pausing on hover -->
  <div class="slider-wrapper" :class="{ 'pause-hover': pauseOnHover }">
    <!-- The .slider-content is the moving container.
         It uses inline style binding to set the animation duration.
         If the `reverse` prop is true, a class is applied to reverse the animation direction. -->
    <div class="slider-content" :class="{ reverse: reverse }" :style="{ animationDuration: duration + 's' }">
      <!-- We duplicate the partners list so that as the first copy scrolls out, the second copy follows,
           creating a seamless loop. -->
      <div class="slider-item" v-for="(partner, index) in duplicatedPartners" :key="index">
        <img :src="partner.logo" alt="Partner Logo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// Define a type for a partner item
interface Partner {
  logo: string;
}

// Example partners list. Adjust or replace with your own data source.
const partners = ref<Partner[]>([
  { logo: 'icons/thinkglobe.png' },
  { logo: 'icons/starjournal.png' },
  {
    logo: 'icons/securecheck.png',
  },
  {
    logo: 'icons/thinksupport.png',
  },
  {
    logo: 'icons/handheart.png',
  },
  {
    logo: 'icons/plane.png',
  },
]);

/**
 * Configurable props:
 * - duration: The time (in seconds) it takes for one full loop of the animation.
 * - pauseOnHover: If true, the animation pauses when the user hovers over the slider.
 * - reverse: If true, the slider will scroll in reverse.
 */
const props = withDefaults(
  defineProps<{
    duration?: number;
    pauseOnHover?: boolean;
    reverse?: boolean;
  }>(),
  {
    duration: 30,     // Default: 30 seconds for one loop
    pauseOnHover: false,
    reverse: false,
  }
);

// Destructure for easy binding in the template
const { duration, pauseOnHover, reverse } = props;

// Duplicate the partners array to create a seamless looping effect.
// The animation moves the entire content by 50% of its width (which equals one full copy).
const duplicatedPartners = computed(() => [...partners.value, ...partners.value]);
</script>

<style scoped lang="scss">
/* The slider-wrapper clips the overflowing content */
.slider-wrapper {
  overflow: hidden;
  width: 100%;
}

/* The slider-content container is set up as a flex row.
   The CSS animation (named "marquee") scrolls the content continuously.
   The actual animation duration is set via inline styles from the component's prop. */
.slider-content {
  display: flex;
  animation: marquee linear infinite;
}

/* Each slider-item will not shrink, and you can add spacing as desired */
.slider-item {
  flex-shrink: 0;
  margin-right: 1rem; // adjust spacing between items as needed
}

/* The marquee keyframes animate the container:
   - At 0%, the container is in its starting position.
   - At 100%, it translates left by 50% of its width,
     which should equal the width of one full set of partner logos. */
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* When pauseOnHover is enabled, hovering over the slider-wrapper pauses the animation */
.pause-hover:hover .slider-content {
  animation-play-state: paused;
}

/* If the reverse prop is true, the reverse class flips the animation direction */
.slider-content.reverse {
  animation-direction: reverse;
}
</style>
this 
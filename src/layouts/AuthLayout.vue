<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white text-white" bordered style="border-bottom-style: solid; border-bottom-width: 0.2rem">
      <q-toolbar>
        <q-toolbar-title class="q-mt-sm cursor-pointer" v-ripple>
          <q-img height="8rem" @click="$router.push('/')" width="10rem" fit="cover" src="/assets/starlings_logo.png" />
        </q-toolbar-title>
        <div class="flex row justify-around" style="width: 70%">
          <q-btn color="primary" to="/bookings" label="Bookings" :size="$q.screen.lt.lg ? '0.5rem' : ''" rounded outline no-caps/>
        </div>
        <div class="q-mr-lg">
          <q-btn class="flex row justify-between" :style="{
            border: `${$getColor('primary')} solid 0.1px`,
          }" color="white" flat outline size="1.4rem" rounded :ripple="false" @click="gotoPaymentPage">
            <q-chip :class="currentBooking  as number > 0 ? 'bg-green text-white' : ''">Cart ({{ '\u20A6'}}{{ (currentBooking as number)?.toLocaleString('en-US') }})</q-chip>
            <!-- <q-icon class="q-mr-md" color="dark" name="menu" v-ripple @click.self="showMenu" /> -->
            <q-icon color="dark" name="account_circle" v-ripple.center @mouseover="showUserProfile" />
            <q-menu v-model="menuVisible" anchor="bottom right" self="top right">
            <q-list>
              <q-item>
              <q-item-section>
                <q-item-label>Signed in as</q-item-label>
                <q-item-label>{{ authUser?.firstName }}</q-item-label>
                <q-item-label caption>{{ authUser?.email }}</q-item-label>
                <q-item-label ><q-btn label="Sign Out" @click="signout" flat dense no-caps /></q-item-label>
              </q-item-section>
              </q-item>
            </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="alegreya q-pa-sm">
      <router-view />
            <!-- footer -->
            <div
        class="bg-white"
        style="
          position: relative;
          bottom: 0;
          width: 100%;
          height: 8rem;
          margin-top: 2rem;
          z-index: 0 !important;
        "
      >
        <div>
          <div style="position: relative">
            <q-img src="assets/Rectangle 110.png" />
            <div
              class="text-white text-center"
              style="position: absolute; bottom: 0; z-index: 9999; width: 100%"
            >
              <span>&copy;2024</span> | <span>Starlings Properties</span>
              <span> | </span>
              <span>Powered by: boundlessedge</span>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>

    <!-- <q-footer bordered class="bg-white text-black">
      <q-toolbar class="items-center">
        <q-toolbar-title class="flex row q-gutter-sm text-caption cursor-pointer">
          <div>&copy;</div>
          <div>Starling</div>
        </q-toolbar-title>
        <div class="flex row flex-center q-mb-sm" style="width: 8rem">
          <q-icon class="q-mt-md cursor-pointer" size="3rem" name="fab fa-instagram" color="secondary" />
          <q-icon class="cursor-pointer" size="3rem" name="fab fa-x-twitter" color="secondary" />
        </div>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { HospitalityBookings } from 'src/lib/types';
import BookingsModel from 'src/models/bookingsModel.model';
import BookingsViewModel from 'src/view-models/bookings.view-model';
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';


const bookingsViewModel = new BookingsViewModel(reactive(new BookingsModel()));
const $router = useRouter();
const $q = useQuasar();

const authUser = ref<{firstName: string; email: string}>();
const menuVisible = ref(false);

const currentBooking = ref(bookingsViewModel.stores.currentVals?.booking);

//#endregion
//refs
const suiteBooking = ref(bookingsViewModel.stores.bookings?.suiteBooking);
const autoBooking = ref(bookingsViewModel.stores.bookings?.autoBooking);
const visaBooking = ref(bookingsViewModel.stores.bookings?.visaBooking)
const tourBooking = ref(bookingsViewModel.stores.bookings?.tourBooking)

// Computed

const currentBookingCost = computed(() => {
    let cost = 0;
    const suiteBookingOption = suiteBooking.value?.reduce((prev, curr) => {
        prev += curr.price;
        return prev;
    }, 0) || 0;

    const autoServiceCost = autoBooking.value?.reduce((prev, curr) => {
        prev += curr.price;
        return prev;
    }, 0) || 0;

    const visaCost = visaBooking.value?.reduce((prev, curr) => {
        prev += curr.price;
        return prev;
    }, 0) || 0;

    const tourCost = tourBooking.value?.reduce((prev, curr) => {
        prev += curr.price;
        return prev;
    }, 0) || 0;

    cost = suiteBookingOption + autoServiceCost + visaCost + tourCost;
    return cost;
});

watchEffect(() => {
  currentBooking.value = currentBookingCost.value;
});

// methods
function signout() {
  bookingsViewModel.stores.auth?.$reset();
  $router.push('/signin');
}

function showUserProfile() {
  menuVisible.value = !menuVisible.value;
}

function gotoPaymentPage() {
  if (currentBookingCost.value <= 0) {
    $q.notify({
      message: 'You have no booking in your cart',
      color: 'negative',
      position: 'top',
      icon: 'report_problem',
    });
    return;
  }
  $router.push('/payment');
}


onMounted(async () => {
  await bookingsViewModel.stores.bookings?.initializeStore() as HospitalityBookings;
  
});

onMounted(async () => {
  await bookingsViewModel.stores.auth?.initializeStore();
  authUser.value = bookingsViewModel.stores.auth?.userData;

  bookingsViewModel.stores.bookings?.$subscribe((mutation, state) => {
        suiteBooking.value = state.suiteBooking;
        autoBooking.value = state.autoBooking;
        visaBooking.value = state.visaBooking;
        tourBooking.value = state.tourBooking;
    });
});
</script>
<style lang="scss">
.sticky-bottom {
  position: sticky;
  bottom: 0;
}

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 1000;
}
@font-face {
  font-family: 'alegreya';
  src: url('../css/fonts/AlegreyaSans-Bold.ttf');
}

.alegreya {
  font-family: alegreya;
  font-size: large;
}

.border-rounded-xs {
  border-radius: 0.5rem;
}

.border-rounded-sm {
  border-radius: 1rem;
}

.border-rounded-md {
  border-radius: 1.5rem;
}

.border-rounded-lg {
  border-radius: 2rem;
}

.border-rounded-xl {
  border-radius: 2.5rem;
}

.suite-service-description {
  font-size: 1.2rem;
  font-weight: 100;
}
</style>

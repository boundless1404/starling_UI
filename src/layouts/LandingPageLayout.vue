<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="bg-gradient"
      style="
        height: auto;
        background: linear-gradient(to right, white, transparent, white);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(7px);
        padding: 0.25rem 1rem;
      "
    >
      <q-toolbar class="flex row justify-between items-center">
        <q-toolbar-title
          :class="['cursor-pointer', $q.screen.gt.sm ? 'q-mt-sm' : '']"
          style="max-width: max-content"
        >
          <q-img
            :width="$q.screen.lt.lg ? '4rem' : '10rem'"
            fit="cover"
            src="/assets/starlings_logo.png"
          />
        </q-toolbar-title>
        <!-- nav >= md -->
        <!-- <div
          v-show="$q.screen.gt.md"
          class="flex row justify-right"
          style="width: 40%"
        ></div> -->
        <div class="text-primary flex row items-end justify-end">
          <div v-if="!$q.screen.lt.md">
            <q-btn
              color="black"
              label="Home"
              :size="$q.screen.lt.lg ? '0.5rem' : ''"
              flat
              no-caps
              to="/"
            />
            <!-- <q-btn
              color="black"
              label="Features"
              :size="$q.screen.lt.lg ? '0.5rem' : ''"
              flat
              no-caps
            />
            <q-btn
              color="black"
              label="About"
              :size="$q.screen.lt.lg ? '0.5rem' : ''"
              flat
              no-caps
            /> -->
            <CurrentUserProviderComponent v-slot="{ user: authUser }">
              <q-btn
                v-if="Boolean(authUser?.id)"
                color="black"
                label="Bookings"
                :size="$q.screen.lt.lg ? '0.5rem' : ''"
                flat
                no-caps
                to="/bookings"
              />
            </CurrentUserProviderComponent>
          </div>
          <div v-if="userIsAuthenticated()">
            <q-chip
              class="flex row justify-between bg-black"
              flat
              outline
              size="1rem"
              :ripple="false"
              style="border-radius: 4px"
            >
            <CurrentBookingComponent v-slot="{ currentBooking }">
              <q-chip class="bg-white" style="border-radius: 4px"
                    ><q-icon class="position-relative icon-md" name="shopping_cart"
                      ><q-badge
                        v-if="currentBooking > 0"
                        color="red"
                        style="position: absolute; top: -10px; right: -10px"
                    /></q-icon>
                    <span>({{ '\u20A6'}}{{ currentBooking.toLocaleString('en-US') }})</span>
                  </q-chip>  
            </CurrentBookingComponent>
              <!-- <q-icon class="q-mr-md" color="dark" name="menu" v-ripple @click.self="showMenu" /> -->
              <q-icon
                :class="['q-ml-sm icon-md cursor-pointer', $q.screen.gt.md ? 'icon-lg' : $q.screen.lt.md ? 'icon-sm' : 'icon-md']"
                color="white"
                name="person"
                v-ripple.center
                @mouseover="toggleUserProfileMenu"
              />
              <q-menu
                v-model="showUserProfileMenu"
                anchor="bottom right"
                self="top right"
              >
                <q-list>
                  <q-item>
                   <CurrentUserProviderComponent v-slot="{ user: authUser, signout }" >
                    <q-item-section>
                      <q-item-label>Signed in as</q-item-label>
                      <q-item-label>{{ authUser?.firstName }}</q-item-label>
                      <q-item-label caption>{{ authUser?.email }}</q-item-label>
                      <q-item-label
                        ><q-btn
                          label="Sign Out"
                          @click.prevent="signout()"
                          flat
                          dense
                          no-caps
                      /></q-item-label>
                    </q-item-section>
                   </CurrentUserProviderComponent>
                  </q-item>
                </q-list>
              </q-menu>
            </q-chip>
          </div>
          <div v-else class="flex row justify-end">
            <q-btn
              color="black"
              :class="[
                'cursor-pointer ',
                $q.screen.gt.sm ? 'q-px-lg' : 'q-px-sm',
              ]"
              label="Get Started"
              :size="
                $q.screen.lt.lg
                  ? $q.screen.lt.md
                    ? '0.55rem'
                    : '0.6rem'
                  : '0.8rem'
              "
              flat
              no-caps
              @click="handleGetStarted"
            />
            <q-btn
              color="black"
              :class="[
                'cursor-pointer ',
                $q.screen.gt.sm ? 'q-px-lg' : 'q-px-sm',
              ]"
              label="Sign In"
              :size="
                $q.screen.lt.lg
                  ? $q.screen.lt.md
                    ? '0.55rem'
                    : '0.6rem'
                  : '0.8rem'
              "
              :flat="$q.screen.lt.md"
              no-caps
              @click="handleSignin"
            />
          </div>
        </div>
        <q-btn color="primary" v-if="$q.screen.lt.md" flat round dense>
          <q-icon :name="menuIsActive ? 'close' : 'menu'" />
          <q-menu @show="toggleMenu" @hide="toggleMenu">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>Home</q-item-section>
              </q-item>
              <CurrentUserProviderComponent v-slot="{ user: authUser }">
              <q-item clickable v-close-popup>
              <q-item-section
                v-if="Boolean(authUser?.id)"
                to="/bookings"
              >Bookings</q-item-section> 
              </q-item>
            </CurrentUserProviderComponent>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container class="alegreya" style="max-height: 100vh; padding: 0">
      <loading-spinner v-if="isLoading" :loading="isLoading" />
      <router-view v-else />
      <auth-dialog
        v-if="dialogOpen"
        :open="dialogOpen"
        :purpose="dialogPurpose"
        @close="closeDialog"
      />
      <!-- footer -->
      <div class="footer-container">
        <div class="footer-content row q-pa-md justify-between items-end">
          <!-- Left Section: Brand and Social Icons -->
          <div class="col-xs-12 col-md-4">
            <div class="brand-info flex column justify-between">
              <div class="">
                <img
                  src="/assets/starlings_logo.png"
                  alt="Starling Logo"
                  class="logo"
                />
                <p class="brand-text">
                  Explore the world effortlessly with our comprehensive travel
                  and hospitality solutions
                </p>
              </div>
              <!-- Social Media Icons -->
              <div class="social-icons">
                <a
                  href="https://www.instagram.com/starlingshsp?igsh=d2xsYTlzYnR1Nng5"
                  target="_blank"
                >
                  <q-icon name="fab fa-instagram" />
                </a>
                <a href="https://x.com/starlinghsp?s=21" target="_blank">
                  <q-icon name="fas fa-times" />
                </a>
                <a
                  href="https://www.facebook.com/share/18XswyaqZM/?mibextid=LQQJ4d"
                  target="_blank"
                >
                  <q-icon name="fab fa-facebook" />
                </a>
                <a
                  href="https://www.tiktok.com/@starlingshsp?_t=ZN-8tr2gIRdFjy&_r=1"
                  target="_blank"
                >
                  <q-icon name="fab fa-tiktok" />
                </a>
                <!-- <q-icon name="fab fa-whatsapp" /> -->
              </div>
            </div>
          </div>

          <!-- Right Section: Newsletter Signup -->
          <div class="col-xs-12 col-md-4 newsletter-section">
            <h6 class="newsletter-title text-right">JOURNEY WITH US</h6>
            <p class="newsletter-text">
              Sign up for our newsletter and receive exclusive news and
              destination inspiration. Join our mailing list today!
            </p>
            <q-input
              filled
              v-model="visitorEmail"
              placeholder="Enter your email"
              class="email-input"
            />
            <q-btn color="primary" class="subscribe-btn">Subscribe</q-btn>
          </div>
        </div>

        <!-- Bottom Footer: Copyright & Links -->
        <div :class="['footer-bottom', $q.screen.lt.md ? 'height-sm' : '']">
          <p>Copyright © starlingshsp.com. All rights reserved.</p>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Manage Cookies</a>
          </div>
          <q-img
            class=""
            src="/assets/starlings_logo.png"
            style="width: 100%"
          />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import LoadingSpinner from 'src/components/LoadingSpinner.vue';
import AuthDialog from 'src/components/AuthDialog.vue';
import { useQuasar } from 'quasar';
import useAuthStore from 'src/stores/auth-store';
import CurrentBookingComponent from 'src/components/CurrentBookingComponent.vue';
import CurrentUserProviderComponent from 'src/components/CurrentUserProviderComponent.vue';


// consts
const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();

// refs
const isLoading = ref(false);
const menuIsActive = ref(false);
const dialogOpen = ref(false);
const dialogPurpose = ref<'signup' | 'signin'>('signup');
const visitorEmail = ref('');
const showUserProfileMenu = ref(false)

// methods
function userIsAuthenticated() { 
  return authStore.userIsAuthenticated();
}
function closeDialog() {
  dialogOpen.value = false;
}

function handleGetStarted() {
  // router.push('/signup');
  dialogOpen.value = true;
  dialogPurpose.value = 'signup';
}

function handleSignin() {
  //
  dialogOpen.value = true;
  dialogPurpose.value = 'signin';
}

function toggleMenu() {
  menuIsActive.value = !menuIsActive.value;
}

const startLoading = () => {
  isLoading.value = true;
};

const stopLoading = () => {
  isLoading.value = false;
};

function toggleUserProfileMenu() {
  showUserProfileMenu.value = !showUserProfileMenu.value;
}

onMounted(() => {
  router.beforeEach((to, from, next) => {
    startLoading();
    next();
  });

  router.afterEach(() => {
    setTimeout(stopLoading, 500); // Add a small delay for better visual effect
  });
});
</script>

<style lang="scss" scoped>

.icon-lg {
  font-size: 1.8rem;
}

.icon-md {
  font-size: 1.5rem;
}

.icon-sm {
  font-size: .8rem;
}

.footer-container {
  background: #fff;
  border-top: 1px solid #ddd;
  text-align: center;
  padding-bottom: 20px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.brand-info {
  text-align: left;
  height: 100%;
}

.logo {
  width: 8rem;
  margin-bottom: 10px;
}

.brand-text {
  font-size: 14px;
  color: #333;
}

.social-icons {
  display: flex;
  gap: 10%;
  margin-top: 10px;
}

.social-icons i {
  font-size: 2rem;
  cursor: pointer;
}

.newsletter-section {
  text-align: right;
}

.newsletter-title {
  font-weight: bold;
}

.email-input {
  width: 100%;
  margin: 10px 0;
}

.subscribe-btn {
  width: 100%;
}

.footer-bottom {
  border-top: 1px solid #ddd;
  padding: 10px;
  font-size: 12px;
  position: relative;
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.952) 20%,
    rgba(255, 255, 255, 0.952) 100%
  );
  height: 25vw;
  overflow: hidden;
  &.height-sm {
    height: 40vw;
  }
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.footer-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.footer-bottom div img {
  position: absolute;
  top: 50rem;
  left: 0;
  height: 60%;
  opacity: 60% !important;
}
</style>

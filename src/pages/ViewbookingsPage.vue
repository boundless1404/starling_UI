<template>
  <div>
    <!-- bookings list view - shows list of bookings and the date the bookings was made -->
    <div class="q-mt-md text-h4 text-center">Bookings</div>
    <div class="">
      <q-expansion-item
        v-for="(item, index) of viewBookingsModel.model.bookings"
        :key="item.id"
        v-bind="{ ...(index === 0 ? { 'default-opened': true } : {}) }"
        :label="'Your booking on: ' + item.createdAt.split('T')[0]"
        header-style="background-color: black"
        header-class="text-left text-white"
        default-opened
      >
        <template v-slot:header>
          <div class="row justify-between full-width">
            <div class="row items-center">
              <div class="col q-pl-md text-center">
                {{ 'Your booking on: ' + item.createdAt.split('T')[0] }}
              </div>
            </div>
          </div>
        </template>
        <div class="q-mt-lg">
          <!-- Suites Apartments -->
          <q-expansion-item
            default-opened
            label="Suites"
            header-class="text-subtitle1"
          >
            <template v-slot:header>
              <div
                class="row justify-between full-width sec-bg-purple text-white"
              >
                <div class="row items-center">
                  <div class="col q-pl-md">Suite</div>
                  <div class="col-auto">
                    <q-icon name="apartment"> </q-icon>
                  </div>
                </div>
              </div>
            </template>
            <q-table
              :rows="item.suiteBookingDetails"
              :columns="suiteColumns"
              row-key="id"
              flat
              bordered
              class="q-mt-md"
            >
              <template v-slot:body-cell-image="props">
                <q-td :props="props">
                  <q-img
                    :src="props.row.suiteProperty.files?.[0].url"
                    width="120px"
                    height="80px"
                  />
                </q-td>
              </template>
            </q-table>
          </q-expansion-item>

          <!-- Car Hire -->
          <q-expansion-item
            default-opened
            label="Car Hire"
            header-class="text-subtitle1"
          >
            <template v-slot:header>
              <div
                class="row justify-between full-width sec-bg-purple text-white"
              >
                <div class="row items-center">
                  <div class="col q-pl-md">Car Hire</div>
                  <div class="col-auto">
                    <q-icon name="directions_car"> </q-icon>
                  </div>
                </div>
              </div>
            </template>
            <div class="q-pa-md" style="width: 100%">
              <template v-if="item.autoBookingDetails.length > 0">
                <div
                  class=""
                  v-for="auto in item.autoBookingDetails"
                  :key="auto.id"
                >
                  <div
                    class=""
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <div class="col-2 offset-1">
                      <q-img
                        :src="auto.serviceOffer.files?.[0].url"
                        width="120px"
                        height="80px"
                      />
                    </div>
                    <div class="col-2">
                      <q-chip class="text-subtitle2">{{
                        auto.serviceOffer?.name
                      }}</q-chip>
                    </div>
                    <div class="col-2">
                      <q-chip class="text-subtitle2">{{
                        auto.serviceOffer?.type || []
                      }}</q-chip>
                    </div>
                    <div class="flex column justify-start col-2">
                      <div>
                        <q-chip class="bg-sectwo"
                          ><q-chip class="bg-primary text-white"
                            >Start Date</q-chip
                          >{{ auto.startDate }}</q-chip
                        >
                      </div>
                      <div>
                        <q-chip class="bg-sectwo"
                          ><q-chip class="bg-primary text-white"
                            >End Date</q-chip
                          >{{ auto.endDate }}</q-chip
                        >
                      </div>
                    </div>
                    <div class="text-primary text-bold col-2">
                      <q-chip class="bg-sectwo text-subtitle1 q-px-xl"
                        >{{ '\u20A6'
                        }}{{ auto.serviceOfferPriceOption.price }}</q-chip
                      >
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </q-expansion-item>

          <!-- Visa -->
          <q-expansion-item
            default-opened
            label="Visa"
            header-class="text-subtitle1"
          >
            <template v-slot:header>
              <div
                class="row justify-between full-width sec-bg-purple text-white"
              >
                <div class="row items-center">
                  <div class="col q-pl-md">Visa</div>
                  <div class="col-auto">
                    <q-icon name="article"> </q-icon>
                  </div>
                </div>
              </div>
            </template>
            <div class="row q-col-gutter-sm q-pa-md">
              <template v-if="item.visaBookingDetails.length > 0">
                <div
                  class="full-width"
                  v-for="visa in item.visaBookingDetails"
                  :key="visa.id"
                >
                  <div
                    class="full-width"
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <div class="col-2">
                      <q-img
                        :src="visa.serviceOffer.files?.[0].url"
                        width="120px"
                        height="80px"
                      />
                    </div>
                    <div class="col-2">
                      <q-chip class="text-subtitle2">{{
                        visa.serviceOffer.name
                      }}</q-chip>
                    </div>
                    <div class="col-2">
                      <q-chip class="text-subtitle2">{{
                        visa.serviceOffer.type || []
                      }}</q-chip>
                    </div>
                    <div class="text-primary text-bold col-2">
                      <q-chip class="bg-sectwo text-subtitle1 q-px-xl"
                        >{{ '\u20A6'
                        }}{{ visa.serviceOfferPriceOption.price }}</q-chip
                      >
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </q-expansion-item>

          <!-- Tour -->
          <q-expansion-item
            default-opened
            label="Tour"
            header-class="text-subtitle1"
          >
            <template v-slot:header>
              <div
                class="row justify-between full-width sec-bg-purple text-white"
              >
                <div class="row items-center">
                  <div class="col q-pl-md">Tour</div>
                  <div class="col-auto">
                    <q-icon name="tour"> </q-icon>
                  </div>
                </div>
              </div>
            </template>
            <div class="q-pa-md">
              <template v-if="item.tourBookingDetails.length > 0">
                <div
                  class="full-width"
                  v-for="tour in item.tourBookingDetails"
                  :key="tour.id"
                >
                  <div
                    class="full-width"
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <div class="col-2">
                      <q-img
                        :src="tour.serviceOffer.files?.[0]?.url"
                        width="120px"
                        height="80px"
                      />
                    </div>
                    <div class="col-3">
                      <q-chip class="text-subtitle2">{{
                        tour.serviceOffer.name
                      }}</q-chip>
                    </div>
                    <div class="col-2">
                      <q-chip class="text-subtitle2">{{
                        tour.serviceOffer.type || []
                      }}</q-chip>
                    </div>
                    <div class="flex col-2">
                      <div>
                        <q-chip class="bg-sectwo"
                          ><q-chip class="bg-primary text-white"
                            >Start Date</q-chip
                          >{{ tour.date }}</q-chip
                        >
                      </div>
                    </div>
                    <div class="text-primary text-bold col-2">
                      <q-chip class="bg-sectwo text-subtitle1 q-px-xl"
                        >{{ '\u20A6'
                        }}{{ tour.serviceOfferPriceOption?.price }}</q-chip
                      >
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </q-expansion-item>
        </div>
      </q-expansion-item>
    </div>
  </div>
</template>
<script setup lang="ts">
import { QTableColumn, useQuasar } from 'quasar';
import ViewBookingsModel from 'src/models/viewBookings.model';
import ViewBookingsViewModel from 'src/view-models/viewBookings.view-model';
import { onMounted, reactive } from 'vue';

const $q = useQuasar();

// view models
const viewBookingsModel = new ViewBookingsViewModel(
  reactive(new ViewBookingsModel())
);

const suiteColumns: QTableColumn[] = [
  {
    name: 'image',
    required: true,
    label: 'Image',
    align: 'center',
    field: 'image',
    format: (val: string) => `<img src="${val}" width="80" height="80" />`,
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'center',
    field: 'name',
  },
  {
    name: 'price',
    required: true,
    label: 'Price',
    align: 'center',
    field: 'price',
  },
  {
    name: 'checkInDate',
    required: true,
    label: 'Check-In Date',
    align: 'center',
    field: 'checkInDate',
  },
  {
    name: 'checkOutDate',
    required: true,
    label: 'Check-Out Date',
    align: 'center',
    field: 'checkOutDate',
  },
  {
    name: 'noOfAdults',
    required: true,
    label: 'No. of Adults',
    align: 'center',
    field: 'noOfAdults',
  },
  {
    name: 'noOfChildren',
    required: false,
    label: 'No. of Children',
    align: 'center',
    field: 'noOfChildren',
  },
  {
    name: 'roomsCount',
    required: true,
    label: 'Rooms Count',
    align: 'center',
    field: 'roomsCount',
  },
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'center',
    field: 'actions',
  },
];

onMounted(async () => {
  await viewBookingsModel.getBookings();
});
</script>

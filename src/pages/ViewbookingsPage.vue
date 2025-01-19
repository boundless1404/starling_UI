<template>
    <div>
        <!-- bookings list view - shows list of bookings and the date the bookings was made -->
        <div class="q-mt-md text-h4 text-center">Bookings </div>
        <div class="">
            <q-expansion-item v-for="(item, index) of viewBookingsModel.model.bookings" :key="item.id" v-bind="{...(index === 0 ? {'default-opened': true} : {})}" :label="'Your booking on: ' + item.createdAt.split('T')[0]"
                header-class="q-pa-lg q-mt-lg text-white bg-secondary">
                <div class="q-mt-lg">
                    <!-- Suites Apartments -->
                    <q-expansion-item tour icon="apartment" label="Service Apartment / Suites" 
                    header-class="text-subtitle1 text-center"
                        header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);"
                        >
                        <div class="q-pa-md" style="width: 100%;">
                            <template v-if="item.suiteBookingDetails.length > 0">
                                <div v-for="suite in item.suiteBookingDetails" :key="suite?.id">
                                    <div class=""
                                        style="display: flex; justify-content: space-between; align-items: center;">
                                        <div class="col-2">
                                            <q-img :src="suite?.suiteProperty.files?.[0].url"
                                                width="120px" height="80px" />
                                        </div>
                                        <div class="col-2">
                                            <q-chip class="text-subtitle2">{{
                                                suite.suiteProperty.name || suite.suiteProperty.category }}</q-chip>
                                        </div>
                                        <div class="col-2">
                                            <q-chip class="text-subtitle2">{{
                                                suite.suiteProperty.type }}</q-chip>
                                        </div>
                                        <div class="flex column justify-start col-2">
                                            <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Check
                                                        In Date</q-chip>{{
                                                    suite.checkInDate }}</q-chip></div>
                                            <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Check
                                                        out Date</q-chip>{{
                                                    suite.checkOutDate }}</q-chip></div>
                                        </div>
                                        <div class="text-primary text-bold col-2">
                                            <q-chip class="bg-sectwo text-subtitle1 q-px-xl">{{ '\u20A6'
                                                }}{{ suite.serviceOfferPriceOptions.price }}</q-chip>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </q-expansion-item>
                    <!-- Car Hire -->
                    <q-expansion-item tour icon="directions_car" label="Car Hire"
                        header-class="text-subtitle1 text-center"
                        header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                        <div class="q-pa-md" style="width: 100%;">
                            <template v-if="item.autoBookingDetails.length > 0">
                                <div class="" v-for="auto in item.autoBookingDetails" :key="auto.id">
                                    <div class=""
                                        style="display: flex; justify-content: space-between; align-items: center;">
                                        <div class="col-2 offset-1">
                                            <q-img :src="auto.serviceOffer.files?.[0].url"
                                                width="120px" height="80px" />
                                        </div>
                                        <div class="col-2">
                                            <q-chip class="text-subtitle2">{{ auto.serviceOffer?.name
                                                }}</q-chip>
                                        </div>
                                        <div class="col-2">
                                            <q-chip class="text-subtitle2">{{ auto.serviceOffer?.type
                                                || [] }}</q-chip>
                                        </div>
                                        <div class="flex column justify-start col-2">
                                            <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Start
                                                        Date</q-chip>{{
                                                    auto.startDate }}</q-chip></div>
                                            <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">End
                                                        Date</q-chip>{{
                                                    auto.endDate }}</q-chip></div>
                                        </div>
                                        <div class="text-primary text-bold col-2">
                                            <q-chip class="bg-sectwo text-subtitle1 q-px-xl">{{ '\u20A6'
                                                }}{{ auto.serviceOfferPriceOption.price }}</q-chip>
                                        </div>
                                    </div>
                                </div>
                            </template>

                        </div>
                    </q-expansion-item>

                    <!-- Visa -->
                    <q-expansion-item tour icon="article" label="Visa" header-class="text-subtitle1 text-center"
                        header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                        <div class="row q-col-gutter-sm q-pa-md">
                            <template v-if="item.visaBookingDetails.length > 0">
                                <div class="full-width" v-for="visa in item.visaBookingDetails" :key="visa.id">
                                    <div class="full-width"
                                        style="display: flex; justify-content: space-between; align-items: center;">
                                        <div class="col-2">
                                            <q-img :src="visa.serviceOffer.files?.[0].url"
                                                width="120px" height="80px" />
                                        </div>
                                        <div class="col-2">
                                            <q-chip class="text-subtitle2">{{ visa.serviceOffer.name
                                                }}</q-chip>
                                        </div>
                                        <div class="col-2">
                                            <q-chip class="text-subtitle2">{{ visa.serviceOffer.type
                                                || [] }}</q-chip>
                                        </div>
                                        <div class="text-primary text-bold col-2">
                                            <q-chip class="bg-sectwo text-subtitle1 q-px-xl">{{ '\u20A6'
                                                }}{{ visa.serviceOfferPriceOption.price }}</q-chip>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </q-expansion-item>

                    <!-- Tour -->
                    <q-expansion-item tour icon="tour" label="Tour" header-class="text-subtitle1 text-center"
                        header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                        <div class="q-pa-md">
                            <template v-if="item.tourBookingDetails.length > 0">
                                <div class="full-width" v-for="tour in item.tourBookingDetails" :key="tour.id">
                                    <div class="full-width"
                                        style="display: flex; justify-content: space-between; align-items: center;">
                                        <div class="col-2">
                                            <q-img :src="tour.serviceOffer.files?.[0]?.url"
                                                width="120px" height="80px" />
                                        </div>
                                        <div class="col-3">
                                            <q-chip class="text-subtitle2">{{ tour.serviceOffer.name
                                                }}</q-chip>
                                        </div>
                                        <div class="col-2">
                                            <q-chip class="text-subtitle2">{{ tour.serviceOffer.type
                                                || [] }}</q-chip>
                                        </div>
                                        <div class="flex col-2">
                                            <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Start
                                                        Date</q-chip>{{
                                                    tour.date }}</q-chip></div>
                                        </div>
                                        <div class="text-primary text-bold col-2">
                                            <q-chip class="bg-sectwo text-subtitle1 q-px-xl">{{ '\u20A6'
                                                }}{{ tour.serviceOfferPriceOption?.price }}</q-chip>
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
import ViewBookingsModel from 'src/models/viewBookings.model';
import ViewBookingsViewModel from 'src/view-models/viewBookings.view-model';
import {onMounted, reactive} from 'vue';

    // view models
    const viewBookingsModel = new ViewBookingsViewModel(reactive(new ViewBookingsModel()));

    onMounted(async () => {
        await viewBookingsModel.getBookings();
    });
</script>
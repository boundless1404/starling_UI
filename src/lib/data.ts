const 
    bookings = 
    [
        {
            'id': '59',
            'paymentReference': '0c1183f3-c027-4895-bdc4-e08c7658d77e',
            'status': 'pending',
            'paymentData': null,
            'createdAt': '2024-12-26T13:12:40.463Z',
            'updatedAt': '2024-12-26T13:12:40.463Z',
            'subscriberUserId': '1',
            'suiteBookingDetails': [
                {
                    'id': '50',
                    'checkInDate': '2024-12-26',
                    'checkOutDate': '2024-12-27',
                    'numberOfAdults': 1,
                    'numberOfChildren': 0,
                    'roomsCount': 1,
                    'createdAt': '2024-12-26T13:12:40.463Z',
                    'updatedAt': '2024-12-26T13:12:40.463Z',
                    'serviceBookingId': '59',
                    'suitePropertyId': '5',
                    'serviceClientId': '45',
                    'serviceId': null,
                    'serviceOfferPriceOptionId': 4,
                    'suiteProperty': {
                        'id': '5',
                        'publicId': '6663c9a8-cec2-45ad-b00d-2feec253629b',
                        'type': 'rooms',
                        'name': null,
                        'category': 'studio_apartment_room',
                        'description': 'Cozy studio apartment in downtown',
                        'availableQuantity': 10,
                        'createdAt': '2024-09-19T17:23:33.077Z',
                        'updatedAt': '2024-09-19T17:23:33.077Z',
                        'deletedAt': null,
                        'serviceProviderId': '4',
                        'serviceId': '4',
                        'suitePropertyFeatures': [],
                        'files': [
                            {
                                'id': '1726c0a3-cd18-439b-aeee-6c4ef1139b0b',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'Starling_Suite.png',
                                'mimetype': 'image/png',
                                'size': '211.1',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/Starling_Suite.png',
                                'key': 'Starling_Suite.png',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-11-28T22:56:34.116Z',
                                'updatedAt': '2024-11-28T22:56:34.116Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': '5',
                                'serviceOfferId': null,
                                'tourGuideId': null
                            },
                            {
                                'id': 'b2d2ebef-1ea5-458c-b9aa-31814670e0e6',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'Starling_Cars.png',
                                'mimetype': 'image/png',
                                'size': '164.5',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/Starling_Cars.png',
                                'key': 'Starling_Cars.png',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-11-28T22:56:34.116Z',
                                'updatedAt': '2024-11-28T22:56:34.116Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': '5',
                                'serviceOfferId': null,
                                'tourGuideId': null
                            },
                            {
                                'id': '48d5e70f-64c9-48ec-afad-6f7bf5865efe',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'Starling_Tour_Guide.png',
                                'mimetype': 'image/png',
                                'size': '204.3',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/Starling_Tour_Guide.png',
                                'key': 'Starling_Tour_Guide.png',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-11-28T22:56:34.116Z',
                                'updatedAt': '2024-11-28T22:56:34.116Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': '5',
                                'serviceOfferId': null,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOptions': {
                        'id': 4,
                        'price': '85000.00',
                        'description': 'Daily luxury car rental',
                        'durationType': 'per_day',
                        'discount': 10,
                        'minimumDurationCountForDiscount': 3,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 6
                    }
                }
            ],
            'autoBookingDetails': [
                {
                    'id': '18',
                    'startDate': '2024-12-26',
                    'endDate': '2024-12-27',
                    'createdAt': '2024-12-26T13:12:40.463Z',
                    'updatedAt': '2024-12-26T13:12:40.463Z',
                    'serviceClientId': '45',
                    'serviceOfferId': 4,
                    'serviceOfferPriceOptionId': 2,
                    'serviceBookingId': '59',
                    'serviceOffer': {
                        'id': 4,
                        'publicId': '050c680f-8cf8-41e9-97e1-edfe4e48de9e',
                        'name': 'Luxury SUV',
                        'description': 'Spacious and elegant SUV with premium features and advanced safety systems.',
                        'type': 'SUV',
                        'createdAt': '2024-12-04T09:49:08.109Z',
                        'updatedAt': '2024-12-04T09:49:08.109Z',
                        'serviceId': '7',
                        'serviceOfferFeatures': [
                            {
                                'id': 7,
                                'name': 'Premium Leather Interior',
                                'description': 'High-quality leather seats with advanced ergonomic design',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 4
                            },
                            {
                                'id': 8,
                                'name': 'Advanced Safety Systems',
                                'description': 'Comprehensive suite of driver assistance and collision prevention technologies',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 4
                            }
                        ],
                        'files': [
                            {
                                'id': 'db18dff4-3249-4dc7-8a31-9de2b53a4a9d',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'suv-car-4.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/mercedes-benz-913757_640.jpg',
                                'key': 'auto-image-5',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:09:42.126Z',
                                'updatedAt': '2024-12-04T11:09:42.126Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 4,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 2,
                        'price': '100000.00',
                        'description': 'Daily luxury car rental',
                        'durationType': 'per_day',
                        'discount': 10,
                        'minimumDurationCountForDiscount': 3,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 4
                    }
                }
            ],
            'tourBookingDetails': [
                {
                    'id': 12,
                    'date': '2024-12-26',
                    'time': null,
                    'createdAt': '2024-12-26T13:12:40.463Z',
                    'updatedAt': '2024-12-26T13:12:40.463Z',
                    'serviceClientId': '45',
                    'serviceOfferId': 11,
                    'serviceOfferPriceOptionId': 10,
                    'serviceBookingId': '59',
                    'serviceOffer': {
                        'id': 11,
                        'publicId': '09c55561-fec8-43bf-bd0e-8a2ea3a77a3b',
                        'name': 'Nordic Capitals Expedition',
                        'description': 'Comprehensive tour of Scandinavian capitals with emphasis on modern design and natural beauty.',
                        'type': 'GUIDED_TOUR',
                        'createdAt': '2024-12-04T09:49:08.109Z',
                        'updatedAt': '2024-12-04T09:49:08.109Z',
                        'serviceId': '8',
                        'serviceOfferFeatures': [
                            {
                                'id': 22,
                                'name': 'Northern Lights Experience',
                                'description': 'Opportunities for Northern Lights viewing and photography',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 11
                            },
                            {
                                'id': 21,
                                'name': 'Design and Architecture Focus',
                                'description': 'Specialized tours highlighting Nordic design and architectural innovations',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 11
                            }
                        ],
                        'files': [
                            {
                                'id': '6207820e-4509-42b2-877f-43c30d950eaa',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'tour-europe-3.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/mountains-7608306_640.jpg',
                                'key': 'tour-image-11',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:09:42.126Z',
                                'updatedAt': '2024-12-04T11:09:42.126Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 11,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 10,
                        'price': '500000.00',
                        'description': '2-day Lagos tour package',
                        'durationType': 'per_month',
                        'discount': 15,
                        'minimumDurationCountForDiscount': 1,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 11
                    }
                }
            ],
            'visaBookingDetails': [
                {
                    'id': 8,
                    'createdAt': '2024-12-26T13:12:40.463Z',
                    'updateDateColumn': '2024-12-26T13:12:40.463Z',
                    'serviceBookingId': '59',
                    'dynamicFormId': null,
                    'serviceClientId': '45',
                    'serviceOfferId': 3,
                    'serviceOfferPriceOptionId': 11,
                    'serviceOffer': {
                        'id': 3,
                        'publicId': '52b1973d-ee0c-482e-ae64-04ac988d9f0b',
                        'name': 'Schengen Visa Assistance',
                        'description': 'Complete support for Schengen visa applications',
                        'type': 'VISA_PROCESSING',
                        'createdAt': '2024-12-04T09:43:56.689Z',
                        'updatedAt': '2024-12-04T09:43:56.689Z',
                        'serviceId': '9',
                        'serviceOfferFeatures': [
                            {
                                'id': 6,
                                'name': 'Personalized Consultation',
                                'description': 'One-on-one guidance through the entire visa application process',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 3
                            },
                            {
                                'id': 5,
                                'name': 'Document Verification',
                                'description': 'Thorough review and verification of all visa application documents',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 3
                            }
                        ],
                        'files': [
                            {
                                'id': '4d9cecbf-fc0e-4466-9713-54f3c5b503d3',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'visa-service-2.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/passport-2642169_640.jpg',
                                'key': 'visa-image-2',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:05:14.185Z',
                                'updatedAt': '2024-12-04T11:05:14.185Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 3,
                                'tourGuideId': null
                            },
                            {
                                'id': '518f20f9-fda6-4f06-81e4-344e6dc08b17',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'visa-service-3.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/american-express-89024_640.jpg',
                                'key': 'visa-image-3',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:09:42.126Z',
                                'updatedAt': '2024-12-04T11:09:42.126Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 3,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 11,
                        'price': '300.00',
                        'description': 'Europe Visa processing service',
                        'durationType': 'per_day',
                        'discount': 0,
                        'minimumDurationCountForDiscount': 1,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 3
                    }
                }
            ]
        },
        {
            'id': '58',
            'paymentReference': '1aee4d7e-45d5-47d3-b1ce-a38d84e5d040',
            'status': 'pending',
            'paymentData': null,
            'createdAt': '2024-12-26T12:06:44.285Z',
            'updatedAt': '2024-12-26T12:06:44.285Z',
            'subscriberUserId': '1',
            'suiteBookingDetails': [
                {
                    'id': '49',
                    'checkInDate': '2024-12-26',
                    'checkOutDate': '2024-12-27',
                    'numberOfAdults': 1,
                    'numberOfChildren': 0,
                    'roomsCount': 1,
                    'createdAt': '2024-12-26T12:06:44.285Z',
                    'updatedAt': '2024-12-26T12:06:44.285Z',
                    'serviceBookingId': '58',
                    'suitePropertyId': '5',
                    'serviceClientId': '45',
                    'serviceId': null,
                    'serviceOfferPriceOptionId': 4,
                    'suiteProperty': {
                        'id': '5',
                        'publicId': '6663c9a8-cec2-45ad-b00d-2feec253629b',
                        'type': 'rooms',
                        'name': null,
                        'category': 'studio_apartment_room',
                        'description': 'Cozy studio apartment in downtown',
                        'availableQuantity': 10,
                        'createdAt': '2024-09-19T17:23:33.077Z',
                        'updatedAt': '2024-09-19T17:23:33.077Z',
                        'deletedAt': null,
                        'serviceProviderId': '4',
                        'serviceId': '4',
                        'suitePropertyFeatures': [],
                        'files': [
                            {
                                'id': '1726c0a3-cd18-439b-aeee-6c4ef1139b0b',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'Starling_Suite.png',
                                'mimetype': 'image/png',
                                'size': '211.1',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/Starling_Suite.png',
                                'key': 'Starling_Suite.png',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-11-28T22:56:34.116Z',
                                'updatedAt': '2024-11-28T22:56:34.116Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': '5',
                                'serviceOfferId': null,
                                'tourGuideId': null
                            },
                            {
                                'id': 'b2d2ebef-1ea5-458c-b9aa-31814670e0e6',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'Starling_Cars.png',
                                'mimetype': 'image/png',
                                'size': '164.5',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/Starling_Cars.png',
                                'key': 'Starling_Cars.png',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-11-28T22:56:34.116Z',
                                'updatedAt': '2024-11-28T22:56:34.116Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': '5',
                                'serviceOfferId': null,
                                'tourGuideId': null
                            },
                            {
                                'id': '48d5e70f-64c9-48ec-afad-6f7bf5865efe',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'Starling_Tour_Guide.png',
                                'mimetype': 'image/png',
                                'size': '204.3',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/Starling_Tour_Guide.png',
                                'key': 'Starling_Tour_Guide.png',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-11-28T22:56:34.116Z',
                                'updatedAt': '2024-11-28T22:56:34.116Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': '5',
                                'serviceOfferId': null,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOptions': {
                        'id': 4,
                        'price': '85000.00',
                        'description': 'Daily luxury car rental',
                        'durationType': 'per_day',
                        'discount': 10,
                        'minimumDurationCountForDiscount': 3,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 6
                    }
                }
            ],
            'autoBookingDetails': [
                {
                    'id': '17',
                    'startDate': '2024-12-26',
                    'endDate': '2024-12-27',
                    'createdAt': '2024-12-26T12:06:44.285Z',
                    'updatedAt': '2024-12-26T12:06:44.285Z',
                    'serviceClientId': '45',
                    'serviceOfferId': 4,
                    'serviceOfferPriceOptionId': 2,
                    'serviceBookingId': '58',
                    'serviceOffer': {
                        'id': 4,
                        'publicId': '050c680f-8cf8-41e9-97e1-edfe4e48de9e',
                        'name': 'Luxury SUV',
                        'description': 'Spacious and elegant SUV with premium features and advanced safety systems.',
                        'type': 'SUV',
                        'createdAt': '2024-12-04T09:49:08.109Z',
                        'updatedAt': '2024-12-04T09:49:08.109Z',
                        'serviceId': '7',
                        'serviceOfferFeatures': [
                            {
                                'id': 7,
                                'name': 'Premium Leather Interior',
                                'description': 'High-quality leather seats with advanced ergonomic design',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 4
                            },
                            {
                                'id': 8,
                                'name': 'Advanced Safety Systems',
                                'description': 'Comprehensive suite of driver assistance and collision prevention technologies',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 4
                            }
                        ],
                        'files': [
                            {
                                'id': 'db18dff4-3249-4dc7-8a31-9de2b53a4a9d',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'suv-car-4.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/mercedes-benz-913757_640.jpg',
                                'key': 'auto-image-5',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:09:42.126Z',
                                'updatedAt': '2024-12-04T11:09:42.126Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 4,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 2,
                        'price': '100000.00',
                        'description': 'Daily luxury car rental',
                        'durationType': 'per_day',
                        'discount': 10,
                        'minimumDurationCountForDiscount': 3,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 4
                    }
                }
            ],
            'tourBookingDetails': [
                {
                    'id': 11,
                    'date': '2024-12-26',
                    'time': null,
                    'createdAt': '2024-12-26T12:06:44.285Z',
                    'updatedAt': '2024-12-26T12:06:44.285Z',
                    'serviceClientId': '45',
                    'serviceOfferId': 11,
                    'serviceOfferPriceOptionId': 10,
                    'serviceBookingId': '58',
                    'serviceOffer': {
                        'id': 11,
                        'publicId': '09c55561-fec8-43bf-bd0e-8a2ea3a77a3b',
                        'name': 'Nordic Capitals Expedition',
                        'description': 'Comprehensive tour of Scandinavian capitals with emphasis on modern design and natural beauty.',
                        'type': 'GUIDED_TOUR',
                        'createdAt': '2024-12-04T09:49:08.109Z',
                        'updatedAt': '2024-12-04T09:49:08.109Z',
                        'serviceId': '8',
                        'serviceOfferFeatures': [
                            {
                                'id': 22,
                                'name': 'Northern Lights Experience',
                                'description': 'Opportunities for Northern Lights viewing and photography',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 11
                            },
                            {
                                'id': 21,
                                'name': 'Design and Architecture Focus',
                                'description': 'Specialized tours highlighting Nordic design and architectural innovations',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 11
                            }
                        ],
                        'files': [
                            {
                                'id': '6207820e-4509-42b2-877f-43c30d950eaa',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'tour-europe-3.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/mountains-7608306_640.jpg',
                                'key': 'tour-image-11',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:09:42.126Z',
                                'updatedAt': '2024-12-04T11:09:42.126Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 11,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 10,
                        'price': '500000.00',
                        'description': '2-day Lagos tour package',
                        'durationType': 'per_month',
                        'discount': 15,
                        'minimumDurationCountForDiscount': 1,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 11
                    }
                }
            ],
            'visaBookingDetails': [
                {
                    'id': 7,
                    'createdAt': '2024-12-26T12:06:44.285Z',
                    'updateDateColumn': '2024-12-26T12:06:44.285Z',
                    'serviceBookingId': '58',
                    'dynamicFormId': null,
                    'serviceClientId': '45',
                    'serviceOfferId': 3,
                    'serviceOfferPriceOptionId': 11,
                    'serviceOffer': {
                        'id': 3,
                        'publicId': '52b1973d-ee0c-482e-ae64-04ac988d9f0b',
                        'name': 'Schengen Visa Assistance',
                        'description': 'Complete support for Schengen visa applications',
                        'type': 'VISA_PROCESSING',
                        'createdAt': '2024-12-04T09:43:56.689Z',
                        'updatedAt': '2024-12-04T09:43:56.689Z',
                        'serviceId': '9',
                        'serviceOfferFeatures': [
                            {
                                'id': 6,
                                'name': 'Personalized Consultation',
                                'description': 'One-on-one guidance through the entire visa application process',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 3
                            },
                            {
                                'id': 5,
                                'name': 'Document Verification',
                                'description': 'Thorough review and verification of all visa application documents',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 3
                            }
                        ],
                        'files': [
                            {
                                'id': '4d9cecbf-fc0e-4466-9713-54f3c5b503d3',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'visa-service-2.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/passport-2642169_640.jpg',
                                'key': 'visa-image-2',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:05:14.185Z',
                                'updatedAt': '2024-12-04T11:05:14.185Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 3,
                                'tourGuideId': null
                            },
                            {
                                'id': '518f20f9-fda6-4f06-81e4-344e6dc08b17',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'visa-service-3.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/american-express-89024_640.jpg',
                                'key': 'visa-image-3',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:09:42.126Z',
                                'updatedAt': '2024-12-04T11:09:42.126Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 3,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 11,
                        'price': '300.00',
                        'description': 'Europe Visa processing service',
                        'durationType': 'per_day',
                        'discount': 0,
                        'minimumDurationCountForDiscount': 1,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 3
                    }
                }
            ]
        },
        {
            'id': '45',
            'paymentReference': 'bae2f778-d3f8-4b7c-8bab-cd010b786223',
            'status': 'pending',
            'paymentData': null,
            'createdAt': '2024-12-21T18:52:00.464Z',
            'updatedAt': '2024-12-21T18:52:00.464Z',
            'subscriberUserId': '1',
            'suiteBookingDetails': [],
            'autoBookingDetails': [
                {
                    'id': '1',
                    'startDate': '2024-12-16',
                    'endDate': '2024-12-17',
                    'createdAt': '2024-12-21T18:52:00.464Z',
                    'updatedAt': '2024-12-21T18:52:00.464Z',
                    'serviceClientId': '46',
                    'serviceOfferId': 4,
                    'serviceOfferPriceOptionId': 2,
                    'serviceBookingId': '45',
                    'serviceOffer': {
                        'id': 4,
                        'publicId': '050c680f-8cf8-41e9-97e1-edfe4e48de9e',
                        'name': 'Luxury SUV',
                        'description': 'Spacious and elegant SUV with premium features and advanced safety systems.',
                        'type': 'SUV',
                        'createdAt': '2024-12-04T09:49:08.109Z',
                        'updatedAt': '2024-12-04T09:49:08.109Z',
                        'serviceId': '7',
                        'serviceOfferFeatures': [
                            {
                                'id': 7,
                                'name': 'Premium Leather Interior',
                                'description': 'High-quality leather seats with advanced ergonomic design',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 4
                            },
                            {
                                'id': 8,
                                'name': 'Advanced Safety Systems',
                                'description': 'Comprehensive suite of driver assistance and collision prevention technologies',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 4
                            }
                        ],
                        'files': [
                            {
                                'id': 'db18dff4-3249-4dc7-8a31-9de2b53a4a9d',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'suv-car-4.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/mercedes-benz-913757_640.jpg',
                                'key': 'auto-image-5',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:09:42.126Z',
                                'updatedAt': '2024-12-04T11:09:42.126Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 4,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 2,
                        'price': '100000.00',
                        'description': 'Daily luxury car rental',
                        'durationType': 'per_day',
                        'discount': 10,
                        'minimumDurationCountForDiscount': 3,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 4
                    }
                }
            ],
            'tourBookingDetails': [
                {
                    'id': 1,
                    'date': '2024-12-17',
                    'time': null,
                    'createdAt': '2024-12-21T18:52:00.464Z',
                    'updatedAt': '2024-12-21T18:52:00.464Z',
                    'serviceClientId': '47',
                    'serviceOfferId': 2,
                    'serviceOfferPriceOptionId': null,
                    'serviceBookingId': '45',
                    'serviceOffer': {
                        'id': 2,
                        'publicId': 'fdec8fa1-cb42-454d-99fe-6a9a2abf6ebc',
                        'name': 'European Adventure Tour',
                        'description': 'Comprehensive tour of major European destinations',
                        'type': 'GUIDED_TOUR',
                        'createdAt': '2024-12-04T09:43:56.689Z',
                        'updatedAt': '2024-12-04T09:43:56.689Z',
                        'serviceId': '8',
                        'serviceOfferFeatures': [
                            {
                                'id': 4,
                                'name': 'Comprehensive Itinerary',
                                'description': 'Carefully curated travel plan covering major landmarks and hidden gems',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 2
                            },
                            {
                                'id': 3,
                                'name': 'Expert Local Guides',
                                'description': 'Professionally trained guides with in-depth knowledge of European history and culture',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 2
                            }
                        ],
                        'files': [
                            {
                                'id': '18bf0155-2c7a-460b-bcce-229447e42b90',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'europe-tour-2.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/resort-2495223_640.jpg',
                                'key': 'tour-image-2',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:05:14.185Z',
                                'updatedAt': '2024-12-04T11:05:14.185Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 2,
                                'tourGuideId': null
                            },
                            {
                                'id': 'cb8242d5-370a-49e5-b134-27aa7f05467a',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'europe-tour-1.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/resort-2495223_640.jpg',
                                'key': 'tour-image-1',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:05:14.185Z',
                                'updatedAt': '2024-12-04T11:05:14.185Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 2,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': null
                }
            ],
            'visaBookingDetails': []
        },
        {
            'id': '46',
            'paymentReference': '23244476-e31b-4888-8236-8085006db37e',
            'status': 'pending',
            'paymentData': null,
            'createdAt': '2024-12-22T08:02:13.470Z',
            'updatedAt': '2024-12-22T08:02:13.470Z',
            'subscriberUserId': '1',
            'suiteBookingDetails': [],
            'autoBookingDetails': [
                {
                    'id': '2',
                    'startDate': '2024-12-22',
                    'endDate': '2024-12-23',
                    'createdAt': '2024-12-22T08:02:13.470Z',
                    'updatedAt': '2024-12-22T08:02:13.470Z',
                    'serviceClientId': '45',
                    'serviceOfferId': 5,
                    'serviceOfferPriceOptionId': 3,
                    'serviceBookingId': '46',
                    'serviceOffer': {
                        'id': 5,
                        'publicId': 'd19eb48e-73c8-4ff0-a996-9bde0f6f35bb',
                        'name': 'Compact City Car',
                        'description': 'Efficient and nimble urban vehicle perfect for city driving and parking.',
                        'type': 'Hatchback',
                        'createdAt': '2024-12-04T09:49:08.109Z',
                        'updatedAt': '2024-12-04T09:49:08.109Z',
                        'serviceId': '7',
                        'serviceOfferFeatures': [
                            {
                                'id': 9,
                                'name': 'Efficient Fuel Consumption',
                                'description': 'Optimized engine design for maximum fuel efficiency in urban environments',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 5
                            },
                            {
                                'id': 10,
                                'name': 'Compact Parking Assistance',
                                'description': 'Advanced parking sensors and camera system for easy urban maneuvering',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 5
                            }
                        ],
                        'files': [
                            {
                                'id': 'bdaa7ded-64ed-44ab-afd9-6248e9629121',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'auto-car-4.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/car-8951848_640.jpg',
                                'key': 'auto-image-4',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:09:42.126Z',
                                'updatedAt': '2024-12-04T11:09:42.126Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 5,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 3,
                        'price': '25000.00',
                        'description': 'Daily luxury car rental',
                        'durationType': 'per_day',
                        'discount': 10,
                        'minimumDurationCountForDiscount': 3,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 5
                    }
                }
            ],
            'tourBookingDetails': [],
            'visaBookingDetails': []
        },
        {
            'id': '56',
            'paymentReference': '852d037e-05de-446b-a614-cfda69a8888b',
            'status': 'pending',
            'paymentData': null,
            'createdAt': '2024-12-25T16:40:50.992Z',
            'updatedAt': '2024-12-25T16:40:50.992Z',
            'subscriberUserId': '1',
            'suiteBookingDetails': [],
            'autoBookingDetails': [
                {
                    'id': '15',
                    'startDate': '2024-12-25',
                    'endDate': '2024-12-26',
                    'createdAt': '2024-12-25T16:40:50.992Z',
                    'updatedAt': '2024-12-25T16:40:50.992Z',
                    'serviceClientId': '45',
                    'serviceOfferId': 6,
                    'serviceOfferPriceOptionId': 4,
                    'serviceBookingId': '56',
                    'serviceOffer': {
                        'id': 6,
                        'publicId': 'b64a01db-32c4-4c6a-a242-7bc8406dd2ac',
                        'name': 'Electric Performance Sedan',
                        'description': 'High-performance electric sedan with cutting-edge technology and long-range capabilities.',
                        'type': 'Electric',
                        'createdAt': '2024-12-04T09:49:08.109Z',
                        'updatedAt': '2024-12-04T09:49:08.109Z',
                        'serviceId': '7',
                        'serviceOfferFeatures': [
                            {
                                'id': 11,
                                'name': 'Long-Range Battery',
                                'description': 'High-capacity battery providing extended driving range on a single charge',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 6
                            },
                            {
                                'id': 12,
                                'name': 'Regenerative Braking',
                                'description': 'Advanced energy recovery system that increases overall vehicle efficiency',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 6
                            }
                        ],
                        'files': [
                            {
                                'id': 'ea075d07-2a5c-4fe3-af9e-149c7a28706a',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'auto-car-5.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/car-1890494_640.jpg',
                                'key': 'auto-image-5',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:09:42.126Z',
                                'updatedAt': '2024-12-04T11:09:42.126Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 6,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 4,
                        'price': '85000.00',
                        'description': 'Daily luxury car rental',
                        'durationType': 'per_day',
                        'discount': 10,
                        'minimumDurationCountForDiscount': 3,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 6
                    }
                }
            ],
            'tourBookingDetails': [
                {
                    'id': 9,
                    'date': '2024-12-25',
                    'time': null,
                    'createdAt': '2024-12-25T16:40:50.992Z',
                    'updatedAt': '2024-12-25T16:40:50.992Z',
                    'serviceClientId': '45',
                    'serviceOfferId': 2,
                    'serviceOfferPriceOptionId': 6,
                    'serviceBookingId': '56',
                    'serviceOffer': {
                        'id': 2,
                        'publicId': 'fdec8fa1-cb42-454d-99fe-6a9a2abf6ebc',
                        'name': 'European Adventure Tour',
                        'description': 'Comprehensive tour of major European destinations',
                        'type': 'GUIDED_TOUR',
                        'createdAt': '2024-12-04T09:43:56.689Z',
                        'updatedAt': '2024-12-04T09:43:56.689Z',
                        'serviceId': '8',
                        'serviceOfferFeatures': [
                            {
                                'id': 4,
                                'name': 'Comprehensive Itinerary',
                                'description': 'Carefully curated travel plan covering major landmarks and hidden gems',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 2
                            },
                            {
                                'id': 3,
                                'name': 'Expert Local Guides',
                                'description': 'Professionally trained guides with in-depth knowledge of European history and culture',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 2
                            }
                        ],
                        'files': [
                            {
                                'id': '18bf0155-2c7a-460b-bcce-229447e42b90',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'europe-tour-2.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/resort-2495223_640.jpg',
                                'key': 'tour-image-2',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:05:14.185Z',
                                'updatedAt': '2024-12-04T11:05:14.185Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 2,
                                'tourGuideId': null
                            },
                            {
                                'id': 'cb8242d5-370a-49e5-b134-27aa7f05467a',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'europe-tour-1.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/resort-2495223_640.jpg',
                                'key': 'tour-image-1',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:05:14.185Z',
                                'updatedAt': '2024-12-04T11:05:14.185Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 2,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 6,
                        'price': '1500000.00',
                        'description': '5-day European tour package',
                        'durationType': 'per_month',
                        'discount': 15,
                        'minimumDurationCountForDiscount': 1,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 2
                    }
                }
            ],
            'visaBookingDetails': []
        },
        {
            'id': '57',
            'paymentReference': '692d5fa3-1de3-4457-82f0-257cd0a371e3',
            'status': 'pending',
            'paymentData': null,
            'createdAt': '2024-12-26T09:18:46.243Z',
            'updatedAt': '2024-12-26T09:18:46.243Z',
            'subscriberUserId': '1',
            'suiteBookingDetails': [
                {
                    'id': '48',
                    'checkInDate': '2024-12-26',
                    'checkOutDate': '2024-12-27',
                    'numberOfAdults': 1,
                    'numberOfChildren': 0,
                    'roomsCount': 1,
                    'createdAt': '2024-12-26T09:18:46.243Z',
                    'updatedAt': '2024-12-26T09:18:46.243Z',
                    'serviceBookingId': '57',
                    'suitePropertyId': '5',
                    'serviceClientId': '45',
                    'serviceId': null,
                    'serviceOfferPriceOptionId': 4,
                    'suiteProperty': {
                        'id': '5',
                        'publicId': '6663c9a8-cec2-45ad-b00d-2feec253629b',
                        'type': 'rooms',
                        'name': null,
                        'category': 'studio_apartment_room',
                        'description': 'Cozy studio apartment in downtown',
                        'availableQuantity': 10,
                        'createdAt': '2024-09-19T17:23:33.077Z',
                        'updatedAt': '2024-09-19T17:23:33.077Z',
                        'deletedAt': null,
                        'serviceProviderId': '4',
                        'serviceId': '4',
                        'suitePropertyFeatures': [],
                        'files': [
                            {
                                'id': '1726c0a3-cd18-439b-aeee-6c4ef1139b0b',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'Starling_Suite.png',
                                'mimetype': 'image/png',
                                'size': '211.1',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/Starling_Suite.png',
                                'key': 'Starling_Suite.png',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-11-28T22:56:34.116Z',
                                'updatedAt': '2024-11-28T22:56:34.116Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': '5',
                                'serviceOfferId': null,
                                'tourGuideId': null
                            },
                            {
                                'id': 'b2d2ebef-1ea5-458c-b9aa-31814670e0e6',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'Starling_Cars.png',
                                'mimetype': 'image/png',
                                'size': '164.5',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/Starling_Cars.png',
                                'key': 'Starling_Cars.png',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-11-28T22:56:34.116Z',
                                'updatedAt': '2024-11-28T22:56:34.116Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': '5',
                                'serviceOfferId': null,
                                'tourGuideId': null
                            },
                            {
                                'id': '48d5e70f-64c9-48ec-afad-6f7bf5865efe',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'Starling_Tour_Guide.png',
                                'mimetype': 'image/png',
                                'size': '204.3',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/Starling_Tour_Guide.png',
                                'key': 'Starling_Tour_Guide.png',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-11-28T22:56:34.116Z',
                                'updatedAt': '2024-11-28T22:56:34.116Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': '5',
                                'serviceOfferId': null,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOptions': {
                        'id': 4,
                        'price': '85000.00',
                        'description': 'Daily luxury car rental',
                        'durationType': 'per_day',
                        'discount': 10,
                        'minimumDurationCountForDiscount': 3,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 6
                    }
                }
            ],
            'autoBookingDetails': [
                {
                    'id': '16',
                    'startDate': '2024-12-26',
                    'endDate': '2024-12-27',
                    'createdAt': '2024-12-26T09:18:46.243Z',
                    'updatedAt': '2024-12-26T09:18:46.243Z',
                    'serviceClientId': '45',
                    'serviceOfferId': 7,
                    'serviceOfferPriceOptionId': 5,
                    'serviceBookingId': '57',
                    'serviceOffer': {
                        'id': 7,
                        'publicId': '5d1e2100-fe8b-4e84-bda4-bfde7f98f213',
                        'name': 'Classic Vintage Car',
                        'description': 'Beautifully restored classic car for special occasions and vintage enthusiasts.',
                        'type': 'Classic',
                        'createdAt': '2024-12-04T09:49:08.109Z',
                        'updatedAt': '2024-12-04T09:49:08.109Z',
                        'serviceId': '7',
                        'serviceOfferFeatures': [
                            {
                                'id': 13,
                                'name': 'Meticulously Restored',
                                'description': 'Professionally restored to original specifications with attention to historical accuracy',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 7
                            },
                            {
                                'id': 14,
                                'name': 'Authentic Period Accessories',
                                'description': 'Includes original or period-correct accessories and documentation',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 7
                            }
                        ],
                        'files': [
                            {
                                'id': '0811f709-6a93-4121-9fad-661e06449f42',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'auto-car-7.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/maserati-gran-turismo-1649119_640.jpg',
                                'key': 'auto-image-7',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:09:42.126Z',
                                'updatedAt': '2024-12-04T11:09:42.126Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 7,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 5,
                        'price': '120000.00',
                        'description': 'Daily luxury car rental',
                        'durationType': 'per_day',
                        'discount': 10,
                        'minimumDurationCountForDiscount': 3,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 7
                    }
                }
            ],
            'tourBookingDetails': [
                {
                    'id': 10,
                    'date': '2024-12-26',
                    'time': null,
                    'createdAt': '2024-12-26T09:18:46.243Z',
                    'updatedAt': '2024-12-26T09:18:46.243Z',
                    'serviceClientId': '45',
                    'serviceOfferId': 2,
                    'serviceOfferPriceOptionId': 6,
                    'serviceBookingId': '57',
                    'serviceOffer': {
                        'id': 2,
                        'publicId': 'fdec8fa1-cb42-454d-99fe-6a9a2abf6ebc',
                        'name': 'European Adventure Tour',
                        'description': 'Comprehensive tour of major European destinations',
                        'type': 'GUIDED_TOUR',
                        'createdAt': '2024-12-04T09:43:56.689Z',
                        'updatedAt': '2024-12-04T09:43:56.689Z',
                        'serviceId': '8',
                        'serviceOfferFeatures': [
                            {
                                'id': 4,
                                'name': 'Comprehensive Itinerary',
                                'description': 'Carefully curated travel plan covering major landmarks and hidden gems',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 2
                            },
                            {
                                'id': 3,
                                'name': 'Expert Local Guides',
                                'description': 'Professionally trained guides with in-depth knowledge of European history and culture',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 2
                            }
                        ],
                        'files': [
                            {
                                'id': '18bf0155-2c7a-460b-bcce-229447e42b90',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'europe-tour-2.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/resort-2495223_640.jpg',
                                'key': 'tour-image-2',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:05:14.185Z',
                                'updatedAt': '2024-12-04T11:05:14.185Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 2,
                                'tourGuideId': null
                            },
                            {
                                'id': 'cb8242d5-370a-49e5-b134-27aa7f05467a',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'europe-tour-1.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/resort-2495223_640.jpg',
                                'key': 'tour-image-1',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:05:14.185Z',
                                'updatedAt': '2024-12-04T11:05:14.185Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 2,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 6,
                        'price': '1500000.00',
                        'description': '5-day European tour package',
                        'durationType': 'per_month',
                        'discount': 15,
                        'minimumDurationCountForDiscount': 1,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 2
                    }
                }
            ],
            'visaBookingDetails': [
                {
                    'id': 6,
                    'createdAt': '2024-12-26T09:18:46.243Z',
                    'updateDateColumn': '2024-12-26T09:18:46.243Z',
                    'serviceBookingId': '57',
                    'dynamicFormId': null,
                    'serviceClientId': '45',
                    'serviceOfferId': 12,
                    'serviceOfferPriceOptionId': 13,
                    'serviceOffer': {
                        'id': 12,
                        'publicId': '2f2d4af5-6977-4cf9-b1c7-5191b8bb1109',
                        'name': 'Comprehensive Visa Processing Support',
                        'description': 'Full-service visa application support including document preparation, translation, and consultation for international travel.',
                        'type': 'VISA_PROCESSING',
                        'createdAt': '2024-12-04T09:49:08.109Z',
                        'updatedAt': '2024-12-04T09:49:08.109Z',
                        'serviceId': '9',
                        'serviceOfferFeatures': [
                            {
                                'id': 24,
                                'name': 'Application Tracking',
                                'description': 'Real-time status updates and tracking of visa application',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 12
                            },
                            {
                                'id': 23,
                                'name': 'Translation Services',
                                'description': 'Professional translation of all required documents',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 12
                            }
                        ],
                        'files': [
                            {
                                'id': 'aeff3c54-9bf7-4e82-9306-d41bfd6ea7fd',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'visa-service-2.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/passport-7564502_640.jpg',
                                'key': 'visa-image-2',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:05:14.185Z',
                                'updatedAt': '2024-12-04T11:05:14.185Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 12,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': {
                        'id': 13,
                        'price': '800000.00',
                        'description': '2-day Lagos tour package',
                        'durationType': 'per_day',
                        'discount': 15,
                        'minimumDurationCountForDiscount': 1,
                        'createdAt': '2024-12-04T10:30:49.010Z',
                        'updatedAt': '2024-12-04T10:30:49.010Z',
                        'currencyId': '166',
                        'serviceOfferId': 12
                    }
                }
            ]
        },
        {
            'id': '47',
            'paymentReference': '97fe7299-7e0b-4d71-ae2f-6633158d2383',
            'status': 'pending',
            'paymentData': null,
            'createdAt': '2024-12-22T08:57:34.954Z',
            'updatedAt': '2024-12-22T08:57:34.954Z',
            'subscriberUserId': '1',
            'suiteBookingDetails': [],
            'autoBookingDetails': [],
            'tourBookingDetails': [
                {
                    'id': 2,
                    'date': '2024-12-22',
                    'time': null,
                    'createdAt': '2024-12-22T08:57:34.954Z',
                    'updatedAt': '2024-12-22T08:57:34.954Z',
                    'serviceClientId': '49',
                    'serviceOfferId': 10,
                    'serviceOfferPriceOptionId': null,
                    'serviceBookingId': '47',
                    'serviceOffer': {
                        'id': 10,
                        'publicId': 'f63b56bf-34be-43fa-b0b9-659e358d56ef',
                        'name': 'Eastern European Discovery',
                        'description': 'In-depth exploration of historic cities and cultural highlights in Eastern Europe.',
                        'type': 'GUIDED_TOUR',
                        'createdAt': '2024-12-04T09:49:08.109Z',
                        'updatedAt': '2024-12-04T09:49:08.109Z',
                        'serviceId': '8',
                        'serviceOfferFeatures': [
                            {
                                'id': 20,
                                'name': 'Local Expert Insights',
                                'description': 'Guided by historians and local experts with deep regional knowledge',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 10
                            },
                            {
                                'id': 19,
                                'name': 'Historic Site Exploration',
                                'description': 'In-depth visits to UNESCO World Heritage sites',
                                'icon': null,
                                'createdAt': '2024-12-04T11:01:07.115Z',
                                'updatedAt': '2024-12-04T11:01:07.115Z',
                                'serviceOfferId': 10
                            }
                        ],
                        'files': [
                            {
                                'id': 'aa89eddc-5462-4180-b85f-f2705ce25f5a',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'tour-europe-3.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/buildings-5551816_640.jpg',
                                'key': 'tour-image-10',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:09:42.126Z',
                                'updatedAt': '2024-12-04T11:09:42.126Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 10,
                                'tourGuideId': null
                            },
                            {
                                'id': '51ebd814-112b-4f13-ac2c-f55611aeef44',
                                'forEntity': null,
                                'forEntityId': null,
                                'filename': 'tour-europe-5.jpg',
                                'mimetype': 'image/jpeg',
                                'size': '640000',
                                'url': 'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/paris-967518_640.jpg',
                                'key': 'tour-image-5',
                                'filePurpose': null,
                                'metadata': null,
                                'fileServerStatus': null,
                                'createdAt': '2024-12-04T11:09:42.126Z',
                                'updatedAt': '2024-12-04T11:09:42.126Z',
                                'deletedAt': null,
                                'serviceId': null,
                                'suitePropertyId': null,
                                'serviceOfferId': 10,
                                'tourGuideId': null
                            }
                        ]
                    },
                    'serviceOfferPriceOption': null
                }
            ],
            'visaBookingDetails': []
        }
    ]

export  {bookings};

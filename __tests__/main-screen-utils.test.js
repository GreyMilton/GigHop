const { createNewVenueReferenceObject, findIndexOfEvent }= require('../utils/main-screen-utils')

describe('createNewVenueReferenceObject', () => {
  // what do I want it to do?

// I want it to output an object that lists all ids of venues from that day, with no duplicates, and their values being an array of gigs (that are on that day at that venue) with an "_id" key and a "time_start" key
// I want the array of gigs to be in order of start time!
// The input will be an array of objects (gigs)
// each object will have these three keys (and many more): "_id", "venue_id" and "time_start"

// example input array: [{"_id": "A123", "venue_id": "Z111", "time_start": "1pm..."}, {"_id": "A456", "venue_id": "Z222", "time_start": "2pm..."}, {"_id": "A789", "venue_id": "Z111", "time_start": "3pm..."}]
// example output object: {"Z111": [{"_id": "A123", "time_start": "1pm..."}, {"_id": "A789", "time_start": "3pm..."}], "Z222": { "_id": "A456", "time_start": "2pm..."}}
  const testArray = [
    {
      "_id": "61ae26cb8d70b95db023dbe6",
      "entry_price": 0,
      "description": "Come join Grey and his best friends the Wiggles! Fun for all the family - even your grandma!",
      "venue_id": "61ae068dcff5425db378629e",
      "user_id": "61ae0411e399a088552170ba",
      "artists_ids": [
        {
          "artist_id": "61ae0411e399a088552170ba"
        }
      ],
      "authorised": {
        "artist": true,
        "venue": true
      },
      "time_end": "2021-12-10T22:00:00.000Z",
      "time_start": "2021-12-10T18:30:00.000Z",
      "picture": "https://upload.wikimedia.org/wikipedia/commons/e/ef/The_Wiggles_live_in_Sydney_2018.jpg",
      "event_name": "Grey and the Wiggles",
      "venue_info": [
        {
          "_id": "61ae068dcff5425db378629e",
          "venue_name": "The Three Crowns",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.36835"
            },
            "longitude": {
              "$numberDecimal": "-4.13577"
            }
          },
          "description": "Family friendly pub/restaurant and bed and breakfast. Dog friendly. Open 7 days a week, live bands every Friday, DJ Saturdays, Acoustic nights Wednesday and events as posted. Outdoor seating on Harbour.",
          "pin_colour": "cyan",
          "address": "11 The Parade, Plymouth PL1 2JL",
          "picture": "https://i2-prod.plymouthherald.co.uk/incoming/article579474.ece/ALTERNATES/s615/0_929382JPG.jpg",
          "upcoming_events": [
            {
              "event_id": "61ae26cb8d70b95db023dbe6"
            }
          ],
          "owner_id": "61ae22d28d70b95db023dbdd"
        }
      ]
    },
    {
      "_id": "61ae29d18d70b95db023dbe8",
      "entry_price": 5,
      "description": "Stuart is so angry he ends the dog days",
      "venue_id": "61ae0588cff5425db378629d",
      "user_id": "61ae0588cff5425db378629d",
      "artists_ids": [
        {
          "artist_id": "61ae20918d70b95db023dbd9"
        }
      ],
      "authorised": {
        "venue": true,
        "artist": true
      },
      "time_end": "2021-12-09T23:30:00.000Z",
      "time_start": "2021-12-09T18:30:00.000Z",
      "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS96l_jY1rR5lUyXb6SdnyiXFgGdiyIQljjg&usqp=CAU",
      "event_name": "Stuarts rages",
      "venue_info": [
        {
          "_id": "61ae0588cff5425db378629d",
          "venue_name": "The Ship",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.3678"
            },
            "longitude": {
              "$numberDecimal": "-4.13566"
            }
          },
          "description": "Located on the harbour in Plymouth's historic Barbican area, The Ship is a stylish bar and restaurant that offers al fresco dining under giant umbrellas and an upstairs restaurant and function room. Perfect for meeting friends and family throughout the year, The Ship offers a warm welcome, cold award winning beer and great food, all delivered with excellent levels of customer service.",
          "pin_colour": "yellow",
          "picture": "https://scontent.fbrs4-2.fna.fbcdn.net/v/t1.6435-9/34436345_1695609087219753_5673294559816187904_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=973b4a&_nc_ohc=JoCFuKsX408AX_ona5T&_nc_ht=scontent.fbrs4-2.fna&oh=2a165116a3d4a8235cba946db57e7f2c&oe=61D4AE1D",
          "upcoming_events": [
            "testId",
            [
              "testId"
            ],
            "testId",
            "REMOVE ME",
            "Another event",
            "61af71a85d1bb72b490f1fd9",
            "61af71a85d1bb72b490f1fd9",
            {
              "event_id": "61af71a85d1bb72b490f1fd9"
            }
          ],
          "address": "The Barbican, Plymouth PL1 2JZ",
          "owner_id": "61ae26618d70b95db023dbe4"
        }
      ]
    },
    {
      "_id": "61ae2a868d70b95db023dbe9",
      "entry_price": 15,
      "description": "Come see Ency move his legs so fast that his trousers look baggy",
      "venue_id": "61ae0588cff5425db378629d",
      "user_id": "61ae21428d70b95db023dbda",
      "artists_ids": [
        {
          "artist_id": "61ae21428d70b95db023dbda"
        }
      ],
      "authorised": {
        "venue": false,
        "artist": true
      },
      "time_end": "2021-12-10T18:00:00.000Z",
      "time_start": "2021-12-10T14:30:00.000Z",
      "picture": null,
      "event_name": "Ency hammer pants",
      "venue_info": [
        {
          "_id": "61ae0588cff5425db378629d",
          "venue_name": "The Ship",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.3678"
            },
            "longitude": {
              "$numberDecimal": "-4.13566"
            }
          },
          "description": "Located on the harbour in Plymouth's historic Barbican area, The Ship is a stylish bar and restaurant that offers al fresco dining under giant umbrellas and an upstairs restaurant and function room. Perfect for meeting friends and family throughout the year, The Ship offers a warm welcome, cold award winning beer and great food, all delivered with excellent levels of customer service.",
          "pin_colour": "yellow",
          "picture": "https://scontent.fbrs4-2.fna.fbcdn.net/v/t1.6435-9/34436345_1695609087219753_5673294559816187904_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=973b4a&_nc_ohc=JoCFuKsX408AX_ona5T&_nc_ht=scontent.fbrs4-2.fna&oh=2a165116a3d4a8235cba946db57e7f2c&oe=61D4AE1D",
          "upcoming_events": [
            "testId",
            [
              "testId"
            ],
            "testId",
            "REMOVE ME",
            "Another event",
            "61af71a85d1bb72b490f1fd9",
            "61af71a85d1bb72b490f1fd9",
            {
              "event_id": "61af71a85d1bb72b490f1fd9"
            }
          ],
          "address": "The Barbican, Plymouth PL1 2JZ",
          "owner_id": "61ae26618d70b95db023dbe4"
        }
      ]
    },
    {
      "_id": "61ae2b128d70b95db023dbea",
      "entry_price": 7.99,
      "description": "Every wondered whats in the dom, come down and find out",
      "venue_id": "61ae06f4cff5425db37862a0",
      "user_id": "61ae22728d70b95db023dbdc",
      "artists_ids": [
        {
          "artist_id": "61ae21778d70b95db023dbdb"
        }
      ],
      "authorised": {
        "venue": true,
        "artist": false
      },
      "time_end": "2021-12-10T21:30:00.000Z",
      "time_start": "2021-12-10T18:30:00.000Z",
      "picture": null,
      "event_name": "The DOM",
      "venue_info": [
        {
          "_id": "61ae06f4cff5425db37862a0",
          "venue_name": "Bar Rakuda",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.36763"
            },
            "longitude": {
              "$numberDecimal": "-4.13511"
            }
          },
          "description": "Rakuda Pizzeria serving delicious homemade pizza and pasta with delicious cocktails, wine and beers. Pizza and Pasta Takeaway available Monday - Sunday 1pm-10pm Call us on 01752 221155 or for delivery please visit Deliveroo",
          "pin_colour": "green",
          "address": "11 Quay Rd, Plymouth PL1 2JZ",
          "picture": "https://i.pinimg.com/736x/59/7c/52/597c5229368aac605c36cd20f25b7dbb--seafood-pasta-pasta-bar.jpg",
          "upcoming_events": [
            {
              "event_id": "61ae2b128d70b95db023dbea"
            }
          ],
          "owner_id": "61ae25df8d70b95db023dbe3"
        }
      ]
    },
    {
      "_id": "61af71a85d1bb72b490f1fd9",
      "event_name": "James does a sexy dance for everyone",
      "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKkR5ZlaUlvXcs62Vx2DWPyKnkReLmqJkPFQ&usqp=CAU",
      "entry_price": 59.99,
      "authorised": {
        "artist": true,
        "venue": true
      },
      "time_start": "2021-12-15T17:30:00.000Z",
      "artists_ids": [
        {
          "artist_id": "61b083d625a8969bbea2e34b"
        }
      ],
      "time_end": "2021-12-15T22:30:00.000Z",
      "venue_id": null,
      "venue_info": [
        
      ]
    },
    {
      "_id": "61b36fdba3ab2ada0339d911",
      "event_name": "shyFly and Spitfire Tides present...",
      "picture": "https://scontent.fbrs4-1.fna.fbcdn.net/v/t39.30808-6/262972007_942672113021816_1427291389984370158_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=bJ-juc0oC7cAX8Lts-W&_nc_ht=scontent.fbrs4-1.fna&oh=946fbec9aaccedcf4bdc534540c2b7d7&oe=61B829BA",
      "description": "shyFly and Spitfire Tides bring you a raucous night of indie/alternative rock that you don't want to miss.",
      "entry_price": 0,
      "authorised": {
        "artist": true,
        "venue": true
      },
      "time_start": "2021-12-03T21:00:00.000Z",
      "artists_ids": [
        {
          "artist_id": "61b20df6fda86e8c3862a5f2"
        },
        {
          "artist_id": "61b359e8ff1bf6e5ba60e8f4"
        }
      ],
      "time_end": "2021-12-03T23:59:00.000Z",
      "venue_id": "61b20e309d78413c1152a8d1",
      "user_id": "61b35b04ff1bf6e5ba60e8f5",
      "venue_info": [
        {
          "_id": "61b20e309d78413c1152a8d1",
          "venue_name": "Rock Bottom Bar",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.37481030279088"
            },
            "longitude": {
              "$numberDecimal": "-4.1373855927130005"
            }
          },
          "description": "Excellent little venue at the bottom of North Hill in the Centre of Plymouth. If you love live music then this is your place to go",
          "pin_colour": "red",
          "picture": "https://lh5.googleusercontent.com/p/AF1QipOM-s4H7fFAKNiycJXa51C_OJ7Xhr1VEG352-Q=w408-h544-k-no",
          "upcoming_events": [
            
          ],
          "address": "36 Drake Circus, Plymouth PL4 8AB",
          "owner_id": "61b20fa89d78413c1152a8d3"
        }
      ]
    },
    {
      "_id": "61b37ba83beaac553547a26b",
      "entry_price": 0,
      "description": "Have a cuppa whilst listening to one of the most iconic bands of all time! n.b. may not actually be the Beatles.",
      "venue_id": "61ae068dcff5425db378629e",
      "user_id": "61b21346c5e75a7c373dca18",
      "artists_ids": [
        {
          "artist_id": "61b20cc49d78413c1152a8cf"
        }
      ],
      "authorised": {
        "artist": true,
        "venue": true
      },
      "time_end": "2021-12-10T18:00:00.000Z",
      "time_start": "2021-12-10T16:30:00.000Z",
      "picture": "https://images.pulsewebcontent.com/photos/2018/05_May/800/Beatles1969_5_18.jpg",
      "event_name": "Afternoon Tea with The Beatles",
      "venue_info": [
        {
          "_id": "61ae068dcff5425db378629e",
          "venue_name": "The Three Crowns",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.36835"
            },
            "longitude": {
              "$numberDecimal": "-4.13577"
            }
          },
          "description": "Family friendly pub/restaurant and bed and breakfast. Dog friendly. Open 7 days a week, live bands every Friday, DJ Saturdays, Acoustic nights Wednesday and events as posted. Outdoor seating on Harbour.",
          "pin_colour": "cyan",
          "address": "11 The Parade, Plymouth PL1 2JL",
          "picture": "https://i2-prod.plymouthherald.co.uk/incoming/article579474.ece/ALTERNATES/s615/0_929382JPG.jpg",
          "upcoming_events": [
            {
              "event_id": "61ae26cb8d70b95db023dbe6"
            }
          ],
          "owner_id": "61ae22d28d70b95db023dbdd"
        }
      ]
    }
  ];
  const testArrayCopy = [
    {
      "_id": "61ae26cb8d70b95db023dbe6",
      "entry_price": 0,
      "description": "Come join Grey and his best friends the Wiggles! Fun for all the family - even your grandma!",
      "venue_id": "61ae068dcff5425db378629e",
      "user_id": "61ae0411e399a088552170ba",
      "artists_ids": [
        {
          "artist_id": "61ae0411e399a088552170ba"
        }
      ],
      "authorised": {
        "artist": true,
        "venue": true
      },
      "time_end": "2021-12-10T22:00:00.000Z",
      "time_start": "2021-12-10T18:30:00.000Z",
      "picture": "https://upload.wikimedia.org/wikipedia/commons/e/ef/The_Wiggles_live_in_Sydney_2018.jpg",
      "event_name": "Grey and the Wiggles",
      "venue_info": [
        {
          "_id": "61ae068dcff5425db378629e",
          "venue_name": "The Three Crowns",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.36835"
            },
            "longitude": {
              "$numberDecimal": "-4.13577"
            }
          },
          "description": "Family friendly pub/restaurant and bed and breakfast. Dog friendly. Open 7 days a week, live bands every Friday, DJ Saturdays, Acoustic nights Wednesday and events as posted. Outdoor seating on Harbour.",
          "pin_colour": "cyan",
          "address": "11 The Parade, Plymouth PL1 2JL",
          "picture": "https://i2-prod.plymouthherald.co.uk/incoming/article579474.ece/ALTERNATES/s615/0_929382JPG.jpg",
          "upcoming_events": [
            {
              "event_id": "61ae26cb8d70b95db023dbe6"
            }
          ],
          "owner_id": "61ae22d28d70b95db023dbdd"
        }
      ]
    },
    {
      "_id": "61ae29d18d70b95db023dbe8",
      "entry_price": 5,
      "description": "Stuart is so angry he ends the dog days",
      "venue_id": "61ae0588cff5425db378629d",
      "user_id": "61ae0588cff5425db378629d",
      "artists_ids": [
        {
          "artist_id": "61ae20918d70b95db023dbd9"
        }
      ],
      "authorised": {
        "venue": true,
        "artist": true
      },
      "time_end": "2021-12-09T23:30:00.000Z",
      "time_start": "2021-12-09T18:30:00.000Z",
      "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS96l_jY1rR5lUyXb6SdnyiXFgGdiyIQljjg&usqp=CAU",
      "event_name": "Stuarts rages",
      "venue_info": [
        {
          "_id": "61ae0588cff5425db378629d",
          "venue_name": "The Ship",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.3678"
            },
            "longitude": {
              "$numberDecimal": "-4.13566"
            }
          },
          "description": "Located on the harbour in Plymouth's historic Barbican area, The Ship is a stylish bar and restaurant that offers al fresco dining under giant umbrellas and an upstairs restaurant and function room. Perfect for meeting friends and family throughout the year, The Ship offers a warm welcome, cold award winning beer and great food, all delivered with excellent levels of customer service.",
          "pin_colour": "yellow",
          "picture": "https://scontent.fbrs4-2.fna.fbcdn.net/v/t1.6435-9/34436345_1695609087219753_5673294559816187904_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=973b4a&_nc_ohc=JoCFuKsX408AX_ona5T&_nc_ht=scontent.fbrs4-2.fna&oh=2a165116a3d4a8235cba946db57e7f2c&oe=61D4AE1D",
          "upcoming_events": [
            "testId",
            [
              "testId"
            ],
            "testId",
            "REMOVE ME",
            "Another event",
            "61af71a85d1bb72b490f1fd9",
            "61af71a85d1bb72b490f1fd9",
            {
              "event_id": "61af71a85d1bb72b490f1fd9"
            }
          ],
          "address": "The Barbican, Plymouth PL1 2JZ",
          "owner_id": "61ae26618d70b95db023dbe4"
        }
      ]
    },
    {
      "_id": "61ae2a868d70b95db023dbe9",
      "entry_price": 15,
      "description": "Come see Ency move his legs so fast that his trousers look baggy",
      "venue_id": "61ae0588cff5425db378629d",
      "user_id": "61ae21428d70b95db023dbda",
      "artists_ids": [
        {
          "artist_id": "61ae21428d70b95db023dbda"
        }
      ],
      "authorised": {
        "venue": false,
        "artist": true
      },
      "time_end": "2021-12-10T18:00:00.000Z",
      "time_start": "2021-12-10T14:30:00.000Z",
      "picture": null,
      "event_name": "Ency hammer pants",
      "venue_info": [
        {
          "_id": "61ae0588cff5425db378629d",
          "venue_name": "The Ship",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.3678"
            },
            "longitude": {
              "$numberDecimal": "-4.13566"
            }
          },
          "description": "Located on the harbour in Plymouth's historic Barbican area, The Ship is a stylish bar and restaurant that offers al fresco dining under giant umbrellas and an upstairs restaurant and function room. Perfect for meeting friends and family throughout the year, The Ship offers a warm welcome, cold award winning beer and great food, all delivered with excellent levels of customer service.",
          "pin_colour": "yellow",
          "picture": "https://scontent.fbrs4-2.fna.fbcdn.net/v/t1.6435-9/34436345_1695609087219753_5673294559816187904_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=973b4a&_nc_ohc=JoCFuKsX408AX_ona5T&_nc_ht=scontent.fbrs4-2.fna&oh=2a165116a3d4a8235cba946db57e7f2c&oe=61D4AE1D",
          "upcoming_events": [
            "testId",
            [
              "testId"
            ],
            "testId",
            "REMOVE ME",
            "Another event",
            "61af71a85d1bb72b490f1fd9",
            "61af71a85d1bb72b490f1fd9",
            {
              "event_id": "61af71a85d1bb72b490f1fd9"
            }
          ],
          "address": "The Barbican, Plymouth PL1 2JZ",
          "owner_id": "61ae26618d70b95db023dbe4"
        }
      ]
    },
    {
      "_id": "61ae2b128d70b95db023dbea",
      "entry_price": 7.99,
      "description": "Every wondered whats in the dom, come down and find out",
      "venue_id": "61ae06f4cff5425db37862a0",
      "user_id": "61ae22728d70b95db023dbdc",
      "artists_ids": [
        {
          "artist_id": "61ae21778d70b95db023dbdb"
        }
      ],
      "authorised": {
        "venue": true,
        "artist": false
      },
      "time_end": "2021-12-10T21:30:00.000Z",
      "time_start": "2021-12-10T18:30:00.000Z",
      "picture": null,
      "event_name": "The DOM",
      "venue_info": [
        {
          "_id": "61ae06f4cff5425db37862a0",
          "venue_name": "Bar Rakuda",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.36763"
            },
            "longitude": {
              "$numberDecimal": "-4.13511"
            }
          },
          "description": "Rakuda Pizzeria serving delicious homemade pizza and pasta with delicious cocktails, wine and beers. Pizza and Pasta Takeaway available Monday - Sunday 1pm-10pm Call us on 01752 221155 or for delivery please visit Deliveroo",
          "pin_colour": "green",
          "address": "11 Quay Rd, Plymouth PL1 2JZ",
          "picture": "https://i.pinimg.com/736x/59/7c/52/597c5229368aac605c36cd20f25b7dbb--seafood-pasta-pasta-bar.jpg",
          "upcoming_events": [
            {
              "event_id": "61ae2b128d70b95db023dbea"
            }
          ],
          "owner_id": "61ae25df8d70b95db023dbe3"
        }
      ]
    },
    {
      "_id": "61af71a85d1bb72b490f1fd9",
      "event_name": "James does a sexy dance for everyone",
      "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKkR5ZlaUlvXcs62Vx2DWPyKnkReLmqJkPFQ&usqp=CAU",
      "entry_price": 59.99,
      "authorised": {
        "artist": true,
        "venue": true
      },
      "time_start": "2021-12-15T17:30:00.000Z",
      "artists_ids": [
        {
          "artist_id": "61b083d625a8969bbea2e34b"
        }
      ],
      "time_end": "2021-12-15T22:30:00.000Z",
      "venue_id": null,
      "venue_info": [
        
      ]
    },
    {
      "_id": "61b36fdba3ab2ada0339d911",
      "event_name": "shyFly and Spitfire Tides present...",
      "picture": "https://scontent.fbrs4-1.fna.fbcdn.net/v/t39.30808-6/262972007_942672113021816_1427291389984370158_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=bJ-juc0oC7cAX8Lts-W&_nc_ht=scontent.fbrs4-1.fna&oh=946fbec9aaccedcf4bdc534540c2b7d7&oe=61B829BA",
      "description": "shyFly and Spitfire Tides bring you a raucous night of indie/alternative rock that you don't want to miss.",
      "entry_price": 0,
      "authorised": {
        "artist": true,
        "venue": true
      },
      "time_start": "2021-12-03T21:00:00.000Z",
      "artists_ids": [
        {
          "artist_id": "61b20df6fda86e8c3862a5f2"
        },
        {
          "artist_id": "61b359e8ff1bf6e5ba60e8f4"
        }
      ],
      "time_end": "2021-12-03T23:59:00.000Z",
      "venue_id": "61b20e309d78413c1152a8d1",
      "user_id": "61b35b04ff1bf6e5ba60e8f5",
      "venue_info": [
        {
          "_id": "61b20e309d78413c1152a8d1",
          "venue_name": "Rock Bottom Bar",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.37481030279088"
            },
            "longitude": {
              "$numberDecimal": "-4.1373855927130005"
            }
          },
          "description": "Excellent little venue at the bottom of North Hill in the Centre of Plymouth. If you love live music then this is your place to go",
          "pin_colour": "red",
          "picture": "https://lh5.googleusercontent.com/p/AF1QipOM-s4H7fFAKNiycJXa51C_OJ7Xhr1VEG352-Q=w408-h544-k-no",
          "upcoming_events": [
            
          ],
          "address": "36 Drake Circus, Plymouth PL4 8AB",
          "owner_id": "61b20fa89d78413c1152a8d3"
        }
      ]
    },
    {
      "_id": "61b37ba83beaac553547a26b",
      "entry_price": 0,
      "description": "Have a cuppa whilst listening to one of the most iconic bands of all time! n.b. may not actually be the Beatles.",
      "venue_id": "61ae068dcff5425db378629e",
      "user_id": "61b21346c5e75a7c373dca18",
      "artists_ids": [
        {
          "artist_id": "61b20cc49d78413c1152a8cf"
        }
      ],
      "authorised": {
        "artist": true,
        "venue": true
      },
      "time_end": "2021-12-10T18:00:00.000Z",
      "time_start": "2021-12-10T16:30:00.000Z",
      "picture": "https://images.pulsewebcontent.com/photos/2018/05_May/800/Beatles1969_5_18.jpg",
      "event_name": "Afternoon Tea with The Beatles",
      "venue_info": [
        {
          "_id": "61ae068dcff5425db378629e",
          "venue_name": "The Three Crowns",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.36835"
            },
            "longitude": {
              "$numberDecimal": "-4.13577"
            }
          },
          "description": "Family friendly pub/restaurant and bed and breakfast. Dog friendly. Open 7 days a week, live bands every Friday, DJ Saturdays, Acoustic nights Wednesday and events as posted. Outdoor seating on Harbour.",
          "pin_colour": "cyan",
          "address": "11 The Parade, Plymouth PL1 2JL",
          "picture": "https://i2-prod.plymouthherald.co.uk/incoming/article579474.ece/ALTERNATES/s615/0_929382JPG.jpg",
          "upcoming_events": [
            {
              "event_id": "61ae26cb8d70b95db023dbe6"
            }
          ],
          "owner_id": "61ae22d28d70b95db023dbdd"
        }
      ]
    }
  ];
  test('return an empty object when called with an empty array or with no argument', () => {
    expect(createNewVenueReferenceObject()).toEqual({});
    expect(createNewVenueReferenceObject([])).toEqual({});
  });
  test('does not mutate the original array', () => {
    createNewVenueReferenceObject(testArray);
    expect(testArray).toEqual(testArrayCopy);
  });
  test('does not output the original array', () => {
    expect(createNewVenueReferenceObject(testArray)).not.toBe(testArray);
  });
  test('when passed an array of just one object, returns an object with the correct venue id key and correct event id and start time', () => {
    const expected = {
      "61ae068dcff5425db378629e": [
        {
          "_id": "61ae26cb8d70b95db023dbe6",
          "time_start": "2021-12-10T18:30:00.000Z"
        }
      ]
    };
    expect(createNewVenueReferenceObject([testArray[0]])).toEqual(expected);
  });
  test('when passed an array of two objects with different venues, returns an object with two keys of both correct venue ids and feature correct event ids and start times', () => {
    const expected = {
      "61ae068dcff5425db378629e": [
        {
          "_id": "61ae26cb8d70b95db023dbe6",
          "time_start": "2021-12-10T18:30:00.000Z"
        }
      ],
      "61ae0588cff5425db378629d": [
        {
          "_id": "61ae29d18d70b95db023dbe8",
          "time_start": "2021-12-09T18:30:00.000Z"
        }
      ]
    };
    expect(createNewVenueReferenceObject([testArray[0], testArray[1]])).toEqual(expected);
  });
  test('when passed an array of three objects with different venues, returns an object with three keys of correct venue ids and feature correct event ids and start times', () => {
    const expected = {
      "61ae068dcff5425db378629e": [
        {
          "_id": "61ae26cb8d70b95db023dbe6",
          "time_start": "2021-12-10T18:30:00.000Z"
        }
      ],
      "61ae0588cff5425db378629d": [
        {
          "_id": "61ae29d18d70b95db023dbe8",
          "time_start": "2021-12-09T18:30:00.000Z"
        }
      ],
      "61ae06f4cff5425db37862a0": [
        {
          "_id": "61ae2b128d70b95db023dbea",
          "time_start": "2021-12-10T18:30:00.000Z"
        }
      ]
    };
    expect(createNewVenueReferenceObject([testArray[0], testArray[1], testArray[3]])).toEqual(expected);
  });
  test('when passed an array of two objects with the same venue, returns an object with one keys of the correct venue id and features two correct events in array, in the correct order (start time ascending)', () => {
    const expected = {
      "61ae068dcff5425db378629e": [
        {
          "_id": "61b37ba83beaac553547a26b",
          "time_start": "2021-12-10T16:30:00.000Z"
        },
        {
          "_id": "61ae26cb8d70b95db023dbe6",
          "time_start": "2021-12-10T18:30:00.000Z"
        }
      ]
    };
    expect(createNewVenueReferenceObject([testArray[0], testArray[6]])).toEqual(expected);
  });
  test('when passed an array of three objects, two with the same venue, returns an object with keys of the correct venue ids and features two correct events in array for one of them, in the correct order (start time ascending), and the other venue an array of just one correct event element', () => {
    const expected = {
      "61ae068dcff5425db378629e": [
        {
          "_id": "61b37ba83beaac553547a26b",
          "time_start": "2021-12-10T16:30:00.000Z"
        },
        {
          "_id": "61ae26cb8d70b95db023dbe6",
          "time_start": "2021-12-10T18:30:00.000Z"
        }
      ],
      "61ae0588cff5425db378629d": [
        {
          "_id": "61ae29d18d70b95db023dbe8",
          "time_start": "2021-12-09T18:30:00.000Z"
        }
      ]
    };
    expect(createNewVenueReferenceObject([testArray[0], testArray[1], testArray[6]])).toEqual(expected);
  });
  // consider further testing of more complex input arrays
});

describe('findIndexOfEvent', () => {
  test('returns -1 when passed an id with an empty reference array, a reference array of one empty object, or no reference array', () => {
    expect(findIndexOfEvent('123A')).toBe(-1);
    expect(findIndexOfEvent('123A', [])).toBe(-1);
    expect(findIndexOfEvent('123A', [{}])).toBe(-1);
  });
  test('returns -1 when passed an id not found in the reference array of any length', () => {
    const inputArray1 = [{"_id": '123B', "time_start": '1am'}];
    expect(findIndexOfEvent('123A', inputArray1)).toBe(-1);

    const inputArray2 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}];
    expect(findIndexOfEvent('123A', inputArray2)).toBe(-1);

    const inputArray3 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}, {"_id": '456V', "time_start": '1am'}];
    expect(findIndexOfEvent('123A', inputArray3)).toBe(-1);

    const inputArray4 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}, {"_id": '456V', "time_start": '1am'}, {"_id": '41893475U8Y', "time_start": '4pm'}];
    expect(findIndexOfEvent('123A', inputArray4)).toBe(-1);
  });
  test('returns 0 when found at index 0 of varied length array', () => {
    const inputArray1 = [{"_id": '123B', "time_start": '1am'}];
    expect(findIndexOfEvent('123B', inputArray1)).toBe(0);
  
    const inputArray2 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}];
    expect(findIndexOfEvent('123B', inputArray2)).toBe(0);
  
    const inputArray3 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}, {"_id": '456V', "time_start": '1am'}];
    expect(findIndexOfEvent('123B', inputArray3)).toBe(0);
  
    const inputArray4 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}, {"_id": '456V', "time_start": '1am'}, {"_id": '41893475U8Y', "time_start": '4pm'}];
    expect(findIndexOfEvent('123B', inputArray4)).toBe(0);
  });
  test('returns 1 when found at index 1 of varied length array', () => {
    const inputArray2 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}];
    expect(findIndexOfEvent('123C', inputArray2)).toBe(1);
  
    const inputArray3 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}, {"_id": '456V', "time_start": '1am'}];
    expect(findIndexOfEvent('123C', inputArray3)).toBe(1);
  
    const inputArray4 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}, {"_id": '456V', "time_start": '1am'}, {"_id": '41893475U8Y', "time_start": '4pm'}];
    expect(findIndexOfEvent('123C', inputArray4)).toBe(1);
  });
  test('returns 2 when found at index 2 of varied length array', () => {
    const inputArray3 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}, {"_id": '456V', "time_start": '1am'}];
    expect(findIndexOfEvent('456V', inputArray3)).toBe(2);
  
    const inputArray4 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}, {"_id": '456V', "time_start": '1am'}, {"_id": '41893475U8Y', "time_start": '4pm'}];
    expect(findIndexOfEvent('456V', inputArray4)).toBe(2);

    const inputArray5 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}, {"_id": '456V', "time_start": '1am'}, {"_id": '41893475U8Y', "time_start": '4pm'}, {"_id": '45555555U8Y', "time_start": '3pm'}, {"_id": 'NBNB777', "time_start": '10pm'}, {"_id": '999999K', "time_start": '11am'}];
    expect(findIndexOfEvent('456V', inputArray5)).toBe(2);
  });
  test('returns 3 when found at index 3 of varied length array', () => {
    const inputArray4 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}, {"_id": '456V', "time_start": '1am'}, {"_id": '41893475U8Y', "time_start": '4pm'}];
    expect(findIndexOfEvent('41893475U8Y', inputArray4)).toBe(3);

    const inputArray5 = [{"_id": '123B', "time_start": '1am'}, {"_id": '123C', "time_start": '2am'}, {"_id": '456V', "time_start": '1am'}, {"_id": '41893475U8Y', "time_start": '4pm'}, {"_id": '45555555U8Y', "time_start": '3pm'}, {"_id": 'NBNB777', "time_start": '10pm'}, {"_id": '999999K', "time_start": '11am'}];
    expect(findIndexOfEvent('41893475U8Y', inputArray5)).toBe(3);
  });
});
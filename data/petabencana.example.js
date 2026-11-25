/* EXAMPLE DATA: synthetic, written by The Engine Room for the
   'Report a flood, then see it on the map' walk-through.
   Not from PetaBencana. Not real posts, people, places or flood reports.
   The city and its districts are invented so no example can be mistaken
   for a real report. The body-to-centimeter conversion is our own example,
   not PetaBencana's. The severity bands (under 70 cm minor, 70 to 150 cm
   moderate, above 150 cm severe) follow PetaBencana's public documentation
   (docs.petabencana.id). */

window.EXAMPLE_FLOOD = {
  city: 'Example City',

  // Step 1: posts to sort. now = describes a flood happening now.
  posts: [
    {
      id: 'p1', handle: '@example_resident_1', time: '07:42',
      text: 'Water up to my knees on the main road in Canal Ward. Motorbikes cannot get through.',
      now: true,
      why: 'A flood happening now, with a place and a depth. This is the kind of post the system looks for.'
    },
    {
      id: 'p2', handle: '@example_resident_2', time: '07:45',
      text: 'Back from the holiday and my inbox is a flood of messages.',
      now: false,
      why: 'The word is there, but there is no water. Software that only matches words gets this wrong.'
    },
    {
      id: 'p3', handle: '@example_resident_3', time: '07:51',
      text: 'Raining since dawn. The street by the Market Hill market is under water, ankle deep and rising.',
      now: true,
      why: 'A flood happening now. The poster describes depth by the body, which is how people tend to talk about floods.'
    },
    {
      id: 'p4', handle: '@example_resident_4', time: '08:03',
      text: 'Remember the flood two years ago? Found my old photos today.',
      now: false,
      why: 'About a past flood. Useful memory, but not a report for today\'s map.'
    },
    {
      id: 'p5', handle: '@example_weather_desk', time: '08:10',
      text: 'Heavy rain expected tomorrow. Flooding possible in low-lying areas.',
      now: false,
      why: 'A warning about tomorrow, not a flood happening now. Telling these apart from text alone is hard.'
    }
  ],

  // Step 3: our example reference marks on the depth slider (cm).
  bodyMarks: [
    { cm: 15, label: 'ankle' },
    { cm: 50, label: 'knee' },
    { cm: 100, label: 'waist' }
  ],

  // Districts of the invented city, drawn on a 600 x 360 example map.
  districts: [
    { id: 'north-quay',   name: 'North Quay',   points: '0,0 260,0 240,130 0,120',       cx: 115, cy: 60 },
    { id: 'market-hill',  name: 'Market Hill',  points: '260,0 600,0 600,110 240,130',   cx: 430, cy: 55 },
    { id: 'canal-ward',   name: 'Canal Ward',   points: '0,120 240,130 230,250 0,240',   cx: 105, cy: 228 },
    { id: 'station-row',  name: 'Station Row',  points: '240,130 600,110 600,230 230,250', cx: 420, cy: 180 },
    { id: 'old-harbor',   name: 'Old Harbor',   points: '0,240 230,250 250,360 0,360',   cx: 125, cy: 338 },
    { id: 'east-flats',   name: 'East Flats',   points: '230,250 600,230 600,360 250,360', cx: 420, cy: 300 }
  ],

  // Step 4: other example reports already on the map.
  reports: [
    { id: 'r1', district: 'canal-ward',  x: 80,  y: 170, cm: 55,  minutesAgo: 12,  text: 'Road closed to motorbikes.' },
    { id: 'r2', district: 'canal-ward',  x: 160, y: 210, cm: 85,  minutesAgo: 25,  text: 'Water inside ground floor houses.' },
    { id: 'r3', district: 'market-hill', x: 360, y: 60,  cm: 15,  minutesAgo: 40,  text: 'Market street under water.' },
    { id: 'r4', district: 'old-harbor',  x: 60,  y: 285, cm: 160, minutesAgo: 50,  text: 'Families moving to the school.' },
    { id: 'r5', district: 'old-harbor',  x: 170, y: 330, cm: 110, minutesAgo: 140, text: 'Bridge approach flooded.' },
    { id: 'r6', district: 'east-flats',  x: 470, y: 290, cm: 30,  minutesAgo: 300, text: '' },
    { id: 'r7', district: 'north-quay',  x: 150, y: 70,  cm: 60,  minutesAgo: 720, text: 'Water going down now.' }
  ],

  // Step 5: suggestions for 'what would your scale be?'
  scaleIdeas: ['a doorstep', 'a curb', 'a bicycle wheel', 'a car door', 'a stair', 'a window ledge']
};

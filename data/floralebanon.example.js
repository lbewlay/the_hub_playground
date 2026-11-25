/* EXAMPLE DATA: synthetic, drawn and written by The Engine Room for the
   'Photograph a plant so a model can learn from it' walk-through.
   Not from Taxonomy meets Tech or the FloraLebanon dataset. Not real
   photos, plants or volunteer submissions. The plant is a generic drawing;
   no species is named. */

window.EXAMPLE_PLANT = {
  // Step 2: the four protocol cards, as described in the case study.
  protocol: [
    { id: 'center', title: 'Center the plant', text: 'Put the plant in the middle of the frame, close enough that it fills most of the picture.', view: 'side', guide: 'center' },
    { id: 'front-top', title: 'Take a front or top view where possible', text: 'Look down at the plant, or face it straight on, so its overall shape is clear.', view: 'top' },
    { id: 'side', title: 'Photograph it from the side', text: 'Crouch to the plant\'s level and take it from the side, showing the stem and how the leaves sit.', view: 'side' },
    { id: 'close', title: 'Take close-ups of the parts that matter', text: 'Move in on the parts an expert would look at: leaves, stems, flowers, fruits. Add one picture of where it grows.', view: 'leaf' }
  ],

  // Parts and stages, from the public dataset description.
  parts: ['whole plant', 'leaves', 'stems', 'flowers', 'fruits', 'habitat'],
  stages: ['vegetative', 'flowering', 'fruiting'],

  // Step 3: six example submissions to keep or reject.
  submissions: [
    { id: 's1', label: 'Example submission 1', view: 'side', blur: 4, keep: false,
      why: 'Reject: blurred. An expert cannot check the details, and a model would learn from noise.' },
    { id: 's2', label: 'Example submission 2', view: 'side', dx: 34, keep: false,
      why: 'Reject: the plant is cut off at the edge of the frame. The first rule is to center it.' },
    { id: 's3', label: 'Example submission 3', view: 'side', scale: 0.35, keep: false,
      why: 'Reject: too far away. The plant is a small part of the picture, much like the international photos that did not match field conditions.' },
    { id: 's4', label: 'Example submission 4', view: 'side', keep: true,
      why: 'Keep: a clear, centered side view, one of the protocol\'s views.' },
    { id: 's5', label: 'Example submission 5', view: 'side', keep: false, duplicate: 's4',
      why: 'Reject: a duplicate of submission 4. Repeated pictures add nothing new and can make a model look better in testing than it will be in the field.' },
    { id: 's6', label: 'Example submission 6', view: 'leaf', keep: true,
      why: 'Keep: a sharp close-up of a leaf, one of the parts an expert looks at.' }
  ],

  // Step 5: the checklist to take outside.
  checklist: [
    'Choose one plant near you: in a park, a garden, a pot or a crack in the pavement.',
    'Center it in the frame.',
    'Take a front or top view.',
    'Take a side view at the plant\'s level.',
    'Take close-ups of a leaf, the stem, and any flower or fruit.',
    'Take one picture of where it grows.',
    'Look at your pictures: delete any that are blurred, off-center, too far away or repeated.',
    'Note the date and the place, and whether it is in leaf, in flower or in fruit.'
  ]
};

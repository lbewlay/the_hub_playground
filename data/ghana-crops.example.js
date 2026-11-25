/* EXAMPLE DATA: synthetic, drawn and written by The Engine Room for the
   'From photo to diagnosis, confidence and an expert' walk-through.
   Not output from the app built in Ghana, and not from its dataset.
   Not real photos, diagnoses, farms or expert replies.
   Disease names are limited to cashew classes in the team's public
   dataset (CCMT, Mendeley Data): anthracnose, gummosis, leaf miner,
   red rust, healthy. Confidence values are invented to show how a
   confidence level works. Nothing here is advice for a real plant. */

window.EXAMPLE_CROPS = {
  photos: [
    {
      id: 'spots', title: 'Leaf with clear dark spots', leaf: 'spots',
      result: 'Anthracnose', confidence: 91, level: 'high',
      expert: { verdict: 'confirms', text: 'Yes, this looks like anthracnose. The app got it right.' },
      act: 'The guess was confident and, as the expert confirmed, correct. Acting on it was reasonable.',
      send: 'The expert confirmed the diagnosis. Asking cost a little time and gave you certainty.'
    },
    {
      id: 'faint', title: 'Leaf with faint marks', leaf: 'faint',
      result: 'Leaf miner', confidence: 42, level: 'low',
      expert: { verdict: 'questions', text: 'Hard to say from this picture. Please send a closer photo of the marks, taken in daylight.' },
      act: 'You acted on a guess the app itself was unsure about. A low confidence level is the app telling you to check.',
      send: 'Good call. With a low confidence level, a person who knows crop disease is the better judge, and here they need a clearer picture.'
    },
    {
      id: 'drought', title: 'Leaf dried out at the edges', leaf: 'drought',
      result: 'Red rust', confidence: 64, level: 'moderate',
      expert: { verdict: 'corrects', text: 'This looks like drought stress, not disease. The plant needs water, not treatment.' },
      act: 'You would have treated a disease the plant does not have. This is the failure the team saw when the rains stopped.',
      send: 'The expert caught the mistake: the leaf is stressed by drought, not diseased. This is exactly the case the button is for.'
    }
  ]
};

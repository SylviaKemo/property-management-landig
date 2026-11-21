/* Roomies Kenya: scroll-driven walkthrough of the real apartment.
   Each clip was generated with Higgsfield (Seedance 2.0, 720p) starting from a real
   photo in assets/img and gliding into the next room; encoded with ffmpeg.
   The earlier clay-diorama version is kept in world-clay.js + assets/world/. */
(function () {
  var host = document.getElementById('world');
  if (!host || !window.mountScrollWorld) return;
  var R = 'assets/world/real/';

  mountScrollWorld(host, {
    embedded: true,
    nav: false,
    atmosphere: false,
    hint: 'scroll to walk through',
    diveScroll: 1.4,
    crossfade: 0.22,
    sections: [
      {
        id: 'hallway', label: 'Step inside',
        still: R + 'walk-0.webp', clip: R + 'walk-0.mp4',
        accent: '#D9A441', scroll: 1.5, linger: 0.3,
        eyebrow: 'Take a walk through',
        title: 'Step inside a Roomies home.',
        body: 'Shared, furnished apartments in the heart of Kileleshwa, Nairobi.',
        tags: ['Kileleshwa, Nairobi', 'Furnished rooms']
      },
      {
        id: 'kitchen', label: 'Kitchen',
        // trimmed to the first 2.4s so it never turns into the bedroom
        still: R + 'walk-1.webp', clip: R + 'walk-1k.mp4',
        accent: '#D9A441', scroll: 1.0, linger: 0.3,
        eyebrow: 'The shared kitchen',
        title: 'Cook, eat, catch up.',
        body: 'A fully equipped kitchen with a gas cooker, fridge, microwave and dining table. Gas is covered.',
        tags: ['Cooking gas', 'Dining area']
      },
      {
        id: 'laundry', label: 'Laundry',
        still: R + 'walk-3.webp', clip: R + 'walk-3.mp4',
        accent: '#D9A441', linger: 0.3,
        eyebrow: 'Laundry, on site',
        title: 'No more laundromat weekends.',
        body: 'On-site washing machine and laundry sink, and shared spaces cleaned on a schedule.',
        tags: ['Washing machine', 'Regular cleaning']
      },
      {
        id: 'balcony', label: 'Balcony',
        still: R + 'walk-4.webp', clip: R + 'walk-4.mp4',
        accent: '#E8C13A', scroll: 1.6, linger: 0.35,
        eyebrow: 'Roomies Kenya, Kileleshwa',
        title: 'Your room is waiting.',
        body: 'No long-term commitments, no hidden costs, no isolation. Come and see it for yourself.',
        tags: ['Tenant support'],
        cta: {
          primary: { label: 'Book a viewing', href: '#visit' },
          secondary: { label: 'See the rooms', href: '#rooms' }
        }
      }
    ],
    // Each clip already glides into the next room, so no separate connectors.
    connectors: [null, null, null]
  });
})();

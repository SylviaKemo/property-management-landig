/* Roomies Kenya: scroll-world fly-through section.
   Clips were generated with Higgsfield (Seedance 2.0, 720p) and encoded with ffmpeg.
   See scroll-world/ for sources and the prompts used. */
(function () {
  var host = document.getElementById('world');
  if (!host || !window.mountScrollWorld) return;
  var V = 'assets/world/vid/';
  var S = 'assets/world/';

  mountScrollWorld(host, {
    embedded: true,
    nav: false,
    atmosphere: true,
    hint: 'scroll to fly in',
    diveScroll: 1.3,
    connScroll: 0.9,
    crossfade: 0.12,
    sections: [
      {
        id: 'street', label: 'Kileleshwa',
        still: S + 'scene-1.webp', clip: V + 'dive-1.mp4',
        accent: '#D9A441', scroll: 1.5, linger: 0.35,
        eyebrow: 'Welcome to Kileleshwa',
        title: 'A leafy street to come home to.',
        body: 'Shared, furnished apartments on a quiet, tree-lined corner of Nairobi.',
        tags: ['Kileleshwa, Nairobi', 'Furnished rooms']
      },
      {
        id: 'kitchen', label: 'Kitchen',
        still: S + 'scene-2.webp', clip: V + 'dive-2.mp4',
        accent: '#D9A441', linger: 0.3,
        eyebrow: 'The shared kitchen',
        title: 'Cook, eat, catch up.',
        body: 'A fully equipped kitchen with a gas cooker, fridge, microwave and dining table. Gas is covered.',
        tags: ['Cooking gas', 'Dining area']
      },
      {
        id: 'room', label: 'Your room',
        still: S + 'scene-3.webp', clip: V + 'dive-3.mp4',
        accent: '#D9A441', scroll: 1.5, linger: 0.4,
        eyebrow: 'Your own room',
        title: 'Furnished, private, ready.',
        body: 'Move in with a suitcase. Rooms come furnished, from KES 18,000 a month.',
        tags: ['High-speed WiFi', 'From KES 18,000']
      },
      {
        id: 'utility', label: 'Laundry & balcony',
        still: S + 'scene-4.webp', clip: V + 'dive-4.mp4',
        accent: '#D9A441', linger: 0.3,
        eyebrow: 'Washrooms, laundry, balcony',
        title: 'Clean spaces, cleaned for you.',
        body: 'On-site washing machine, and shared spaces cleaned on a schedule. No chore charts.',
        tags: ['Washing machine', 'Regular cleaning']
      },
      {
        id: 'home', label: 'Come home',
        still: S + 'scene-5.webp', clip: V + 'dive-5.mp4',
        accent: '#E8C13A', scroll: 1.6, linger: 0.4,
        eyebrow: 'Roomies Kenya',
        title: 'Your room is waiting.',
        body: 'No long-term commitments, no hidden costs, no isolation. Come and see it for yourself.',
        tags: ['Tenant support'],
        cta: {
          primary: { label: 'Book a viewing', href: '#visit' },
          secondary: { label: 'See the rooms', href: '#rooms' }
        }
      }
    ],
    // Connector fly-overs between scenes (null = direct crossfade until rendered).
    connectors: [null, null, V + 'conn-3.mp4', null]
  });
})();

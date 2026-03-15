// ═══════════════════════════════════════════════════════════
// Wedding Data — Single Source of Truth
// Edit this file to customize all wedding content.
// No component code changes needed.
// ═══════════════════════════════════════════════════════════

export interface WeddingEvent {
  readonly id: string
  readonly name: string
  readonly emoji: string
  readonly date: string
  readonly venue: string
  readonly address: string
  readonly description: string
  readonly moodColor: string
}

export interface Venue {
  readonly id: string
  readonly name: string
  readonly events: string
  readonly address: string
  readonly mapEmbedUrl: string
  readonly mapLink: string
}

export interface PhotoItem {
  readonly id: string
  readonly src: string
  readonly alt: string
  readonly aspectRatio: 'portrait' | 'landscape' | 'square'
  readonly gridArea?: string
}

export interface WeddingData {
  readonly couple: {
    readonly groom: string
    readonly bride: string
    readonly hashtag: string
    readonly date: string
    readonly dateFormatted: string
    readonly city: string
  }
  readonly invocation: string
  readonly familyBlessings: {
    readonly opening: string
    readonly groomParents: string
    readonly groomIntro: string
    readonly groom: string
    readonly connector: string
    readonly bride: string
    readonly brideIntro: string
    readonly brideParents: string
  }
  readonly events: readonly WeddingEvent[]
  readonly photos: readonly PhotoItem[]
  readonly venues: readonly Venue[]
  readonly closing: {
    readonly message: string
    readonly family: string
    readonly phone: string
    readonly email: string
  }
}

const weddingData: WeddingData = {
  couple: {
    groom: 'Parth',
    bride: 'Anu',
    hashtag: '#ParthWeds Anu',
    date: '2026-05-05',
    dateFormatted: '5th May 2026',
    city: 'Ranchi',
  },

  invocation: 'श्री गणेशाय नम:',

  familyBlessings: {
    opening: 'With the blessings of the Almighty and the love of our families',
    groomParents: 'Dr. Sanjay Kumar Pandey & Mrs. Bandana Pandey',
    groomIntro: 'cordially invite you to celebrate the wedding of their beloved son',
    groom: 'Parth',
    connector: 'with',
    bride: 'Anu',
    brideIntro: 'Daughter of',
    brideParents: 'Mr. Anil Kumar Singh & Mrs. Mridula Singh',
  },

  events: [
    {
      id: 'haldi',
      name: 'Haldi',
      emoji: '🌼',
      date: '4th May 2026',
      venue: 'D-12 Moon City',
      address: 'Mango, Jamshedpur, Jharkhand',
      description: 'A joyful celebration of blessings — turmeric, laughter, and golden warmth to begin the festivities.',
      moodColor: '#E8B931',
    },
    {
      id: 'mehendi',
      name: 'Mehendi',
      emoji: '🌿',
      date: '4th May 2026',
      venue: 'D-12 Moon City',
      address: 'Mango, Jamshedpur, Jharkhand',
      description: 'Intricate henna artistry adorns hands and hearts — an afternoon of beauty, stories, and togetherness.',
      moodColor: '#2D6A4F',
    },
    {
      id: 'sangeet',
      name: 'Sangeet',
      emoji: '🎶',
      date: '4th May 2026',
      venue: 'D-12 Moon City',
      address: 'Mango, Jamshedpur, Jharkhand',
      description: 'Music fills the air as families come together for a night of dance, rhythm, and joyful celebration.',
      moodColor: '#9B2335',
    },
    {
      id: 'pheras',
      name: 'Wedding Ceremony',
      emoji: '🔥',
      date: '5th May 2026',
      venue: 'Ramada by Wyndham Ranchi',
      address: 'Bariatu Rd, Rameshwaram, Sarhul Nagar, Ranchi, Jharkhand',
      description: 'Sacred vows around the holy fire — two souls unite in a timeless bond of love, commitment, and devotion.',
      moodColor: '#D4760A',
    },
    {
      id: 'reception',
      name: 'Reception',
      emoji: '🥂',
      date: '7th May 2026',
      venue: 'NH Hills',
      address: 'NH-33, Pardih Chowk, Kumrum, Mango, Jamshedpur, Jharkhand',
      description: 'An elegant evening of celebration — fine dining, heartfelt toasts, and the beginning of forever.',
      moodColor: '#C0B283',
    },
  ],

  photos: [
    { id: 'photo-1', src: '', alt: 'Couple photo 1', aspectRatio: 'portrait', gridArea: 'hero' },
    { id: 'photo-2', src: '', alt: 'Couple photo 2', aspectRatio: 'landscape' },
    { id: 'photo-3', src: '', alt: 'Couple photo 3', aspectRatio: 'square' },
    { id: 'photo-4', src: '', alt: 'Couple photo 4', aspectRatio: 'portrait' },
    { id: 'photo-5', src: '', alt: 'Couple photo 5', aspectRatio: 'landscape' },
    { id: 'photo-6', src: '', alt: 'Couple photo 6', aspectRatio: 'square' },
    { id: 'photo-7', src: '', alt: 'Couple photo 7', aspectRatio: 'landscape' },
    { id: 'photo-8', src: '', alt: 'Couple photo 8', aspectRatio: 'portrait' },
  ],

  venues: [
    {
      id: 'venue-prewedding',
      name: 'D-12 Moon City',
      events: 'Haldi, Mehendi & Sangeet',
      address: 'Mango, Jamshedpur, Jharkhand',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.5!2d86.21!3d22.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMango%2C+Jamshedpur!5e0!3m2!1sen!2sin!4v1',
      mapLink: 'https://maps.google.com/?q=Moon+City+Mango+Jamshedpur',
    },
    {
      id: 'venue-wedding',
      name: 'Ramada by Wyndham Ranchi',
      events: 'Wedding Ceremony (Pheras)',
      address: 'Bariatu Rd, Rameshwaram, Sarhul Nagar, Ranchi, Jharkhand',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.5!2d85.32!3d23.39!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRamada+by+Wyndham+Ranchi!5e0!3m2!1sen!2sin!4v1',
      mapLink: 'https://maps.google.com/?q=Ramada+by+Wyndham+Ranchi',
    },
    {
      id: 'venue-reception',
      name: 'NH Hills',
      events: 'Reception',
      address: 'NH-33, Pardih Chowk, Kumrum, Mango, Jamshedpur, Jharkhand',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.5!2d86.19!3d22.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNH+Hills+Jamshedpur!5e0!3m2!1sen!2sin!4v1',
      mapLink: 'https://maps.google.com/?q=NH+Hills+Jamshedpur',
    },
  ],

  closing: {
    message: 'Your presence would be the greatest gift of all. We can\'t wait to celebrate this beautiful beginning with you.',
    family: 'With love, The Pandey Family',
    phone: '+91 98765 43210',
    email: 'parthandanu2026@email.com',
  },
} as const

export default weddingData

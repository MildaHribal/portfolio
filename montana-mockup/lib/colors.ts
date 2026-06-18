export type ColorFamily =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'neutral';

export type Swatch = {
  code: string;
  name: string;
  hex: string;
  family: ColorFamily;
};

export const FAMILIES: { id: ColorFamily; label: string }[] = [
  { id: 'red', label: 'Červené' },
  { id: 'orange', label: 'Oranžové' },
  { id: 'yellow', label: 'Žluté' },
  { id: 'green', label: 'Zelené' },
  { id: 'blue', label: 'Modré' },
  { id: 'purple', label: 'Fialové' },
  { id: 'pink', label: 'Růžové' },
  { id: 'neutral', label: 'Neutrální' },
];

/**
 * Sample of the Montana palette, fictional codes — sorted within families
 * by lightness so the grid reads as a smooth gradient wall.
 */
export const COLORS: Swatch[] = [
  // Reds
  { code: 'MTN-3010', name: 'Cherry', hex: '#3a0a0f', family: 'red' },
  { code: 'MTN-3020', name: 'Vino Tinto', hex: '#5e0d18', family: 'red' },
  { code: 'MTN-3030', name: 'Bordó', hex: '#7a121f', family: 'red' },
  { code: 'MTN-3040', name: 'Power Red', hex: '#b3151f', family: 'red' },
  { code: 'MTN-3050', name: 'Tornado', hex: '#d31a25', family: 'red' },
  { code: 'MTN-3060', name: 'Pomelo', hex: '#e8323a', family: 'red' },
  { code: 'MTN-3070', name: 'Coral', hex: '#f15a52', family: 'red' },
  { code: 'MTN-3080', name: 'Salmon', hex: '#f78a82', family: 'red' },

  // Orange
  { code: 'MTN-4010', name: 'Brick', hex: '#6e2a10', family: 'orange' },
  { code: 'MTN-4020', name: 'Rust', hex: '#a04014', family: 'orange' },
  { code: 'MTN-4030', name: 'Mandarine', hex: '#e25a15', family: 'orange' },
  { code: 'MTN-4040', name: 'Fanta', hex: '#f37b1c', family: 'orange' },
  { code: 'MTN-4050', name: 'Saffron', hex: '#f7a23b', family: 'orange' },
  { code: 'MTN-4060', name: 'Peach', hex: '#ffc481', family: 'orange' },

  // Yellow
  { code: 'MTN-5010', name: 'Olive', hex: '#615311', family: 'yellow' },
  { code: 'MTN-5020', name: 'Mustard', hex: '#b08b14', family: 'yellow' },
  { code: 'MTN-5030', name: 'Gold', hex: '#d9a91a', family: 'yellow' },
  { code: 'MTN-5040', name: 'Cadmium', hex: '#f4c21a', family: 'yellow' },
  { code: 'MTN-5050', name: 'Lemon', hex: '#fce53a', family: 'yellow' },
  { code: 'MTN-5060', name: 'Vanilla', hex: '#fbeea3', family: 'yellow' },

  // Green
  { code: 'MTN-6010', name: 'Black Forest', hex: '#0e2a1a', family: 'green' },
  { code: 'MTN-6020', name: 'Spruce', hex: '#143a25', family: 'green' },
  { code: 'MTN-6030', name: 'Bottle', hex: '#114d2d', family: 'green' },
  { code: 'MTN-6040', name: 'Iguana', hex: '#1b6f3b', family: 'green' },
  { code: 'MTN-6050', name: 'Cyprus', hex: '#2a8b46', family: 'green' },
  { code: 'MTN-6060', name: 'Park', hex: '#3aa553', family: 'green' },
  { code: 'MTN-6070', name: 'Guacamole', hex: '#67b94b', family: 'green' },
  { code: 'MTN-6080', name: 'Acid', hex: '#a3d930', family: 'green' },
  { code: 'MTN-6090', name: 'Lime', hex: '#c5e85a', family: 'green' },
  { code: 'MTN-6100', name: 'Pistachio', hex: '#d8e8a6', family: 'green' },

  // Blue
  { code: 'MTN-7010', name: 'Midnight', hex: '#0c1838', family: 'blue' },
  { code: 'MTN-7020', name: 'Indigo', hex: '#101e57', family: 'blue' },
  { code: 'MTN-7030', name: 'Ultramarine', hex: '#163181', family: 'blue' },
  { code: 'MTN-7040', name: 'Cobalt', hex: '#1a48b6', family: 'blue' },
  { code: 'MTN-7050', name: 'Electric', hex: '#1f63e0', family: 'blue' },
  { code: 'MTN-7060', name: 'Atlantic', hex: '#2186c4', family: 'blue' },
  { code: 'MTN-7070', name: 'Lago', hex: '#39a8d6', family: 'blue' },
  { code: 'MTN-7080', name: 'Ciel', hex: '#7ec6e6', family: 'blue' },
  { code: 'MTN-7085', name: 'Mint', hex: '#9cdfd2', family: 'blue' },
  { code: 'MTN-7090', name: 'Cyan', hex: '#21c4d1', family: 'blue' },

  // Purple
  { code: 'MTN-8010', name: 'Eggplant', hex: '#2b1140', family: 'purple' },
  { code: 'MTN-8020', name: 'Royal Purple', hex: '#451c75', family: 'purple' },
  { code: 'MTN-8030', name: 'Violet', hex: '#6b2bb1', family: 'purple' },
  { code: 'MTN-8040', name: 'Iris', hex: '#8b46d6', family: 'purple' },
  { code: 'MTN-8050', name: 'Orchid', hex: '#b576e6', family: 'purple' },
  { code: 'MTN-8060', name: 'Lavender', hex: '#d2b6ec', family: 'purple' },

  // Pink
  { code: 'MTN-9010', name: 'Magenta', hex: '#a10c4a', family: 'pink' },
  { code: 'MTN-9020', name: 'Fuchsia', hex: '#d61676', family: 'pink' },
  { code: 'MTN-9030', name: 'Hot Pink', hex: '#ed3a8e', family: 'pink' },
  { code: 'MTN-9040', name: 'Bubblegum', hex: '#f56db1', family: 'pink' },
  { code: 'MTN-9050', name: 'Sakura', hex: '#fba6c8', family: 'pink' },
  { code: 'MTN-9060', name: 'Powder', hex: '#fcd4df', family: 'pink' },

  // Neutral
  { code: 'MTN-1010', name: 'Carbon', hex: '#0e0d10', family: 'neutral' },
  { code: 'MTN-1020', name: 'Anthracite', hex: '#1b1a1f', family: 'neutral' },
  { code: 'MTN-1030', name: 'Asfalt', hex: '#2a282e', family: 'neutral' },
  { code: 'MTN-1040', name: 'Beton', hex: '#46434a', family: 'neutral' },
  { code: 'MTN-1050', name: 'Stone', hex: '#6c6870', family: 'neutral' },
  { code: 'MTN-1060', name: 'Silver', hex: '#9c9aa0', family: 'neutral' },
  { code: 'MTN-1070', name: 'Bone', hex: '#d6d2c8', family: 'neutral' },
  { code: 'MTN-1080', name: 'Chalk', hex: '#f1ede4', family: 'neutral' },
];

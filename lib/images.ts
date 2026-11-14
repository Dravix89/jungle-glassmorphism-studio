export const unsplash = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const IMG = {
  home1: "1729655855474-fee6907721d6",
  home2: "1605247631064-d3ab83971aaf",
  home3: "1636525653613-2a3a05c00759",
  bg1: "1629221062145-508de0b8306d",
  bg2: "1678275812400-aeffbd0d8692",
  bg3: "1761839124971-8e2e9efb0254",
  g1: "1657345928860-175d32ad197d",
  g2: "1516441311474-499e4f3b32db",
  g3: "1533029026076-7160c0f3187b",
  g4: "1635318840697-1d29b5866dff",
  g5: "1646872223685-ca4c51fc315d",
  g6: "1565599573128-ae3ef5c9f478",
  g7: "1589163808688-0adf32313ef2",
  g8: "1765958798803-64bc56536e54",
  g9: "1758184238979-b1d5237d37c7",
  g10: "1582137363701-90dfd38fe801",
  lab1: "1625923522827-cbe1a4115da2",
  login: "1641736201271-6d875ec2ac50",
  register: "1613303179355-564f87b055a7",
  forgot: "1549574035-9891fd195343",
} as const;

export type Scene = {
  num: string;
  badge: string;
  title: string;
  desc: string;
  image: string;
};

export const scenes: Scene[] = [
  {
    num: "01",
    badge: "JUNGLE",
    title: "Jungle Tropicale",
    desc: "Une forêt dense et luxuriante où les feuillages se superposent dans une palette de verts profonds. Une atmosphère immersive, sauvage et enveloppante.",
    image: IMG.bg1,
  },
  {
    num: "02",
    badge: "GOLDEN",
    title: "Canopée Dorée",
    desc: "Les premières feuilles se parent de nuances dorées et ambrées. La lumière traverse les branches et révèle une forêt en pleine transition.",
    image: IMG.bg2,
  },
  {
    num: "03",
    badge: "AUTUMN",
    title: "Canopée Automnale",
    desc: "Une forêt transformée par l'automne, entre rouges profonds, oranges flamboyants et jaunes cuivrés. Un paysage vibrant aux contrastes chaleureux.",
    image: IMG.bg3,
  },
];

export type GalleryItem = {
  id: string;
  title: string;
  sub: string;
  cat: string;
  image: string;
};

export const gallery: GalleryItem[] = [
  {
    id: "01",
    title: "Feuilles Vives",
    sub: "Gros plan sur le feuillage",
    cat: "Feuillage",
    image: IMG.g1,
  },
  {
    id: "02",
    title: "Vue Aérienne",
    sub: "La forêt vue du ciel",
    cat: "Canopée",
    image: IMG.g2,
  },
  {
    id: "03",
    title: "Serre Victorienne",
    sub: "Verrière envahie par les palmiers",
    cat: "Architecture",
    image: IMG.g3,
  },
  {
    id: "04",
    title: "Gouttes De Rosée",
    sub: "Feuilles couvertes d'eau",
    cat: "Feuillage",
    image: IMG.g4,
  },
  {
    id: "05",
    title: "Forêt Luxuriante",
    sub: "Un océan d'arbres verts",
    cat: "Sous-Bois",
    image: IMG.g5,
  },
  {
    id: "06",
    title: "Façade Végétale",
    sub: "Architecture et plantes",
    cat: "Architecture",
    image: IMG.g6,
  },
  {
    id: "07",
    title: "Bananier Tropical",
    sub: "Large feuillage en plein jour",
    cat: "Sous-Bois",
    image: IMG.g7,
  },
  {
    id: "08",
    title: "Canopée Brumeuse",
    sub: "Jungle dans la brume",
    cat: "Brume",
    image: IMG.g8,
  },
  {
    id: "09",
    title: "Jungle Dense",
    sub: "Canopée au feuillage épais",
    cat: "Canopée",
    image: IMG.g9,
  },
];

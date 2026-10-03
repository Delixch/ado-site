/** Fotos von Unsplash (Lizenz: frei, Nennung erwuenscht). Geladen mit scripts in videoedit/.env-Schluessel. */
export const STOCK = {
  about: { src: '/media/stock/about.webp', author: "Social Mode", link: 'https://unsplash.com/photos/macbook-pro-beside-white-ceramic-mug-on-brown-wooden-table-WmVtCFR1C1g' },
  work: { src: '/media/stock/work.webp', author: "Tran Mau Tri Tam ✪", link: 'https://unsplash.com/photos/two-monitors-setup-next-to-each-other-on-a-computer-desk-h7v_38e3iGE' },
  skills: { src: '/media/stock/skills.webp', author: "Jeff Caron-Robert", link: 'https://unsplash.com/photos/a-wall-full-of-knives-0CCVIuAjORE' },
  repos: { src: '/media/stock/repos.webp', author: "Clarisse Meyer", link: 'https://unsplash.com/photos/books-in-glass-bookcase-jKU2NneZAbI' },
  build: { src: '/media/stock/build.webp', author: "Tal Molcho", link: 'https://unsplash.com/photos/a-tall-tower-with-a-sky-in-the-background-CmcA-ynG9vY' },
  path: { src: '/media/stock/path.webp', author: "Gabriel Rissi", link: 'https://unsplash.com/photos/black-mountains-under-blue-sky-during-daytime-mICJRLU0nx8' },
  letter: { src: '/media/stock/letter.webp', author: "SHAN LU", link: 'https://unsplash.com/photos/white-envelope-with-brown-stamp-j0VL_haSyhM' },
  zurich: { src: '/media/stock/zurich.webp', author: "Ilia Bronskiy", link: 'https://unsplash.com/photos/an-aerial-view-of-a-city-at-sunset-lkub2W1Cenc' },
  bakery: { src: '/media/stock/bakery.webp', author: "Andy Li", link: 'https://unsplash.com/photos/man-in-white-dress-shirt-standing-in-front-of-brown-wooden-shelf-RndRFJ1v1kk' },
  boxes: { src: '/media/stock/boxes.webp', author: "Vida Huang", link: 'https://unsplash.com/photos/warehouse-storage-filled-with-pallets-of-goods-I-_wYj9yOzw' },
  calendar: { src: '/media/stock/calendar.webp', author: "Blessing Ri", link: 'https://unsplash.com/photos/white-braille-paper-on-brown-wooden-table-mBRtqyC_Iq0' },
  receipts: { src: '/media/stock/receipts.webp', author: "Aaron Lefler", link: 'https://unsplash.com/photos/a-calculator-and-a-pen-sitting-on-top-of-a-piece-of-paper-Vs6ip7fsld8' },
  stamp: { src: '/media/stock/stamp.webp', author: "Markus Spiske", link: 'https://unsplash.com/photos/rubber-stamp-on-legal-document-7PMGUqYQpYc' },
  cafe: { src: '/media/stock/cafe.webp', author: "Margo Evardson", link: 'https://unsplash.com/photos/coffee-shop-and-cafe-storefront-with-plants-JQgWhib1FA0' },
  team: { src: '/media/stock/team.webp', author: "Vitaly Gariev", link: 'https://unsplash.com/photos/three-smiling-bartenders-standing-behind-a-bar-Mon_ONnqUbA' },
  kitchen: { src: '/media/stock/kitchen.webp', author: "Johnathan Macedo", link: 'https://unsplash.com/photos/man-in-white-chef-uniform-cooking-4NQEvxW2_4w' },
  bread: { src: '/media/stock/bread.webp', author: "mohamed hassouna", link: 'https://unsplash.com/photos/brown-bread-on-brown-wicker-basket-N4gtuEZ5gWc' },
  type: { src: '/media/stock/type.webp', author: "Patrick Fore", link: 'https://unsplash.com/photos/brown-letters-decors-Rm5dTBSwzaY' },
  phone: { src: '/media/stock/phone.webp', author: "HUUM", link: 'https://unsplash.com/photos/a-person-holding-a-cup-of-coffee-AQor66gwkyY' },
  vault: { src: '/media/stock/vault.webp', author: "laura adai", link: 'https://unsplash.com/photos/a-close-up-of-the-door-of-a-train-owSwE2CUwoY' },
} as const;

export type StockName = keyof typeof STOCK;

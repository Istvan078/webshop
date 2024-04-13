import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private categories: any[] = [
    { key: 'firstCategory', value: 'Szépségápolás', link: 'beauty' },
    { key: 'secondCategory', value: 'Elektronika', link: 'electronics' },
    { key: 'thirdCategory', value: 'Kertészet', link: 'gardening' },
    { key: '4thCategory', value: 'Háztartás', link: 'household' },
    { key: '5thCategory', value: 'Barkácsolás', link: 'tools' },
  ];

  
  private subCategories: any = {
    firstCategory: {
      key: 'firstCategory',
      value: [
        'Férfi kozmetikumok',
        'Női kozmetikumok',
        'Haj',
        'Szőrtelenítés',
        'Intim higiéniai termékek',
      ],
      queryPar: [
        'men-cosmetics',
        'women-cosmetics',
        'hair',
        'unhairing',
        'intim-products',
      ],
    },
    secondCategory: {
      key: 'secondCategory',
      value: [
        'Okostelefonok',
        'Laptopok',
        'Monitorok',
        'Okosórák',
        'Hangfalak',
      ],
      queryPar: [
        'smartphones',
        'laptops',
        'monitors',
        'smartwatches',
        'speakers',
      ],
    },
    thirdCategory: {
      key: 'thirdCategory',
      value: [
        'Növények',
        'Szerszámok',
        'Öntözőeszközök',
        'Kerti gépek',
        'Egyéb eszközök',
      ],
      queryPar: [
        'plants',
        'garden-tools',
        'watering-tools',
        'garden-machines',
        'other-garden-tools',
      ],
    },
  };
  ujobjektum = {...this.subCategories}
  constructor() {}

  getCategories() {
    return this.categories;
  }

  getSubCategories() {
    return this.subCategories;
  }
}

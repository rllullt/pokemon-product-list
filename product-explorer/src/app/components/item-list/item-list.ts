import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

export type inventoryItem = {
  id: number;
  name: string;
  types: string;
  abilities: string;
  weight: number;
  height: number;
  url: string;
};

@Component({
  selector: 'app-item-list',
  imports: [MatListModule, MatIconModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss'
})
export class ItemList {
  constructor(private router: Router) { }

  items: inventoryItem[] = [
    {
      id: 1,
      name: 'Bulbasaur',
      types: 'grass,poison',
      abilities: 'overgrow,chlorophyll',
      weight: 69,
      height: 7,
      url: 'https://pokeapi.co/api/v2/pokemon/1'
    },
    {
      id: 2,
      name: 'Ivysaur',
      types: 'grass,poison',
      abilities: 'overgrow,chlorophyll',
      weight: 130,
      height: 10,
      url: 'https://pokeapi.co/api/v2/pokemon/2'
    },
    {
      id: 3,
      name: 'Venusaur',
      types: 'grass,poison',
      abilities: 'overgrow,chlorophyll',
      weight: 1000,
      height: 20,
      url: 'https://pokeapi.co/api/v2/pokemon/3'
    }
  ];
  // items: inventoryItem[] = [];

  navigateToItem(itemId: number): void {
      this.router.navigate(['/item', itemId]);
  }
}

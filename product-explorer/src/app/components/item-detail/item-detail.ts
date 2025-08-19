import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatList, MatListModule } from "@angular/material/list";

import { inventoryItem } from '../item-list/item-list';

@Component({
  selector: 'app-item-detail',
  imports: [MatList, MatListModule],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.scss'
})
export class ItemDetail implements OnInit {
  constructor(private route: ActivatedRoute) { }

  item: inventoryItem = {} as inventoryItem;
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      const foundItem = this.items.find(item => item.id === id);
      if (!foundItem) {
        throw new Error(`Item with id ${id} not found`);
      }
      this.item = foundItem;
    });
  }
}

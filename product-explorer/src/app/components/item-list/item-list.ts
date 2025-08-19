import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService, PokemonItem } from '../../services/pokemon-product.service';
import { Loader } from '../loader/loader';
import { AsyncPipe } from '@angular/common';

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
  imports: [MatListModule, MatIconModule, Loader, AsyncPipe],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss'
})
export class ItemList implements OnInit {
  // Observables para conectar el template con el servicio
  public items$: Observable<PokemonItem[]>;
  public loading$: Observable<boolean>;
  
  constructor(private router: Router, private pokemonService: PokemonService) {
    // Asignamos los observables del servicio a las propiedades del componente
    this.items$ = this.pokemonService.items$;
    this.loading$ = this.pokemonService.loading$;
  }

  ngOnInit(): void {
    // Al iniciar el componente, pedimos al servicio que cargue los items
    this.pokemonService.loadItems();
  }

  navigateToItem(itemId: number): void {
    this.router.navigate(['/item', itemId]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatList, MatListModule } from "@angular/material/list";

import { PokemonItem, PokemonService } from '../../services/pokemon-product.service';
import { Observable } from 'rxjs';
import { Loader } from '../loader/loader';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-item-detail',
  imports: [MatList, MatListModule, Loader, AsyncPipe],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.scss'
})
export class ItemDetail implements OnInit {
  public item$: Observable<PokemonItem>;
  public loading$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {
    this.item$ = this.pokemonService.selectedItem$;
    this.loading$ = this.pokemonService.loading$;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      if (id) {
        this.pokemonService.loadItemById(id.toString());
      }
      else {
        throw new Error(`Item with id ${id} not found or not id`);
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { inventoryItem } from '../components/item-list/item-list';

// Interfaz para tipar la respuesta de la lista de items
export interface PokemonItem extends inventoryItem { }

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly API_URL = 'http://localhost:3000/api';

  // --- State Management con RxJS ---
  // BehaviorSubject para mantener y emitir el estado actual de la lista de items.
  // Inicia con un array vacío.
  private readonly _items$ = new BehaviorSubject<PokemonItem[]>([]);
  
  // BehaviorSubject para el item seleccionado. Inicia como null.
  private readonly _selectedItem$ = new BehaviorSubject<any>(null);

  // BehaviorSubject para gestionar el estado de carga. Inicia en false.
  private readonly _loading$ = new BehaviorSubject<boolean>(false);

  // --- Selectors (Observables públicos) ---
  // Exponemos los observables para que los componentes se suscriban a ellos.
  // El `asObservable()` previene que los componentes puedan emitir nuevos valores con .next()
  public readonly items$: Observable<PokemonItem[]> = this._items$.asObservable();
  public readonly selectedItem$: Observable<any> = this._selectedItem$.asObservable();
  public readonly loading$: Observable<boolean> = this._loading$.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Carga la lista de items desde la API.
   * Muestra el loader, hace la petición y actualiza el estado.
   */
  public loadItems(): void {
    // Si ya hay items en el estado, no los volvemos a cargar
    if (this._items$.getValue().length > 0) {
      return;
    }
    
    this._loading$.next(true); // Inicia la carga
    console.log('Cargando items desde la API...');
    this.http.get<PokemonItem[]>(`${this.API_URL}/pokemons`)
      .pipe(
        tap(response => { this._items$.next(response) }), // Actualiza el estado con los items
        catchError(error => {
          console.error('Error fetching items:', error);
          return of([]); // En caso de error, devuelve un array vacío
        }),
        finalize(() => {
          console.log('Finalized, items cargados:', this._items$.getValue());
          this._loading$.next(false);
        }) // Finaliza la carga, con éxito o error
      )
      .subscribe();
  }

  /**
   * Carga los detalles de un item específico por su ID (nombre).
   * @param id El nombre del item a buscar.
   */
  public loadItemById(id: string): void {
    this._loading$.next(true); // Inicia la carga
    this._selectedItem$.next(null); // Limpia el item anterior
    console.log(`Cargando item con ID: ${id}`);
    this.http.get<any>(`${this.API_URL}/pokemons/${id}`)
      .pipe(
        tap(item => this._selectedItem$.next(item)), // Actualiza el estado con el item encontrado
        catchError(error => {
          console.error(`Error fetching item ${id}:`, error);
          return of(null); // En caso de error, devuelve null
        }),
        finalize(() => this._loading$.next(false)) // Finaliza la carga
      )
      .subscribe();
  }
}
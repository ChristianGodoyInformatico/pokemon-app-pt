import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';

import { PokemonNamePipe } from '../../common/pipes/pokemon-name.pipe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    CommonModule,
    PokemonNamePipe,
  ],
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('favoriteTitleAnimation', [
      transition(':enter', [
        animate(
          '1000ms ease-in-out',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.2)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  @Input() favoritePokemonName!: string | null;
  @Output() favoriteClicked = new EventEmitter<void>();

  showFavoriteDialog(): void {
    this.favoriteClicked.emit();
  }
}

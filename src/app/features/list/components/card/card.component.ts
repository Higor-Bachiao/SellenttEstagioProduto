import { Component, input, computed,EventEmitter,Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButton],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  product = input.required<Product>();

  @Output() edit = new EventEmitter();
  
  productTitle = computed(() => this.product().title);

  onEdit() {
    this.edit.emit();
  }
}

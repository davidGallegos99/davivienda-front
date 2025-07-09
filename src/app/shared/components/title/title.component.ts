import { Location } from '@angular/common';
import { Component, inject, input, InputSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
})
export class TitleComponent {
  location = inject(Location);
  routeBack: InputSignal<boolean> = input<boolean>(false);
}

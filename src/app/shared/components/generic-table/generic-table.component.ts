import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [MatTableModule, NgTemplateOutlet, CommonModule],
  styleUrls: ['./generic-table.component.css'],
  templateUrl: './generic-table.component.html',
})
export class GenericTableComponent {
  @Input() data: any[] = [];
  @Input() displayedColumns: { key: string; label: string; pipe?: string }[] =
    [];

  @ContentChild('actions', { static: false })
  actionsTemplate!: TemplateRef<any>;

  getCellValue(row: any, column: string): any {
    return column.split('.').reduce((acc, prop) => acc?.[prop], row) ?? '';
  }

  get colsDef() {
    return this.displayedColumns.map((el) => el.key);
  }
}

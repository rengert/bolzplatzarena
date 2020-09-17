import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  columnDefs = [
    {
      headerName: '', children: [{ headerName: 'Make', field: 'make', filter: true, sortable: true }],
    },
    {
      headerName: 'Data', children: [
        { headerName: 'Model', field: 'model', editable: true, filter: true, sortable: true },
        { headerName: 'Price', field: 'price', editable: true, filter: true, sortable: true },
      ],
    },
    {
      headerName: 'Special', children: [
        { headerName: 'Model 2', field: 'model', editable: true, filter: true, sortable: true },
        { headerName: 'Price 2', field: 'price', editable: true, filter: true, sortable: true },
      ],
    },
  ];

  rowData = [...Array(10000).keys()].map(value => (
    { make: 'Toyota', model: 'Celica', price: value * 10 }));
}

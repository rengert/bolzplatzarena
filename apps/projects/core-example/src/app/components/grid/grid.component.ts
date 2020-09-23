import {ChangeDetectionStrategy, Component} from '@angular/core';

interface ColumnDef {
  headerName: string;
  field?: string;
  children?: ColumnDef[];
  editable?: boolean;
  filter?: boolean;
  sortable?: boolean;
}

interface Location {
  name: string;
  parent: Location;
}

interface Measurement {
  location: Location;
  data: any;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  columnDefs = createColumnDef();
  rowData = data();

  update(eventData: any): void {
    console.log('data has been changed and be viewed in the data model', eventData.columnDef);
  }
}

function data(): { [key: string]: any }[] {
  const dataList: { [key: string]: any }[] = [];

  for (const i of [...Array(10).keys()]) {
    const result: { [key: string]: any } = {};
    result.name = i;
    result[`Whg${ i }`] = i;
    dataList.push(result);
  }

  return dataList;
}

function createColumnDef(): ColumnDef[] {
  return [
    {
      headerName: '',
      children: [
        {
          headerName: '',
          children: [
            { headerName: 'LV', field: 'name', editable: false, filter: true, sortable: true },
          ],
        },
      ],
    },
    {
      headerName: 'Haus 1',
      children: [
        {
          headerName: 'Strang 1',
          children: [
            { headerName: 'Whg 1.1.1', field: 'Whg111', editable: true, filter: true, sortable: true },
            { headerName: 'Whg 1.1.2', field: 'Whg112', editable: true, filter: true, sortable: true },
          ],
        },
        {
          headerName: 'Strang 2',
          children: [
            { headerName: 'Whg 1.2.1', field: 'Whg121', editable: true, filter: true, sortable: true },
            { headerName: 'Whg 1.2.2', field: 'Whg122', editable: true, filter: true, sortable: true },
          ],
        },
      ],
    },
    {
      headerName: 'Haus 2',
      children: [
        {
          headerName: 'Strang 1',
          children: [
            { headerName: 'Whg 2.1.1', field: 'Whg211', editable: true, filter: true, sortable: true },
            { headerName: 'Whg 2.1.2', field: 'Whg212', editable: true, filter: true, sortable: true },
          ],
        },
        {
          headerName: 'Strang 2',
          children: [
            { headerName: 'Whg 2.2.1', field: 'Whg221', editable: true, filter: true, sortable: true },
            { headerName: 'Whg 2.2.2', field: 'Whg222', editable: true, filter: true, sortable: true },
          ],
        },
      ],
    },
  ];
}

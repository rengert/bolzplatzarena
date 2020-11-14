import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ColumnApi, GridApi } from 'ag-grid-community';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface ColumnDef {
  colId?: string;
  headerName: string;
  field?: string;
  children?: ColumnDef[];
  editable?: boolean;
  filter?: boolean;
  sortable?: boolean;
  pinned?: 'left' | 'right';
}

interface Building {
  name: string;
  strands: Strand[];
}

interface Strand {
  name: string;
  flats: Flat[];
}

interface Flat {
  id: string;
  name: string;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnDestroy {
  searchField = '';

  readonly columnDefs: ColumnDef[];
  readonly rowData: { [key: string]: any }[];

  readonly search = new BehaviorSubject<string>('');

  private readonly subscription: Subscription;

  private columnApi: ColumnApi;
  private gridApi: GridApi;

  constructor() {
    const locs = locations();

    this.columnDefs = createColumnDef(locs);
    this.rowData = data();

    this.subscription = this.search.pipe(
      debounceTime(500),
    ).subscribe(searchTerm => this.filter(searchTerm));
  }

  onGridReady(params: any): void {
    this.columnApi = params.columnApi;
    this.gridApi = params.api;
  }

  update(eventData: any): void {
    // eslint-disable-next-line no-console
    console.log('data has been changed and be viewed in the data model', eventData.colDef.field);
  }

  column(name: string, visible: boolean): void {
    this.columnApi.setColumnVisible(name, visible);
  }

  filter(searchTerm: string): void {
    this.gridApi.setFilterModel(
      {
        LV: {
          filterType: 'text',
          type: 'contains',
          filter: searchTerm,
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

function locations(): Building[] {
  const result: Building[] = [];

  for (let buildingNo = 1; buildingNo <= 10; buildingNo++) {
    const building: Building = { name: `Haus ${ buildingNo }`, strands: [] };
    for (let strandNo = 1; strandNo <= 2; strandNo++) {
      const strand: Strand = { name: `Strang ${ buildingNo }.${ strandNo }`, flats: [] };
      for (let levelNo = 1; levelNo <= 12; levelNo++) {
        strand.flats.push({
          id: `Whg${ buildingNo }A${ strandNo }A${ levelNo }`,
          name: `Whg ${ buildingNo }.${ strandNo }.${ levelNo }`,
        });
      }
      building.strands.push(strand);
    }
    result.push(building);
  }

  return result;
}

function data(): { [key: string]: any }[] {
  const dataList: { [key: string]: any }[] = [];

  for (const i of [...Array(5000).keys()]) {
    const result: { [key: string]: any } = {};
    result.name = `${ i }. Lorem ipsum op som dum`;
    result[`Whg${ i }A${ i }A${ i }`] = i;
    // eslint-disable-next-line yoda
    result.sum = 12.12 * i;
    dataList.push(result);
  }

  return dataList;
}

function createColumnDef(locs: Building[]): ColumnDef[] {
  return [
    {
      headerName: '',
      children: [
        {
          headerName: '',
          children: [
            {
              colId: 'LV',
              headerName: 'LV',
              field: 'name',
              editable: false,
              filter: false,
              sortable: true,
              pinned: 'left',
            },
          ],
        },
      ],
    },
    ...locs.map(
      loc => ({
        headerName: loc.name,
        children: loc.strands.map(strand => ({
          headerName: strand.name,
          children: strand.flats.map(flat => ({
            colId: flat.name,
            headerName: flat.name,
            field: flat.id,
            editable: true,
            filter: false,
            sortable: false,
            // eslint-disable-next-line
            cellStyle(params: any) {
              if (params.value) {

                return {
                  color: 'red',
                  backgroundColor: 'green',
                };
              }

              return {
                backgroundColor: 'red',
              };
            },
          })),
        })),
      }),
    ),
    {
      headerName: '',
      children: [
        {
          headerName: '',
          children: [
            {
              headerName: 'Summe',
              field: 'sum',
              editable: false,
              filter: false,
              sortable: false,
              pinned: 'right',
            },
          ],
        },
      ],
    },
  ];
}

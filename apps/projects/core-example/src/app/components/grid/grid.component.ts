import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ColumnDef {
  headerName: string;
  field?: string;
  children?: ColumnDef[];
  editable?: boolean;
  filter?: boolean;
  sortable?: boolean;
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
export class GridComponent {
  readonly columnDefs: ColumnDef[];
  readonly rowData: { [key: string]: any }[];

  constructor() {
    const locs = locations();

    this.columnDefs = createColumnDef(locs);
    this.rowData = data();
  }

  update(eventData: any): void {
    // tslint:disable-next-line:no-console
    console.log('data has been changed and be viewed in the data model', eventData.colDef.field);
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
    result.name = `Lorem ipsum op som dum ${ i }`;
    result[`Whg${ i }A${ i }A${ i }`] = i;
    // tslint:disable-next-line:binary-expression-operand-order
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
              headerName: 'LV',
              field: 'name',
              editable: false,
              filter: true,
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
            headerName: flat.name,
            field: flat.id,
            editable: true,
            filter: true,
            sortable: true,
            // tslint:disable-next-line:typedef
            cellStyle(params) {
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
            { headerName: 'Summe', field: 'sum', editable: false, filter: true, sortable: true, pinned: 'right' },
          ],
        },
      ],
    },
  ];
}
import { IReitsTableColumn } from '../ReitsTableColumns';

export interface IChartFilters {
  filters: {
    sectors: string[],
    columns: IReitsTableColumn[],
  },
  setFilters: any,
}

import { IReitsTableColumn } from './ReitsIndex/components/ReitsTableColumns/ReitsTableColumns';

export interface IChartFilters {
  filters: {
    sectors: string[],
    columns: IReitsTableColumn[],
  },
  setFilters: any,
}

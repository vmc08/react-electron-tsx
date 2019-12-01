import React, { ReactNode } from 'react';
import {
  InfiniteLoader, AutoSizer, List as RVList,
  CellMeasurerCache,
  IndexRange, ListRowProps,
} from 'react-virtualized';
import EmptyState from 'components/EmptyState';

interface IAppInfiniteLoader {
  dataSource: any[],
  isLoading: boolean,
  rowCount: number,
  fetchMore: ({ startIndex, stopIndex }: IndexRange) => Promise<any>,
  renderItem: ({ index, key, style, parent }: ListRowProps) => ReactNode,
}

export const DEFAULT_OVERSCAN_ROWS = 3;

export const CELL_MEASURER_CACHE = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 150,
  keyMapper: (index) => index,
});

class AppInfiniteLoader extends React.PureComponent<IAppInfiniteLoader> {
  rvListRef: any = null;
  constructor(props: any) {
    super(props);
    this.isRowLoaded = this.isRowLoaded.bind(this);
  }

  isRowLoaded({ index }: { index: number }) {
    return !!this.props.dataSource[index];
  }

  render() {
    const { dataSource, rowCount, fetchMore, isLoading, renderItem } = this.props;
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={fetchMore}
        rowCount={rowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <RVList
                ref={(el) => {
                  this.rvListRef = el;
                  registerChild(el);
                }}
                deferredMeasurementCache={CELL_MEASURER_CACHE}
                width={width}
                height={(dataSource.length === 0 && !isLoading) ? 175 : 505}
                rowHeight={CELL_MEASURER_CACHE.rowHeight}
                rowCount={rowCount}
                rowRenderer={renderItem}
                onRowsRendered={onRowsRendered}
                overscanRowCount={DEFAULT_OVERSCAN_ROWS}
                noRowsRenderer={() => (
                  <div className="py-3">
                    <EmptyState />
                  </div>
                )}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}

export default AppInfiniteLoader;

import React, { ChangeEvent } from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import styled from 'styled-components';
import moment from 'moment';
import { Card, Typography, Menu, Input, Comment, Tag, Alert, Skeleton } from 'antd';
import { CellMeasurer, IndexRange, ListRowProps } from 'react-virtualized';

import MiniSpinner from 'components/MiniSpinner';
import AppInfiniteLoader, {
  CELL_MEASURER_CACHE, DEFAULT_OVERSCAN_ROWS,
} from 'components/AppInfiniteLoader';

import MarketsContext, { DEFAULT_MARKET } from 'contexts/MarketsContext';
import { DASHBOARD_INSIGHTS } from 'apollo/queries/dashboard';
import { dedup } from 'utils/arrayUtils';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const DEFAULT_CATEGORY = 'news';

interface IInsight {
  avatar: string,
  content: string,
  insightId: number,
  description: string,
  link: string,
  publishDate: string,
  stockCode: string,
  tags: string[],
  title: string,
}

interface IInsightsState {
  rowCount: number,
  insights: IInsight[],
  selectedCategory: string,
  searchString: string | undefined,
  queryOffset: number,
  marketCode: string,
  isLoading: boolean,
  error: string | undefined,
}

interface IInsightsMenuProps {
  selectedCategory: string,
  setSelectedCategory: (selectedCategory: string) => void,
}

interface IInsightProps {
  client: any,
  token: string,
  stockCode: string | undefined,
}

interface IInsightResults {
  data: {
    insights: {
      count: number, rows: IInsight[],
    },
  },
}

const StyledMenu = styled(Menu)`
  background: transparent !important;
  border-bottom: 0 !important;
  .ant-menu-item {
    min-width: 85px;
    text-align: center;
    margin: 0 5px;
  }
`;

const StyledComment = styled(Comment)`
  .ant-comment-inner {
    .ant-comment-content-author {
      display: block;
    }
  }
`;

const InsightsMenu = ({ selectedCategory, setSelectedCategory }: IInsightsMenuProps) => {
  return (
    <StyledMenu
      className="mb-2 mb-sm-3"
      mode="horizontal"
      defaultSelectedKeys={[selectedCategory]}
    >
      {['All', 'News', 'Blog'].map((category) => (
        <Menu.Item
          key={category.toLowerCase()}
          onClick={() => setSelectedCategory(category.toLowerCase())}
        >
          {category}
        </Menu.Item>
      ))}
    </StyledMenu>
  );
};

class Insights extends React.PureComponent<WithApolloClient<IInsightProps>, IInsightsState> {
  rvListRef: any = null;
  constructor(props: WithApolloClient<IInsightProps>) {
    super(props);
    this.state = {
      rowCount: 100,
      insights: [],
      searchString: undefined,
      queryOffset: 0,
      isLoading: false,
      selectedCategory: DEFAULT_CATEGORY,
      marketCode: DEFAULT_MARKET.marketCode,
      error: undefined,
    };
    this.onErrorClose = this.onErrorClose.bind(this);
    this.setSelectedCategory = this.setSelectedCategory.bind(this);
    this.onSearchStringChange = this.onSearchStringChange.bind(this);

    this.fetchMoreInsights = this.fetchMoreInsights.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.resetListView = this.resetListView.bind(this);
  }

  async componentDidMount() {
    const { market: { marketCode } } = this.context;
    this.setState({ marketCode });
    window.addEventListener('resize', () => {
      CELL_MEASURER_CACHE.clearAll();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      CELL_MEASURER_CACHE.clearAll();
    });
  }

  async componentDidUpdate() {
    const { market: { marketCode } } = this.context;
    const { marketCode: marketCodeState } = this.state;
    if (marketCodeState !== marketCode) {
      this.resetListView({ marketCode, searchString: undefined });
    }
    CELL_MEASURER_CACHE.clearAll();
  }

  setSelectedCategory(selectedCategory: string) {
    if (selectedCategory !== this.state.selectedCategory) {
      this.resetListView({ selectedCategory, searchString: undefined });
    }
  }

  onSearchStringChange(e: ChangeEvent<HTMLInputElement>) {
    const searchString = e.target.value || undefined;
    this.setState({ searchString }, () => {
      if (!searchString) {
        this.resetListView({});
      }
    });
  }

  async resetListView(objectValues: any) {
    await this.setState({
      ...objectValues,
      insights: [],
      queryOffset: 0,
      isLoading: true,
    }, () => {
      this.fetchMoreInsights({ startIndex: 0, stopIndex: 18 });
    });
    CELL_MEASURER_CACHE.clearAll();
    if (this.rvListRef) {
      this.rvListRef.scrollToRow(0);
    }
  }

  async fetchMoreInsights({ startIndex, stopIndex }: IndexRange) {
    const {
      selectedCategory,
      queryOffset: queryOffsetState,
      insights, marketCode, searchString,
    } = this.state;
    const { token, client, stockCode } = this.props;
    if ((stopIndex <= insights.length)) {
      return;
    }
    await client.query({
      query: DASHBOARD_INSIGHTS,
      variables: {
        token,
        exchange: marketCode,
        limit: stopIndex - startIndex + DEFAULT_OVERSCAN_ROWS,
        offset: queryOffsetState,
        tags: selectedCategory === 'all' ? [] : [selectedCategory],
        ...(searchString && { search: searchString }),
        ...(stockCode && { stockCode }),
      },
    }).then(({ data }: IInsightResults) => {
      this.setState({
        rowCount: data.insights.count,
        insights: dedup(insights.concat(data.insights.rows)),
        isLoading: false,
        queryOffset: queryOffsetState + (stopIndex - startIndex + DEFAULT_OVERSCAN_ROWS),
      });
    }).catch((error: any) => {
      const { message: errorMessage } = error.graphQLErrors[0];
      this.setState({ isLoading: false, error: errorMessage });
    });
  }

  renderItem({ index, key, style, parent }: ListRowProps) {
    const { insights } = this.state;
    let content = (
      <div style={style} className="p-3">
        <Skeleton loading active avatar />
      </div>
    );
    if (insights[index]) {
      content = (
        <StyledComment
          style={style}
          className="px-3"
          author={<Text strong>{insights[index].title}</Text>}
          avatar={insights[index].avatar}
          content={<Paragraph type="secondary">{insights[index].description}</Paragraph>}
          actions={[
            <span>{moment(insights[index].publishDate).utc(false).fromNow()}</span>,
            <div>
              {insights[index].tags.map((tag: string, tagIdx: number) => {
                return <Tag key={tagIdx} color="blue">{tag}</Tag>;
              })}
            </div>,
          ]}
        />
      );
    }
    return (
      <CellMeasurer
        key={key}
        cache={CELL_MEASURER_CACHE}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {content}
      </CellMeasurer>
    );
  }

  onErrorClose() {
    this.setState({ error: undefined });
  }

  render() {
    const { setSelectedCategory, onSearchStringChange } = this;
    const {
      selectedCategory, searchString, isLoading,
      error: serverError, rowCount, insights,
    } = this.state;
    return (
      <Card className="p-3" bodyStyle={{ padding: 0 }}>
        <Title level={4}>Insights</Title>
        <InsightsMenu
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Search
          defaultValue={searchString}
          value={searchString}
          onChange={onSearchStringChange}
          size="large"
          placeholder="Search insight"
          className="mb-3"
          allowClear
          onSearch={() => {
            this.resetListView({ searchString });
          }}
        />
        {serverError && (
          <Alert
            message={serverError}
            type="error"
            closable
            onClose={this.onErrorClose}
          />
        )}
        <MiniSpinner isLoading={isLoading}>
          <AppInfiniteLoader
            dataSource={insights}
            isLoading={isLoading}
            rowCount={rowCount}
            fetchMore={this.fetchMoreInsights}
            renderItem={this.renderItem}
          />
        </MiniSpinner>
      </Card>
    );
  }
}

Insights.contextType = MarketsContext;

export default withApollo<WithApolloClient<IInsightProps>>(Insights);

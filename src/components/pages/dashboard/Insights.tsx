import React, { ChangeEvent } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import styled from 'styled-components';
import moment from 'moment';
import { Card, Typography, Menu, Input, Comment, Avatar, Tag, Alert } from 'antd';

import DashboardSpinner from '../../spinners/DashboardSpinner';
import EmptyState from '../../EmptyState';

import MarketsContext, { DEFAULT_MARKET } from '../../../contexts/MarketsContext';
import { DASHBOARD_INSIGHTS } from '../../../apollo/queries/dashboard';

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
  border-bottom: 1px solid #e8e8e8;
  &:last-of-type {
    border-bottom: 0;
  }
  .ant-comment-inner {
    .ant-comment-avatar {
      .ant-avatar > img {
        width: 100%;
        height: 100%;
      }
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

class Insights extends React.Component<IInsightProps, IInsightsState> {
  constructor(props: IInsightProps) {
    super(props);
    this.state = {
      insights: [],
      searchString: undefined,
      queryOffset: 0,
      isLoading: true,
      selectedCategory: DEFAULT_CATEGORY,
      marketCode: DEFAULT_MARKET.marketCode,
      error: undefined,
    };
    this.onErrorClose = this.onErrorClose.bind(this);
    this.fetchInsights = this.fetchInsights.bind(this);
    this.setSelectedCategory = this.setSelectedCategory.bind(this);
    this.onSearchStringChange = this.onSearchStringChange.bind(this);
  }

  async componentDidMount() {
    const { market: { marketCode } } = this.context;
    this.setState({ marketCode }, () => {
      this.fetchInsights();
    });
  }

  componentDidUpdate() {
    const { market: { marketCode } } = this.context;
    const { marketCode: marketCodeState } = this.state;
    if (marketCodeState !== marketCode) {
      this.setState({ marketCode }, this.fetchInsights);
    }
  }

  async fetchInsights() {
    const { selectedCategory, searchString, queryOffset, insights } = this.state;
    const { token, client } = this.props;
    const { market: { marketCode } } = this.context;
    await this.setState({ isLoading: true });
    await client.query({
      query: DASHBOARD_INSIGHTS,
      variables: {
        token,
        exchange: marketCode,
        limit: 4,
        offset: queryOffset,
        tags: selectedCategory === 'all' ? [] : [selectedCategory],
      },
    }).then(({ data }: { data: { insights: IInsight[] } }) => {
      this.setState({
        insights: data.insights,
        isLoading: false,
      });
    }).catch((error: any) => {
      const { message: errorMessage } = error.graphQLErrors[0];
      this.setState({ isLoading: false, error: errorMessage });
    });
  }

  setSelectedCategory(selectedCategory: string) {
    this.setState({ selectedCategory }, this.fetchInsights);
  }

  onSearchStringChange(e: ChangeEvent<HTMLInputElement>) {
    const searchString = e.target.value;
    this.setState({
      searchString: searchString || undefined,
    });
  }

  onErrorClose() {
    this.setState({ error: undefined });
  }

  render() {
    const { setSelectedCategory, onSearchStringChange } = this;
    const { selectedCategory, searchString, isLoading, insights, error: serverError } = this.state;
    return (
      <Card className="p-3" bodyStyle={{ padding: 0 }}>
        <Title level={4}>Insights</Title>
        <InsightsMenu
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Search
          defaultValue={searchString}
          onChange={onSearchStringChange}
          size="large"
          placeholder="Search insight"
          className="mb-3"
          allowClear
        />
        {serverError && (
          <Alert
            message={serverError}
            type="error"
            closable
            onClose={this.onErrorClose}
          />
        )}
        <DashboardSpinner isLoading={isLoading}>
          {insights.length ? (
            <div>
              {insights.map((insight: IInsight, idx: number) => (
                <StyledComment
                  className="px-3"
                  key={idx}
                  author={<Text strong>{insight.title}</Text>}
                  avatar={<Avatar size="large" src={insight.avatar} />}
                  content={<Paragraph ellipsis>{insight.description}</Paragraph>}
                  datetime={<span>{moment(insight.publishDate).utc(false).fromNow()}</span>}
                  actions={[
                    <div>
                      {insight.tags.map((tag: string, tagIdx: number) => {
                        return <Tag key={tagIdx} color="blue">{tag}</Tag>;
                      })}
                    </div>,
                  ]}
                />
              ))}
            </div>
          ) : (
            <div className="py-3">
              <EmptyState />
            </div>
          )}
        </DashboardSpinner>
      </Card>
    );
  }
}

Insights.contextType = MarketsContext;

export default withApollo(Insights);

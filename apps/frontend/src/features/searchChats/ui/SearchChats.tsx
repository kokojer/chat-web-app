import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Divider, Input, List, Skeleton, Space } from 'antd';
import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';

import { UserChatCard } from '../../../entities/userChatCard';

export const SearchChats: FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=15&inc=name,gender,email,nat,picture&noinfo',
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <StyledContainer>
      <StyledInput
        prefix={<SearchOutlined />}
        size="large"
        placeholder="Search"
      />
      <ScrollableDiv id="scrollableDiv">
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          scrollableTarget="scrollableDiv"
          style={{ overflow: 'visible' }}
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <UserChatCard
                data={{
                  avatar: item.picture.medium,
                  firstName: item.name.first,
                  lastName: item.name.last,
                  username: item.email,
                }}
              />
            )}
          />
        </InfiniteScroll>
      </ScrollableDiv>
    </StyledContainer>
  );
};

const StyledInput = styled(Input)`
  padding: 15px 30px;
  font-size: 20px;
  border-radius: 6px;
  box-shadow: 3px 3px 5px 0 ${({ theme }) => theme.base.boxShadow};
  border: 1px solid lightgray;
  cursor: pointer;
  &:hover {
    border: 1px solid lightgray;
  }

  .ant-input-prefix {
    color: gray;
    margin-right: 10px;
  }

  &.ant-input-outlined:focus-within {
    box-shadow: 0 0 7px 5px ${({ theme }) => theme.base.boxShadow};
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: clip;
  overflow-clip-margin: 20px;
  .ant-list-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const ScrollableDiv = styled.div`
  overflow: auto;
  padding-right: 14px;
  width: calc(100% + 20px);
`;

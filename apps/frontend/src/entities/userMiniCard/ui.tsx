import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, Typography } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

const { Title, Text } = Typography;

export const UserMiniCard: FC = () => {
  return (
    <StyledFlex align="center" style={{ padding: '7px' }} gap={10}>
      <Avatar icon={<UserOutlined />} size="large" />
      <Flex vertical style={{ overflow: 'hidden' }}>
        <Title level={5} style={{ margin: 0 }} ellipsis>
          Хартитонов Хераборачерт
        </Title>
        <Text ellipsis>@lolipop1331231231231231231237</Text>
      </Flex>
    </StyledFlex>
  );
};

const StyledFlex = styled(Flex)`
  max-width: 200px;
  .ant-avatar {
    min-width: 40px;
  }
`;

import { useReactiveVar } from '@apollo/client';
import { Button, Form, Input, Space, Typography } from 'antd';
import { Rule } from 'antd/lib/form';
import { FC } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { getBooleanFromString } from 'shared/lib';

import { TYPE_THEME, typeTheme } from '../../../shared/config/apolloClient';

type RulesType = Record<keyof FieldType, Rule[]>;

interface FieldType {
  username?: string;
  password?: string;
}

const { Title } = Typography;

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const RULES_FOR_FIELDS: RulesType = {
  username: [
    { required: true, message: 'Please input your username!' },
    {
      max: 20,
      message: 'Max: 20 symbols',
    },
  ],
  password: [
    { required: true, message: 'Please input your password!' },
    {
      max: 30,
      message: 'Max: 30 symbols',
    },
  ],
};

export const Auth: FC = () => {
  const [searchParams] = useSearchParams();
  const isRegister = getBooleanFromString(searchParams.get('register'));
  const themeType = useReactiveVar(typeTheme);

  return (
    <Space direction="vertical" size="small">
      <StyledTitle level={3}>
        {isRegister ? 'Sign up' : 'Sign in'} to {__APP_NAME__}
      </StyledTitle>
      <StyledFormContainer themeType={themeType}>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{ maxWidth: '600px' }}
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={RULES_FOR_FIELDS.username}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={RULES_FOR_FIELDS.password}
          >
            <Input.Password />
          </Form.Item>

          <StyledButton type="primary" htmlType="submit">
            {isRegister ? 'Sign up' : 'Sign in'}
          </StyledButton>
        </Form>
      </StyledFormContainer>
      <StyledSignUpContainer themeType={themeType}>
        <Typography>
          {isRegister ? 'Already have an account?' : `New to ${__APP_NAME__}?`}
        </Typography>
        <NavLink to={!isRegister ? '/auth?register=true' : '/auth'}>
          {isRegister ? 'Sign in' : 'Create an account'}
        </NavLink>
      </StyledSignUpContainer>
    </Space>
  );
};

const StyledFormContainer = styled.div<{ themeType: TYPE_THEME }>`
  padding: 10px;
  background: ${({ theme }) => theme.base.background.main};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.base.typography.inActiveText};
  box-shadow: ${({ theme, themeType }) =>
    themeType === TYPE_THEME.LIGHT
      ? `5px 5px 5px 0 ${theme.base.typography.inActiveText}`
      : 'none'};
  min-width: 250px;
`;

const StyledSignUpContainer = styled.div<{ themeType: TYPE_THEME }>`
  padding: 10px;
  background: ${({ theme }) => theme.base.background.main};
  border-radius: 6px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.base.typography.inActiveText};
  box-shadow: ${({ theme, themeType }) =>
    themeType === TYPE_THEME.LIGHT
      ? `5px 5px 5px 0 ${theme.base.typography.inActiveText}`
      : 'none'};
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  text-transform: uppercase;
`;

const StyledTitle = styled(Title)`
  margin: 0;
  text-align: center;
`;

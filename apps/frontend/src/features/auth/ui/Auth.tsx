import { useMutation, useReactiveVar } from '@apollo/client';
import { Button, Form, Input, Space, Typography, notification } from 'antd';
import { Rule } from 'antd/lib/form';
import { FC, useCallback, useEffect } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { TYPE_THEME, typeTheme, userInfo } from 'shared/config/globalVars.ts';
import { getBooleanFromString } from 'shared/lib';

import { LOGIN, SIGNUP } from '../api';

type RulesType = Record<keyof FieldType, Rule[]>;

interface FieldType {
  username: string;
  password: string;
}

const { Title } = Typography;

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
  const navigate = useNavigate();
  const [login, { data: loginData, error: loginError, reset: loginReset }] =
    useMutation(LOGIN);
  const [signup, { data: signupData, error: signupError, reset: signupReset }] =
    useMutation(SIGNUP);

  const onSubmit = useCallback(
    async (values: FieldType) => {
      if (isRegister) {
        await signup({
          variables: {
            username: values.username,
            password: values.password,
          },
        });
      } else {
        await login({
          variables: {
            username: values.username,
            password: values.password,
          },
        });
      }
    },
    [isRegister, login, signup],
  );

  useEffect(() => {
    if (!loginData) return;
    localStorage.setItem('accessToken', loginData.login.access_token);
    userInfo({
      userId: loginData.login.user.userId,
      username: loginData.login.user.username,
    });
    navigate('/');
  }, [loginData, navigate]);

  useEffect(() => {
    if (!signupData) return;
    localStorage.setItem('accessToken', signupData.signup.access_token);
    userInfo({
      userId: signupData.signup.user.userId,
      username: signupData.signup.user.username,
    });
    navigate('/');
  }, [navigate, signupData]);

  useEffect(() => {
    if (!loginError && !signupError) return;

    notification.error({
      message: 'Error!',
      description: loginError?.message || signupError?.message,
    });
  }, [loginError, signupError]);

  return (
    <Space direction="vertical" size="small">
      <StyledTitle level={3}>
        {isRegister ? 'Sign up' : 'Sign in'} to chat-web-app
      </StyledTitle>
      <StyledFormContainer $themeType={themeType}>
        <Form
          name="basic"
          onFinish={onSubmit}
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
      <StyledSignUpContainer $themeType={themeType}>
        <Typography>
          {isRegister ? 'Already have an account?' : `New to chat-web-app?`}
        </Typography>
        <NavLink
          to={!isRegister ? '/auth?register=true' : '/auth'}
          onClick={() => {
            loginReset();
            signupReset();
          }}
        >
          {isRegister ? 'Sign in' : 'Create an account'}
        </NavLink>
      </StyledSignUpContainer>
    </Space>
  );
};

const StyledFormContainer = styled.div<{ $themeType: TYPE_THEME }>`
  padding: 10px;
  background: ${({ theme }) => theme.base.background.main};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.base.typography.inActiveText};
  box-shadow: ${({ theme, $themeType }) =>
    $themeType === TYPE_THEME.LIGHT
      ? `5px 5px 5px 0 ${theme.base.typography.inActiveText}`
      : 'none'};
  min-width: 250px;
`;

const StyledSignUpContainer = styled.div<{ $themeType: TYPE_THEME }>`
  padding: 10px;
  background: ${({ theme }) => theme.base.background.main};
  border-radius: 6px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.base.typography.inActiveText};
  box-shadow: ${({ theme, $themeType }) =>
    $themeType === TYPE_THEME.LIGHT
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

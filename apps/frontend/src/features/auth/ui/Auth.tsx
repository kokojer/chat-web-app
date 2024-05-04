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
  firstName: string;
  lastName: string;
  password: string;
}

const { Title } = Typography;

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const RULES_FOR_FIELDS: RulesType = {
  firstName: [
    { required: true, message: 'Please input your first name!' },
    {
      max: 30,
      message: 'Max: 30 symbols',
    },
  ],
  lastName: [
    { required: true, message: 'Please input your last name!' },
    {
      max: 30,
      message: 'Max: 30 symbols',
    },
  ],
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
            firstName: values.firstName,
            lastName: values.lastName,
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
      firstName: loginData.login.user.firstName,
      lastName: loginData.login.user.lastName,
    });
    navigate('/');
  }, [loginData, navigate]);

  useEffect(() => {
    if (!signupData) return;
    localStorage.setItem('accessToken', signupData.signup.access_token);
    userInfo({
      userId: signupData.signup.user.userId,
      username: signupData.signup.user.username,
      firstName: signupData.signup.user.firstName,
      lastName: signupData.signup.user.lastName,
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
          {isRegister && (
            <>
              <Form.Item<FieldType>
                label="First name"
                name="firstName"
                rules={RULES_FOR_FIELDS.firstName}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Last name"
                name="lastName"
                rules={RULES_FOR_FIELDS.lastName}
              >
                <Input />
              </Form.Item>
            </>
          )}
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
  .ant-form-item {
    margin-bottom: 18px;
  }
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

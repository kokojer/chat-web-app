import { Button, Form, Input, Space, Typography } from 'antd';
import { FC } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { getBooleanFromString } from 'shared/lib';

type FieldType = {
  username?: string;
  password?: string;
};

const { Title } = Typography;

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const RULES_FOR_FIELDS = {
  username: [{ required: true, message: 'Please input your username!' }],
  password: [{ required: true, message: 'Please input your password!' }],
};

export const Auth: FC = () => {
  const [searchParams] = useSearchParams();
  const isRegister = getBooleanFromString(searchParams.get('register'));

  return (
    <Space direction="vertical" size="small">
      <StyledTitle level={3}>
        {isRegister ? 'Sign up' : 'Sign in'} to {__APP_NAME__}
      </StyledTitle>
      <StyledFormContainer>
        <StyledForm
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
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
        </StyledForm>
      </StyledFormContainer>
      <StyledSignUpContainer>
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

const StyledFormContainer = styled.div`
  padding: 10px;
  background: white;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.base.gray};
  box-shadow: 5px 5px 5px 0 gray;
  min-width: 250px;
`;

const StyledSignUpContainer = styled.div`
  padding: 10px;
  background: white;
  border-radius: 6px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.base.gray};
  box-shadow: 5px 5px 5px 0 gray;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  text-transform: uppercase;
`;

const StyledForm = styled(Form)`
  max-width: 600px;
`;

const StyledTitle = styled(Title)`
  margin: 0;
  text-align: center;
`;

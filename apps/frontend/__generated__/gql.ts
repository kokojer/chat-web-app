/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getUser($id: Int!) {\n    getUser(id: $id) {\n      avatar,\n      firstName,\n      lastName,\n      username,\n      id\n    }\n  }\n": types.GetUserDocument,
    "\n  mutation addImage($base64Image: String!, $fileType: String!) {\n    addUserImage(base64Image: $base64Image, fileType: $fileType)\n  }\n": types.AddImageDocument,
    "\n  mutation deleteImage {\n    deleteUserImage\n  }\n": types.DeleteImageDocument,
    "\n  mutation logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n mutation createChat($userId: Int!) {\n  createChat(userId: $userId) {\n    ChatMembers{\n      User{\n        username\n      }\n    }\n  }\n}\n": types.CreateChatDocument,
    "\n  mutation login($username: String!, $password: String!) {\n    login(loginUserInput: { username: $username, password: $password }) {\n      user {\n        avatar,\n        username,\n        userId: id,\n        firstName,\n        lastName\n      }\n      access_token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation signup($firstName: String!,$lastName: String!, $username: String!, $password: String!) {\n    signup(signupUserInput: { firstName: $firstName, lastName:$lastName, username: $username, password: $password }) {\n      user {\n        avatar,\n        username\n        userId: id,\n        firstName,\n        lastName\n      }\n      access_token\n    }\n}\n": types.SignupDocument,
    "\n  query getUserByOccurrences($nameOrUsername: String!, $page: Int!) {\n    getUsersByOccurrences(nameOrUsername: $nameOrUsername, page: $page) {\n      avatar,\n      firstName,\n      lastName,\n      username,\n      userId: id\n    }\n  }\n": types.GetUserByOccurrencesDocument,
    "mutation refreshTokens {\n  refreshTokens {\n    user {\n      username\n      userId: id\n    }\n    access_token\n  }\n}": types.RefreshTokensDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUser($id: Int!) {\n    getUser(id: $id) {\n      avatar,\n      firstName,\n      lastName,\n      username,\n      id\n    }\n  }\n"): (typeof documents)["\n  query getUser($id: Int!) {\n    getUser(id: $id) {\n      avatar,\n      firstName,\n      lastName,\n      username,\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addImage($base64Image: String!, $fileType: String!) {\n    addUserImage(base64Image: $base64Image, fileType: $fileType)\n  }\n"): (typeof documents)["\n  mutation addImage($base64Image: String!, $fileType: String!) {\n    addUserImage(base64Image: $base64Image, fileType: $fileType)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteImage {\n    deleteUserImage\n  }\n"): (typeof documents)["\n  mutation deleteImage {\n    deleteUserImage\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation logout {\n    logout\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n mutation createChat($userId: Int!) {\n  createChat(userId: $userId) {\n    ChatMembers{\n      User{\n        username\n      }\n    }\n  }\n}\n"): (typeof documents)["\n mutation createChat($userId: Int!) {\n  createChat(userId: $userId) {\n    ChatMembers{\n      User{\n        username\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation login($username: String!, $password: String!) {\n    login(loginUserInput: { username: $username, password: $password }) {\n      user {\n        avatar,\n        username,\n        userId: id,\n        firstName,\n        lastName\n      }\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation login($username: String!, $password: String!) {\n    login(loginUserInput: { username: $username, password: $password }) {\n      user {\n        avatar,\n        username,\n        userId: id,\n        firstName,\n        lastName\n      }\n      access_token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation signup($firstName: String!,$lastName: String!, $username: String!, $password: String!) {\n    signup(signupUserInput: { firstName: $firstName, lastName:$lastName, username: $username, password: $password }) {\n      user {\n        avatar,\n        username\n        userId: id,\n        firstName,\n        lastName\n      }\n      access_token\n    }\n}\n"): (typeof documents)["\n  mutation signup($firstName: String!,$lastName: String!, $username: String!, $password: String!) {\n    signup(signupUserInput: { firstName: $firstName, lastName:$lastName, username: $username, password: $password }) {\n      user {\n        avatar,\n        username\n        userId: id,\n        firstName,\n        lastName\n      }\n      access_token\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserByOccurrences($nameOrUsername: String!, $page: Int!) {\n    getUsersByOccurrences(nameOrUsername: $nameOrUsername, page: $page) {\n      avatar,\n      firstName,\n      lastName,\n      username,\n      userId: id\n    }\n  }\n"): (typeof documents)["\n  query getUserByOccurrences($nameOrUsername: String!, $page: Int!) {\n    getUsersByOccurrences(nameOrUsername: $nameOrUsername, page: $page) {\n      avatar,\n      firstName,\n      lastName,\n      username,\n      userId: id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation refreshTokens {\n  refreshTokens {\n    user {\n      username\n      userId: id\n    }\n    access_token\n  }\n}"): (typeof documents)["mutation refreshTokens {\n  refreshTokens {\n    user {\n      username\n      userId: id\n    }\n    access_token\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
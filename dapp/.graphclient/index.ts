// @ts-nocheck
import {
  GraphQLResolveInfo,
  SelectionSetNode,
  FieldNode,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { gql } from '@graphql-mesh/utils'

import type { GetMeshOptions } from '@graphql-mesh/runtime'
import type { YamlConfig } from '@graphql-mesh/types'
import { PubSub } from '@graphql-mesh/utils'
import { DefaultLogger } from '@graphql-mesh/utils'
import MeshCache from '@graphql-mesh/cache-localforage'
import { fetch as fetchFn } from '@whatwg-node/fetch'

import { MeshResolvedSource } from '@graphql-mesh/runtime'
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types'
import GraphqlHandler from '@graphql-mesh/graphql'
import BareMerger from '@graphql-mesh/merger-bare'
import { printWithCache } from '@graphql-mesh/utils'
import { createMeshHTTPHandler } from '@graphql-mesh/http'
import {
  getMesh,
  ExecuteMeshFn,
  SubscribeMeshFn,
  MeshContext as BaseMeshContext,
  MeshInstance,
} from '@graphql-mesh/runtime'
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store'
import { path as pathModule } from '@graphql-mesh/cross-helpers'
import { ImportFn } from '@graphql-mesh/types'
import type { ZkauthtotpTypes } from './sources/zkauthtotp/types'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigDecimal: any
  BigInt: any
  Bytes: any
}

export type Address = {
  id: Scalars['ID']
  address: Scalars['Bytes']
  authOutgoing?: Maybe<Array<Authentication>>
  authIncoming?: Maybe<Array<Authentication>>
}

export type AddressauthOutgoingArgs = {
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Authentication_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<Authentication_filter>
}

export type AddressauthIncomingArgs = {
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Authentication_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<Authentication_filter>
}

export type Address_filter = {
  id?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_lt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  address?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  authOutgoing_?: InputMaybe<Authentication_filter>
  authIncoming_?: InputMaybe<Authentication_filter>
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
}

export type Address_orderBy = 'id' | 'address' | 'authOutgoing' | 'authIncoming'

export type AuthData = {
  id: Scalars['ID']
  authentication: Authentication
  totp5: Scalars['BigInt']
  totp6Hash: Scalars['Bytes']
  genTime: Scalars['BigInt']
  created: Scalars['String']
}

export type AuthData_filter = {
  id?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_lt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  authentication?: InputMaybe<Scalars['String']>
  authentication_not?: InputMaybe<Scalars['String']>
  authentication_gt?: InputMaybe<Scalars['String']>
  authentication_lt?: InputMaybe<Scalars['String']>
  authentication_gte?: InputMaybe<Scalars['String']>
  authentication_lte?: InputMaybe<Scalars['String']>
  authentication_in?: InputMaybe<Array<Scalars['String']>>
  authentication_not_in?: InputMaybe<Array<Scalars['String']>>
  authentication_contains?: InputMaybe<Scalars['String']>
  authentication_contains_nocase?: InputMaybe<Scalars['String']>
  authentication_not_contains?: InputMaybe<Scalars['String']>
  authentication_not_contains_nocase?: InputMaybe<Scalars['String']>
  authentication_starts_with?: InputMaybe<Scalars['String']>
  authentication_starts_with_nocase?: InputMaybe<Scalars['String']>
  authentication_not_starts_with?: InputMaybe<Scalars['String']>
  authentication_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  authentication_ends_with?: InputMaybe<Scalars['String']>
  authentication_ends_with_nocase?: InputMaybe<Scalars['String']>
  authentication_not_ends_with?: InputMaybe<Scalars['String']>
  authentication_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  authentication_?: InputMaybe<Authentication_filter>
  totp5?: InputMaybe<Scalars['BigInt']>
  totp5_not?: InputMaybe<Scalars['BigInt']>
  totp5_gt?: InputMaybe<Scalars['BigInt']>
  totp5_lt?: InputMaybe<Scalars['BigInt']>
  totp5_gte?: InputMaybe<Scalars['BigInt']>
  totp5_lte?: InputMaybe<Scalars['BigInt']>
  totp5_in?: InputMaybe<Array<Scalars['BigInt']>>
  totp5_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  totp6Hash?: InputMaybe<Scalars['Bytes']>
  totp6Hash_not?: InputMaybe<Scalars['Bytes']>
  totp6Hash_in?: InputMaybe<Array<Scalars['Bytes']>>
  totp6Hash_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  totp6Hash_contains?: InputMaybe<Scalars['Bytes']>
  totp6Hash_not_contains?: InputMaybe<Scalars['Bytes']>
  genTime?: InputMaybe<Scalars['BigInt']>
  genTime_not?: InputMaybe<Scalars['BigInt']>
  genTime_gt?: InputMaybe<Scalars['BigInt']>
  genTime_lt?: InputMaybe<Scalars['BigInt']>
  genTime_gte?: InputMaybe<Scalars['BigInt']>
  genTime_lte?: InputMaybe<Scalars['BigInt']>
  genTime_in?: InputMaybe<Array<Scalars['BigInt']>>
  genTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  created?: InputMaybe<Scalars['String']>
  created_not?: InputMaybe<Scalars['String']>
  created_gt?: InputMaybe<Scalars['String']>
  created_lt?: InputMaybe<Scalars['String']>
  created_gte?: InputMaybe<Scalars['String']>
  created_lte?: InputMaybe<Scalars['String']>
  created_in?: InputMaybe<Array<Scalars['String']>>
  created_not_in?: InputMaybe<Array<Scalars['String']>>
  created_contains?: InputMaybe<Scalars['String']>
  created_contains_nocase?: InputMaybe<Scalars['String']>
  created_not_contains?: InputMaybe<Scalars['String']>
  created_not_contains_nocase?: InputMaybe<Scalars['String']>
  created_starts_with?: InputMaybe<Scalars['String']>
  created_starts_with_nocase?: InputMaybe<Scalars['String']>
  created_not_starts_with?: InputMaybe<Scalars['String']>
  created_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  created_ends_with?: InputMaybe<Scalars['String']>
  created_ends_with_nocase?: InputMaybe<Scalars['String']>
  created_not_ends_with?: InputMaybe<Scalars['String']>
  created_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
}

export type AuthData_orderBy =
  | 'id'
  | 'authentication'
  | 'totp5'
  | 'totp6Hash'
  | 'genTime'
  | 'created'

export type AuthStatus = {
  id: Scalars['ID']
  authentication: Authentication
  hasResponse: Scalars['Boolean']
  isValid: Scalars['Boolean']
  validationTime?: Maybe<Scalars['String']>
}

export type AuthStatus_filter = {
  id?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_lt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  authentication?: InputMaybe<Scalars['String']>
  authentication_not?: InputMaybe<Scalars['String']>
  authentication_gt?: InputMaybe<Scalars['String']>
  authentication_lt?: InputMaybe<Scalars['String']>
  authentication_gte?: InputMaybe<Scalars['String']>
  authentication_lte?: InputMaybe<Scalars['String']>
  authentication_in?: InputMaybe<Array<Scalars['String']>>
  authentication_not_in?: InputMaybe<Array<Scalars['String']>>
  authentication_contains?: InputMaybe<Scalars['String']>
  authentication_contains_nocase?: InputMaybe<Scalars['String']>
  authentication_not_contains?: InputMaybe<Scalars['String']>
  authentication_not_contains_nocase?: InputMaybe<Scalars['String']>
  authentication_starts_with?: InputMaybe<Scalars['String']>
  authentication_starts_with_nocase?: InputMaybe<Scalars['String']>
  authentication_not_starts_with?: InputMaybe<Scalars['String']>
  authentication_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  authentication_ends_with?: InputMaybe<Scalars['String']>
  authentication_ends_with_nocase?: InputMaybe<Scalars['String']>
  authentication_not_ends_with?: InputMaybe<Scalars['String']>
  authentication_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  authentication_?: InputMaybe<Authentication_filter>
  hasResponse?: InputMaybe<Scalars['Boolean']>
  hasResponse_not?: InputMaybe<Scalars['Boolean']>
  hasResponse_in?: InputMaybe<Array<Scalars['Boolean']>>
  hasResponse_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  isValid?: InputMaybe<Scalars['Boolean']>
  isValid_not?: InputMaybe<Scalars['Boolean']>
  isValid_in?: InputMaybe<Array<Scalars['Boolean']>>
  isValid_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  validationTime?: InputMaybe<Scalars['String']>
  validationTime_not?: InputMaybe<Scalars['String']>
  validationTime_gt?: InputMaybe<Scalars['String']>
  validationTime_lt?: InputMaybe<Scalars['String']>
  validationTime_gte?: InputMaybe<Scalars['String']>
  validationTime_lte?: InputMaybe<Scalars['String']>
  validationTime_in?: InputMaybe<Array<Scalars['String']>>
  validationTime_not_in?: InputMaybe<Array<Scalars['String']>>
  validationTime_contains?: InputMaybe<Scalars['String']>
  validationTime_contains_nocase?: InputMaybe<Scalars['String']>
  validationTime_not_contains?: InputMaybe<Scalars['String']>
  validationTime_not_contains_nocase?: InputMaybe<Scalars['String']>
  validationTime_starts_with?: InputMaybe<Scalars['String']>
  validationTime_starts_with_nocase?: InputMaybe<Scalars['String']>
  validationTime_not_starts_with?: InputMaybe<Scalars['String']>
  validationTime_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  validationTime_ends_with?: InputMaybe<Scalars['String']>
  validationTime_ends_with_nocase?: InputMaybe<Scalars['String']>
  validationTime_not_ends_with?: InputMaybe<Scalars['String']>
  validationTime_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
}

export type AuthStatus_orderBy =
  | 'id'
  | 'authentication'
  | 'hasResponse'
  | 'isValid'
  | 'validationTime'

export type Authentication = {
  id: Scalars['ID']
  requestId: Scalars['BigInt']
  requestor: Address
  requestee: Address
  authData?: Maybe<AuthData>
  status?: Maybe<AuthStatus>
  created: Scalars['String']
}

export type Authentication_filter = {
  id?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_lt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  requestId?: InputMaybe<Scalars['BigInt']>
  requestId_not?: InputMaybe<Scalars['BigInt']>
  requestId_gt?: InputMaybe<Scalars['BigInt']>
  requestId_lt?: InputMaybe<Scalars['BigInt']>
  requestId_gte?: InputMaybe<Scalars['BigInt']>
  requestId_lte?: InputMaybe<Scalars['BigInt']>
  requestId_in?: InputMaybe<Array<Scalars['BigInt']>>
  requestId_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  requestor?: InputMaybe<Scalars['String']>
  requestor_not?: InputMaybe<Scalars['String']>
  requestor_gt?: InputMaybe<Scalars['String']>
  requestor_lt?: InputMaybe<Scalars['String']>
  requestor_gte?: InputMaybe<Scalars['String']>
  requestor_lte?: InputMaybe<Scalars['String']>
  requestor_in?: InputMaybe<Array<Scalars['String']>>
  requestor_not_in?: InputMaybe<Array<Scalars['String']>>
  requestor_contains?: InputMaybe<Scalars['String']>
  requestor_contains_nocase?: InputMaybe<Scalars['String']>
  requestor_not_contains?: InputMaybe<Scalars['String']>
  requestor_not_contains_nocase?: InputMaybe<Scalars['String']>
  requestor_starts_with?: InputMaybe<Scalars['String']>
  requestor_starts_with_nocase?: InputMaybe<Scalars['String']>
  requestor_not_starts_with?: InputMaybe<Scalars['String']>
  requestor_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  requestor_ends_with?: InputMaybe<Scalars['String']>
  requestor_ends_with_nocase?: InputMaybe<Scalars['String']>
  requestor_not_ends_with?: InputMaybe<Scalars['String']>
  requestor_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  requestor_?: InputMaybe<Address_filter>
  requestee?: InputMaybe<Scalars['String']>
  requestee_not?: InputMaybe<Scalars['String']>
  requestee_gt?: InputMaybe<Scalars['String']>
  requestee_lt?: InputMaybe<Scalars['String']>
  requestee_gte?: InputMaybe<Scalars['String']>
  requestee_lte?: InputMaybe<Scalars['String']>
  requestee_in?: InputMaybe<Array<Scalars['String']>>
  requestee_not_in?: InputMaybe<Array<Scalars['String']>>
  requestee_contains?: InputMaybe<Scalars['String']>
  requestee_contains_nocase?: InputMaybe<Scalars['String']>
  requestee_not_contains?: InputMaybe<Scalars['String']>
  requestee_not_contains_nocase?: InputMaybe<Scalars['String']>
  requestee_starts_with?: InputMaybe<Scalars['String']>
  requestee_starts_with_nocase?: InputMaybe<Scalars['String']>
  requestee_not_starts_with?: InputMaybe<Scalars['String']>
  requestee_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  requestee_ends_with?: InputMaybe<Scalars['String']>
  requestee_ends_with_nocase?: InputMaybe<Scalars['String']>
  requestee_not_ends_with?: InputMaybe<Scalars['String']>
  requestee_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  requestee_?: InputMaybe<Address_filter>
  authData_?: InputMaybe<AuthData_filter>
  status_?: InputMaybe<AuthStatus_filter>
  created?: InputMaybe<Scalars['String']>
  created_not?: InputMaybe<Scalars['String']>
  created_gt?: InputMaybe<Scalars['String']>
  created_lt?: InputMaybe<Scalars['String']>
  created_gte?: InputMaybe<Scalars['String']>
  created_lte?: InputMaybe<Scalars['String']>
  created_in?: InputMaybe<Array<Scalars['String']>>
  created_not_in?: InputMaybe<Array<Scalars['String']>>
  created_contains?: InputMaybe<Scalars['String']>
  created_contains_nocase?: InputMaybe<Scalars['String']>
  created_not_contains?: InputMaybe<Scalars['String']>
  created_not_contains_nocase?: InputMaybe<Scalars['String']>
  created_starts_with?: InputMaybe<Scalars['String']>
  created_starts_with_nocase?: InputMaybe<Scalars['String']>
  created_not_starts_with?: InputMaybe<Scalars['String']>
  created_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  created_ends_with?: InputMaybe<Scalars['String']>
  created_ends_with_nocase?: InputMaybe<Scalars['String']>
  created_not_ends_with?: InputMaybe<Scalars['String']>
  created_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
}

export type Authentication_orderBy =
  | 'id'
  | 'requestId'
  | 'requestor'
  | 'requestee'
  | 'authData'
  | 'status'
  | 'created'

export type BlockChangedFilter = {
  number_gte: Scalars['Int']
}

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>
  number?: InputMaybe<Scalars['Int']>
  number_gte?: InputMaybe<Scalars['Int']>
}

/** Defines the order direction, either ascending or descending */
export type OrderDirection = 'asc' | 'desc'

export type Query = {
  authentication?: Maybe<Authentication>
  authentications: Array<Authentication>
  authData?: Maybe<AuthData>
  authDatas: Array<AuthData>
  authStatus?: Maybe<AuthStatus>
  authStatuses: Array<AuthStatus>
  address?: Maybe<Address>
  addresses: Array<Address>
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
}

export type QueryauthenticationArgs = {
  id: Scalars['ID']
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryauthenticationsArgs = {
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Authentication_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<Authentication_filter>
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryauthDataArgs = {
  id: Scalars['ID']
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryauthDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<AuthData_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<AuthData_filter>
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryauthStatusArgs = {
  id: Scalars['ID']
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryauthStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<AuthStatus_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<AuthStatus_filter>
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryaddressArgs = {
  id: Scalars['ID']
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryaddressesArgs = {
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Address_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<Address_filter>
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_metaArgs = {
  block?: InputMaybe<Block_height>
}

export type Subscription = {
  authentication?: Maybe<Authentication>
  authentications: Array<Authentication>
  authData?: Maybe<AuthData>
  authDatas: Array<AuthData>
  authStatus?: Maybe<AuthStatus>
  authStatuses: Array<AuthStatus>
  address?: Maybe<Address>
  addresses: Array<Address>
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
}

export type SubscriptionauthenticationArgs = {
  id: Scalars['ID']
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionauthenticationsArgs = {
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Authentication_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<Authentication_filter>
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionauthDataArgs = {
  id: Scalars['ID']
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionauthDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<AuthData_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<AuthData_filter>
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionauthStatusArgs = {
  id: Scalars['ID']
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionauthStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<AuthStatus_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<AuthStatus_filter>
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionaddressArgs = {
  id: Scalars['ID']
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionaddressesArgs = {
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Address_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<Address_filter>
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>
}

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>
  /** The block number */
  number: Scalars['Int']
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']
}

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny'

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode)
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Address: ResolverTypeWrapper<Address>
  Address_filter: Address_filter
  Address_orderBy: Address_orderBy
  AuthData: ResolverTypeWrapper<AuthData>
  AuthData_filter: AuthData_filter
  AuthData_orderBy: AuthData_orderBy
  AuthStatus: ResolverTypeWrapper<AuthStatus>
  AuthStatus_filter: AuthStatus_filter
  AuthStatus_orderBy: AuthStatus_orderBy
  Authentication: ResolverTypeWrapper<Authentication>
  Authentication_filter: Authentication_filter
  Authentication_orderBy: Authentication_orderBy
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>
  BlockChangedFilter: BlockChangedFilter
  Block_height: Block_height
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>
  Float: ResolverTypeWrapper<Scalars['Float']>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  OrderDirection: OrderDirection
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  Subscription: ResolverTypeWrapper<{}>
  _Block_: ResolverTypeWrapper<_Block_>
  _Meta_: ResolverTypeWrapper<_Meta_>
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: Address
  Address_filter: Address_filter
  AuthData: AuthData
  AuthData_filter: AuthData_filter
  AuthStatus: AuthStatus
  AuthStatus_filter: AuthStatus_filter
  Authentication: Authentication
  Authentication_filter: Authentication_filter
  BigDecimal: Scalars['BigDecimal']
  BigInt: Scalars['BigInt']
  BlockChangedFilter: BlockChangedFilter
  Block_height: Block_height
  Boolean: Scalars['Boolean']
  Bytes: Scalars['Bytes']
  Float: Scalars['Float']
  ID: Scalars['ID']
  Int: Scalars['Int']
  Query: {}
  String: Scalars['String']
  Subscription: {}
  _Block_: _Block_
  _Meta_: _Meta_
}>

export type entityDirectiveArgs = {}

export type entityDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = entityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']
}

export type subgraphIdDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = subgraphIdDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type derivedFromDirectiveArgs = {
  field: Scalars['String']
}

export type derivedFromDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = derivedFromDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AddressResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>
  authOutgoing?: Resolver<
    Maybe<Array<ResolversTypes['Authentication']>>,
    ParentType,
    ContextType,
    RequireFields<AddressauthOutgoingArgs, 'skip' | 'first'>
  >
  authIncoming?: Resolver<
    Maybe<Array<ResolversTypes['Authentication']>>,
    ParentType,
    ContextType,
    RequireFields<AddressauthIncomingArgs, 'skip' | 'first'>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type AuthDataResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['AuthData'] = ResolversParentTypes['AuthData']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  authentication?: Resolver<
    ResolversTypes['Authentication'],
    ParentType,
    ContextType
  >
  totp5?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  totp6Hash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>
  genTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type AuthStatusResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['AuthStatus'] = ResolversParentTypes['AuthStatus']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  authentication?: Resolver<
    ResolversTypes['Authentication'],
    ParentType,
    ContextType
  >
  hasResponse?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isValid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  validationTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type AuthenticationResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Authentication'] = ResolversParentTypes['Authentication']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  requestId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  requestor?: Resolver<ResolversTypes['Address'], ParentType, ContextType>
  requestee?: Resolver<ResolversTypes['Address'], ParentType, ContextType>
  authData?: Resolver<
    Maybe<ResolversTypes['AuthData']>,
    ParentType,
    ContextType
  >
  status?: Resolver<
    Maybe<ResolversTypes['AuthStatus']>,
    ParentType,
    ContextType
  >
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export interface BigDecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal'
}

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt'
}

export interface BytesScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes'
}

export type QueryResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  authentication?: Resolver<
    Maybe<ResolversTypes['Authentication']>,
    ParentType,
    ContextType,
    RequireFields<QueryauthenticationArgs, 'id' | 'subgraphError'>
  >
  authentications?: Resolver<
    Array<ResolversTypes['Authentication']>,
    ParentType,
    ContextType,
    RequireFields<QueryauthenticationsArgs, 'skip' | 'first' | 'subgraphError'>
  >
  authData?: Resolver<
    Maybe<ResolversTypes['AuthData']>,
    ParentType,
    ContextType,
    RequireFields<QueryauthDataArgs, 'id' | 'subgraphError'>
  >
  authDatas?: Resolver<
    Array<ResolversTypes['AuthData']>,
    ParentType,
    ContextType,
    RequireFields<QueryauthDatasArgs, 'skip' | 'first' | 'subgraphError'>
  >
  authStatus?: Resolver<
    Maybe<ResolversTypes['AuthStatus']>,
    ParentType,
    ContextType,
    RequireFields<QueryauthStatusArgs, 'id' | 'subgraphError'>
  >
  authStatuses?: Resolver<
    Array<ResolversTypes['AuthStatus']>,
    ParentType,
    ContextType,
    RequireFields<QueryauthStatusesArgs, 'skip' | 'first' | 'subgraphError'>
  >
  address?: Resolver<
    Maybe<ResolversTypes['Address']>,
    ParentType,
    ContextType,
    RequireFields<QueryaddressArgs, 'id' | 'subgraphError'>
  >
  addresses?: Resolver<
    Array<ResolversTypes['Address']>,
    ParentType,
    ContextType,
    RequireFields<QueryaddressesArgs, 'skip' | 'first' | 'subgraphError'>
  >
  _meta?: Resolver<
    Maybe<ResolversTypes['_Meta_']>,
    ParentType,
    ContextType,
    Partial<Query_metaArgs>
  >
}>

export type SubscriptionResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = ResolversObject<{
  authentication?: SubscriptionResolver<
    Maybe<ResolversTypes['Authentication']>,
    'authentication',
    ParentType,
    ContextType,
    RequireFields<SubscriptionauthenticationArgs, 'id' | 'subgraphError'>
  >
  authentications?: SubscriptionResolver<
    Array<ResolversTypes['Authentication']>,
    'authentications',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionauthenticationsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >
  authData?: SubscriptionResolver<
    Maybe<ResolversTypes['AuthData']>,
    'authData',
    ParentType,
    ContextType,
    RequireFields<SubscriptionauthDataArgs, 'id' | 'subgraphError'>
  >
  authDatas?: SubscriptionResolver<
    Array<ResolversTypes['AuthData']>,
    'authDatas',
    ParentType,
    ContextType,
    RequireFields<SubscriptionauthDatasArgs, 'skip' | 'first' | 'subgraphError'>
  >
  authStatus?: SubscriptionResolver<
    Maybe<ResolversTypes['AuthStatus']>,
    'authStatus',
    ParentType,
    ContextType,
    RequireFields<SubscriptionauthStatusArgs, 'id' | 'subgraphError'>
  >
  authStatuses?: SubscriptionResolver<
    Array<ResolversTypes['AuthStatus']>,
    'authStatuses',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionauthStatusesArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >
  address?: SubscriptionResolver<
    Maybe<ResolversTypes['Address']>,
    'address',
    ParentType,
    ContextType,
    RequireFields<SubscriptionaddressArgs, 'id' | 'subgraphError'>
  >
  addresses?: SubscriptionResolver<
    Array<ResolversTypes['Address']>,
    'addresses',
    ParentType,
    ContextType,
    RequireFields<SubscriptionaddressesArgs, 'skip' | 'first' | 'subgraphError'>
  >
  _meta?: SubscriptionResolver<
    Maybe<ResolversTypes['_Meta_']>,
    '_meta',
    ParentType,
    ContextType,
    Partial<Subscription_metaArgs>
  >
}>

export type _Block_Resolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']
> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type _Meta_Resolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']
> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  hasIndexingErrors?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Address?: AddressResolvers<ContextType>
  AuthData?: AuthDataResolvers<ContextType>
  AuthStatus?: AuthStatusResolvers<ContextType>
  Authentication?: AuthenticationResolvers<ContextType>
  BigDecimal?: GraphQLScalarType
  BigInt?: GraphQLScalarType
  Bytes?: GraphQLScalarType
  Query?: QueryResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  _Block_?: _Block_Resolvers<ContextType>
  _Meta_?: _Meta_Resolvers<ContextType>
}>

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>
}>

export type MeshContext = ZkauthtotpTypes.Context & BaseMeshContext

import { fileURLToPath } from '@graphql-mesh/utils'
const baseDir = pathModule.join(
  pathModule.dirname(fileURLToPath(import.meta.url)),
  '..'
)

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (
    pathModule.isAbsolute(moduleId)
      ? pathModule.relative(baseDir, moduleId)
      : moduleId
  )
    .split('\\')
    .join('/')
    .replace(baseDir + '/', '')
  switch (relativeModuleId) {
    case '.graphclient/sources/zkauthtotp/introspectionSchema':
      return import('./sources/zkauthtotp/introspectionSchema') as T

    default:
      return Promise.reject(
        new Error(`Cannot find module '${relativeModuleId}'.`)
      )
  }
}

const rootStore = new MeshStore(
  '.graphclient',
  new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
    fileType: 'ts',
  }),
  {
    readonly: true,
    validate: false,
  }
)

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
  const pubsub = new PubSub()
  const sourcesStore = rootStore.child('sources')
  const logger = new DefaultLogger('GraphClient')
  const cache = new (MeshCache as any)({
    ...({} as any),
    importFn,
    store: rootStore.child('cache'),
    pubsub,
    logger,
  } as any)

  const sources: MeshResolvedSource[] = []
  const transforms: MeshTransform[] = []
  const additionalEnvelopPlugins: MeshPlugin<any>[] = []
  const zkauthtotpTransforms = []
  const additionalTypeDefs = [] as any[]
  const zkauthtotpHandler = new GraphqlHandler({
    name: 'zkauthtotp',
    config: {
      endpoint: 'https://api.thegraph.com/subgraphs/name/3llobo/zkauthtotp',
    },
    baseDir,
    cache,
    pubsub,
    store: sourcesStore.child('zkauthtotp'),
    logger: logger.child('zkauthtotp'),
    importFn,
  })
  sources[0] = {
    name: 'zkauthtotp',
    handler: zkauthtotpHandler,
    transforms: zkauthtotpTransforms,
  }
  const additionalResolvers = [] as any[]
  const merger = new (BareMerger as any)({
    cache,
    pubsub,
    logger: logger.child('bareMerger'),
    store: rootStore.child('bareMerger'),
  })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
        {
          document: AddressAllDocument,
          get rawSDL() {
            return printWithCache(AddressAllDocument)
          },
          location: 'AddressAllDocument.graphql',
        },
      ]
    },
    fetchFn,
  }
}

export function createBuiltMeshHTTPHandler() {
  return createMeshHTTPHandler({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}

let meshInstance$: Promise<MeshInstance> | undefined

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions()
      .then((meshOptions) => getMesh(meshOptions))
      .then((mesh) => {
        const id = mesh.pubsub.subscribe('destroy', () => {
          meshInstance$ = undefined
          mesh.pubsub.unsubscribe(id)
        })
        return mesh
      })
  }
  return meshInstance$
}

export const execute: ExecuteMeshFn = (...args) =>
  getBuiltGraphClient().then(({ execute }) => execute(...args))

export const subscribe: SubscribeMeshFn = (...args) =>
  getBuiltGraphClient().then(({ subscribe }) => subscribe(...args))
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(
  globalContext?: TGlobalContext
) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) =>
    sdkRequesterFactory(globalContext)
  )
  return getSdk<TOperationContext, TGlobalContext>((...args) =>
    sdkRequester$.then((sdkRequester) => sdkRequester(...args))
  )
}
export type AddressAllQueryVariables = Exact<{
  walletAddress: Scalars['ID']
}>

export type AddressAllQuery = {
  address?: Maybe<
    Pick<Address, 'id'> & {
      authIncoming?: Maybe<
        Array<
          Pick<Authentication, 'created' | 'requestId' | 'id'> & {
            authData?: Maybe<
              Pick<
                AuthData,
                'created' | 'genTime' | 'totp5' | 'id' | 'totp6Hash'
              >
            >
            requestee: Pick<Address, 'id' | 'address'>
            requestor: Pick<Address, 'address' | 'id'>
            status?: Maybe<
              Pick<
                AuthStatus,
                'validationTime' | 'isValid' | 'id' | 'hasResponse'
              >
            >
          }
        >
      >
      authOutgoing?: Maybe<
        Array<
          Pick<Authentication, 'created' | 'id' | 'requestId'> & {
            authData?: Maybe<
              Pick<
                AuthData,
                'totp6Hash' | 'totp5' | 'id' | 'genTime' | 'created'
              >
            >
            requestee: Pick<Address, 'id' | 'address'>
            requestor: Pick<Address, 'id' | 'address'>
            status?: Maybe<
              Pick<
                AuthStatus,
                'validationTime' | 'isValid' | 'id' | 'hasResponse'
              >
            >
          }
        >
      >
    }
  >
}

export const AddressAllDocument = gql`
  query AddressAll($walletAddress: ID!) {
    address(id: $walletAddress) {
      id
      authIncoming(orderBy: requestId, orderDirection: desc) {
        created
        requestId
        id
        authData {
          created
          genTime
          totp5
          id
          totp6Hash
        }
        requestee {
          id
          address
        }
        requestor {
          address
          id
        }
        status {
          validationTime
          isValid
          id
          hasResponse
        }
      }
      authOutgoing(orderBy: requestId, orderDirection: desc) {
        authData {
          totp6Hash
          totp5
          id
          genTime
          created
        }
        created
        id
        requestId
        requestee {
          id
          address
        }
        requestor {
          id
          address
        }
        status {
          validationTime
          isValid
          id
          hasResponse
        }
      }
    }
  }
` as unknown as DocumentNode<AddressAllQuery, AddressAllQueryVariables>

export type Requester<C = {}, E = unknown> = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: C
) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    AddressAll(
      variables: AddressAllQueryVariables,
      options?: C
    ): Promise<AddressAllQuery> {
      return requester<AddressAllQuery, AddressAllQueryVariables>(
        AddressAllDocument,
        variables,
        options
      ) as Promise<AddressAllQuery>
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>

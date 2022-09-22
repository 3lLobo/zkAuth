// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ZkauthtotpTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Address = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  authOutgoing?: Maybe<Array<Authentication>>;
  authIncoming?: Maybe<Array<Authentication>>;
};


export type AddressauthOutgoingArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Authentication_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Authentication_filter>;
};


export type AddressauthIncomingArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Authentication_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Authentication_filter>;
};

export type Address_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  authOutgoing_?: InputMaybe<Authentication_filter>;
  authIncoming_?: InputMaybe<Authentication_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Address_orderBy =
  | 'id'
  | 'address'
  | 'authOutgoing'
  | 'authIncoming';

export type AuthData = {
  id: Scalars['ID'];
  authentication: Authentication;
  totp5: Scalars['BigInt'];
  totp6Hash: Scalars['Bytes'];
  genTime: Scalars['BigInt'];
  created: Scalars['String'];
};

export type AuthData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  authentication?: InputMaybe<Scalars['String']>;
  authentication_not?: InputMaybe<Scalars['String']>;
  authentication_gt?: InputMaybe<Scalars['String']>;
  authentication_lt?: InputMaybe<Scalars['String']>;
  authentication_gte?: InputMaybe<Scalars['String']>;
  authentication_lte?: InputMaybe<Scalars['String']>;
  authentication_in?: InputMaybe<Array<Scalars['String']>>;
  authentication_not_in?: InputMaybe<Array<Scalars['String']>>;
  authentication_contains?: InputMaybe<Scalars['String']>;
  authentication_contains_nocase?: InputMaybe<Scalars['String']>;
  authentication_not_contains?: InputMaybe<Scalars['String']>;
  authentication_not_contains_nocase?: InputMaybe<Scalars['String']>;
  authentication_starts_with?: InputMaybe<Scalars['String']>;
  authentication_starts_with_nocase?: InputMaybe<Scalars['String']>;
  authentication_not_starts_with?: InputMaybe<Scalars['String']>;
  authentication_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  authentication_ends_with?: InputMaybe<Scalars['String']>;
  authentication_ends_with_nocase?: InputMaybe<Scalars['String']>;
  authentication_not_ends_with?: InputMaybe<Scalars['String']>;
  authentication_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  authentication_?: InputMaybe<Authentication_filter>;
  totp5?: InputMaybe<Scalars['BigInt']>;
  totp5_not?: InputMaybe<Scalars['BigInt']>;
  totp5_gt?: InputMaybe<Scalars['BigInt']>;
  totp5_lt?: InputMaybe<Scalars['BigInt']>;
  totp5_gte?: InputMaybe<Scalars['BigInt']>;
  totp5_lte?: InputMaybe<Scalars['BigInt']>;
  totp5_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totp5_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totp6Hash?: InputMaybe<Scalars['Bytes']>;
  totp6Hash_not?: InputMaybe<Scalars['Bytes']>;
  totp6Hash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  totp6Hash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  totp6Hash_contains?: InputMaybe<Scalars['Bytes']>;
  totp6Hash_not_contains?: InputMaybe<Scalars['Bytes']>;
  genTime?: InputMaybe<Scalars['BigInt']>;
  genTime_not?: InputMaybe<Scalars['BigInt']>;
  genTime_gt?: InputMaybe<Scalars['BigInt']>;
  genTime_lt?: InputMaybe<Scalars['BigInt']>;
  genTime_gte?: InputMaybe<Scalars['BigInt']>;
  genTime_lte?: InputMaybe<Scalars['BigInt']>;
  genTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  genTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  created?: InputMaybe<Scalars['String']>;
  created_not?: InputMaybe<Scalars['String']>;
  created_gt?: InputMaybe<Scalars['String']>;
  created_lt?: InputMaybe<Scalars['String']>;
  created_gte?: InputMaybe<Scalars['String']>;
  created_lte?: InputMaybe<Scalars['String']>;
  created_in?: InputMaybe<Array<Scalars['String']>>;
  created_not_in?: InputMaybe<Array<Scalars['String']>>;
  created_contains?: InputMaybe<Scalars['String']>;
  created_contains_nocase?: InputMaybe<Scalars['String']>;
  created_not_contains?: InputMaybe<Scalars['String']>;
  created_not_contains_nocase?: InputMaybe<Scalars['String']>;
  created_starts_with?: InputMaybe<Scalars['String']>;
  created_starts_with_nocase?: InputMaybe<Scalars['String']>;
  created_not_starts_with?: InputMaybe<Scalars['String']>;
  created_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  created_ends_with?: InputMaybe<Scalars['String']>;
  created_ends_with_nocase?: InputMaybe<Scalars['String']>;
  created_not_ends_with?: InputMaybe<Scalars['String']>;
  created_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type AuthData_orderBy =
  | 'id'
  | 'authentication'
  | 'totp5'
  | 'totp6Hash'
  | 'genTime'
  | 'created';

export type AuthStatus = {
  id: Scalars['ID'];
  authentication: Authentication;
  hasResponse: Scalars['Boolean'];
  isValid: Scalars['Boolean'];
  validationTime?: Maybe<Scalars['String']>;
};

export type AuthStatus_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  authentication?: InputMaybe<Scalars['String']>;
  authentication_not?: InputMaybe<Scalars['String']>;
  authentication_gt?: InputMaybe<Scalars['String']>;
  authentication_lt?: InputMaybe<Scalars['String']>;
  authentication_gte?: InputMaybe<Scalars['String']>;
  authentication_lte?: InputMaybe<Scalars['String']>;
  authentication_in?: InputMaybe<Array<Scalars['String']>>;
  authentication_not_in?: InputMaybe<Array<Scalars['String']>>;
  authentication_contains?: InputMaybe<Scalars['String']>;
  authentication_contains_nocase?: InputMaybe<Scalars['String']>;
  authentication_not_contains?: InputMaybe<Scalars['String']>;
  authentication_not_contains_nocase?: InputMaybe<Scalars['String']>;
  authentication_starts_with?: InputMaybe<Scalars['String']>;
  authentication_starts_with_nocase?: InputMaybe<Scalars['String']>;
  authentication_not_starts_with?: InputMaybe<Scalars['String']>;
  authentication_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  authentication_ends_with?: InputMaybe<Scalars['String']>;
  authentication_ends_with_nocase?: InputMaybe<Scalars['String']>;
  authentication_not_ends_with?: InputMaybe<Scalars['String']>;
  authentication_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  authentication_?: InputMaybe<Authentication_filter>;
  hasResponse?: InputMaybe<Scalars['Boolean']>;
  hasResponse_not?: InputMaybe<Scalars['Boolean']>;
  hasResponse_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasResponse_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isValid?: InputMaybe<Scalars['Boolean']>;
  isValid_not?: InputMaybe<Scalars['Boolean']>;
  isValid_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isValid_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  validationTime?: InputMaybe<Scalars['String']>;
  validationTime_not?: InputMaybe<Scalars['String']>;
  validationTime_gt?: InputMaybe<Scalars['String']>;
  validationTime_lt?: InputMaybe<Scalars['String']>;
  validationTime_gte?: InputMaybe<Scalars['String']>;
  validationTime_lte?: InputMaybe<Scalars['String']>;
  validationTime_in?: InputMaybe<Array<Scalars['String']>>;
  validationTime_not_in?: InputMaybe<Array<Scalars['String']>>;
  validationTime_contains?: InputMaybe<Scalars['String']>;
  validationTime_contains_nocase?: InputMaybe<Scalars['String']>;
  validationTime_not_contains?: InputMaybe<Scalars['String']>;
  validationTime_not_contains_nocase?: InputMaybe<Scalars['String']>;
  validationTime_starts_with?: InputMaybe<Scalars['String']>;
  validationTime_starts_with_nocase?: InputMaybe<Scalars['String']>;
  validationTime_not_starts_with?: InputMaybe<Scalars['String']>;
  validationTime_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  validationTime_ends_with?: InputMaybe<Scalars['String']>;
  validationTime_ends_with_nocase?: InputMaybe<Scalars['String']>;
  validationTime_not_ends_with?: InputMaybe<Scalars['String']>;
  validationTime_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type AuthStatus_orderBy =
  | 'id'
  | 'authentication'
  | 'hasResponse'
  | 'isValid'
  | 'validationTime';

export type Authentication = {
  id: Scalars['ID'];
  requestId: Scalars['BigInt'];
  requestor: Address;
  requestee: Address;
  authData?: Maybe<AuthData>;
  status?: Maybe<AuthStatus>;
  created: Scalars['String'];
};

export type Authentication_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  requestId?: InputMaybe<Scalars['BigInt']>;
  requestId_not?: InputMaybe<Scalars['BigInt']>;
  requestId_gt?: InputMaybe<Scalars['BigInt']>;
  requestId_lt?: InputMaybe<Scalars['BigInt']>;
  requestId_gte?: InputMaybe<Scalars['BigInt']>;
  requestId_lte?: InputMaybe<Scalars['BigInt']>;
  requestId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requestId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requestor?: InputMaybe<Scalars['String']>;
  requestor_not?: InputMaybe<Scalars['String']>;
  requestor_gt?: InputMaybe<Scalars['String']>;
  requestor_lt?: InputMaybe<Scalars['String']>;
  requestor_gte?: InputMaybe<Scalars['String']>;
  requestor_lte?: InputMaybe<Scalars['String']>;
  requestor_in?: InputMaybe<Array<Scalars['String']>>;
  requestor_not_in?: InputMaybe<Array<Scalars['String']>>;
  requestor_contains?: InputMaybe<Scalars['String']>;
  requestor_contains_nocase?: InputMaybe<Scalars['String']>;
  requestor_not_contains?: InputMaybe<Scalars['String']>;
  requestor_not_contains_nocase?: InputMaybe<Scalars['String']>;
  requestor_starts_with?: InputMaybe<Scalars['String']>;
  requestor_starts_with_nocase?: InputMaybe<Scalars['String']>;
  requestor_not_starts_with?: InputMaybe<Scalars['String']>;
  requestor_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  requestor_ends_with?: InputMaybe<Scalars['String']>;
  requestor_ends_with_nocase?: InputMaybe<Scalars['String']>;
  requestor_not_ends_with?: InputMaybe<Scalars['String']>;
  requestor_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  requestor_?: InputMaybe<Address_filter>;
  requestee?: InputMaybe<Scalars['String']>;
  requestee_not?: InputMaybe<Scalars['String']>;
  requestee_gt?: InputMaybe<Scalars['String']>;
  requestee_lt?: InputMaybe<Scalars['String']>;
  requestee_gte?: InputMaybe<Scalars['String']>;
  requestee_lte?: InputMaybe<Scalars['String']>;
  requestee_in?: InputMaybe<Array<Scalars['String']>>;
  requestee_not_in?: InputMaybe<Array<Scalars['String']>>;
  requestee_contains?: InputMaybe<Scalars['String']>;
  requestee_contains_nocase?: InputMaybe<Scalars['String']>;
  requestee_not_contains?: InputMaybe<Scalars['String']>;
  requestee_not_contains_nocase?: InputMaybe<Scalars['String']>;
  requestee_starts_with?: InputMaybe<Scalars['String']>;
  requestee_starts_with_nocase?: InputMaybe<Scalars['String']>;
  requestee_not_starts_with?: InputMaybe<Scalars['String']>;
  requestee_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  requestee_ends_with?: InputMaybe<Scalars['String']>;
  requestee_ends_with_nocase?: InputMaybe<Scalars['String']>;
  requestee_not_ends_with?: InputMaybe<Scalars['String']>;
  requestee_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  requestee_?: InputMaybe<Address_filter>;
  authData_?: InputMaybe<AuthData_filter>;
  status_?: InputMaybe<AuthStatus_filter>;
  created?: InputMaybe<Scalars['String']>;
  created_not?: InputMaybe<Scalars['String']>;
  created_gt?: InputMaybe<Scalars['String']>;
  created_lt?: InputMaybe<Scalars['String']>;
  created_gte?: InputMaybe<Scalars['String']>;
  created_lte?: InputMaybe<Scalars['String']>;
  created_in?: InputMaybe<Array<Scalars['String']>>;
  created_not_in?: InputMaybe<Array<Scalars['String']>>;
  created_contains?: InputMaybe<Scalars['String']>;
  created_contains_nocase?: InputMaybe<Scalars['String']>;
  created_not_contains?: InputMaybe<Scalars['String']>;
  created_not_contains_nocase?: InputMaybe<Scalars['String']>;
  created_starts_with?: InputMaybe<Scalars['String']>;
  created_starts_with_nocase?: InputMaybe<Scalars['String']>;
  created_not_starts_with?: InputMaybe<Scalars['String']>;
  created_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  created_ends_with?: InputMaybe<Scalars['String']>;
  created_ends_with_nocase?: InputMaybe<Scalars['String']>;
  created_not_ends_with?: InputMaybe<Scalars['String']>;
  created_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Authentication_orderBy =
  | 'id'
  | 'requestId'
  | 'requestor'
  | 'requestee'
  | 'authData'
  | 'status'
  | 'created';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  authentication?: Maybe<Authentication>;
  authentications: Array<Authentication>;
  authData?: Maybe<AuthData>;
  authDatas: Array<AuthData>;
  authStatus?: Maybe<AuthStatus>;
  authStatuses: Array<AuthStatus>;
  address?: Maybe<Address>;
  addresses: Array<Address>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryauthenticationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauthenticationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Authentication_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Authentication_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauthDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauthDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AuthData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuthData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauthStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauthStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AuthStatus_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuthStatus_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaddressArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaddressesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Address_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Address_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  authentication?: Maybe<Authentication>;
  authentications: Array<Authentication>;
  authData?: Maybe<AuthData>;
  authDatas: Array<AuthData>;
  authStatus?: Maybe<AuthStatus>;
  authStatuses: Array<AuthStatus>;
  address?: Maybe<Address>;
  addresses: Array<Address>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionauthenticationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauthenticationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Authentication_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Authentication_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauthDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauthDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AuthData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuthData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauthStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauthStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AuthStatus_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuthStatus_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaddressArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaddressesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Address_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Address_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  authentication: InContextSdkMethod<Query['authentication'], QueryauthenticationArgs, MeshContext>,
  /** null **/
  authentications: InContextSdkMethod<Query['authentications'], QueryauthenticationsArgs, MeshContext>,
  /** null **/
  authData: InContextSdkMethod<Query['authData'], QueryauthDataArgs, MeshContext>,
  /** null **/
  authDatas: InContextSdkMethod<Query['authDatas'], QueryauthDatasArgs, MeshContext>,
  /** null **/
  authStatus: InContextSdkMethod<Query['authStatus'], QueryauthStatusArgs, MeshContext>,
  /** null **/
  authStatuses: InContextSdkMethod<Query['authStatuses'], QueryauthStatusesArgs, MeshContext>,
  /** null **/
  address: InContextSdkMethod<Query['address'], QueryaddressArgs, MeshContext>,
  /** null **/
  addresses: InContextSdkMethod<Query['addresses'], QueryaddressesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  authentication: InContextSdkMethod<Subscription['authentication'], SubscriptionauthenticationArgs, MeshContext>,
  /** null **/
  authentications: InContextSdkMethod<Subscription['authentications'], SubscriptionauthenticationsArgs, MeshContext>,
  /** null **/
  authData: InContextSdkMethod<Subscription['authData'], SubscriptionauthDataArgs, MeshContext>,
  /** null **/
  authDatas: InContextSdkMethod<Subscription['authDatas'], SubscriptionauthDatasArgs, MeshContext>,
  /** null **/
  authStatus: InContextSdkMethod<Subscription['authStatus'], SubscriptionauthStatusArgs, MeshContext>,
  /** null **/
  authStatuses: InContextSdkMethod<Subscription['authStatuses'], SubscriptionauthStatusesArgs, MeshContext>,
  /** null **/
  address: InContextSdkMethod<Subscription['address'], SubscriptionaddressArgs, MeshContext>,
  /** null **/
  addresses: InContextSdkMethod<Subscription['addresses'], SubscriptionaddressesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["zkauthtotp"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}

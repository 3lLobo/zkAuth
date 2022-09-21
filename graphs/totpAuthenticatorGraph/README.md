# TotpAuthenticator Subgraph

HTTP-Endpoint: https://api.thegraph.com/subgraphs/name/3llobo/zkauthtotp

TheGraph page: https://thegraph.com/hosted-service/subgraph/3llobo/zkauthtotp

This subgraph is composed of 4 entity types. 

**Authentication** which is the main type holds the address of the requestor and the target, as well as the authentication data and status. It is identified by the unique request ID.

**AuthData** is related to a single authentication and holds the fist 5 digits of the TOTP code, the sha256 hash of the full 6 digit code and the time the code was generated (required to reproduce and validate it).

**AuthStatus** indicates the status of the authentication. To save storage, this entity is only created once a respsonse is submitted, not with the authentication. It has a one-to-one relation with the authentication and holds a boolean indicating if a respsonse has been submitted, if the authentication has been validated and if so, the time of validation.

**Address** is a base class representative of a wallet with a one-to-many relationship to authentication requestor and target.


## Intended queries

Assuming wallet interaction, we fetch all authentication information replated to the wallets address.

Authentication requests for the wallet:
```GQL
query AddressAll($walletAddress: ID) {
  address(id: $walletAddress) {
    address
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
```


[GQL playground](https://api.thegraph.com/subgraphs/name/3llobo/zkauthtotp/graphql)

[How to query](https://thegraph.com/docs/en/querying/graphql-api/)



/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ZkWalletFactory,
  ZkWalletFactoryInterface,
} from "../../contracts/ZkWalletFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_hashCheckVerifier",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    name: "WalletCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ownerPasswordHash",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_trustees",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_passwordHashes",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "_thresholdForRecovery",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_otpVerifier",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_root",
        type: "uint256",
      },
    ],
    name: "deployWallet",
    outputs: [
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserWalletAddress",
    outputs: [
      {
        internalType: "address",
        name: "_walletAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hashCheckVerifier",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userAddressToWalletAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051612a42380380612a4283398101604081905261002f91610054565b600180546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b6129af806100936000396000f3fe60806040523480156200001157600080fd5b5060043610620000525760003560e01c80633cc0e8f1146200005757806352cf4bec146200009f578063e61ec4da14620000b3578063f86345dd14620000e2575b600080fd5b620000836200006836600462000201565b6000602081905290815260409020546001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b60015462000083906001600160a01b031681565b62000083620000c436600462000201565b6001600160a01b039081166000908152602081905260409020541690565b62000083620000f336600462000323565b600080600160009054906101000a90046001600160a01b03168888888887896040516200012090620001d6565b6200013297969594939291906200045e565b604051809103906000f0801580156200014f573d6000803e3d6000fd5b50336000908152602081815260409182902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03851690811790915591519182529193508392507f234cf33b32239d80b54161e2396c80cdeaf4d34161300e54d8bc01eb7c0ea553910160405180910390a1509695505050505050565b61247b80620004ff83390190565b80356001600160a01b0381168114620001fc57600080fd5b919050565b6000602082840312156200021457600080fd5b6200021f82620001e4565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171562000281576200028162000226565b604052919050565b600067ffffffffffffffff821115620002a657620002a662000226565b5060051b60200190565b600082601f830112620002c257600080fd5b81356020620002db620002d58362000289565b62000255565b82815260059290921b84018101918181019086841115620002fb57600080fd5b8286015b84811015620003185780358352918301918301620002ff565b509695505050505050565b60008060008060008060c087890312156200033d57600080fd5b8635955060208088013567ffffffffffffffff808211156200035e57600080fd5b818a0191508a601f8301126200037357600080fd5b813562000384620002d58262000289565b81815260059190911b8301840190848101908d831115620003a457600080fd5b938501935b82851015620003cd57620003bd85620001e4565b82529385019390850190620003a9565b9950505060408a0135925080831115620003e657600080fd5b5050620003f689828a01620002b0565b945050606087013592506200040e60808801620001e4565b915060a087013590509295509295509295565b600081518084526020808501945080840160005b83811015620004535781518752958201959082019060010162000435565b509495945050505050565b600060e082016001600160a01b03808b16845260208a8186015260e06040860152828a5180855261010087019150828c01945060005b81811015620004b457855185168352948301949183019160010162000494565b50508581036060870152620004ca818b62000421565b9450505050508460808301528360a0830152620004f260c08301846001600160a01b03169052565b9897505050505050505056fe60806040523480156200001157600080fd5b506040516200247b3803806200247b833981016040819052620000349162000489565b6001600160a01b038716620000905760405162461bcd60e51b815260206004820152601560248201527f5a65726f2061646472657373207665726966696572000000000000000000000060448201526064015b60405180910390fd5b8351855114620000e35760405162461bcd60e51b815260206004820152601f60248201527f547275737465657320616e6420686173686573206c656e677468206469666600604482015260640162000087565b82855110156200014b5760405162461bcd60e51b815260206004820152602c60248201527f5468726573686f6c642069732067726561746572207468616e206e756d62657260448201526b206f6620747275737465657360a01b606482015260840162000087565b600080546001600160a01b0389166001600160a01b0319918216178255600180549091163317905560028790555b8551811015620002e457600560008783815181106200019c576200019c6200059d565b6020908102919091018101516001600160a01b031682528101919091526040016000205460ff1615620002125760405162461bcd60e51b815260206004820152601960248201527f4475706c6963617465207472757374656520696e206c69737400000000000000604482015260640162000087565b6001600560008884815181106200022d576200022d6200059d565b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff0219169083151502179055508481815181106200028157620002816200059d565b602002602001015160066000888481518110620002a257620002a26200059d565b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020819055508080620002db90620005b3565b91505062000179565b50600383905560098054610100600160a81b0319166101006001600160a01b03841602179055604051829082906200031c906200037c565b9182526001600160a01b03166020820152604001604051809103906000f0801580156200034d573d6000803e3d6000fd5b50600a80546001600160a01b0319166001600160a01b039290921691909117905550620005db95505050505050565b6105348062001f4783390190565b80516001600160a01b0381168114620003a257600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715620003e857620003e8620003a7565b604052919050565b60006001600160401b038211156200040c576200040c620003a7565b5060051b60200190565b600082601f8301126200042857600080fd5b81516020620004416200043b83620003f0565b620003bd565b82815260059290921b840181019181810190868411156200046157600080fd5b8286015b848110156200047e578051835291830191830162000465565b509695505050505050565b600080600080600080600060e0888a031215620004a557600080fd5b620004b0886200038a565b60208981015160408b01519299509750906001600160401b0380821115620004d757600080fd5b818b0191508b601f830112620004ec57600080fd5b8151620004fd6200043b82620003f0565b81815260059190911b8301840190848101908e8311156200051d57600080fd5b938501935b82851015620005465762000536856200038a565b8252938501939085019062000522565b60608e0151909a5094505050808311156200056057600080fd5b5050620005708a828b0162000416565b9450506080880151925060a088015191506200058f60c089016200038a565b905092959891949750929550565b634e487b7160e01b600052603260045260246000fd5b600060018201620005d457634e487b7160e01b600052601160045260246000fd5b5060010190565b61195c80620005eb6000396000f3fe6080604052600436106100b55760003560e01c80638da5cb5b116100695780639c62291a1161004e5780639c62291a14610249578063b21fa1ae14610263578063e9c4bfe71461028357600080fd5b80638da5cb5b146101ec5780639517a2a91461022457600080fd5b806337dc18131161009a57806337dc18131461016c5780634f20804b1461018e578063789bcd08146101bc57600080fd5b8063037133f1146100c1578063150b7a02146100f757600080fd5b366100bc57005b600080fd5b3480156100cd57600080fd5b506100e16100dc3660046114f5565b610299565b6040516100ee91906115b0565b60405180910390f35b34801561010357600080fd5b5061013b6101123660046115ca565b7f150b7a0200000000000000000000000000000000000000000000000000000000949350505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016100ee565b34801561017857600080fd5b5061018c6101873660046116f8565b610476565b005b34801561019a57600080fd5b506101ae6101a936600461175b565b6106f7565b6040519081526020016100ee565b3480156101c857600080fd5b506101dc6101d73660046116f8565b610ba4565b60405190151581526020016100ee565b3480156101f857600080fd5b5060015461020c906001600160a01b031681565b6040516001600160a01b0390911681526020016100ee565b34801561023057600080fd5b5060095461020c9061010090046001600160a01b031681565b34801561025557600080fd5b506009546101dc9060ff1681565b34801561026f57600080fd5b5061018c61027e3660046116f8565b610f6a565b34801561028f57600080fd5b506101ae60045481565b6001546060906001600160a01b031633146102e75760405162461bcd60e51b81526020600482015260096024820152682737ba1027bbb732b960b91b60448201526064015b60405180910390fd5b600a546040517fa9f3402c0000000000000000000000000000000000000000000000000000000081526001600160a01b039091169063a9f3402c90610336908a908a908a908a9060040161181e565b6020604051808303816000875af1158015610355573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610379919061185e565b6103c55760405162461bcd60e51b815260206004820152600c60248201527f50726f6f66206661696c6564000000000000000000000000000000000000000060448201526064016102de565b600080846001600160a01b03168460405160006040518083038185875af1925050503d8060008114610413576040519150601f19603f3d011682016040523d82523d6000602084013e610418565b606091505b50915091508161046a5760405162461bcd60e51b815260206004820152601660248201527f65787465726e616c2063616c6c2072657665727465640000000000000000000060448201526064016102de565b98975050505050505050565b6001546001600160a01b031633146104bc5760405162461bcd60e51b81526020600482015260096024820152682737ba1027bbb732b960b91b60448201526064016102de565b60095460ff1661050e5760405162461bcd60e51b815260206004820152601860248201527f5265636f7665727920686173206e6f742073746172746564000000000000000060448201526064016102de565b6000546040516343753b4d60e01b815286918691869186916001600160a01b03909116906343753b4d9061054c908790879087908790600401611880565b602060405180830381865afa158015610569573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058d919061185e565b6105d95760405162461bcd60e51b815260206004820152601760248201527f50617373776f72642070726f6f6620696e76616c69642100000000000000000060448201526064016102de565b835160009081526008602052604090205460ff161561062a5760405162461bcd60e51b815260206004820152600d60248201526c141c9bdbd9881a5cc81d5cd959609a1b60448201526064016102de565b60025486511461066d5760405162461bcd60e51b815260206004820152600e60248201526d15dc9bdb99c81c185cdcdddbdc9960921b60448201526064016102de565b6009805460ff191690556001546040518681526001600160a01b03909116907f500ec1d4b692d3c788bfd78a898de379cfd93ab8177575efc7593f87bd051a079060200160405180910390a260016008600086815b6020020151815260200190815260200160002060006101000a81548160ff021916908315150217905550505050505050505050565b3360009081526005602052604081205460ff166107445760405162461bcd60e51b815260206004820152600b60248201526a4e6f74205472757374656560a81b60448201526064016102de565b60095460ff16156107975760405162461bcd60e51b815260206004820152601660248201527f5265636f7665727920697320696e2070726f636573730000000000000000000060448201526064016102de565b6000546040516343753b4d60e01b815287918791879187916001600160a01b03909116906343753b4d906107d5908790879087908790600401611880565b602060405180830381865afa1580156107f2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610816919061185e565b6108625760405162461bcd60e51b815260206004820152601760248201527f50617373776f72642070726f6f6620696e76616c69642100000000000000000060448201526064016102de565b835160009081526008602052604090205460ff16156108b35760405162461bcd60e51b815260206004820152600d60248201526c141c9bdbd9881a5cc81d5cd959609a1b60448201526064016102de565b6109176040518060400160405280600c81526020017f747275737465652068617368000000000000000000000000000000000000000081525060066000336001600160a01b03166001600160a01b03168152602001908152602001600020546112be565b60408051808201909152600581527f496e7075740000000000000000000000000000000000000000000000000000006020820152875161095791906112be565b336000908152600660205260409020548751146109a75760405162461bcd60e51b815260206004820152600e60248201526d15dc9bdb99c81c185cdcdddbdc9960921b60448201526064016102de565b6001600160a01b0386166109fd5760405162461bcd60e51b815260206004820152600c60248201527f5a65726f2061646472657373000000000000000000000000000000000000000060448201526064016102de565b6001600160a01b03861660009081526007602052604090205460ff1615610a8c5760405162461bcd60e51b815260206004820152602260248201527f4f776e65722073686f756c64206e6f742062652061207061737420616464726560448201527f737300000000000000000000000000000000000000000000000000000000000060648201526084016102de565b60048054906000610a9c836118dd565b90915550506004546000908152600b6020526040812060018101805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b038a16179055805490918290610aeb836118dd565b90915550503360008181526002830160209081526040918290208054600160ff19918216811790925560098054909116909117905560045491519182526001600160a01b038a16917f4ae23dc2e5f7892600076b48a0cfdbcc206c2aba4e323da13765339b2b8978d8910160405180910390a360045495505060016008600086815b6020020151815260200190815260200160002060006101000a81548160ff0219169083151502179055505050505095945050505050565b3360009081526005602052604081205460ff16610bf15760405162461bcd60e51b815260206004820152600b60248201526a4e6f74205472757374656560a81b60448201526064016102de565b60095460ff16610c435760405162461bcd60e51b815260206004820152601860248201527f5265636f7665727920686173206e6f742073746172746564000000000000000060448201526064016102de565b6000546040516343753b4d60e01b815287918791879187916001600160a01b03909116906343753b4d90610c81908790879087908790600401611880565b602060405180830381865afa158015610c9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cc2919061185e565b610d0e5760405162461bcd60e51b815260206004820152601760248201527f50617373776f72642070726f6f6620696e76616c69642100000000000000000060448201526064016102de565b835160009081526008602052604090205460ff1615610d5f5760405162461bcd60e51b815260206004820152600d60248201526c141c9bdbd9881a5cc81d5cd959609a1b60448201526064016102de565b33600090815260066020526040902054875114610daf5760405162461bcd60e51b815260206004820152600e60248201526d15dc9bdb99c81c185cdcdddbdc9960921b60448201526064016102de565b610ded6040518060400160405280600581526020017f4865726531000000000000000000000000000000000000000000000000000000815250611335565b600454861115610e3f5760405162461bcd60e51b815260206004820152601b60248201527f57726f6e67205265636f7665727920726f756e64206e756d626572000000000060448201526064016102de565b610e7d6040518060400160405280600481526020017f4865726500000000000000000000000000000000000000000000000000000000815250611335565b6000868152600b60209081526040808320338452600281019092529091205460ff1615610eec5760405162461bcd60e51b815260206004820152601560248201527f5472757374656520616c726561647920766f746564000000000000000000000060448201526064016102de565b8054816000610efa836118dd565b909155505033600081815260028301602052604090819020805460ff1916600190811790915590519097507f7f7906f4f6e51fac746e81b4885d9775eb44445765139416bcd03b12b262968a90610f54908a815260200190565b60405180910390a2506001600860008681610b6d565b3360009081526005602052604090205460ff16610fb75760405162461bcd60e51b815260206004820152600b60248201526a4e6f74205472757374656560a81b60448201526064016102de565b60095460ff166110095760405162461bcd60e51b815260206004820152601860248201527f5265636f7665727920686173206e6f742073746172746564000000000000000060448201526064016102de565b6000546040516343753b4d60e01b815286918691869186916001600160a01b03909116906343753b4d90611047908790879087908790600401611880565b602060405180830381865afa158015611064573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611088919061185e565b6110d45760405162461bcd60e51b815260206004820152601760248201527f50617373776f72642070726f6f6620696e76616c69642100000000000000000060448201526064016102de565b835160009081526008602052604090205460ff16156111255760405162461bcd60e51b815260206004820152600d60248201526c141c9bdbd9881a5cc81d5cd959609a1b60448201526064016102de565b336000908152600660205260409020548651146111755760405162461bcd60e51b815260206004820152600e60248201526d15dc9bdb99c81c185cdcdddbdc9960921b60448201526064016102de565b6000858152600b60205260409020600354815410156111d65760405162461bcd60e51b815260206004820152601060248201527f566f746573204e6f7420656e6f7567680000000000000000000000000000000060448201526064016102de565b600181810180547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16740100000000000000000000000000000000000000001781556009805460ff199081169091558254915473ffffffffffffffffffffffffffffffffffffffff1983166001600160a01b03918216908117855560009081526007602052604090819020805490931685179092559254905191831692169082907fcbaa7c7c351e2d5655fc08d9c383adcf4736af160c800b53df1f1dd221f826c8906112a6908b815260200190565b60405180910390a350600190506008600086816106c2565b61133182826040516024016112d4929190611904565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fb60e72cc000000000000000000000000000000000000000000000000000000001790526113a9565b5050565b6113a68160405160240161134991906115b0565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f41304fac000000000000000000000000000000000000000000000000000000001790526113a9565b50565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715611403576114036113ca565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715611432576114326113ca565b604052919050565b600082601f83011261144b57600080fd5b6114536113e0565b80604084018581111561146557600080fd5b845b8181101561147f578035845260209384019301611467565b509095945050505050565b600082601f83011261149b57600080fd5b6114a36113e0565b8060808401858111156114b557600080fd5b845b8181101561147f576114c9878261143a565b84526020909301926040016114b7565b80356001600160a01b03811681146114f057600080fd5b919050565b600080600080600080610180878903121561150f57600080fd5b611519888861143a565b9550611528886040890161148a565b94506115378860c0890161143a565b935061154788610100890161143a565b925061155661014088016114d9565b915061016087013590509295509295509295565b6000815180845260005b8181101561159057602081850181015186830182015201611574565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006115c3602083018461156a565b9392505050565b600080600080608085870312156115e057600080fd5b6115e9856114d9565b935060206115f88187016114d9565b935060408601359250606086013567ffffffffffffffff8082111561161c57600080fd5b818801915088601f83011261163057600080fd5b813581811115611642576116426113ca565b611654601f8201601f19168501611409565b9150808252898482850101111561166a57600080fd5b808484018584013760008482840101525080935050505092959194509250565b600082601f83011261169b57600080fd5b604051602080820182811067ffffffffffffffff821117156116bf576116bf6113ca565b60405281848201868111156116d357600080fd5b855b818110156116ec57803583529183019183016116d5565b50929695505050505050565b6000806000806000610140868803121561171157600080fd5b61171b878761143a565b945061172a876040880161148a565b93506117398760c0880161143a565b925061174987610100880161168a565b94979396509194610120013592915050565b6000806000806000610140868803121561177457600080fd5b61177e878761143a565b945061178d876040880161148a565b935061179c8760c0880161143a565b92506117ac87610100880161168a565b91506117bb61012087016114d9565b90509295509295909350565b8060005b60028110156117ea5781518452602093840193909101906001016117cb565b50505050565b8060005b60028110156117ea576118088483516117c7565b60409390930192602091909101906001016117f4565b610140810161182d82876117c7565b61183a60408301866117f0565b61184760c08301856117c7565b6118556101008301846117c7565b95945050505050565b60006020828403121561187057600080fd5b815180151581146115c357600080fd5b610120810161188f82876117c7565b61189c60408301866117f0565b6118a960c08301856117c7565b61010082018360005b60018110156118d15781518352602092830192909101906001016118b2565b50505095945050505050565b6000600182016118fd57634e487b7160e01b600052601160045260246000fd5b5060010190565b604081526000611917604083018561156a565b9050826020830152939250505056fea2646970667358221220200f08929360ebc500980f3a6b3768f4bd742680c3c2debf9bbce9c20a541f3664736f6c6343000811003360c060405234801561001057600080fd5b5060405161053438038061053483398101604081905261002f91610046565b6080919091526001600160a01b031660a052610083565b6000806040838503121561005957600080fd5b825160208401519092506001600160a01b038116811461007857600080fd5b809150509250929050565b60805160a05161048d6100a7600039600061016101526000605e015261048d6000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063a9f3402c14610030575b600080fd5b61004361003e3660046102da565b610057565b604051901515815260200160405180910390f35b80516000907f0000000000000000000000000000000000000000000000000000000000000000146100cf5760405162461bcd60e51b815260206004820152600e60248201527f496e636f6f7265637420726f6f7400000000000000000000000000000000000060448201526064015b60405180910390fd5b6000546020830151116101245760405162461bcd60e51b815260206004820152600960248201527f4f6c642050726f6f66000000000000000000000000000000000000000000000060448201526064016100c6565b6040517ff5c9d69e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000169063f5c9d69e9061019c9088908890889088906004016103a3565b602060405180830381865afa1580156101b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101dd919061042e565b6102295760405162461bcd60e51b815260206004820152600d60248201527f496e76616c69642070726f6f660000000000000000000000000000000000000060448201526064016100c6565b506020015160005550600192915050565b6040805190810167ffffffffffffffff81118282101715610284577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405290565b600082601f83011261029b57600080fd5b6102a361023a565b8060408401858111156102b557600080fd5b845b818110156102cf5780358452602093840193016102b7565b509095945050505050565b60008060008061014085870312156102f157600080fd5b6102fb868661028a565b9350604086605f87011261030e57600080fd5b61031661023a565b8060c088018981111561032857600080fd5b8389015b8181101561034d5761033e8b8261028a565b8452602090930192840161032c565b5081965061035b8a8261028a565b95505050505061036f86610100870161028a565b905092959194509250565b8060005b600281101561039d57815184526020938401939091019060010161037e565b50505050565b61014081016103b2828761037a565b6040808301866000805b60028082106103cb5750610405565b835185845b838110156103ee5782518252602092830192909101906001016103d0565b5050509385019350602092909201916001016103bc565b505050505061041760c083018561037a565b61042561010083018461037a565b95945050505050565b60006020828403121561044057600080fd5b8151801515811461045057600080fd5b939250505056fea26469706673582212206395795d36789e7a9b6888bfe90d51af8eaca0172948c5706e44adf31974fadf64736f6c63430008110033a2646970667358221220e523b7a139572028333d2fa3e67123aa41ddd29292a67243bf35f6023e27fed264736f6c63430008110033";

type ZkWalletFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ZkWalletFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ZkWalletFactory__factory extends ContractFactory {
  constructor(...args: ZkWalletFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _hashCheckVerifier: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ZkWalletFactory> {
    return super.deploy(
      _hashCheckVerifier,
      overrides || {}
    ) as Promise<ZkWalletFactory>;
  }
  override getDeployTransaction(
    _hashCheckVerifier: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_hashCheckVerifier, overrides || {});
  }
  override attach(address: string): ZkWalletFactory {
    return super.attach(address) as ZkWalletFactory;
  }
  override connect(signer: Signer): ZkWalletFactory__factory {
    return super.connect(signer) as ZkWalletFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZkWalletFactoryInterface {
    return new utils.Interface(_abi) as ZkWalletFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ZkWalletFactory {
    return new Contract(address, _abi, signerOrProvider) as ZkWalletFactory;
  }
}

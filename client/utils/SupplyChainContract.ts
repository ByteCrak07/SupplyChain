import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  SupplyChainContract,
  SupplyChainContractMethodNames,
  SupplyChainContractEventsContext,
  SupplyChainContractEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type SupplyChainContractEvents = undefined;
export interface SupplyChainContractEventsContext {}
export type SupplyChainContractMethodNames =
  | 'addArrival'
  | 'addDeparture'
  | 'addProduct'
  | 'addUser'
  | 'getAllProducts'
  | 'getAllTransits'
  | 'getProduct'
  | 'productUIds'
  | 'products'
  | 'transits'
  | 'users';
export interface ProductResponse {
  uId: BigNumber;
  0: BigNumber;
  name: string;
  1: string;
  pType: string;
  2: string;
  manufacturer: string;
  3: string;
  holders: string[];
  4: string[];
  manTime: BigNumber;
  5: BigNumber;
  quantity: number;
  6: number;
  price: number;
  7: number;
  currency: string;
  8: string;
}
export interface TransitResponse {
  holder: string;
  0: TransitResponse;
  transitType: number;
  1: TransitResponse;
  time: BigNumber;
  2: TransitResponse;
}
export interface ViewrecenttransitResponse {
  uId: BigNumber;
  0: BigNumber;
  product: ProductResponse;
  1: ProductResponse;
  transit: TransitResponse;
  2: TransitResponse;
}
export interface AllTransitsResponse {
  holder: string;
  0: AllTransitsResponse[];
  transitType: number;
  1: AllTransitsResponse[];
  time: BigNumber;
  2: AllTransitsResponse[];
}
export interface ViewproductResponse {
  uId: BigNumber;
  0: BigNumber;
  product: ProductResponse;
  1: ProductResponse;
  allTransits: AllTransitsResponse[];
  2: AllTransitsResponse[];
}
export interface ProductsResponse {
  uId: BigNumber;
  0: BigNumber;
  name: string;
  1: string;
  pType: string;
  2: string;
  manufacturer: string;
  3: string;
  manTime: BigNumber;
  4: BigNumber;
  quantity: number;
  5: number;
  price: number;
  6: number;
  currency: string;
  7: string;
  length: 8;
}
export interface TransitsResponse {
  holder: string;
  0: string;
  transitType: number;
  1: number;
  time: BigNumber;
  2: BigNumber;
  length: 3;
}
export interface UsersResponse {
  name: string;
  0: string;
  uType: number;
  1: number;
  length: 2;
}
export interface SupplyChainContract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param productUId Type: uint256, Indexed: false
   * @param time Type: uint256, Indexed: false
   */
  addArrival(
    productUId: BigNumberish,
    time: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param productUId Type: uint256, Indexed: false
   * @param time Type: uint256, Indexed: false
   * @param nextHolder Type: address, Indexed: false
   */
  addDeparture(
    productUId: BigNumberish,
    time: BigNumberish,
    nextHolder: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param name Type: string, Indexed: false
   * @param pType Type: string, Indexed: false
   * @param manTime Type: uint256, Indexed: false
   * @param quantity Type: uint32, Indexed: false
   * @param price Type: uint32, Indexed: false
   * @param currency Type: string, Indexed: false
   */
  addProduct(
    name: string,
    pType: string,
    manTime: BigNumberish,
    quantity: BigNumberish,
    price: BigNumberish,
    currency: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param name Type: string, Indexed: false
   * @param uType Type: string, Indexed: false
   */
  addUser(
    name: string,
    uType: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllProducts(overrides?: ContractCallOverrides): Promise<ProductResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param count Type: uint256, Indexed: false
   */
  getAllTransits(
    count: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<ViewrecenttransitResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param productUId Type: uint256, Indexed: false
   */
  getProduct(
    productUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<ViewproductResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  productUIds(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  products(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<ProductsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  transits(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<TransitsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  users(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<UsersResponse>;
}

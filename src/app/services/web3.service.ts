import { Injectable } from '@angular/core';
import Web3 from "web3"; //Allows to interact with ethereum blockchain
import Web3Modal from "web3modal"; //Adds support for providors (wallets)
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Subject } from 'rxjs';

/*
 Had to run "npm install --save-dev @types/react" to properly import Web3Modal and WalletConnectProvider.
 Then needed to add "allowSyntheticDefaultImports": true under compiler options in tsconfig.json.
 Then needed to run npm install crypto-browserify stream-browserify assert stream-http https-browserify os-browserify.
 Then needed to add 
 "paths" : {
      "crypto": ["./node_modules/crypto-browserify"],
      "stream": ["./node_modules/stream-browserify"],
      "assert": ["./node_modules/assert"],
      "http": ["./node_modules/stream-http"],
      "https": ["./node_modules/https-browserify"],
      "os": ["./node_modules/os-browserify"],
    }
under angularCompilerOptions in tsconfig.json

Add:
  import * as process from 'process';
  window['process'] = process;
  (window as any)['global'] = window;
  global.Buffer = global.Buffer || require('buffer').Buffer;
to polyfills.ts
 */

@Injectable({
  providedIn: 'root' //This service is available throughout the whole app
})
export class Web3Service {
  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();

  constructor() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "INFURA_ID" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "ropsten", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider();

    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.accountStatusSource.next(this.accounts)
  }

  isConnected()
  {
    return this.provider != undefined;
  }

}
import { Component, Inject, OnInit } from '@angular/core';
import Web3 from 'web3';
import { Web3Service } from './services/web3.service';
//import { ContractService } from './services/web3.service'

/*
Components are the main building block for Angular applications. Each component consists of:

An HTML template that declares what renders on the page
A Typescript class that defines behavior
A CSS selector that defines how the component is used in a template
Optionally, CSS styles applied to the template
*/


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  constructor(private web3: Web3Service) {}

  title = 'Crypto Dice Roll';
  num:number = 0;
  sides:number = 0;

  publicKey: string | null = null;
  connectWalletText: string = "CONNECT WALLET";

  async connectWallet()
  {
    this.web3.connectAccount();

    console.log("Connected!");

    this.web3.accountStatus$.subscribe(event => {

      //this.addToWhitelist(event)
      this.publicKey = event[0];

      this.connectWalletText = event;

      console.log(this.publicKey);
    })
  }


  RollDice(num:number){
    this.sides = 4;
    this.num = num;
  }
}


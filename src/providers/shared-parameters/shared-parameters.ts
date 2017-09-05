import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class SharedParametersProvider {

  devices:any = [];
  messages:any = [];
  user:any = {};
  transferuser:any = {};
  devicesfiltered:any = {};

  constructor() {
  }

  setDevices(devices) {
      this.devices = devices;
  }

  getDevices() {
      return this.devices;
  }

  setMessages(messages) {
      this.messages = messages;
  }

  getMessages() {
      return this.messages;
  }

  setUser(user) {
      this.user = user;
  }

  getUser() {
      return this.user;
  }

  setTransferUser(transferuser) {
      this.transferuser = transferuser;
  }

  getTransferUser() {
      return this.transferuser;
  }

  setDevicesFiltered(devicesfiltered) {
      this.devicesfiltered = devicesfiltered;
  }

  getDevicesFiltered() {
      return this.devicesfiltered;
  }

}

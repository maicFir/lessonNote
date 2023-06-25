import React from "react";
import { makeAutoObservable, observable, action } from "mobx";

class Store {
  theme = "light";
  constructor() {
    makeAutoObservable(this, {
      theme: observable,
      setTheme: action,
    });
  }
  setTheme(theme: string) {
    this.theme = theme;
  }
}

export default new Store();

import React, { Component, ReactElement } from "react";
import { createStore } from "redux-dynamic-modules-core";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import { Provider } from "react-redux";
import { IModuleStore } from "redux-dynamic-modules";

import Lore, { CoreModule, CoreState } from "components/Core";

import "./main.scss";
import ElementsBoard, { LayersModule, LayersState } from "components/Layers";

interface RootState extends CoreState, LayersState {}

export interface GameProps {}

class Game extends Component {
  constructor(props: GameProps) {
    super(props);

    this.state = {};

    this.store = createStore(
      {
        enhancers: [],
        extensions: [getSagaExtension()],
      },
      CoreModule,
      LayersModule
    );
  }

  store: IModuleStore<RootState>;

  render(): ReactElement {
    return (
      <Provider store={this.store}>
        <div className="main">
          <ElementsBoard />
        </div>
        <Lore />
      </Provider>
    );
  }
}

export default Game;

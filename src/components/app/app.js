import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';

import './app.css';

export default class App extends Component {


  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    console.log('componentDidCatch');
    this.setState({hasError: true})
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    return (
      <div className="stardb-app">
        <Header />
        { planet }

        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        <ErrorButton />

        <PeoplePage />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onItemSelected}
              getData={this.swapiService.getAllPlanets}
              renderItem={(item) => (<span>{item.name} <button>!</button></span>)} />
          </div>
          <div className="col-md-6">
            <ItemDetails itemId={this.state.selectedItem} />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onItemSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={(item) => item.name} />
          </div>
          <div className="col-md-6">
            <ItemDetails itemId={this.state.selectedItem} />
          </div>
        </div>

      </div>
    );
  }
};
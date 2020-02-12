import React, { Component } from 'react';
import PersonDetails from '../person-details';
import ItemList from '../item-list';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

import './people-page.css';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
        hasError: false
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        })
    }

    onPersonSelected = (selectedPerson) => {
        console.log(selectedPerson);
        
      this.setState({
        selectedPerson
      })
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        return (
            <div className="row mb2">
              <div className="col-md-6">
                <ItemList
                  onItemSelected={this.onPersonSelected}
                  getData={this.swapiService.getAllPeople}
                  renderItem={({ name, gender }) => `${name} (${gender})`} />
              </div>
              <div className="col-md-6">
                <PersonDetails personId={this.state.selectedPerson} />
              </div>
            </div>
        )
    }
}
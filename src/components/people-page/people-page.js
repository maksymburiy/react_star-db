import React, { Component } from 'react';
import ItemDetails from '../item-details';
import ItemList from '../item-list';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../errorBoundry';

import './people-page.css';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
        hasError: false
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

        const itemList = (
          <ItemList
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}
            renderItem={({ name, gender }) => `${name} (${gender})`} />
        );

        const personDetails = (
          <ErrorBoundry>
            <ItemDetails personId={this.state.selectedPerson} />
          </ ErrorBoundry>
        );

        return (
          <Row left={itemList} right={personDetails} />
        )
    }
}
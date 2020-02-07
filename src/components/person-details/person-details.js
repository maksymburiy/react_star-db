import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button'

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    loading: false,
    hasData: false
  }

  componentDidMount() {
    this.updatePerson()
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({
        loading: true
      })
      this.updatePerson()
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return 
    }

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({
          person,
          loading: false,
          hasData: true
        })
      })
  }

  render() {

    const { person, loading, hasData } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const content = !loading && hasData ?
      <PersoneView personInfo={person} /> 
      : null;
    const prompt = !person && !loading ? <span>select a person</span> : null;

    return (

      <div className="person-details card">
        {spinner}
        {content}
        {prompt}
      </div>
    )
  }
}

const PersoneView = ({personInfo}) => {

  const { 
    id,
    name,
    gender,
    birthYear,
    eyeColor
  } = personInfo;

  return (
    <React.Fragment >
      <img className="person-image"
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

      <div className="card-body">
        <h4>{name} {id}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  )

}
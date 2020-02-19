import React, { Component } from 'react';

import './item-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button'

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    loading: false,
    hasData: false
  }

  componentDidMount() {
    this.updateItem()
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({
        loading: true
      })
      this.updateItem()
    }
  }

  updateItem() {
    const { itemId } = this.props;
    if (!itemId) {
      return 
    }

    this.swapiService
      .getItem(itemId)
      .then((item) => {
        this.setState({
          item,
          loading: false,
          hasData: true
        })
      })
  }

  render() {

    const { item } = this.state;
    const spinner = this.state.loading ? <Spinner /> : null;
    const content = !this.state.loading && this.state.hasData ?
      <ItemView itemInfo={item} /> 
      : null;
    const prompt = !item && !this.state.loading ? <span>select an iten</span> : null;

    return (

      <div className="person-details card">
        {spinner}
        {content}
        {prompt}
      </div>
    )
  }
}

const ItemView = ({itemInfo}) => {

  const { 
    id,
    name,
    gender,
    birthYear,
    eyeColor
  } = itemInfo;

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
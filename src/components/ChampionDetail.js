import React, { Component } from 'react';
import logo from '../logo.svg';
import {championImage, championInfo} from '../ddragon';
import '../App.css';
import { BrowserRouter, Route, Router, Link, Switch } from 'react-router-dom';

class ChampionDetail extends Component {
  constructor(match, props) {
    super(match,props);
    this.fetchChampion(match.match.params.id);

    this.state = {
      data: []
    }
  }

  fetchChampion = async (id) => {
    fetch(championInfo + id + ".json")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          champion: result,
          isLoaded: true,
          id: id
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true
        });
        console.log(error);
      }
    )
  }

  render() {
    let element= "";
    if (this.state.isLoaded) {
      element = <ChampionDetailDisplay champion={this.state.champion.data[this.state.id]} />
    }
    return (
      <div>
        {element}
      </div>
    );
  }
}

class ChampionDetailDisplay extends Component {
  render() {
    console.log(this.props.champion.id);
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className="championDetail">
              <div className='row'>
                <div className='col-3'>
                  <img className="detailImage" src={championImage + this.props.champion.image.full} alt=""/>
                </div>
              </div>
              <div className='row'>
                  <div className='col-6'>
                    <ul className="statList">
                      <li>{this.props.champion.stats.hp}</li>
                      <li>{this.props.champion.stats.mp}</li>
                      <li>{this.props.champion.stats.armor}</li>
                      <li>{this.props.champion.stats.spellblock}</li>
                      <li>{this.props.champion.stats.attackdamage}</li>
                      <li>{this.props.champion.stats.attackrange}</li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChampionDetail;

import React, { Component } from 'react';
import logo from '../logo.svg';
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
    fetch("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion/" + id + ".json")
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
      element = <ChampionDetailDisplay id={this.state.id} champion={this.state.champion.data} />
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
    console.log(this.props.champion.data);
    return (
      <div>
      </div>
    );
  }
}

export default ChampionDetail;

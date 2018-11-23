import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { BrowserRouter, Route, Router, Link, Switch } from 'react-router-dom';

class ChampionDetail extends Component {
  constructor(props) {
    super(props);
    this.fetchChampion('Aatrox');
  }
  fetchChampion = async (id) => {
    fetch("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion/" + id + ".json")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
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
    return (
      <div>ez yoink</div>
    );
  }
}

export default ChampionDetail;

import React, { Component } from 'react';
import logo from './logo.pdf';
import './App.css';
import apiKey from './libs/api';
import {leagueUrls} from './libs/endpoints';
import { BrowserRouter, Route, Router, Link, Switch } from 'react-router-dom';

// Components
import Homepage from './components/Homepage';
import Header from './components/Header';
import ChampionDetail from './components/ChampionDetail';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      championsLoaded: false,
      champions: [],
      searchTerm: undefined
    }

    this.fetchChampions();
  }


  fetchChampions = async () => {
    let ddragonGetImageUrl = leagueUrls.championImage;

    //Fetch champions
    fetch(leagueUrls.allChampionsInfo)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          //Get values for each champion and put them into an array
          let champions = Object.values(result.data);
          //handy path variable
          let avatarPath;

          //Loop trough all champions and add their image url to the individual champion objects
          champions.map((champion) => {
            
            avatarPath = ddragonGetImageUrl + champion.image.full;


            champion.image.helletimage = avatarPath;
          });

          //Set state loaded true, set champions equal to the champions array
          this.setState({
            isLoaded: true,
            champions: champions
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

  handleSearchChampion = (e) => {
    this.setState({searchTerm: e.target.value});
  }

  render() {
    return (
      
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ (props) =>
              <div className='App'>
                <Header />
                <Homepage searchTerm={this.state.searchTerm} searchFunc={this.handleSearchChampion} champions={this.state.champions} />
              </div>
            } />
            <Route exact path="/champion/:id" render={ (props) =>
              <div className='App'>
                <Header />
                <ChampionDetail {...props} />
              </div>
            } />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;

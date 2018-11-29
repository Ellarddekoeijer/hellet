import React, { Component } from 'react';
import logo from '../logo.svg';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, VerticalBarSeries} from 'react-vis';
import {leagueUrls, championggUrls} from '../libs/endpoints';
import { BrowserRouter, Route, Router, Link, Switch } from 'react-router-dom';
import '../App.css';

class ChampionDetail extends Component {
  constructor(match, props) {
    super(match,props);
  
    this.state = {
      data: [],
      championggData: {}
    }

    this.fetchChampion(match.match.params.id);
  }

  fetchChampion = async (id) => {
    fetch(leagueUrls.championInfo + id + ".json")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          champion: result,
          championId: id,
          championKey: result.data[id].key
        });

        //Fetch champion.gg data from specific champion
        fetch(championggUrls.championDetails + this.state.championKey + championggUrls.championDataSet)
          .then(res =>res.json())
          .then(
            (championgg) => {
              this.setState({
                isLoaded: true,
                championggData: championgg[0]
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

      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error);
      }
    )
  };

  render() {
    let element= "";
    if (this.state.isLoaded) {
      console.log(this.state.championggData);
      element = <ChampionDetailDisplay 
        champion={this.state.champion.data[this.state.championId]}
        winRate={this.state.championggData.normalized.winRate}
        assists={this.state.championggData.normalized.assists}
        deaths={this.state.championggData.normalized.deaths}
        kills={this.state.championggData.normalized.kills}
      />
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
    const myData = [
      {x: 1, y: this.props.assists},
      {x: 2, y: this.props.deaths},
      {x: 3, y: this.props.kills}
    ]

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className="championDetail">
              <div className='row'>
                <div className='col-3'>
                  <img className="detailImage" src={leagueUrls.championImage + this.props.champion.image.full} alt=""/>
                </div>
              </div>
              <div className='row'>
              <div className="col-6">
              <XYPlot height={200} width={200}>
                <VerticalBarSeries data={myData}/>
              </XYPlot>
                </div>
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

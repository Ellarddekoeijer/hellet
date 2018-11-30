import React, { Component } from 'react';
import logo from '../logo.svg';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, VerticalBarSeries} from 'react-vis';
import {leagueUrls, championggUrls} from '../libs/endpoints';
import {positionIcons} from '../images/positionsIcons';
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
      //Check what role the champion is, get the role icon
      let roleImage = "";
      switch(this.state.championggData._id.role) {
          case "TOP":
              roleImage = positionIcons.Top;
              break;
          case "MIDDLE":
              roleImage = positionIcons.Mid;
              break;
          case "DUO_SUPPORT":
              roleImage = positionIcons.Support;
              break;
          case "JUNGLE":
              roleImage = positionIcons.Jungle;
              break;
          case "DUO_CARRY":
              roleImage = positionIcons.ADC;
              break;
          default:
              roleImage = positionIcons.Top;
      }

      element = <ChampionDetailDisplay 
        champion={this.state.champion.data[this.state.championId]}
        championGG={this.state.championggData}
        fullImage={leagueUrls.championFullImage + this.state.championId + "_0.jpg"}
        roleImage={roleImage}
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
    console.log(this.props.championGG);
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-9'>
            <div className="championDetail" style={{backgroundImage: `url(${this.props.fullImage})`}}>
              <div className="championDetailOverlay">
                <div className='row'>
                  <div className='col-12'>
                    <img className="roleImage" src={this.props.roleImage} alt=""/>
                    <h1 className="championTitle">{this.props.champion.name}</h1>
                    <h3 className="championSubtitle">{this.props.champion.title}</h3>
                  </div>
                  <div>
                    <p>sample</p>
                    <p>sample</p>
                    <p>sample</p>
                    <p>sample</p>
                    <p>sample</p>
                    <p>sample</p>
                  </div>
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

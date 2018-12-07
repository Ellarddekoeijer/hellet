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
      championggData: {},
      championId: "",
      championKey: ""
    }

    this.fetchChampion(match.match.params.id);
  }

  fetchChampion = async (id) => {
    fetch(leagueUrls.championInfo + id + ".json")
    .then(res => res.json())
    .then(
      (result) => {

        //Set spell & passive images
        // Passive
        result.data[id].passive.image.helletUrl =  leagueUrls.passiveImage + result.data[id].passive.image.full;
        // Q
        result.data[id].spells[0].image.helletUrl =  leagueUrls.spellImage + result.data[id].spells[0].image.full;
        // W
        result.data[id].spells[1].image.helletUrl =  leagueUrls.spellImage + result.data[id].spells[1].image.full;
        // E
        result.data[id].spells[2].image.helletUrl =  leagueUrls.spellImage + result.data[id].spells[2].image.full;
        // R
        result.data[id].spells[3].image.helletUrl =  leagueUrls.spellImage + result.data[id].spells[3].image.full;

        this.setState({
          champion: result,
          championId: id,
          championKey: result.data[id].key
        });

        this.fetchChampionGGData();

      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error);
      }
    )
  };

  fetchChampionGGData = () => {
    if (this.state.championKey != "") {
      //Fetch champion.gg data from specific champion when a championKey is set within the state
      fetch(championggUrls.championDetails + this.state.championKey + championggUrls.championDataSet)
      .then(res =>res.json())
      .then(
        (championgg) => {
          this.generateTableElements(championgg[0].hashes.skillorderhash.highestWinrate.hash);
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
    }
  }
    // Generates td elements for the skill order table
    generateTableElements = (order) => {
      //Set element to create table with
      let tableElements = {
        Q: [],
        W: [],
        E: [],
        R: [],
        counter: []
      }

      //Split the skill order string into an array
      let orderArray = order.split('-');

      //Element to push when a skill has been leveled
      let leveled = (text) => <td className="leveled level">{text}</td>;

      //Element to push when a skill has not be leveled
      let td = <td className="level"></td>;

      orderArray.forEach((level) => {
        switch(level) {
          case 'Q':
            tableElements.Q.push(leveled('Q'));

            //Add an empty td element to the rest of the skills
            tableElements.W.push(td);
            tableElements.E.push(td);
            tableElements.R.push(td);
            break;
          case 'W':
            tableElements.W.push(leveled('W'));

            //Add an empty td element to the rest of the skills
            tableElements.Q.push(td);
            tableElements.E.push(td);
            tableElements.R.push(td);
            break;
          case 'E':
            tableElements.E.push(leveled('E'));

            //Add an empty td element to the rest of the skills
            tableElements.Q.push(td);
            tableElements.W.push(td);
            tableElements.R.push(td);
            break;
          case 'R':
            tableElements.R.push(leveled('R'));

            //Add an empty td element to the rest of the skills
            tableElements.Q.push(td);
            tableElements.W.push(td);
            tableElements.E.push(td);
            break;
        }
      });

      //Display level counter
      for (let i = 1; i < 19; i++) {
        tableElements.counter.push(<th>{i}</th>);
      }

      this.setState({
        skillOrderElements: tableElements
      });
    } 

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
        skillOrder={this.state.skillOrderElements}
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
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className="championDetail" style={{backgroundImage: `url(${this.props.fullImage})`}}>
              <div className="championDetailOverlay">
                <div className='row'>
                  <div className='col-12'>
                    <img className="roleImage" src={this.props.roleImage} alt=""/>
                    <h1 className="championTitle">{this.props.champion.name}</h1>
                    <h3 className="championSubtitle">{this.props.champion.title}</h3>
                    <div className='col-9 skillOrder'>
                    <h1 className="championTitle">Skill order</h1>
                      <table className="skillOrderTable">
                        <thead>
                          <tr>
                             <th></th>
                            {this.props.skillOrder.counter}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="level"><img src={this.props.champion.spells[0].image.helletUrl} alt=""/></td>
                            {this.props.skillOrder.Q}
                          </tr>
                          <tr>
                            <td className="level"><img src={this.props.champion.spells[1].image.helletUrl} alt=""/></td>
                            {this.props.skillOrder.W}
                          </tr>
                          <tr>
                            <td className="level"><img src={this.props.champion.spells[2].image.helletUrl} alt=""/></td>
                            {this.props.skillOrder.E}
                          </tr>
                          <tr>
                            <td className="level"><img src={this.props.champion.spells[3].image.helletUrl} alt=""/></td>
                            {this.props.skillOrder.R}
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

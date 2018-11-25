import React, { Component } from 'react';
import logo from '../logo.png';
import '../App.css';

class ChampionList extends Component {
  render() {

	let champions = this.props.champions.map((champion) => {
		if (this.props.searchTerm !== undefined) {
			if (champion.id.toLowerCase().match(this.props.searchTerm.toLowerCase())) {
				return <Champion key={champion.key} champion={champion} />
			}
		} else {
			return <Champion key={champion.key} champion={champion} />
		}
	});
    return (
      	<div className="row">
      		{champions}
      	</div>
    );
  }
}

class Champion extends Component {
  render() {
    return (
      	<div className="championLink">
          <a href={"/champion/" + this.props.champion.id}>
      		  <img src={this.props.champion.image.helletimage} alt="" />
          </a>
      	</div>
    );
  }
}

export default ChampionList;

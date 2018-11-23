import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class ChampionList extends Component {
  render() {

	let champions = this.props.champions.map((champion) => {
		if (this.props.searchTerm !== undefined) {
			if (champion.id.toLowerCase().match(this.props.searchTerm.toLowerCase())) {
				return <Champion champion={champion} />
			}
		} else {
			return <Champion champion={champion} />
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
      		<img src={this.props.champion.image.helletimage} alt="" />
      	</div>
    );
  }
}

export default ChampionList;

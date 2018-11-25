import React, { Component } from 'react';
import logo from '../logo.png';
import '../App.css';
import ChampionList from './ChampionList';
import SearchChampionForm from './SearchChampionForm';

class Homepage extends Component {
  render() {
    return (
		<div className='container'>
			<div className='row'>
				<div className='col-12'>
					<SearchChampionForm searchTerm={this.props.searchTerm} searchFunc={this.props.searchFunc} />
					<div className="championList">
						<ChampionList searchTerm={this.props.searchTerm} champions={this.props.champions} />
					</div>
				</div>
			</div>
		</div>
    );
  }
}


export default Homepage;

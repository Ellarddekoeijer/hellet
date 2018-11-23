import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class SearchChampionForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {

    return (
      	<form className="championSearch" onSubmit={this.handleSubmit}>
          <input className="" type="text" placeholder="Search..." value={this.props.searchTerm} onChange={(e) => this.props.searchFunc(e)} />
      </form>
    );
  }
}


export default SearchChampionForm;

import React from 'react';
import './SearchBar.css';

const lastSearch = sessionStorage.getItem('searchTerm');

class SearchBar extends React.Component {

  handleTermChange = e => {
    this.setState(
      {
        term: e.target.value
      }
    )
  }

  // --------------------------

  search = e => {
    this.props.onSearch(this.state.term);
    sessionStorage.setItem('searchTerm', this.state.term);
    e.preventDefault();
  }

  // --------------------------

  handleFocus = e => {
    e.target.value = " ";
  }

  // --------------------------

  render() {
    return (
      <form onSubmit={this.search}>
      <div className="SearchBar">
        <input type="text" placeholder={lastSearch ? lastSearch : "Enter A Song Title"} onChange={this.handleTermChange} onFocus={this.handleFocus} />
        <input type="submit" hidden value="SEARCH"></input>
      </div>
      </form>
    )
  }
}
export default SearchBar;

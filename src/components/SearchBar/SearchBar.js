import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  // --------------------------

  handleTermChange(e) {
    this.setState(
      {
        term: e.target.value
      }
    )
  }

  // --------------------------

  search(e) {
    this.props.onSearch(this.state.term);
    e.preventDefault();
  }

  // --------------------------

  render() {
    return (
      <form onSubmit={this.search}>
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" onChange={this.handleTermChange} />
        <input type="submit" value="SEARCH"></input>
      </div>
      </form>
    )
  }
}
export default SearchBar;

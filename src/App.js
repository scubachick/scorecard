import React, { Component } from 'react';
import MembersGrid from './components/MembersGrid/MembersGrid';
import Filters from './components/Filters/Filters';
// import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import membersData from './assets/members';

class App extends Component {
  state = {
    filtersApplied: {
      State: '',
      Title: '',
      Party: '',
      Search: ''
    },
    members: [],
    columns: {

    }
  }

  componentDidMount(){
    // populate data for filters
    this.setState({ members: membersData });
  }

  applyFilters = (filter, filterType) => {
    // capture value of dropdown and store in filtersApplied state
    let filters = this.state.filtersApplied;
    if(filterType === 'State') {
      filters.State = filter;
    }
    if(filterType === 'Title') {
      filters.Title = filter;
    }
    if(filterType === 'Party') {
      filters.Party = filter;
    }
    if(filterType === 'Search') {
      filters.Search = filter;
    }
    this.setState({filtersApplied: filters});

    // take copy of full membersData to apply filters
    let members = membersData;
    let result = [];
    // handle special case for Search, otherwise call multiFilter for other filters
    if(filterType === 'Search') {
      result = this.searchFilter(members, this.state.filtersApplied.Search);
      // result = this.multiFilter(members, this.state.filtersApplied);
      this.setState({members: result});
    } else {
      result = this.multiFilter(members, this.state.filtersApplied);
      this.setState({members: result});
    }
  }

  clearAllFilters = () => {
    this.setState({ members: membersData, filtersApplied: {} });
  }

  multiFilter = (array, filters) => {
    const filterKeys = Object.keys(filters);
    return array.filter((item) => {
      // let name = item.Name.toLowerCase();
      let result = filterKeys.every(key => { 
        return !filters[key] || filters[key] === item[key];
        // return !filters[key] || filters[key] === item[key] || name.indexOf(filters[key].toLowerCase()) > -1;
      });
      return result;
    });
  }

  searchFilter = (array, term) => {
    let result = array.filter((item) => {
      return item.Name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
    return result;
  }

  sortColumn = (sortCol, sortDir) => {
    let rows = this.state.members;
    rows.sort((a, b) => {
      return a[sortCol] < b[sortCol];
    })
    console.log(rows);

    // const comparer = (a, b) => {
    //   if (sortDir === 'asc') {
    //     return (a[sortCol] > b[sortCol]) ? 1 : -1;
    //   } else if (sortDir === 'desc') {
    //     return (a[sortCol] < b[sortCol]) ? 1 : -1;
    //   }
    // };
//    let rows = this.state.members;
//    rows = sortDir === 'none' ? this.state.rows.slice(0) : this.state.rows.sort(comparer);

    //this.setState({ members: rows });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Scorecard</h1>
        </header>
        <div className="map">
          <p>render the map here</p>
        </div>
        <div className="filters">
          <Filters applyFilters={this.applyFilters} clearAllFilters={this.clearAllFilters} />
        </div>
        <div className="datagrid">
          <MembersGrid members={this.state.members} sortColumn={this.sortColumn} />
        </div>
      </div>
    );
  }
}

export default App;


// original
// multiFilter = (array, filters) => {
//   const filterKeys = Object.keys(filters);
//   return array.filter((item) => {
//     let result = filterKeys.every(key => { 
//       return !filters[key] || filters[key] === item[key];
//     });
//     return result;
//   });
// }

   // take copy of full membersData and apply filters, set members state with result
   // let members = membersData;
   // let result = this.multiFilter(members, this.state.filtersApplied);
   // this.setState({members: result});

// didn't use
   //  applySearchFilter = (term) => {
  //   this.setState({ members: membersData, filtersApplied: {} });
  // }

//couldn't use axios - got CORS error and don't know how to fix
    // fetch member data from api
    // const endpoint = "https://members.conservativereview.com/govtrack/GetAllMembersListing";
    // axios({
    //   method: 'GET',
    //   url: endpoint,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*"
    //   }
    // })
    //   .then(res => {
    //     const data = res.data;
    //     this.setState({ members: data });
    // });
    // axios.get(endpoint)
    //   .then(res => {
    //     const data = res.data;
    //     this.setState({ members: data });
    // });

// doesn't work either, used one applyFilters function
// let chamber = this.state.filtersApplied.chamber;
// let party = this.state.filtersApplied.party;
// let result = members.filter(member => (
//   ((chamber && member.Title === chamber) && (party && member.Party === party)) ||
//   (chamber && member.Title === chamber) || (party && member.Party === party)
// ))

  // filterChamber = (chamber) => {
  //   if(chamber === 'House' || chamber === 'Senate') {
  //     let filtered = members;
  //     let filters = this.state.filtersApplied;
  //     filters.chamber = chamber;
  //     console.log('filters applied temp:');
  //     console.log(filters);
  //     this.setState({filtersApplied: filters});
  //     console.log('filtersApplied state:');
  //     console.log(this.state.filtersApplied);
  //     let result = filtered.filter(member => (
  //       member.Title === chamber
  //     ))
  //     this.setState({members: result});
  //   }
  //   console.log(`chamber that was clicked: ${chamber}`);
  // };

  // filterParty = (party) => {
  //   if(party === 'D' || party === 'R' || party === 'I') {
  //     let filtered = members;
  //     let result = filtered.filter(member => (
  //       member.Party === party
  //     ))
  //     this.setState({members: result});
  //   }
  //   console.log(`party that was clicked: ${party}`);
  // };

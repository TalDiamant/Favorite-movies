import React, { Component } from 'react';
import AddMovie from './comp/AddMovie';
import AllMovies from './comp/AllMovies';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus)
 
class App extends Component {

state={
    allMovies:[],
    allCatagories:[]
}

componentDidMount()
{
    this.refreshData();
    
    fetch('http://localhost:3000/api/getallcatagories').then(r=>r.json()).then(data=>
    {
        this.setState({allCatagories:data});
    })
}

  render() {
    return (
      <div className="App">
      <AddMovie  refresh={this.refreshData.bind(this)}  allcatagories={this.state.allCatagories}  />
      <AllMovies refresh={this.refreshData.bind(this)}  allmovies={this.state.allMovies}   />  
      </div>
    );
  }

  refreshData()
  {
      fetch('http://localhost:3000/api/getallmovies').then(r=>r.json()).then(data=>
        {
                this.setState({allMovies:data});
        }) 
     
  } 

}

export default App;

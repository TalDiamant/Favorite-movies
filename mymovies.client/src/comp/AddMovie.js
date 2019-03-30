import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';


class AddMovie extends Component {

  render() {
    return (
      <div className="App">
        <div className="add">
          <h1>Favorite Movies</h1>
          <Input onChange={this.handleChange.bind(this)} placeholder="Enter movie-name" name="moviename" />
          <Input onChange={this.handleChange.bind(this)} placeholder="Enter year" name="year" />
          <Input onChange={this.handleChange.bind(this)} placeholder="Enter image" name="image" />

          <br />
          <h3>Choose catagory:</h3>
          {this.props.allcatagories.map(c => (
            <div className="radios" key={c.ID}>
              <input onChange={this.handleChange.bind(this)} type="radio" name="catagoryID" value={c.ID} /><span>{c.name}</span>
            </div>
          ))}
          <br />

          <Button color="info" onClick={this.sendData.bind(this)} >Add your movie!</Button>
        </div>
      </div>
    );
  }


  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }


  sendData() {

    fetch('http://localhost:3000/api/addmovie', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(r => r.json())
      .then(data => {
        alert('Your movie was added to the list');
        this.props.refresh();
      });
  }


}

export default AddMovie;

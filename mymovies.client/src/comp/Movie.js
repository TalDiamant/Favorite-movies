import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';


class Movie extends Component {
  render() {
    return (
      <div className="Movie">
        <div>
          <Card>
          <Button className="buttonRemove" onClick={this.deleteMovie.bind(this)}>X</Button>
            <CardImg top width="100%" src={this.props.currentMovie.image} alt="Card image cap" /> 
            <CardBody>
              <CardTitle>Name: {this.props.currentMovie.moviename}</CardTitle>
              <CardTitle>Year: {this.props.currentMovie.year}</CardTitle>
              <CardTitle>catagory: {this.props.currentMovie.catagoryname}</CardTitle>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }



  async deleteMovie() {
    let resp = await fetch('http://localhost:3000/api/deletemovie?ID=' + this.props.currentMovie.ID);
    let data = await resp.json();
    console.log(data);
    this.props.refresh();
  }
}

export default Movie;

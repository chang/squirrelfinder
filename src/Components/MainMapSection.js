import React, { Component } from 'react';

import { Button, Icon, Card, Dropdown, Image, Grid, Divider, Transition, Label } from 'semantic-ui-react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import charlotte from '../resources/images/charlotte_1.jpg';
import SQUIRRELS from './DATA.js'


const TRANSITION_DURATION = 250;

class SquirrelCard extends React.Component{
  render() {
    let squirrel = this.props.squirrelName;
    let favorite_spot = SQUIRRELS[squirrel]["favorite_spot"];

    return (
      <Card>
        <Image src={charlotte} />
        <Card.Content textAlign="left">
          <Card.Header>{squirrel}</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>{squirrel} is a musician living in Nashville.</Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="left">
          <p>Charlotte's favorite spot is: {favorite_spot}</p>
          <a>
            <Icon name='user' />
            22 Friends
          </a>
        </Card.Content>
      </Card>
    );
  }
}


const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZXJpY2NoYW5nMDAiLCJhIjoiY2ppbXViZHNxMDgzODN2cGxhNjIza2d1ayJ9.j7pxXt3AOOUk_E-GkLNHEg"
});


class SquirrelMap extends React.Component {

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
    };

    return (
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "90vh",
            width: "100%"
          }}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
        </Map>
    );
  }
}


class SquirrelSelection extends React.Component {
  render() {
    let options = [
      {value: "Charlotte", text: "Charlotte"},
      {value: "Sampson", text: "Sampson"}
    ];

    return (
      <Dropdown
        fluid
        onChange={this.props.handleChange}
        selection
        placeholder='Select a Squirrel...'
        options={options}
        />
    );
  }

}


class TransitioningSquirrelLabel extends React.Component {
  // toggle() {
  //   this.setState({
  //     visible: !this.state.visible
  //   });
  // }

  render() {
    let visible;
    if (this.props.squirrelName === null) {
      visible = false;
    } else {
      visible = true;
    }

    return (
      <div>
        <Transition visible={visible} animation="scale" duration={TRANSITION_DURATION}>
          <Label size="large" color="yellow"> {this.props.squirrelName} </Label>
        </Transition>
      </div>
    )
  }
}


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squirrelName: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, passed) {
    this.props.onChange(e, passed);
    this.setState({squirrelName: passed.value});
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={6} floated="left">
          <SquirrelSelection handleChange={this.handleChange}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <TransitioningSquirrelLabel squirrelName={this.state.squirrelName}/>
        </Grid.Column>
      </Grid>
    )
  }
}

class MainMapSection extends React.Component {
  state = {
    squirrelName: null,
    visible: true
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, squirrelSelection) {
    this.setState({squirrelName: squirrelSelection.value})
    console.log(squirrelSelection.value);
  }

  render() {
    let visible;
    let squirrelName;

    if (this.state.squirrelName === null) {
      visible = false;
      squirrelName = "Charlotte";
    } else {
      visible = true;
      squirrelName = this.state.squirrelName;
    }

    return (
      <Grid padded>
        {/* Map section */}
        <Grid.Column width={10}>
          <Card fluid>
            <SquirrelMap/>
          </Card>
        </Grid.Column>

        {/* Display */}
        <Grid.Column width={6}>
          <SearchBar onChange={this.handleChange}/>
          <Divider/>
          <Transition visible={visible} animation="scale" duration={TRANSITION_DURATION}>
            <SquirrelCard squirrelName={squirrelName}/>
          </Transition>
        </Grid.Column>

      </Grid>
    )
  }
}


export default MainMapSection

import React, { Component } from 'react';

import {
  Container, Icon, Card,
  Dropdown, Image, Grid,
  Divider, Transition, Label,
  Message, List
} from 'semantic-ui-react';

import './MainMapSection.css';
import SQUIRRELS from './LoadData.js';
import SquirrelMap from './SquirrelMap.js';
import charlotte from '../resources/images/charlotte_1.jpg';


/* CONSTANTS */

// The duration for fade-in fade-out transitions when changing squirrels.
const TRANSITION_DURATION = 100;

// The accent color for family member tiles, depending on relation.
const RELATION_COLORS = {
  "Sister": "yellow",
  "Brother": "teal",
  "Unknown": "white"
}

// The accent color for each type of card.
const BASICINFO_ACCENT = "red";



const BasicInfoCard = ({ squirrelName }) => {
  const { description, dob, icon, sex } = SQUIRRELS[squirrelName];

  let genderIcon = (sex == "male") ? "man" : "woman";

  return (
    <Card fluid>
      <Image src={icon}/>
      <Card.Content>
        <Card.Header content={squirrelName}/>
        <Card.Meta>
          <Icon name={genderIcon}/> {dob}
        </Card.Meta>
        <Card.Description content={description}/>
      </Card.Content>
    </Card>
  );
}

const FamilyCard = ({ squirrelName }) => {
  function getRelationColor(relation) {
    return (RELATION_COLORS.hasOwnProperty(relation)) ? RELATION_COLORS[relation] : RELATION_COLORS["Unknown"];
  }

  const { family } = SQUIRRELS[squirrelName];
  let numMembers = family.length;

  let labels = family.map(({ name, relation }) => {
    return (
      <Label image color={getRelationColor(relation)} as='a' size="large">
        <img src={SQUIRRELS[name]["icon"]} />
        {name}
        <Label.Detail>{relation}</Label.Detail>
      </Label>
    )
  })

  return (
    <Card fluid className="FamilyCard">
      <Card.Content header="Family Members"/>
      <Card.Content>
        <ul>{labels}</ul>
      </Card.Content>
      <Card.Content extra>
        <a> <Icon name='user'/> {numMembers} Family Members </a>
      </Card.Content>
    </Card>
  )
}


const DidYouKnowCard = ({ squirrelName }) => {
  let { interestingFact } = SQUIRRELS[squirrelName];
  return (
    <Message
      className="DidYouKnowCard"
      icon="question circle"
      header="Did you know..."
      content={interestingFact}
      color="olive"
    />
  )
}


const LikesAndDislikes = ({ squirrelName }) => {
  const { likes, dislikes } = SQUIRRELS[squirrelName];
  const makeItem = (x) => ( <List.Item icon="right triangle" content={x}/> );

  return (
    <Card fluid>
      <Card.Content header="Likes"/>
      <Card.Content>
        <List animated verticalAlign="left">
          {likes.map(makeItem)}
        </List>
      </Card.Content>
      <Card.Content header="Dislikes"/>
      <Card.Content>
        <List animated verticalAlign="left">
          {dislikes.map(makeItem)}
        </List>
      </Card.Content>
    </Card>
  )
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


const SquirrelLabel = ({ squirrelName }) => (
  (squirrelName == null) ? <div></div> : <Label size="large" color="yellow"> {squirrelName} </Label>
)


class MainMapSection extends React.Component {
  state = {
    squirrelName: null,
    visible: true
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  setStateWithTransition(stateChange) {
    this.setState({visible: false});
    setTimeout(() => {
      this.setState(stateChange);
      this.setState({visible: true});
    }, TRANSITION_DURATION);
  }

  renderSearchBar(squirrelName) {
    return (
      <Grid>
        <Grid.Column width={4} floated="left">
          <SquirrelSelection handleChange={this.handleChange}/>
        </Grid.Column>
      </Grid>
    )
  }

  handleChange(e, squirrelSelection) {
    this.setStateWithTransition({squirrelName: squirrelSelection.value})
    console.log(squirrelSelection.value);
  }

  render() {
    let squirrelName = (this.state.squirrelName == null) ? "Charlotte" : this.state.squirrelName;
    return (
      <Grid padded>
        {/* Map section */}
        <Grid.Column width={9}>
          <Card fluid>
            <SquirrelMap/>
          </Card>
        </Grid.Column>

        {/* Right side */}
        <Grid.Column width={7}>
          {this.renderSearchBar(squirrelName)}
          <Divider/>
          {/* Data display */}
          <Transition visible={this.state.visible} animation="fade" duration={TRANSITION_DURATION}>
            <div className="DataDisplay">
              <p></p> {/* This seems buggy: Transition needs an empty text element mixed in to animate the card. */}
              <Grid columns={2}>
                <Grid.Column>
                  <BasicInfoCard squirrelName={squirrelName}/>
                  <FamilyCard squirrelName={squirrelName}/>
                </Grid.Column>
                <Grid.Column>
                  <LikesAndDislikes squirrelName={squirrelName}/>
                  <DidYouKnowCard squirrelName={squirrelName}/>
                </Grid.Column>
              </Grid>
            </div>
          </Transition>
        </Grid.Column>

      </Grid>
    )
  }
}


export default MainMapSection

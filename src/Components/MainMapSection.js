import React from 'react';

import {
  Container, Icon, Card,
  Image, Grid, Transition, Label,
  Message, List, Popup, Button,
  Modal
} from 'semantic-ui-react';

import { Carousel } from 'react-responsive-carousel';

import './MainMapSection.css';
import SQUIRRELS from './LoadData.js';
import SquirrelMap from './SquirrelMap.js';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

/* CONSTANTS */
const TRANSITION_DURATION = 200;

// The accent color for family member tiles, depending on relation.
const RELATION_COLORS = {
  "Sister": "yellow",
  "Brother": "teal",
  "Unknown": "white"
}

const SQUIRREL_COLORS = [
  "red",
  "orange",
  "yellow",
  "olive",
  "teal",
  "blue",
  "purple",
  "pink",
  "brown",
];


// "Hash" a name to a semantic UI coloring
function nameToColor(name) {
  let ord = 0;
  for (let x in name) {
    ord += x;
  }
  return SQUIRREL_COLORS[ord % SQUIRREL_COLORS.length];
}


class PhotoCarousel extends React.Component {
  render() {
    const imgSources = SQUIRRELS[this.props.squirrelName]["pictures"];
    const images = imgSources.map((img) => {
      return (
        <div>
          {/* TODO: Maybe set style={{"max-height": "500px"}} */}
          <Image src={img}/>
        </div>
      )
    });
    return (
      <Carousel showArrows={true} dynamicHeight={true} {...this.props}>
        {images}
      </Carousel>
    );

  }
}


class UnifiedCard extends React.Component {
  style = {
    "font-size": "110%"
  }

  render() {
    const squirrelName = this.props.squirrelName;
    return (
      // Might want to set an empty fragment href for a pop effect
      <Card className="DataDisplay" fluid style={this.style}>
        {this.renderCardPhotoCarousel(squirrelName)}
        {this.renderBasicInfoSection(squirrelName)}
        {this.renderFamilySection(squirrelName, this.props.handleLabelClick)}
        {this.renderLikesAndDislikesSection(squirrelName)}
        {this.renderTriviaSection(squirrelName)}
      </Card>
    );
  }

  renderCardPhotoCarousel(squirrelName) {
    return (
      <PhotoCarousel squirrelName={squirrelName} showThumbs={false}/>
    );
  }

  renderModalPhotoCarousel(squirrelName) {
    return (
      <PhotoCarousel squirrelName={squirrelName} transition={0}/>
    );
  }

  // Basic information, right under photo carousel.
  renderBasicInfoSection(squirrelName) {
    const { sex, birth_year, personality } = SQUIRRELS[squirrelName];
    const genderIcon = (sex == "M") ? "man" : "woman";
    const descriptionStyle = {
      "font-size": "110%"
    }
    return (
      <Card.Content style={descriptionStyle}>
        <Card.Header as="h1">
          {squirrelName}
          <Button color="green" floated="right">Find Me!</Button>
        </Card.Header>
        <Card.Meta>
          <Icon name={genderIcon}/> {birth_year}
        </Card.Meta>
        <Card.Description content={personality}/>
      </Card.Content>
    );
  }

  // Family section with labels for each member.
  renderFamilySection(squirrelName, handler) {

    function makeFamilyLabel({ name, relation }) {
      let image;
      if (SQUIRRELS.hasOwnProperty(name)) {
        image = <img src={SQUIRRELS[name]["icon"]}/>;
      }
      else {
        image = <Icon name="user"/>;
      }

      return (
        <Label image color={nameToColor(name)} as='a' size="large" onClick={handler}>
          {image}
          {name}
          <Label.Detail>{relation}</Label.Detail>
        </Label>
      )
    }

    // const numMembers = family.length;
    const { family } = SQUIRRELS[squirrelName];
    let familyLabels = null;
    if (family != null) {
      familyLabels = family.map(makeFamilyLabel)
    }

    return (
      <Card.Content>
        <Card.Header content="Family"/>
        <Card.Description content=""/>
          {familyLabels}
      </Card.Content>
    )
  }

  renderTriviaSection(squirrelName) {
    const { trivia } = SQUIRRELS[squirrelName];
    return (
      <Card.Content>
        <Message
          className="DidYouKnowCard"
          icon="question circle"
          header="Fun Fact"
          content={trivia}
          color="olive"
        />
      </Card.Content>
    )
  }

  renderLikesAndDislikesSection(squirrelName) {
    const { likes, dislikes } = SQUIRRELS[squirrelName];

    function createListItem(iconName, color) {
      const icon = ( <Icon color={color} name={iconName}/> );
      return function(x) {
        return (
          <List.Item
            icon={icon}
            content={x}
          />
        )
      }
    }

    let renderedLikes = (likes != null) ? likes.map(createListItem("checkmark", "green")) : null;
    let renderedDislikes = (dislikes != null) ? dislikes.map(createListItem("close", "red")) : null;

    return (
      <Card.Content>
        <Card.Header content="Likes and Dislikes"/>
        <Card.Description content=""/>
        <Grid columns={2}>
          <Grid.Column>
            <List animated relaxed verticalAlign="left">
              {renderedLikes}
            </List>
          </Grid.Column>
          <Grid.Column>
            <List animated relaxed verticalAlign="left">
              {renderedDislikes}
            </List>
          </Grid.Column>
        </Grid>
      </Card.Content>
    )
  }

  renderPhotoModal(squirrelName) {
    return (
      <Card.Content extra>
        <Modal
          trigger={<Button icon="expand arrows alternate" floated="right"/>}
          size="large"
        >
          <Modal.Header>{squirrelName}</Modal.Header>
          <Modal.Content>
            {this.renderModalPhotoCarousel(squirrelName)}
          </Modal.Content>
        </Modal>
      </Card.Content>
    )
  }
}


class MainMapSection extends React.Component {
  render() {
    const squirrelName = (this.props.squirrelName == null) ? "Charlotte" : this.props.squirrelName;

    return (
      <Grid padded relaxed>

        {/* Data Display */}
        <Grid.Column width={6}>
          <Transition visible={this.props.visible} animation="horizontal flip" duration={TRANSITION_DURATION}>
            <div>
              <p></p>
              <UnifiedCard
                class="DataDisplay"
                squirrelName={squirrelName}
                handleLabelClick={this.props.handleLabelClick}
              />
            </div>
          </Transition>
        </Grid.Column>

        {/* Map View */}
        <Grid.Column width={10}>
          <SquirrelMap/>
        </Grid.Column>

      </Grid>
    )
  }
}


export default MainMapSection;

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

// The duration for fade-in fade-out transitions when changing squirrels.
const TRANSITION_DURATION = 200;

// The accent color for family member tiles, depending on relation.
const RELATION_COLORS = {
  "Sister": "yellow",
  "Brother": "teal",
  "Unknown": "white"
}


class PhotoCarousel extends React.Component {
  render() {
    return (
      <Carousel showArrows={true} {...this.props}>
        <div>
           <img src={SQUIRRELS["Charlotte"]["icon"]}/>
        </div>
        <div>
           <img src={SQUIRRELS["Sampson"]["icon"]}/>
        </div>
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
        {this.renderPhotoCarousel(squirrelName)}
        {this.renderBasicInfoSection(squirrelName)}
        {this.renderFamilySection(squirrelName)}
        {this.renderLikesAndDislikesSection(squirrelName)}
        {this.renderInterestingFactSection(squirrelName)}
        {this.renderPhotoModal(squirrelName)}
      </Card>
    );
  }

  renderPhotoCarousel(squirrelName) {
    return (
      <PhotoCarousel showThumbs={false}/>
    );
  }

  renderModalPhotoCarousel(squirrelName) {
    return (
      <PhotoCarousel transition={0}/>
    );
  }

  renderIcon(squirrelName) {
    const { icon } = SQUIRRELS[squirrelName];
    return (
      <Image src={icon}/>
    )
  }

  // Basic information, right under photo carousel.
  renderBasicInfoSection(squirrelName) {
    const { sex, dob, description } = SQUIRRELS[squirrelName];
    const genderIcon = (sex == "male") ? "man" : "woman";
    const descriptionStyle = {
      "font-size": "110%"
    }
    return (
      <Card.Content style={descriptionStyle}>
        <Card.Header content={squirrelName}/>
        <Card.Meta>
          <Icon name={genderIcon}/> {dob}
        </Card.Meta>
        <Card.Description content={description}/>
      </Card.Content>
    );
  }

  // Family section with labels for each member.
  renderFamilySection(squirrelName) {
    const { family } = SQUIRRELS[squirrelName];
    const numMembers = family.length;
    const getRelationColor = (relation) => {
      return (RELATION_COLORS.hasOwnProperty(relation)) ? RELATION_COLORS[relation] : RELATION_COLORS["Unknown"];
    }
    const labels = family.map(({ name, relation }) => {
      return (
        <Label image color={getRelationColor(relation)} as='a' size="large">
          <img src={SQUIRRELS[name]["icon"]} />
          {name}
          <Label.Detail>{relation}</Label.Detail>
        </Label>
      )
    });

    return (
      <Card.Content>
        <Card.Header content="Family"/>
        <Card.Description content=""/>
        {labels}
      </Card.Content>
    )
  }

  renderInterestingFactSection(squirrelName) {
    const { interestingFact } = SQUIRRELS[squirrelName];
    return (
      <Card.Content>
        <Message
          className="DidYouKnowCard"
          icon="question circle"
          header="Fun Fact"
          content={interestingFact}
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

    return (
      <Card.Content>
        <Card.Header content="Likes and Dislikes"/>
        <Card.Description content=""/>
        <Grid columns={2}>
          <Grid.Column>
            <List animated relaxed verticalAlign="left">
              {likes.map(createListItem("checkmark", "green"))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <List animated relaxed verticalAlign="left">
              {dislikes.map(createListItem("close", "red"))}
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
  state = {
    visible: true
  }

  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
  }

  toggle() {
    this.setState({visible: false});
    setTimeout(() => {
      this.setState({visible: true});
    }, TRANSITION_DURATION);
  }

  // renderSearchBar() {
  //   return (
  //     <Grid>
  //       <Grid.Column width={8} floated="left">
  //         <SquirrelSelection handleChange={this.handleChange}/>
  //       </Grid.Column>
  //     </Grid>
  //   )
  // }

  // changeStateWithTransition(squirrelName) {
  //   this.setStateWithTransition({squirrelName: squirrelSelection.value})
  //   console.log(squirrelSelection.value);
  // }

  render() {
    const squirrelName = (this.props.squirrelName == null) ? "Charlotte" : this.props.squirrelName;

    return (
      <Grid padded relaxed>
        {/* Data Display */}
        <Grid.Column width={6}>
          <Transition visible={this.props.visible} animation="horizontal flip" duration={TRANSITION_DURATION}>
            <div>
              <p></p>
              <UnifiedCard class="DataDisplay" squirrelName={squirrelName}/>
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

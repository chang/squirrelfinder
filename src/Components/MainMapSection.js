import React, { Component } from 'react';

import { Button, Icon, Card, Select, Image, Grid, CardContent } from 'semantic-ui-react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import charlotte from '../resources/images/charlotte_1.jpg';


const ButtonExampleAnimated = () => (
    <div>
      <Button animated>
        <Button.Content visible>Next</Button.Content>
        <Button.Content hidden>
          <Icon name='right arrow' />
        </Button.Content>
      </Button>
      <Button animated='vertical'>
        <Button.Content hidden>Shop</Button.Content>
        <Button.Content visible>
          <Icon name='shop' />
        </Button.Content>
      </Button>
      <Button animated='fade'>
        <Button.Content visible>Sign-up for a Pro account</Button.Content>
        <Button.Content hidden>$12.99 a month</Button.Content>
      </Button>
    </div>
)


const CardExampleCard = () => (
  <Card>
    <Image src={charlotte} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
)

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


function SquirrelSearch(props) {
  let options = [
    {key: "Charlotte", text: "Charlotte"},
    {key: "Sampson", text: "Sampson"}
  ]
  return (
    <Select placeholder='Select your country' options={options}/>
  )
}


const MainMapSection = () => (
  <Grid padded>
    <Grid.Row>
      {/* Map section */}
      <Grid.Column width={10}>

        {/* Search bar */}
        {/* <Grid.Row>
          <Grid.Column floated="left">
            <SquirrelSearch/>
          </Grid.Column>
        </Grid.Row> */}

        <Card fluid> <SquirrelMap/> </Card>
      </Grid.Column>

      {/* Display */}
      <Grid.Column width={6}>
        <CardExampleCard/>
      </Grid.Column>

    </Grid.Row>
  </Grid>
)



export default MainMapSection

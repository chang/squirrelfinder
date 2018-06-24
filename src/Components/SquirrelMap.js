import React from 'react';
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

import { Button, Icon, Popup, Header, Image } from 'semantic-ui-react';

import SQUIRRELDATA from "../assets/squirrelData.json";


const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiZXJpY2NoYW5nMDAiLCJhIjoiY2ppbXViZHNxMDgzODN2cGxhNjIza2d1ayJ9.j7pxXt3AOOUk_E-GkLNHEg"
});


class SquirrelMap extends React.Component {

  constructor(props) {
    super(props);
  }

  createMarkers(squirrelData) {
    let markers = [];
    for (let squirrel in squirrelData) {
      if (!squirrelData[squirrel].hasOwnProperty("geo")) {
        continue;
      }
      const coord = squirrelData[squirrel]["geo"]["favorite_spot"];
      markers.push((
        <Marker coordinates={coord}>
          <Popup hoverable trigger={<Image avatar size="tiny" src={squirrelData[squirrel]["icon"]}/>}>
            <Header as="h3" content={squirrel + "'s Favorite Spot"}/>
            <Button color="green" content="Open my card!" onClick={this.props.handlePopupClick} squirrel={squirrel}/>
          </Popup>
        </Marker>
      ));
    }
    return markers;
  }

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
          }}
          center={this.props.center}
          zoom={this.props.zoom}
          >
          {this.createMarkers(SQUIRRELDATA)}
        </Map>
      );
    }
  }

  export default SquirrelMap;

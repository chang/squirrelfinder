import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";


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

  export default SquirrelMap;

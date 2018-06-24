import React, { Component } from 'react'
import { Menu, Icon, Header, Dropdown } from 'semantic-ui-react'

import SQUIRRELS from "./LoadData.js";


class SquirrelSelection extends React.Component {
  render() {
    let options = [];
    for (let squirrelName in SQUIRRELS) {
      options.push({
        value: squirrelName,
        text: squirrelName,
        // image: { avatar: true, src: SQUIRRELS[squirrelName]["icon"] }
      });
    }

    return (
      <Dropdown
        search
        selection
        onChange={this.props.handleChange}
        placeholder='Select a Squirrel...'
        options={options}
      />
    );
  }
}


class HoverableIconLinkMenuItem extends Component {
  inactive = "black";
  active = "green";

  constructor(props) {
    super(props);
    this.state = {
      color: this.inactive
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(e, v) {
    this.setState({
      color: this.active
    })
  }

  handleMouseLeave(e, v) {
    this.setState({
      color: this.inactive
    })
  }

  render() {
    return (
      <Menu.Item
        className="Hoverable"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ cursor: "pointer" }}
        >
        <a href={this.props.href} target="_blank">
          <Icon cursor="pointer" color={this.state.color} name={this.props.name} size="large"></Icon>
        </a>
      </Menu.Item>
    );
  }
}


class NavBar extends Component {
  render() {
    return (
      <Menu secondary size="huge">
        <Menu.Item>
          <Header as="h1" color="green">
            Indiana University ️🐿️ Finder
            <Header as="h1" textAlign="left" sub>Squirrels of IU</Header>
          </Header>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <SquirrelSelection handleChange={this.props.handleChange}/>
          </Menu.Item>

          <HoverableIconLinkMenuItem
            name="instagram"
            href="http://instagram.com/squirrels_of_iu/"
          />
          <HoverableIconLinkMenuItem
            name="twitter"
            href="http://twitter.com/squirrels_of_iu"
          />
          <HoverableIconLinkMenuItem
            name="github"
            href="http://github.com/chang/squirrelfinder"
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar;

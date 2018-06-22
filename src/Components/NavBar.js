import React, { Component } from 'react'
import { Input, Menu, Icon, Header } from 'semantic-ui-react'


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' }
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu icon secondary size="huge">
        <Menu.Item>
          <Header as="h2" color="green">
            Indiana University ️🐿️ Finder
            <Header as="h2" textAlign="left" sub>Squirrels of IU</Header>
          </Header>
        </Menu.Item>

        <Menu.Menu position='right'>

          <Menu.Item href="http://instagram.com/squirrels_of_iu/">
            <Icon name="instagram" size="large"></Icon>
          </Menu.Item>

          <Menu.Item href="http://twitter.com/squirrels_of_iu">
            <Icon name="twitter" size="large"></Icon>
          </Menu.Item>

          <Menu.Item href="http://github.com/chang/squirrelfinder">
            <Icon name="github" size="large"></Icon>
          </Menu.Item>

        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar;

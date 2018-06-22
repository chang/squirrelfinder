import React, { Component } from 'react'
import { Input, Menu, Icon, Header } from 'semantic-ui-react'


class MenuExampleSecondary extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' }
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu icon secondary size="huge">
        <Menu.Item>
          <Header as="h2" color="green">Squirrel Finder</Header>
        </Menu.Item>

        <Menu.Menu position='right'>

          <Menu.Item name="menu_instagram" href="http://instagram.com">
            <Icon name="instagram" size="large"></Icon>
          </Menu.Item>

          <Menu.Item name="menu_twitter" href="http://google.com">
            <Icon name="twitter" size="large"></Icon>
          </Menu.Item>

        </Menu.Menu>
      </Menu>
    )
  }
}

export default MenuExampleSecondary;

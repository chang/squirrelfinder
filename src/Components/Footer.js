import React from 'react'
import { Icon } from 'semantic-ui-react'

import './Footer.css';


const Footer = () => (
    <p className="footer">
        Made with <Icon color="red" name="heart"/> for
        <span role="img">🐿</span>
        by <a href="http://ericchang.me" target="_blank">@Eric</a>
    </p>
)

export default Footer;

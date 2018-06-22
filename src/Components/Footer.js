import React from 'react'
import { Icon } from 'semantic-ui-react'

import './Footer.css';
import charlotte from '../resources/images/charlotte_1.jpg';


const Footer = () => (
    <p className="footer">
        Made with <Icon color="red" name="heart"/> for 🐿️ by <a href="http://ericchang.me">Eric</a>
    </p>
)

export default Footer;

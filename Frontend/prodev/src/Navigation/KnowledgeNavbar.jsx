import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom"



export class KnowledgeNavbar extends Component {



    render() {
        return (
            <nav className="navbar">
                <ul>
                    <Link to="/tipovi-vjestina">
                        <li>Tipovi vještina</li>
                    </Link>
                    <Link to="/vjestine">
                        <li>Vještine</li>
                    </Link>
                    <Link to="tipovi-edukacija">
                        <li>Tipovi edukacija</li>
                    </Link>
                    <Link to="edukacije">
                        <li>Edukacije</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}
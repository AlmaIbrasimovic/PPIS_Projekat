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
                    <Link to="/dodavanje-vjestine">
                        <li>Dodavanje vještine</li>
                    </Link>
                    <Link to="tipovi-edukacija">
                        <li>Tipovi edukacija</li>
                    </Link>
                    <Link to="edukacije">
                        <li>Edukacije</li>
                    </Link>
                    <Link to="korisnici">
                        <li>Korisnici</li>
                    </Link>
                    <Link to="certifikati">
                        <li>Certifikati</li>
                    </Link>
                    <Link to="uposlenici">
                        <li>Uposlenici</li>
                    </Link>
                    <Link to="dobavljaci">
                        <li>Dobavljaci</li>
                    </Link>
                    <Link to="ugovori">
                        <li>Ugovori</li>
                    </Link>
                    <Link to="ocjene">
                        <li>Ocjene</li>
                    </Link>
                    <Link to="kriteriji">
                        <li>Kriteriji</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}
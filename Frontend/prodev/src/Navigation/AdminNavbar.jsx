import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom"



class AdminNavbar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <Link to="/admin/tipovi-vjestina">
                        <li>Tipovi vještina</li>
                    </Link>
                    <Link to="/admin/vjestine">
                        <li>Vještine</li>
                    </Link>
                    <Link to="/admin/dodavanje-vjestine">
                        <li>Dodavanje vještine</li>
                    </Link>
                    <Link to="/admin/tipovi-edukacija">
                        <li>Tipovi edukacija</li>
                    </Link>
                    <Link to="/admin/edukacije">
                        <li>Edukacije</li>
                    </Link>
                    <Link to="/admin/korisnici">
                        <li>Korisnici</li>
                    </Link>
                    <Link to="/admin/certifikati">
                        <li>Certifikati</li>
                    </Link>
                    <Link to="/admin/uposlenici">
                        <li>Uposlenici</li>
                    </Link>
                    <Link to="/admin/dobavljaci">
                        <li>Dobavljaci</li>
                    </Link>
                    <Link to="/admin/ugovori">
                        <li>Ugovori</li>
                    </Link>
                    <Link to="/admin/ocjene">
                        <li>Ocjene</li>
                    </Link>
                    <Link to="/admin/kriteriji">
                        <li>Kriteriji</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}

export default AdminNavbar
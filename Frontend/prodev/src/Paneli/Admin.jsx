import React from "react";
import { withRouter, Redirect } from 'react-router-dom';

import { Login, Register } from "../Login/index";
import { Korisnici, Tabela } from "../Korisnici/index";
import { Vjestine } from "../Vjestine/index";
import { Tipovi } from "../TipoviVjestina/index";
import { TipoviEdukacija } from "../TipoviEdukacija/index"
import { Edukacije } from "../Edukacije/index"
import { Uposlenici } from "../Uposlenici/index"
import AdminNavbar from '../Navigation/AdminNavbar'
import { Certifikati } from "../Certifikati/index"
import { Dobavljaci } from "../Dobavljaci/index"
import { Ugovori } from "../Ugovori/index"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { DodavanjeVjestine } from "../DodavanjeVjestine/index"
import { Ocjene } from "../Ocjene/index"
import { Kriteriji } from "../Kriteriji/index"
import DropNav from '../Navigation/DropdownNavbar'
import './style.scss'; 

class Admin extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <AdminNavbar />
                    <Route path="/admin/tipovi-vjestina" component={Tipovi} />
                    <Route path="/admin/vjestine" component={Vjestine} />
                    <Route path="/admin/dodavanje-vjestine" component={DodavanjeVjestine} />
                    <Route path="/admin/tipovi-edukacija" component={TipoviEdukacija} />
                    <Route path="/admin/edukacije" component={Edukacije} />
                    <Route path="/admin/korisnici" component={Korisnici} />
                    <Route path="/admin/certifikati" component={Certifikati} />
                    <Route path="/admin/uposlenici" component={Uposlenici} />
                    <Route path="/admin/dobavljaci" component={Dobavljaci} />
                    <Route path="/admin/ugovori" component={Ugovori} />
                    <Route path="/admin/ocjene" component={Ocjene} />
                    <Route path="/admin/kriteriji" component={Kriteriji} />
                    <Route path="/" exact component={Login} />
                </div>
                <a href="/" className = "odjavaLink">Odjava</a>
            </Router>
        )
    }
}

export default Admin
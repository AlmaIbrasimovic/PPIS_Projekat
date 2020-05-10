import React, {Component} from 'react'

export class Korisnici extends Component {
    constructor(props) {
        super (props)
        this.state = {
            Korisnici : [
                {prezime: "Čogić", ime: "Lamija", uloga: "Kupac", obrisati: false},
                {prezime: "Ibrašimović", ime: "Alma", uloga: "Kupac", obrisati: false},
                {prezime: "Karić", ime: "Zlata", uloga: "Kupac", obrisati: false},
                {prezime: "Kasum", ime: "Lejla", uloga: "Kupac", obrisati: false},
                {prezime: "Jureta", ime: "Dolores", uloga: "Kupac", obrisati: false}
            ],
            ime: '',
            prezime: '',
            uloga:''
        };
    }

    handleChange = (e, index) => {
        this.state.Korisnici[index].obrisati = true;
    }

    obrisiKorisnika = () => {
        var TEMP = [...this.state.Korisnici];
        for (var i = 0; i<TEMP.length; i++) {
            if(TEMP[i].obrisati) TEMP.splice(i, 1);
        }
        this.setState({Korisnici:TEMP})
    }

    kreirajKorisnika = () => {
        var TEMP = [...this.state.Korisnici];
        const temp = {prezime: this.state.prezime, ime: this.state.ime, uloga: this.state.uloga, obrisati: false}
        TEMP.push(temp);
        this.setState({Korisnici:TEMP})
    }
     
    prikazKorisnika() {
        return this.state.Korisnici.map((korisnik, index) => {
           const {prezime, ime, uloga, obrisati} = korisnik
           return (
              <tr key={ime}>
                 <td>{prezime}</td>
                 <td>{ime}</td>
                 <td>{uloga}</td>
                 <td>{obrisati}
                 <div className="brisanje">
                        <label>
                            <input type="checkbox"  
                            brisati={this.state.checked}
                            onChange={e => this.handleChange(e, index)}
                            />
                        </label>
                    </div>
               </td>
              </tr>
           ) 
        })
    }

    headerTabele() {
        let header = Object.keys(this.state.Korisnici[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    unosNovog = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render() {
        return (
            <div>
            <h2 id='title'>Postojeći korisnici</h2>
            <table id='korisnici'>
               <tbody>
                  <tr>{this.headerTabele()}</tr>
                  {this.prikazKorisnika()}
               </tbody>
            </table>
            <div className="footer">
                <button type="button" className="btn"  onClick={this.obrisiKorisnika}>
                    Obriši korisnika
                </button>
            </div>
            <div className="forma">
                <div className="form-grupa">
                    <label htmlFor="username">Ime:</label>
                    <input type="text"
                    name="ime"
                    value={this.state.ime} 
                    onChange={e => this.unosNovog(e)}/>
                </div>
                <div className="form-grupa">
                    <label htmlFor="username">Prezime:</label>
                    <input type="text"
                    name="prezime"
                    value={this.state.prezime} 
                    onChange={e => this.unosNovog(e)}/>
                </div>
                <div className="form-grupa">
                    <label htmlFor="username">Uloga:</label>
                    <input type="text" 
                    name="uloga"
                    value={this.state.uloga} 
                    onChange={e => this.unosNovog(e)}/>
                </div>
                <button type="button" className="btn"  onClick={this.kreirajKorisnika}>
                    Dodavanje novog korisnika
                </button>
            </div>
            </div>
        )
    }
}


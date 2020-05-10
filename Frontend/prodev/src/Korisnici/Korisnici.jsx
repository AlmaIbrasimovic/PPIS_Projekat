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
            brisati: false,
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
         </div>
        )
    }
}


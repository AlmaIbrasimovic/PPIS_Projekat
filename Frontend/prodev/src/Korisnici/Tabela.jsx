import React, {Component} from 'react'


export class Tabela extends Component {
    constructor(props) {
        super (props)
        this.state = {
            Korisnici : [
                {prezime: "Čogić", ime: "Lamija"},
                {prezime: "Ibrašimović", ime: "Alma"},
                {prezime: "Karić", ime: "Zlata"},
                {prezime: "Kasum", ime: "Lejla"},
                {prezime: "Jureta", ime: "Dolores"}
            ]
        }
    }

    prikazKorisnika() {
        return this.state.Korisnici.map((korisnik, index) => {
            const {prezime,ime } = korisnik //destructuring
           return (
              <tr key={ime}>
                 <td>{prezime}</td>
                 <td>{ime}</td>
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
            <h1 id='title'>Korisnici</h1>
            <table id='korisnici'>
               <tbody>
                  <tr>{this.headerTabele()}</tr>
                  {this.prikazKorisnika()}
               </tbody>
            </table>
         </div>
        )
    }
}


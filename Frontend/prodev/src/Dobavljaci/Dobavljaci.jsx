import React, {Component} from 'react'
import axios from 'axios'

export class Dobavljaci extends Component {
    constructor(props) {
        super (props)
        this.state = {
            Dobavljaci : [],
            Header : [
                {Ime: "", Adresa: "", Kontakt_Osoba: "", brisati: false}
            ],
            ime:'',
            adresa:'',
            kontaktOsoba:'',
            id:''
        };
    }

    handleChange = (e, index) => {
        console.log(this.state.Dobavljaci[index])
        this.state.id = this.state.Dobavljaci[index].id;;
    }
    
    componentWillMount() {
        axios.get('http://localhost:8083/suppliers')
          .then(res => {
            const Dobavljaci = res.data;
            this.setState({ Dobavljaci });
        })
    }

    obrisiDobavljaca = () => {
        axios.delete(`http://localhost:8083/suppliers/${this.state.id}`)
            .then(res => {
                var TEMP = [...this.state.Dobavljaci];
                for (var i = 0; i<TEMP.length; i++) {
                    if(TEMP[i].id === this.state.id) TEMP.splice(i, 1);
                }
                this.setState({Dobavljaci:TEMP})
                alert("Uspješno obrisan dobavljač!");
        }).catch(err => {
            console.log(err.response.data.errors)
        })
    }

    kreirajDobavljaca = () => {      
        axios.post('http://localhost:8083/suppliers', {
            adress: this.state.adresa,
            contactPeroson: this.state.kontaktOsoba,
            name: this.state.ime,
        }).then(response => {
            if (response.status === 201) alert("Dobavljač uspješno registrovan!")
          }).catch(err => {
            alert(err.response.data.errors)
        })

        var TEMP = [...this.state.Dobavljaci];
        const temp = {
            adress: this.state.adresa,
            contactPeroson: this.state.kontaktOsoba,
            name: this.state.ime,
            obrisati: false
        }

        TEMP.push(temp);
        this.setState({Dobavljaci:TEMP}) 
    }

    prikazDobavljaca() {
        return this.state.Dobavljaci.map((dobavljac, index) => {
           const {name, adress, contactPeroson} = dobavljac
           const brisati = false
           return (
              <tr key={name}>
                 <td>{name}</td>
                 <td>{adress}</td>
                 <td>{contactPeroson}</td>
                 <td>{brisati}
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
        let header = Object.keys(this.state.Header[0])
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
            <h2 id='title'>Postojeći dobavljači</h2>
            <table id='korisnici'>
               <tbody>
                  <tr>{this.headerTabele()}</tr>
                  {this.prikazDobavljaca()}
               </tbody>
            </table>
            <div className="footer">
                <button type="submit" className="btnObrisiDobavljaca" onClick={this.obrisiDobavljaca}>
                    Obriši dobavljača
                </button>
            </div>
            <form>
            <div className="formaDobavljaci">
                <h2>Unos dobavljača</h2>
                <div className="form-grupaDobavljaci">
                    <label htmlFor="ime">Ime:</label>
                    <input type="text"
                    name="ime"
                    value={this.state.ime} 
                    onChange={e => this.unosNovog(e)}/>
                </div>
                <div className="form-grupaDobavljaci">
                    <label htmlFor="adresa">Adresa:</label>
                    <input type="text"
                    name="adresa"
                    value={this.state.adresa} 
                    onChange={e => this.unosNovog(e)}/>
                </div>
                <div className="form-grupaDobavljaci">
                    <label htmlFor="kontaktOsoba">Kontakt osoba:</label>
                    <input type="text"
                    name="kontaktOsoba"
                    value={this.state.kontaktOsoba} 
                    onChange={e => this.unosNovog(e)}/>
                </div>
                <button type="submit" className="btnDodajDobavljaca"  onClick={this.kreirajDobavljaca}>
                    Dodavanje novog dobavljača
                </button>
            </div>
            </form>
            </div>
        )
    }
}


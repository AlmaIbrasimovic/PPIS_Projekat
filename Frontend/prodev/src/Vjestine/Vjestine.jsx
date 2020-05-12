import React, {Component} from 'react'

export class Vjestine extends Component {
    constructor(props) {
        super (props)
        this.state = {
            Vjestine : [
                {tip:"Razvoj softvera", vjestina: "Progamiranje u javi", obrisati: false},
                {tip:"Razvoj softvera",vjestina: "Programiranje u reactu", obrisati: false},
                {tip:"Mreže",vjestina: "Administracija mreža", obrisati: false},
                {tip:"Soft vještine",vjestina: "Prezentacijske vještine", obrisati: false}
            ],
            tip:'',
            vjestina: '',
        };
    }

    handleChange = (e, index) => {
        this.state.Vjestine[index].obrisati = true;
    }

    obrisiVjestinu = () => {
        var TEMP = [...this.state.Vjestine];
        for (var i = 0; i<TEMP.length; i++) {
            if(TEMP[i].obrisati) TEMP.splice(i, 1);
        }
        this.setState({Vjestine:TEMP})
    }

    kreirajVjestinu = () => {
        var TEMP = [...this.state.Vjestine];
        const temp = {tip:this.state.tip,vjestina: this.state.vjestina, obrisati: false}
        TEMP.push(temp);
        this.setState({Vjestine:TEMP})
    }

    prikazVjestine() {
        return this.state.Vjestine.map((vjestinaa, index) => {
           const {tip,vjestina, obrisati} = vjestinaa
           return (
              <tr key={vjestina}>
                 <td>{tip}</td>
                 <td>{vjestina}</td>
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
        let header = Object.keys(this.state.Vjestine[0])
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
            <h2 id='title'>Postojeće vještine</h2>
            <table id='vjestine'>
               <tbody>
                  <tr>{this.headerTabele()}</tr>
                  {this.prikazVjestine()}
               </tbody>
            </table>
            <div className="footer">
                <button type="button" className="btn"  onClick={this.obrisiVjestinu}>
                    Obriši vještinu
                </button>
            </div>
            <div className="forma">
                <div className="form-grupa">
                    <label htmlFor="username">Tip vještine:</label>
                    <input type="text"
                    name="tip"
                    value={this.state.tip} 
                    onChange={e => this.unosNovog(e)}/>
                </div>
                <div className="form-grupa">
                    <label htmlFor="username">Vještina:</label>
                    <input type="text"
                    name="vjestina"
                    value={this.state.vjestina}
                    onChange={e => this.unosNovog(e)}/>
                </div>
                <button type="button" className="btn"  onClick={this.kreirajVjestinu}>
                    Dodavanje nove vještine
                </button>
            </div>
            </div>
        )
    }
}


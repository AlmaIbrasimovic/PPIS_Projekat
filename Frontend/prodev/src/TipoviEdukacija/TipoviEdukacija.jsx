import React, {Component} from 'react'

export class TipoviEdukacija extends Component {
    constructor(props) {
        super (props)
        this.state = {
            TipoviEdukacija : [
                {tip:"Interna", obrisati: false},
                {tip:"Eksterna", obrisati: false},
            ],
            tip:'',
        };
    }

    handleChange = (e, index) => {
        this.state.TipoviEdukacija[index].obrisati = true;
    }

    obrisiTip = () => {
        var TEMP = [...this.state.TipoviEdukacija];
        for (var i = 0; i<TEMP.length; i++) {
            if(TEMP[i].obrisati) TEMP.splice(i, 1);
        }
        this.setState({TipoviEdukacija:TEMP})
    }

    kreirajTip = () => {
        var TEMP = [...this.state.TipoviEdukacija];
        const temp = {tip:this.state.tip, obrisati: false}
        TEMP.push(temp);
        this.setState({TipoviEdukacija:TEMP})
    }

    prikazTipova() {
        return this.state.TipoviEdukacija.map((tipovi, index) => {
           const {tip, obrisati} = tipovi
           return (
              <tr key={tip}>
                 <td>{tip}</td>
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
        let header = Object.keys(this.state.TipoviEdukacija[0])
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
            <h2 id='title'>Postojeći tipovi edukacija</h2>
            <table id='tipovi'>
               <tbody>
                  <tr>{this.headerTabele()}</tr>
                  {this.prikazTipova()}
               </tbody>
            </table>
            <div className="footer">
                <button type="button" className="btn"  onClick={this.obrisiTip}>
                    Obriši tip edukacije
                </button>
            </div>
            <div className="forma">
                <div className="form-grupa">
                    <label htmlFor="username">Tip edukacije:</label>
                    <input type="text"
                    name="tip"
                    value={this.state.tip} 
                    onChange={e => this.unosNovog(e)}/>
                </div>
                <button type="button" className="btn"  onClick={this.kreirajTip}>
                    Dodavanje novog tipa vještine
                </button>
            </div>
            </div>
        )
    }
}


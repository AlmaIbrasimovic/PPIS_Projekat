import React, {Component} from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "react-datepicker/dist/react-datepicker.css";


export class Uposlenici extends Component {
    constructor(props) {
        super (props)
        this.state = {HeaderTabele: [{Ime:'', Prezime:'', Datum_Rođenja:'', Datum_Zaposlenja:'',Edukacije:'', brisati:false}],
            vjestine:[], // Za popunjavnje tipova vjestina
            uposlenici:[], // Za prikaz uposlenika prema vještinama
            sviUposlenici:[], // Za prikaz svih uposlenika
            temp2:'', 
            tipVjestine:'', // Za odabrani tip vjestine
            idVjestine:'', // ID za odabrani tip vjestine
            ime:'',
            prezime:'',
            zaposlenje:'',
            rodjenje:'',
            edukacija:'',
            startDate: new Date(),
            startDate2: new Date(),
            edukacije:[],
            temp:'',
            id:''
        };
    }

    componentWillMount() {
        axios.get('http://localhost:8083/skills')
          .then(res => {
            var temp=[];
            for (var i=0; i<res.data.length;i++) {
                temp.push({name: `${res.data[i].name}`, value: res.data[i].name, id: res.data[i].id});
            }
            this.setState({ vjestine:temp });
        })

        axios.get('http://localhost:8083/employees')
          .then(res => {
            const sviUposlenici = res.data;
            this.setState({ sviUposlenici });
        })

        axios.get('http://localhost:8083/educations')
          .then(res => {
            var temp=[];
            for (var i=0; i<res.data.length;i++) {
                temp.push({name: res.data[i].topic, value: res.data[i].topic, id: res.data[i].id});
            }
            this.setState({ edukacije:temp });
        })
      }

    handleChange = (e, index) => {
        this.state.id = this.state.Edukacije[index].id;;
    }

    handleChangeEdukacije = (selectedOption) => {
        if (selectedOption) {
            this.setState({edukacija: selectedOption.value})
            this.setState({temp:selectedOption});
        }
    }
    handleChangeDateZaposlenja = date => {
        this.setState({
            startDate: date,
            zaposlenje: date
        });
    }

    handleChangeDateRodjenja = date => {
        this.setState({
            startDate2: date,
            rodjenje: date
        });
    }

    kreirajUposlenika = () => {
        /*
        var idUposlenika = ''
        var idVjestine = ''
        for (var i = 0; i<this.state.options.length; i++) {
            if (this.state.options[i].value === this.state.vjestina) idVjestine = this.state.options[i].id;
        }
        for (var i = 0; i<this.state.uposlenici.length; i++) {
            if (this.state.uposlenici[i].value === this.state.uposlenik) idUposlenika = this.state.uposlenici[i].id;
        }
    
        
        axios.post('http://localhost:8083/employees', {
            firstName: this.state.ime,
            lastName: this.state.prezime,
            password: this.state.password,
            dateOfEmployment: this.state.zaposlenje,
            birthDate: this.state.rodjenje,
            educations: [{
                roleId: idUloge,
            }]
        })

        var TEMP = [...this.state.Certifikati];
        const temp = {
            name: this.state.ime,
            dateOfIssue: this.state.izdavanje,
            expireDate: this.state.istek,
            employee: this.state.uposlenik,
            skill: this.state.vjestina,
            obrisati: false
        }
        TEMP.push(temp);
        this.setState({Certifikati:TEMP}) 
        alert("Certifikat uspješno registrovan!")*/
    }


    // Za pretraživanje prema vještinama
    prikaziUposlenike=()=> {
        document.getElementById("lista").innerHTML = ""
        for (var i = 0; i<this.state.vjestine.length; i++) {
            if (this.state.vjestine[i].value === this.state.tipVjestine) {
                this.state.idVjestine = this.state.vjestine[i].id;
            }
        }
        
        axios.get(`http://localhost:8083/skills/${this.state.idVjestine}/employees`)
          .then(res => {
            var temp=[];
            for (var i=0; i<res.data.length;i++) {
                temp.push({ime: `${res.data[i].firstName}`, prezime: res.data[i].lastName, value: res.data[i].name, id: res.data[i].id});               
            }
           
            this.state.uposlenici = temp.map((number)=>{ 
                const {ime, prezime} = number;
                return(<li key={ime.toString() + " " + prezime.toString()}>{ime}</li>); 
            })
        })
    
        return this.state.uposlenici.map((uposlenik) => {
            const {key} = uposlenik  
            return(document.getElementById("lista").innerHTML += '<ul>' + key + '</ul>')
         })
    }

    // Za prikaz liste uposlenika
    prikazUposlenika() {
        return this.state.sviUposlenici.map((tipov, index) => {
           const {firstName, lastName, birthDate, dateOfEmployment, educations} = tipov
           const brisati = false
           return (
              <tr key={firstName + " " + lastName}>
                 <td>{firstName}</td>
                 <td>{lastName}</td>
                 <td>{birthDate}</td>
                 <td>{dateOfEmployment}</td>
                 <td>{educations.topic}</td>
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
        let header = Object.keys(this.state.HeaderTabele[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    obrisiUposlenika = () => {
        axios.delete(`http://localhost:8083/education-types/${this.state.id}`)
        .then(res => {
            var TEMP = [...this.state.sviUposlenici];
            for (var i = 0; i<TEMP.length; i++) {
                if(TEMP[i].obrisati) TEMP.splice(i, 1);
            }
        this.setState({sviUposlenici:TEMP})
        alert("Uspješno obrisan uposlenik!");
        })
    }
    

    render() {
        return (
            <div>
            <h2 id='title'>Uposlenici</h2>
            <table id='tipovi'>
               <tbody>
                  <tr>{this.headerTabele()}</tr>
                  {this.prikazUposlenika()}
               </tbody>
            </table>
            <div className="footer">
                <button type="button" className="btn"  onClick={this.obrisiUposlenika}>
                    Obriši uposlenika
                </button>
            </div>
            <div className="forma">
                <div className="form-grupa">
                    <label htmlFor="ime">Ime uposlenika:</label>
                    <input type="text"
                    name="ime"
                    value={this.state.ime} 
                    onChange={e => this.unosNovog(e)}/>
                </div>
                <div className="form-grupa">
                    <label htmlFor="prezime">Prezime uposlenika:</label>
                    <input type="text"
                    name="prezime"
                    value={this.state.prezime} 
                    onChange={e => this.unosNovog(e)}/>
                </div>
                <div className="form-grupa">
                    <label htmlFor="rodjenje">Datum rođenja:</label>
                    <DatePicker
                        name="rodjenje"
                        selected={this.state.startDate}
                        onChange={this.handleChangeDateRodjenja}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>
                <div className="form-grupa">
                    <label htmlFor="zaposlenje">Datum zaposlenja:</label>
                    <DatePicker
                        name="zaposlenje"
                        selected={this.state.startDate}
                        onChange={this.handleChangeDateZaposlenja}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>
                <div className="form-grupa">
                    <label htmlFor="edukacija">Edukacije:</label>
                    <Dropdown options={this.state.edukacije}      
                        value={this.state.temp} 
                        onChange={(e) => {
                            this.handleChangeEdukacije(e);
                        }}
                        placeholder="Odaberite ponuđeni tip edukacije"
                    /> 
                </div>
                <button type="button" className="btn"  onClick={this.kreirajUposlenika}>
                    Dodavanje novog uposlenika
                </button>
            </div>
            <div className="forma">
                <div className="form-grupa">
                    <label htmlFor="username">Vještina:</label>
                    <Dropdown options={this.state.vjestine}      
                        value={this.state.temp2} 
                        onChange={(e) => {
                            this.handleChangeVjestine(e);
                        }}
                        placeholder="Odaberite tip vještine za pretraživanje"
                    />  
                </div>  
                <button type="button" className="btn" onClick={this.prikaziUposlenike}>
                    Pretraži uposlenike
                </button>    
                <div id="lista"></div>         
                </div>
            </div>
        )
    }
}
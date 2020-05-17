import React, {Component} from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "react-datepicker/dist/react-datepicker.css";


export class Uposlenici extends Component {
    constructor(props) {
        super (props)
        this.state = {
            vjestine:[], // Za popunjavnje tipova vjestina
            uposlenici:[],
            temp2:'', 
            tipVjestine:'', // Za odabrani tip vjestine
            idVjestine:'', // ID za odabrani tip vjestine
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
      }

    handleChange = (e, index) => {
        this.state.id = this.state.Edukacije[index].id;;
    }

    handleChangeVjestine = (selectedOption) => {

        if (selectedOption) {
            this.setState({tipVjestine:selectedOption.value});
            this.setState({temp2:selectedOption});
        }
    }

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
    
    render() {
        return (
            <div>
            <h2 id='title'>Uposlenici</h2>
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
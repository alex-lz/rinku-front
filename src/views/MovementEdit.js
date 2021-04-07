import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

const apiUrl = 'http://localhost:8083';

class MovementEdit extends Component {

  emptyItem = {
    movementId: {
      numero:0,
      fecha: ''
    },
    entregas: 0,
    cubrio: false,
    rol: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      axios.get(apiUrl + `/movement/${this.props.match.params.fec}/${this.props.match.params.id}`).then(response => response.data).then(
        (result)=>{
            this.setState({item: result})
        },
        (error)=>{
            this.setState({error})
        }
       )
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if(name == 'numero' || name == 'fecha'){
      let item = {...this.state.item};
      item['movementId'][name] = value;
      this.setState({item});

    } else {
      let item = {...this.state.item};
      item[name] = value;
      this.setState({item});

    }
    
  }

  handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    axios({
        method: (item.movementId.fecha && item.movementId.numero) ? 'put' : 'post',
        url: (item.movementId.fecha && item.movementId.numero) ? apiUrl + `/update/movement/${this.props.match.params.fec}/${this.props.match.params.id}` : apiUrl + '/register/movement',
        data: (item.movementId.fecha && item.movementId.numero) ? item : item
    })
    .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      })
    // body: JSON.stringify(item),
    this.props.history.push('/movement');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{(item.movementId.fecha && item.movementId.numero) ? 'Modificar movimiento' : 'Nuevo movimiento'}</h2>;

    return <div>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="numero">Numero</Label>
            <Input type="number" name="numero" id="numero" value={item.movementId.numero || ''}
                   onChange={this.handleChange} autoComplete="numero"/>
          </FormGroup>
          <FormGroup>
            <Label for="fecha">Fecha</Label>
            <Input type="text" name="fecha" id="fecha" value={item.movementId.fecha || ''}
                   onChange={this.handleChange} autoComplete="fecha"/>
          </FormGroup>
          <FormGroup>
            <Label for="entregas">Entregas</Label>
            <Input type="number" name="entregas" id="entregas" value={item.entregas || ''}
                   onChange={this.handleChange} autoComplete="entregas"/>
          </FormGroup>
          <FormGroup>
            <Label for="cubrio">Cubrio turno</Label>
            <Input type="select" name="cubrio" id="cubrio" value={item.cubrio || false}
                   onChange={this.handleChange} >
              <option value={null}>Elegir una opción</option>        
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </Input>       
          </FormGroup>
          <FormGroup>
            <Label for="rol">Rol</Label>
            <Input type="select" name="rol" id="rol" value={item.rol || ''}
                   onChange={this.handleChange} >
              <option value="default">Elegir rol</option>       
              <option value="Chofer">Chofer</option>
              <option value="Cargador">Cargador</option>
              <option value="Auxiliar">Auxiliar</option>
            </Input> 
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">OK</Button>{' '}
            <Button color="secondary" tag={Link} to="/movement">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(MovementEdit);
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

const apiUrl = 'http://localhost:8083';

class Sueldo extends Component {

  emptyItem = {
      numero:0,
      fecha: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      sueldo: '',
      error: null,
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  handleSubmit(event) {
    this.setState({isLoading: true});
    const {item} = this.state;

     axios.get(apiUrl + '/nomina/'+item.fecha+'/'+item.numero).then(response => response.data).then(
          (result)=>{
              this.setState({
                sueldo:result.sueldoMensual, isLoading: false
              });
          },
          (error)=>{
              this.setState({error});
          }
      )
  }

  render() {
    const {item, sueldo} = this.state;
    const title = <h2>{'Calcular el sueldo mensual'}</h2>;

    return <div>
      <Container>
        {title}
        <Form>
          <FormGroup>
            <Label for="numero">Numero</Label>
            <Input type="number" name="numero" id="numero" value={item.numero || ''}
                   onChange={this.handleChange} autoComplete="numero"/>
          </FormGroup>
          <FormGroup>
            <Label for="fecha">Fecha</Label>
            <Input type="text" name="fecha" id="fecha" value={item.fecha || ''}
                   onChange={this.handleChange} autoComplete="fecha"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" onClick={this.handleSubmit}>OK</Button>{' '}
            <Button color="secondary" tag={Link} to="/movement">Cancel</Button>
          </FormGroup>
          { sueldo !== '' ? <div><br /><h3>Sueldo</h3><br /><p>{sueldo}</p></div>:null}
          
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(Sueldo);
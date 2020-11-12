import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import axios from 'axios';

class ShoppingList extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    this.getItems()
  }

  getItems = () => {
    axios
      .get('/api/items')
      .then(({data: items}) => this.setState({items}))
  };

  createItem = (name) => {
    if (!name) return;
    axios
      .post('/api/items', {name})
      .then(response => response.data)
      .then(item => {
        this.setState(state => ({
          items: [...state.items, item]
        }));
      });
  }

  deleteItem = (id) => () => {
    axios
      .delete('/api/items/' + id)
      .then((response) => {
        if (!response.data.success) return;
        this.setState(state => ({
          items: state.items.filter(item => item.id !== id)
        }));
      });
  }

  render() {
    const { items } = this.state;
    return (
      <Container>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={() => {
            const name = prompt('Enter Item');
            this.createItem(name);
          }}
        >
          Add Item
        </Button>

        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.deleteItem(id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

export default ShoppingList;

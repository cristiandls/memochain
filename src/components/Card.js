import React, { Component } from 'react';
import '../pages/MemoGame/MemoGame.css';

const pathToCards = require.context('../images', true);

class CardView extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.matched && !this.props.imageUp) {
      this.props.onClick(this.props.id);
    }
  }

  render() {
    let imPath;
    if (this.props.imageUp) {
      imPath = this.props.image + '.jpg';
    } else {
      imPath = 'back.jpg';
    }

    let className = 'Card';
    if (this.props.matched) {
      className = className + ' Matched';
    }

    return (
      <img className={className} src={pathToCards('./' + imPath)} alt='' onClick={this.onClick} />
    );
  };
};

export default CardView;

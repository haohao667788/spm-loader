import { Component } from 'react';
import ButtonGroup from './button-group';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lis: [1, 2, 3, 4],
    }
  }

  render() {
    const { lis } = this.state;
    return (
      <div>
        <ul>
          {lis.map(function(n) {
            return <li key={n} spm-auto-click={n}>{n}</li>;
          })}
        </ul>
        <ButtonGroup spmKey="b1" />
        <ButtonGroup spmKey="b2" />
      </div>
    );
  }
}
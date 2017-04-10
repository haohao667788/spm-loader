import { Component } from 'react';

export default class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lis: [1, 2, 3, 4]
    }
  }

  render() {
    const { lis } = this.state;
    const { spm_solo } = this.props;
    return (
      <div data-spm={name}>
        <div spm-auto-click />
        <ul>
          {lis.map(function(n) {
            return <button spm-auto-click={n}>{n}</button>;
          })}
        </ul>
      </div>
    );
  }
}
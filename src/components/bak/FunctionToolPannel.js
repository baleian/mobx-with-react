import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('DataStore')
@observer
class FunctionToolPannel extends Component {
  constructor(props) {
    super(props);
    this.tempId = 'temp-' + new Date().getTime();
    this.props.reactContainer.id = this.tempId;
  }

  componentDidMount() {
    setTimeout(() => {
      document.getElementById(this.tempId).parentElement.setAttribute('style', 'width: 300px;');
    }, 0);
  }

  handleOnClickNewColumn = _ => {
    const { addColumn } = this.props.DataStore;
    addColumn(this.refNewColumnName.value);
    // this.props.api.setColumnDefs(this.props.DataStore.columns);
  };

  handleOnClickRenameColumn = _ => {
    const { renameColumn } = this.props.DataStore;
    renameColumn(this.refRenameColumnBefore.value, this.refRenameColumnAfter.value);
    this.props.api.setColumnDefs(this.props.DataStore.columns);
  };

  handleOnClickDeleteColumn = _ => {
    const { deleteColumn } = this.props.DataStore;
    deleteColumn(this.refDeleteColumn.value);
    this.props.api.setColumnDefs(this.props.DataStore.columns);
  };

  render() {
    console.log('FunctionToolPannel render');
    const { columns } = this.props.DataStore;
    return (
      <>
        <hr />
        <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
          <input ref={ref => this.refNewColumnName = ref} type="text" placeholder="New Column" />
          <button onClick={this.handleOnClickNewColumn}>Add</button>
        </div>
        <hr />
        <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
          <select ref={ref => this.refRenameColumnBefore = ref}>
            {
              columns.map((c, i) => (<option key={i} value={c}>{c}</option>))
            }
          </select>
          <input ref={ref => this.refRenameColumnAfter = ref} type="text" placeholder="Rename Column" />
          <button onClick={this.handleOnClickRenameColumn}>Rename</button>
        </div>
        <hr />
        <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
          <select ref={ref => this.refDeleteColumn = ref}>
            {
              columns.map((c, i) => (<option key={i} value={c}>{c}</option>))
            }
          </select>
          <button onClick={this.handleOnClickDeleteColumn}>Delete</button>
        </div>
        <hr />
      </>
    );
  }
}

export default FunctionToolPannel;

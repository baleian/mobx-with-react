import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import * as CsvFileReader from '../utils/CsvFileReader';

import './ImportModal.css';

@inject('DataStore')
@observer
class ImportModal extends Component {
  @observable config = {
    header: true
  };

  @action
  setConfig = (name, value) => {
    this.config[name] = value;
  };

  handleImport = () => {
    const { onClose } = this.props;
    const { setRows } = this.props.DataStore
    CsvFileReader.read(this.config).then(rows => {
      setRows(rows);
      onClose();
    });
  };

  render() {
    const { isOpened, onClose } = this.props;
    const configs = [];
    for (var k in this.config) {
      configs.push(k);
    }

    return (
      <Modal open={isOpened()} onClose={onClose}>
        <div className="ImportModal center-center">
          <FormControl>
            <FormLabel>CSV Configs</FormLabel>
            <FormGroup>
              {
                configs.map(c => (
                  <FormControlLabel key={c} label={c}
                    control={<Checkbox checked={this.config[c]} onChange={e => this.config[c] = e.target.checked} value={c} />}
                  />
                ))
              }
            </FormGroup>
          </FormControl>
          <Button className="button" variant="contained" color="primary" onClick={this.handleImport}>Import</Button>
        </div>
      </Modal>
    );
  }
}

@observer
class ImportModalButton extends Component {
  @observable _isOpened = false;

  isOpened = () => {
    return this._isOpened;
  }

  @action
  onOpen = () => {
    this._isOpened = true;
  };

  @action
  onClose = () => {
    this._isOpened = false;
  };

  render() {
    const { label, ...others } = this.props;
    return (
      <>
        <Button onClick={this.onOpen} {...others}>{label}</Button>
        <ImportModal isOpened={this.isOpened} onClose={this.onClose} />
      </>
    );
  }
}

export default ImportModal;
export { ImportModalButton };

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import * as CsvFileReader from '../utils/CsvFileReader';

import './SideBarButtons.css';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';

class CsvConfigStore {
  @observable config = {
    header: true
  };

  getConfig = (name) => {
    return this.config[name];
  };

  @action
  setConfig = (name, value) => {
    this.config[name] = value;
  };
}

const store = new CsvConfigStore();

@inject('DataStore')
@observer
class ImportModal extends Component {
  configs = ['header'];

  handleImport = () => {
    const { onClose } = this.props;
    const { setRows } = this.props.DataStore
    const csvConfigs = this.configs.reduce((prev, curr) => { prev[curr] = store.config[curr]; return prev; }, {})
    console.log('import ' + JSON.stringify(csvConfigs));
    CsvFileReader.read(csvConfigs).then(rows => {
      setRows(rows);
      onClose();
    });
  };

  render() {
    return (
      <div className="ImportModal">
        <FormControl>
          <FormLabel>CSV Configs</FormLabel>
          <FormGroup>
            {
              this.configs.map(c => (
                <FormControlLabel
                  key={c}
                  control={<Checkbox checked={store.getConfig(c)} onChange={e => store.setConfig(c, e.target.checked)} value={c} />}
                  label={c}
                />
              ))
            }
          </FormGroup>
        </FormControl>
        <Button 
          className="button" 
          variant="contained" 
          color="primary"
          onClick={this.handleImport}
        >
          Import
        </Button>
      </div>
    )
  }
}

@observer
class ExportModal extends Component {
  configs = ['header'];

  handleExport = () => {
    const { onClose } = this.props;
    const csvConfigs = this.configs.reduce((prev, curr) => { prev[curr] = store.config[curr]; return prev; }, {})
    console.log('export ' + JSON.stringify(csvConfigs));
    onClose();
  };

  render() {
    return (
      <div className="ExportModal">
        <FormControl>
          <FormLabel>CSV Configs</FormLabel>
          <FormGroup>
            {
              this.configs.map(c => (
                <FormControlLabel
                  key={c}
                  control={<Checkbox checked={store.getConfig(c)} onChange={e => store.setConfig(c, e.target.checked)} value={c} />}
                  label={c}
                />
              ))
            }
          </FormGroup>
        </FormControl>
        <Button 
          className="button" 
          variant="contained" 
          color="secondary" 
          onClick={this.handleExport}
        >
          Export
        </Button>
      </div>
    )
  }
}

@inject('DataStore')
@observer
class SideBarButtons extends Component {
  @observable isOpenedImportModal = false;
  @observable isOpenedExportModal = false;

  render() {
    return (
      <div className="SideBarButtons">
        <span>CSV Import / Export</span>
        <Grid className="container" container>
          <Grid className="item" item xs={6}>
            <Button 
              className="button" 
              variant="contained" 
              color="primary" 
              onClick={_ => this.isOpenedImportModal = true}
            >
              Import
            </Button>
          </Grid>
          <Grid className="item" item xs={6}>
            <Button 
              className="button" 
              variant="contained" 
              color="secondary"
              onClick={_ => this.isOpenedExportModal = true}
            >
              Export
            </Button>
          </Grid>
        </Grid>

        <Modal
          open={this.isOpenedImportModal}
          onClose={() => this.isOpenedImportModal = false}
        >
          <DialogContent>
            <ImportModal onClose={_ => this.isOpenedImportModal = false} />
          </DialogContent>
        </Modal>

        <Modal
          open={this.isOpenedExportModal}
          onClose={() => this.isOpenedExportModal = false}
        >
          <DialogContent>
            <ExportModal onClose={_ => this.isOpenedExportModal = false} />
          </DialogContent>
        </Modal>
      </div>
    );
  }
}

export default SideBarButtons;

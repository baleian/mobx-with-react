class DataTransaction {
  undos = [];
  redos = [];
  bufferSize = 20;

  constructor() {
    console.log('DataTransaction constructor');
  }
  
  setBufferSize = (size) => {
    this.bufferSize = size;
    this.undos = this.undos.slice(-this.bufferSize);
  };

  getCurrentState = () => {
    const len = this.undos.length;
    if (len === 0) return null;
    return this.undos[len - 1];
  };

  save = (state) => {
    this.undos.push(state);
    this.undos = this.undos.slice(-this.bufferSize);
    this.redos = [];
  };

  undo = () => {
    if (this.undos.length > 1) {
      this.redos.push(this.undos.pop());
      return this.getCurrentState();
    }
    return null;
  };

  redo = () => {
    if (this.redos.length > 0) {
      this.undos.push(this.redos.pop());
      return this.getCurrentState();
    }
    return null;
  };
}

export default DataTransaction;

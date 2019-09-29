import { observable, action } from 'mobx';

class DataTableStore {
  @observable columns = [];
  @observable rows = [
    {'id': '1', 'storeId': '', 'merchant': '아디다스', 'store': '퍼포먼스 신세계명동', 'address': '서울특별시 중구 소공로 63 신세계백화점 4층' },
    {'id': '2', 'storeId': '', 'merchant': '아디다스', 'store': '오리지널스 신세계명동', 'address': '서울특별시 중구 소공로 63 신세계백화점 4층' },
    {'id': '3', 'storeId': '', 'merchant': '아디다스', 'store': '퍼포먼스 분당', 'address': '경기도 성남시 분당구 분당로53번길 22 블루홀플라자' },
    {'id': '4', 'storeId': '', 'merchant': '아디다스', 'store': '퍼포먼스 롯데백화점분당', 'address': '경기 성남시 분당구 황새울로200번길 45' },
    {'id': '5', 'storeId': '', 'merchant': '아디다스', 'store': '퍼포먼스 NC야탑', 'address': '경기 성남시 분당구 야탑로81번길 11 뉴코아아울렛 야탑점 6층' },
    {'id': '6', 'storeId': '', 'merchant': '아디다스', 'store': '오리지널스 홍대', 'address': '서울특별시 마포구 홍익로6길 27 (동교동)' },
    {'id': '7', 'storeId': '', 'merchant': '아디다스', 'store': '오리지널스 롯데백화점분당', 'address': '경기도 성남시 분당구 황새울로200번길 45 (수내동, 롯데백화점) 4층' },
    {'id': '8', 'storeId': '', 'merchant': '아디다스', 'store': '오리지널스 롯데백화점미아', 'address': '서울 강북구 도봉로 62' },
    {'id': '9', 'storeId': '', 'merchant': '아디다스', 'store': '롯데백화점 분당점', 'address': '경기도 성남시 분당구 황새울로200번길 45 롯데백화점 5층' },
    {'id': '10', 'storeId': '', 'merchant': '아디다스', 'store': '포천', 'address': '경기도 포천시 소흘읍 호국로 280 포천패션타운 B동 1,2호' }
  ];
  // @observable lastClickedRow = null;

  constructor(root) {
    this.root = root;
  }

  @action
  load = (rows) => {
    let columns = new Set();
    rows.forEach(row => {
      for (var k in row) columns.add(k);
    });
    this.columns = [...columns].map(c => ({ field: c, headerName: c }));
    this.setRows(rows);
  };

  @action
  setRows = (rows) => {
    this.rows = rows;
    // this.lastClickedRow = null;
  };

  @action
  addColumn = column => {
    if (this.columns.map(c => c.field).indexOf(column) > -1) return;
    this.columns.push({ field: column, headerName: column });
    this.rows.forEach(r => r[column] = r[column] || '');
  };

  @action
  renameColumn = (before, after) => {
    if (before === after) return;
    if (this.columns.map(c => c.field).indexOf(before) === -1) return;
    this.columns = this.columns.map(c => {
      if (c.field === before) {
        c.field = after;
        c.headerName = after;
      }
      return c;
    });
    this.rows = this.rows.map(r => {
      r[after] = r[before];
      delete r[before];
      return r;
    });
  };

  @action 
  deleteColumn = column => {
    this.columns = this.columns.filter(c => c.field !== column);
    this.rows.forEach(r => delete r[column]);
  };

  // @action
  // onRowClick = (row) => {
  //   this.lastClickedRow = row;
  // };
}

export default DataTableStore;

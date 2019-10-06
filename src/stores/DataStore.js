import { observable, action, computed } from 'mobx';

const defaultRows = [
  { 'NO': '1', '매장명': '아디다스', '지점명': '퍼포먼스 신세계명동', '도로명주소': '서울특별시 중구 소공로 63 신세계백화점 4층' },
  { 'NO': '2', '매장명': '아디다스', '지점명': '오리지널스 신세계명동', '도로명주소': '서울특별시 중구 소공로 63 신세계백화점 4층' },
  { 'NO': '3', '매장명': '아디다스', '지점명': '퍼포먼스 분당', '도로명주소': '경기도 성남시 분당구 분당로53번길 22 블루홀플라자' },
  { 'NO': '4', '매장명': '아디다스', '지점명': '퍼포먼스 롯데백화점분당', '도로명주소': '경기 성남시 분당구 황새울로200번길 45' },
  { 'NO': '5', '매장명': '아디다스', '지점명': '퍼포먼스 NC야탑', '도로명주소': '경기 성남시 분당구 야탑로81번길 11 뉴코아아울렛 야탑점 6층' },
  { 'NO': '6', '매장명': '아디다스', '지점명': '오리지널스 홍대', '도로명주소': '서울특별시 마포구 홍익로6길 27 (동교동)' },
  { 'NO': '7', '매장명': '아디다스', '지점명': '오리지널스 롯데백화점분당', '도로명주소': '경기도 성남시 분당구 황새울로200번길 45 (수내동, 롯데백화점) 4층' },
  { 'NO': '8', '매장명': '아디다스', '지점명': '오리지널스 롯데백화점미아', '도로명주소': '서울 강북구 도봉로 62' },
  { 'NO': '9', '매장명': '아디다스', '지점명': '롯데백화점 분당점', '도로명주소': '경기도 성남시 분당구 황새울로200번길 45 롯데백화점 5층' },
  { 'NO': '10', '매장명': '아디다스', '지점명': '포천', '도로명주소': '경기도 포천시 소흘읍 호국로 280 포천패션타운 B동 1,2호' },
];

class DataStore {
  @observable rows = [];

  constructor(root) {
    this.root = root;
    this.setRows(defaultRows);
  }

  @computed
  get columns() {
    const columns = new Set();
    this.rows.forEach(row => {
      for (var k in row) columns.add(k);
    });
    return Array.from(columns).filter(c => c[0] !== '_');
  }

  @action
  setRows = rows => {
    this.rows = rows.map((r, i) => ({ '_id': i + 1, ...r }));
  };

  @action
  setColumnsValue = columns => {
    this.rows.forEach(r => {
      columns.forEach(c => {
        r[c] = r[c] || '';
      });
    });
  };

  @action
  addColumn = column => {
    if (this.columns.indexOf(column) > -1) return;
    this.rows.forEach(r => r[column] = r[column] || '');
  };
  
  @action
  renameColumn = (before, after) => {
    if (before === after) return;
    const columns = this.columns;
    if (columns.indexOf(before) === -1) return;
    columns[columns.indexOf(before)] = after;
    this.rows = this.rows.map(r => {
      r[after] = r[before];
      delete r[before];
      return r;
    });
    this.setColumnOrder(columns);
  };

  @action 
  deleteColumn = column => {
    if (this.columns.indexOf(column) === -1) return;
    this.rows.forEach(r => delete r[column]);
  };

  @action
  setColumnOrder = columns => {
    const temp = columns.reduce((prev, curr) => {
      prev[curr] = '';
      return prev;
    }, {});
    this.rows = this.rows.map(r => {
      return { ...temp, ...r };
    });
  };

  @action
  deleteRow = row => {
    this.rows = this.rows.filter(r => r !== row);
  };

  @action
  deleteRows = rows => {
    rows.forEach(r => this.deleteRow(r));
  };
}

export default DataStore;

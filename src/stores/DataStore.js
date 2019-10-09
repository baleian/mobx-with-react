import { observable, action, computed, toJS } from 'mobx';
import uuid from 'uuid/v4';

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

function checkUnique(arr) {
  const set = new Set(arr);
  return set.size === arr.length;
}

function validationColumnName(column) {
  if (column[0] === '_') {
    throw Error('column name cannot begin with "_"');
  }
  return column;
}

class DataStore {
  @observable rows = [];

  constructor(root) {
    this.root = root;
    this.setRows(defaultRows);
  }

  @action
  setRows = rows => {
    rows = rows.map((r, i) => {
      if (!r['_id']) r['_id'] = uuid();
      r['_rownum'] = i + 1;
      return r;
    });
    if (!checkUnique(rows.map(r => r['_id']))) {
      throw Error('_id column must be unique');
    }
    this.rows = rows;
  };

  @action
  addRows = rows => {
    const columns = this.columns;
    this.setRows([...this.rows, ...rows]);
    this.setColumnOrder(columns);
  };

  @action
  deleteRows = rows => {
    this.setRows(this.rows.filter(r => !rows.find(r2 => r['_id'] === r2['_id'])));
  };

  @computed
  get columns() {
    const columns = new Set();
    this.rows.forEach(row => {
      for (var k in row) columns.add(k);
    });
    return Array.from(columns).filter(c => c[0] !== '_');
  }

  @computed
  get currentRows() {
    return toJS(this.rows);
  }

  isColumn = column => {
    return this.columns.indexOf(column) !== -1;
  };

  @action
  addColumn = column => {
    column = validationColumnName(column);
    if (this.isColumn(column)) return;
    this.rows = this.rows.map(r => {
      r[column] = r[column] || '';
      return r;
    });
  };

  @action 
  deleteColumn = column => {
    column = validationColumnName(column);
    if (!this.isColumn(column)) return;
    this.rows = this.rows.map(r => {
      delete r[column];
      return r;
    });
  };
  
  @action
  renameColumn = (before, after) => {
    before = validationColumnName(before);
    after = validationColumnName(after);

    if (before === after) return;
    if (!this.isColumn(before)) return;
    
    const columns = this.columns;
    columns[columns.indexOf(before)] = after;

    this.rows = this.rows.map(r => {
      r[after] = r[before];
      delete r[before];
      return r;
    });
    this.setColumnOrder(columns);
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
}

export default DataStore;

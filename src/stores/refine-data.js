import { observable, action } from 'mobx';

class RefineDataStore {
  @observable datas = [
    {
      'id': '1',
      'merchant': '아디다스부평점',
      'store': '',
      'address': '인천광역시 부평구 부평동 대정로 66',
      'etc1': 'etc1'
    },
    {
      'id': '2',
      'merchant': '아디다스망포점',
      'store': '',
      'address': '경기도 수원시 영통구 영통2동 덕영대로 1515',
      'etc1': 'etc2'
    },
    {
      'id': '3',
      'merchant': '아디다스수원롯데몰점',
      'store': '',
      'address': '경기도 수원시 권선구 서둔동 세화로 118'
    },
    {
      'id': '4',
      'merchant': '아디다스영통OFS점',
      'store': '',
      'address': '경기도 수원시 영통구 영통동 봉영로 1576'
    },
    {
      'id': '5',
      'merchant': '아디다스키즈용인점',
      'store': '',
      'address': '경기도 용인시 기흥구 서천동 113-2'
    },
  ];

  constructor(root) {
    this.root = root;
  }
}

export default RefineDataStore;

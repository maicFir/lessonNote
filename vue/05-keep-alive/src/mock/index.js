/* eslint-disable import/prefer-default-export */

import Mock from 'mockjs';

const randomData = (len) => {
  const result = new Array(len).fill(1);
  return result.map((item, index) => ({
    id: Mock.mock('@id'),
    name: Mock.mock('@cname'),
    date: Mock.mock('@date'),
    address: Mock.mock('@city'),
    hasChildren: index % 2 === 0,
  }));
};
export const sourceDataMock = () => Mock.mock({
  list: randomData(10),
});

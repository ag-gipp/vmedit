'use strict';

function line(sign:string):string {
  return `<mrow><mo>${sign}</mo></mrow>`;
}

module.exports = {
  divide: line('÷'),
  times: line('·'),
  power: line('^'),
  sqrt: line('√'),
  partialdiff: line('∂'),
  apply: line('@'),
  subscript: line('?_'),
  superscript: line('?^')
};

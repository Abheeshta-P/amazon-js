import { formatCurrency } from "../scripts/utils/money.js";

describe('test suite : formatCurrency',()=>{
  describe('Converts cents into dollars',()=>{
    it('works with 2095',()=>{
      expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('works with 0',()=>{
      expect(formatCurrency(0)).toEqual('0.00');
    });
    it('rounds up to nearest cents',()=>{
      expect(formatCurrency(2000.5)).toEqual('20.01');
    });
  })
})
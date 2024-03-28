
import {formatCurrency} from '../scripts/util/money.js'

describe('test suite',()=>{
    it('converts cents into dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95')
    })
    it('works with zero',()=>{
        expect(formatCurrency(0)).toEqual('0.00')
    })
    it('rounds off to nearest number',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01')
    })
})
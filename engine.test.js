import test from 'node:test'; import assert from 'node:assert/strict';
import { pA,aP,pG,pF } from '../src/engine/formulas.js';
import { makeFlows,npv,annualEquivalent } from '../src/engine/cashflow.js';
import { compoundFV } from '../src/engine/interest.js';
const near=(a,b,tol=1e-6)=>assert.ok(Math.abs(a-b)<=tol,`${a} != ${b}`);

test('1 NPV',()=>{
  const f=makeFlows(7,[{from:0,to:0,amount:-100e6},{from:1,to:7,amount:-10e6},{from:3,to:7,amount:30e6}]);
  assert.deepEqual(f,[-100e6,-10e6,-10e6,20e6,20e6,20e6,20e6,20e6]);
  const indep=-100e6-10e6/1.1-10e6/1.21+20e6*((1-1.1**-5)/0.1)/1.21;
  near(npv(f,0.10),indep,1e-3); console.log('NPV =',npv(f,0.10));
});
test('2 Annual Equivalent biaya',()=>{
  const f=makeFlows(10,[{from:0,to:0,amount:-10e9},{from:1,to:4,amount:-2e9},{from:5,to:10,amount:-3e9},{from:10,to:10,amount:0.9e9}]);
  let pw=0; for(let t=0;t<=10;t++) pw+=f[t]/1.15**t;
  near(annualEquivalent(f,0.15),pw*0.15/(1-1.15**-10),1e-2); console.log('AE =',annualEquivalent(f,0.15));
});
test('3 Uniform series (nominal 18%/12 vs efektif)',()=>{
  const nom=500000*pA(0.18/12,36)+5e6; console.log('Harga (nominal)=',nom);
  const ie=1.18**(1/12)-1; const eff=500000*pA(ie,36)+5e6; console.log('Harga (efektif)=',eff);
  near(nom,500000*(1-1.015**-36)/0.015+5e6,1e-3); assert.ok(eff>nom);
});
test('4 Gradien aritmatika, mulai tahun 2',()=>{
  const i=0.09; const f=Array(9).fill(0); for(let t=2;t<=8;t++) f[t]=2.5e6+0.5e6*(t-2);
  assert.equal(f[8],5.5e6); assert.equal(f[1],0);
  const direct=npv(f,i); const formula=(2.5e6*pA(i,7)+0.5e6*pG(i,7))*pF(i,1);
  near(direct,formula,1e-4); console.log('PW =',direct);
});
test('5 Bunga majemuk',()=>{
  const P=67073235,r=0.07;
  for(const [m,exp] of [[2,P*1.035**2],[3,P*(1+r/3)**3],[12,P*(1+r/12)**12],[1,P*1.07]])
    near(compoundFV(P,r,m,1),exp,1e-4);
});
test('i=0 dan validasi',()=>{ assert.equal(pA(0,5),5); assert.equal(aP(0,4),0.25); assert.throws(()=>pA(0.1,-1)); });

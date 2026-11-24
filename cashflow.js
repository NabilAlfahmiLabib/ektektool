import { pF, aP } from './formulas.js';
// flows: array indeks = tahun (0..N), nilai bertanda (+ masuk, - keluar)
export const makeFlows=(N,items)=>{ const f=Array(N+1).fill(0);
  for(const {from,to,amount} of items){ if(from<0||to>N||from>to) throw new Error('periode tidak valid'); for(let t=from;t<=to;t++) f[t]+=amount; } return f; };
export const npv=(flows,i)=>flows.reduce((s,c,t)=>s+c*pF(i,t),0);
export const pwTable=(flows,i)=>flows.map((c,t)=>({t,cash:c,factor:pF(i,t),pw:c*pF(i,t)}));
export const annualEquivalent=(flows,i)=>npv(flows,i)*aP(i,flows.length-1);

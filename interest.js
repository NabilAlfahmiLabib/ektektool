export const simpleFV=(P,i,n)=>P*(1+i*n);
export const compoundFV=(P,nominal,m,years)=>{ if(m<=0) throw new Error('m harus > 0'); return P*(1+nominal/m)**(m*years); };
export const effectiveRate=(nominal,m)=>(1+nominal/m)**m-1;
// Konversi tarif efektif periode besar -> periode kecil (k sub-periode)
export const subPeriodRate=(effective,k)=>(1+effective)**(1/k)-1;

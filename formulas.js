// Faktor bunga diskret (akhir periode). i dalam desimal (0.10 = 10%).
const chk=(i,n)=>{ if(!Number.isFinite(i)||i<=-1) throw new Error('i tidak valid'); if(!Number.isInteger(n)||n<0) throw new Error('n harus bilangan bulat >= 0'); };
export const fP = (i,n)=>{chk(i,n);return (1+i)**n;};            // F/P
export const pF = (i,n)=>{chk(i,n);return 1/(1+i)**n;};          // P/F
export const pA = (i,n)=>{chk(i,n);return i===0?n:(1-(1+i)**-n)/i;}; // P/A
export const aP = (i,n)=>{chk(i,n);if(n===0)throw new Error('n harus > 0');return i===0?1/n:i/(1-(1+i)**-n);}; // A/P
export const fA = (i,n)=>{chk(i,n);return i===0?n:((1+i)**n-1)/i;};  // F/A
export const aF = (i,n)=>{chk(i,n);if(n===0)throw new Error('n harus > 0');return i===0?1/n:i/((1+i)**n-1);}; // A/F
// Gradien aritmatika: gradien pertama muncul di periode 2 (nol di periode 1).
export const pG = (i,n)=>{chk(i,n);return i===0?n*(n-1)/2:((1+i)**n-i*n-1)/(i*i*(1+i)**n);}; // P/G
export const aG = (i,n)=>{chk(i,n);if(n===0)throw new Error('n harus > 0');return i===0?(n-1)/2:1/i-n/((1+i)**n-1);}; // A/G
export const fG = (i,n)=>pG(i,n)*fP(i,n);

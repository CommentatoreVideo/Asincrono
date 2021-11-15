class Linea {
  constructor(pt1,pt2,mostra=true) {
    this.x1=pt1.x;
    this.y1=pt1.y;
    this.x2=pt2.x;
    this.y2=pt2.y;
    this.daMostrare=mostra;
    this.colore=[255,255,255];
  }
  mostra() {
    if(!this.daMostrare) return;
    stroke(...this.colore);
    strokeWeight(1);
    line(this.x1,this.y1,this.x2,this.y2);
  }
  calcolaPuntoInLinea(t,id,mostra) {
    //(1-t)*P1+t*P2
    const x=(1-t)*this.x1+t*this.x2;
    const y=(1-t)*this.y1+t*this.y2;
    return new Punto(x,y,id,[],mostra);
  }
}
class Punto {
  constructor(x,y,id,collegamento,mostra=true) {
    this.x=x;
    this.y=y;
    this.r=10;
    this.id=id;
    this.collegamento=collegamento;
    this.daMostrare=mostra;
    this.pressed=false;
  }
  
  mostra() {
    if(!this.daMostrare) return;
    stroke(...(this.pressed?[255,0,0]:[255]));
    strokeWeight(2);
    fill(0);
    ellipse(this.x,this.y,this.r,this.r);
  }
  premuto() {
    const distanza=dist(this.x,this.y,mouseX,mouseY);
    if(distanza>this.r) return false;
    return true;
  }
}
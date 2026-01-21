import { Controller } from "@hotwired/stimulus"

const CULTURES_DATA = {
  soja: { label: "Soja", ve: 70, x: 2.0, mt: 15 },
  milho: { label: "Milho", ve: 60, x: 2.0, mt: 15 },
  cafe: { label: "Café", ve: 70, x: 2.5, mt: 10 },
  pastagem: { label: "Pastagem", ve: 50, x: 1.0, mt: 30 },
  eucalipto: { label: "Eucalipto", ve: 40, x: 0.5, mt: 40 }
}

export default class extends Controller {
  static targets = [ 
    "area", "cultureSelect", "saturacaoResult", 
    "neutralizacaoResult", "saturacaoValue", "neutralizacaoValue",
    "productList", "productTemplate" 
  ]

  connect() {
    this.populateCultures();
  }

  populateCultures() {
    if (!this.hasCultureSelectTarget) return;
    const select = this.cultureSelectTarget;
    select.innerHTML = '<option value="">Selecione a cultura...</option>';
    
    Object.keys(CULTURES_DATA).sort().forEach(key => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = CULTURES_DATA[key].label;
      select.appendChild(option);
    });
  }

  applyCulture() {
    const key = this.cultureSelectTarget.value;
    const data = CULTURES_DATA[key];
    if (!data) return;

    // Inputs ocultos ou visíveis via data-param-name
    const setVal = (name, val) => {
      const input = this.element.querySelector(`[data-param-name="${name}"]`);
      if (input) input.value = val;
    }

    setVal("Ve", data.ve);
    setVal("X", data.x);
    setVal("mt", data.mt);
    
    this.calculate();
  }

  getY(pRem) {
    if (pRem <= 4) return 4.0;
    if (pRem <= 10) return 3.0;
    if (pRem <= 20) return 2.0;
    if (pRem <= 30) return 1.0;
    return 0.0;
  }

  calculate() {
    const vals = {};
    this.element.querySelectorAll('[data-param-name]').forEach(i => {
      vals[i.dataset.paramName] = parseFloat(i.value) || 0;
    });

    const { PRNT=100, CTC=0, Ve=0, Va=0, Al=0, Ca=0, Mg=0, X=0 } = vals;
    const Y = this.getY(vals["P-rem"]);

    // NC = (Ve - Va) * CTC / PRNT
    const ncSat = (PRNT > 0) ? Math.max(0, ((Ve - Va) * CTC) / PRNT) : 0;
    
    // NC Alumínio = [Y*Al + (X - (Ca+Mg))] * (100/PRNT)
    const ncAl  = PRNT > 0 ? Math.max(0, ((Y * Al) + (X - (Ca + Mg))) * (100 / PRNT)) : 0;
    
    this.saturacaoResultTarget.textContent = ncSat.toFixed(2);
    this.neutralizacaoResultTarget.textContent = ncAl.toFixed(2);

    this.saturacaoValueTarget.value = ncSat;
    this.neutralizacaoValueTarget.value = ncAl;

    this.updateCalculations();
  }

  addProduct(e) {
    if (e) e.preventDefault();
    const content = this.productTemplateTarget.content.cloneNode(true);
    this.productListTarget.appendChild(content);
    this.updateCalculations();
  }

  removeProduct(e) {
    e.preventDefault();
    e.target.closest('.product-row').remove();
    this.updateCalculations();
  }

  updateCalculations() {
    const ncSatBase = parseFloat(this.saturacaoValueTarget.value) || 0;
    const ncAlBase = parseFloat(this.neutralizacaoValueTarget.value) || 0;
    const area = parseFloat(this.areaTarget.value) || 0;
    
    const inputPrntBase = this.element.querySelector('[data-param-name="PRNT"]');
    const basePrnt = inputPrntBase ? (parseFloat(inputPrntBase.value) || 100) : 100;

    this.productListTarget.querySelectorAll('.product-row').forEach(row => {
      const pPrnt = parseFloat(row.querySelector('.product-prnt').value) || 100;
      const pPrice = parseFloat(row.querySelector('.product-price').value) || 0;
      const pFreight = parseFloat(row.querySelector('.product-freight').value) || 0;
      const costPerTon = pPrice + pFreight;

      const tonsHaSat = pPrnt > 0 ? (ncSatBase * basePrnt) / pPrnt : 0;
      const tonsHaAl = pPrnt > 0 ? (ncAlBase * basePrnt) / pPrnt : 0;

      const totalCostSat = tonsHaSat * area * costPerTon;
      const totalCostAl = tonsHaAl * area * costPerTon;

      const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
      row.querySelector('.row-total-sat').textContent = formatter.format(totalCostSat);
      row.querySelector('.row-total-al').textContent = formatter.format(totalCostAl);
    });
  }
}

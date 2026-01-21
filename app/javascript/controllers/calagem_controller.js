import { Controller } from "@hotwired/stimulus"

const CULTURES_DATA = {
  arroz_sequeiro: { label: "Arroz de Sequeiro", ve: 50, x: 2.0, mt: 25 },
  arroz_irrigado: { label: "Arroz Irrigado", ve: 50, x: 2.0, mt: 25 },
  cafe: { label: "Café", ve: 60, x: 3.5, mt: 25 },
  milho_sorgo: { label: "Milho e Sorgo", va: 50, x: 2.0, mt: 15 },
  trigo: { label: "Trigo", ve: 50, x: 2, mt: 50 },
  feijao_soja_adubos_verdes: { label: "Feijão, soja e adubos verdes", ve: 50, x: 2, mt: 15 }
}

export default class extends Controller {
  static targets = [ 
    "input", "area", "cultureSelect", "saturacaoResult", 
    "neutralizacaoResult", "finalRecommendation", "productList", "productTemplate" 
  ]

  connect() {
    console.log("Calagem Controller Loaded")
    this.populateCultures()
  }

  // --- 1. Culture Logic ---
  populateCultures() {
    if (!this.hasCultureSelectTarget) return
    
    const select = this.cultureSelectTarget
    select.innerHTML = '<option value="">Selecione a cultura...</option>'
    
    Object.keys(CULTURES_DATA).sort().forEach(key => {
      const option = document.createElement("option")
      option.value = key
      option.textContent = CULTURES_DATA[key].label
      select.appendChild(option)
    })
  }

  applyCulture() {
    const key = this.cultureSelectTarget.value
    const data = CULTURES_DATA[key]
    if (!data) return

    // Helper to find input by data-param-name and set value
    const setVal = (name, val) => {
      const input = this.inputTargets.find(i => i.dataset.paramName === name)
      if (input) input.value = val
    }

    setVal("Va", data.va)
    setVal("X", data.x)
    setVal("mt", data.mt)
    
    this.calculate()
  }

  // --- 2. Calculation Logic ---
  getY(pRem) {
    if (pRem <= 4) return 4.0;
    if (pRem <= 10) return 3.0;
    if (pRem <= 20) return 2.0;
    if (pRem <= 30) return 1.0;
    return 0.0;
  }

  calculate() {
    const vals = {}
    this.inputTargets.forEach(i => {
      vals[i.dataset.paramName] = parseFloat(i.value) || 0
    })

    const Y = this.getY(vals["P-rem"])
    const { PRNT=100, CTC=0, Va=0, Al=0, Ca=0, Mg=0, X=0 } = vals

    // Calculate current saturation (Ve)
    const ve = CTC > 0 ? ((Ca + Mg) / CTC) * 100 : 0

    // NC Formulas
    const ncSat = PRNT > 0 ? Math.max(0, ((Va - ve) * CTC) / PRNT) : 0
    const ncAl  = PRNT > 0 ? Math.max(0, ((Y * Al) + (X - (Ca + Mg))) * (100 / PRNT)) : 0
    
    const higherNeed = Math.max(ncSat, ncAl)

    this.saturacaoResultTarget.textContent = ncSat.toFixed(2)
    this.neutralizacaoResultTarget.textContent = ncAl.toFixed(2)
    this.finalRecommendationTarget.value = higherNeed

    this.updateCalculations()
  }

  // --- 3. Product Comparison Logic ---
  addProduct(e) {
    if (e) e.preventDefault()
    const content = this.productTemplateTarget.content.cloneNode(true)
    this.productListTarget.appendChild(content)
    this.updateCalculations()
  }

  removeProduct(e) {
    e.preventDefault()
    e.target.closest('.product-row').remove()
    this.updateCalculations()
  }

  updateCalculations() {
    const baseNeed = parseFloat(this.finalRecommendationTarget.value) || 0
    const area = parseFloat(this.areaTarget.value) || 0
    
    const prntInput = this.inputTargets.find(i => i.dataset.paramName === 'PRNT')
    const basePrnt = prntInput ? (parseFloat(prntInput.value) || 100) : 100

    this.productListTarget.querySelectorAll('.product-row').forEach(row => {
      const pPrnt = parseFloat(row.querySelector('.product-prnt').value) || 100
      const pPrice = parseFloat(row.querySelector('.product-price').value) || 0
      const pFreight = parseFloat(row.querySelector('.product-freight').value) || 0

      const tonsPerHa = pPrnt > 0 ? (baseNeed * basePrnt) / pPrnt : 0
      const totalTons = tonsPerHa * area
      const totalCost = totalTons * (pPrice + pFreight)

      row.querySelector('.row-total').textContent = totalCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      row.querySelector('.row-tons').textContent = `${totalTons.toFixed(2)} t total`
    })
  }
}

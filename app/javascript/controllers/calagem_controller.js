import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "input", "area", "saturacaoResult", "neutralizacaoResult",
    "finalRecommendation", "productList", "productTemplate"
  ]

  // --- 1. SOIL ANALYSIS LOGIC ---
  calculate() {
    try {
      // Create a clean object of all numeric inputs
      const vals = {}
      this.inputTargets.forEach(i => {
        const name = i.dataset.paramName
        vals[name] = parseFloat(i.value) || 0
      })

      // Explicitly define variables to avoid ReferenceErrors
      const prntAnalise = vals["PRNT"] || 100
      const ctc = vals["CTC"] || 0
      const ve  = vals["Ve"] || 0
      const va  = vals["Va"] || 0
      
      // Aluminum variables
      const yFator = vals["Y"] || 0
      const al     = vals["Al"] || 0
      const xFator = vals["X"] || 0
      const ca     = vals["Ca"] || 0
      const mg     = vals["Mg"] || 0

      // Formula 1: Saturação por Bases (Target - Current) * CTC / PRNT
      // Example: ((70 - 30) * 7.3) / 100 = 2.92
      const ncSat = prntAnalise > 0 ? Math.max(0, ((va - ve) * ctc) / prntAnalise) : 0

      // Formula 2: Alumínio e Ca+Mg
      const ncAl = prntAnalise > 0 ? Math.max(0, ((yFator * al) + (xFator - (ca + mg))) * (100 / prntAnalise)) : 0

      const higherNeed = Math.max(ncSat, ncAl)

      // Update UI results (Left Side)
      this.saturacaoResultTarget.textContent = ncSat.toFixed(2)
      this.neutralizacaoResultTarget.textContent = ncAl.toFixed(2)

      // Update the hidden bridge value for the Costs calculation
      if (this.hasFinalRecommendationTarget) {
        this.finalRecommendationTarget.value = higherNeed
      }

      // ALWAYS trigger the cost update whenever soil values change
      this.updateCalculations()
      
    } catch (error) {
      console.error("Calculation Error:", error)
    }
  }

  // --- 2. COSTS LOGIC ---
  addProduct() {
    const content = this.productTemplateTarget.content.cloneNode(true)
    this.productListTarget.appendChild(content)
    // After adding a row, calculate it immediately
    this.updateCalculations()
  }

  updateCalculations() {
    try {
      // Get the base recommendation (e.g., 2.92) and total area
      const baseNeed = parseFloat(this.finalRecommendationTarget.value) || 0
      const area = parseFloat(this.areaTarget.value) || 0

      // Get the PRNT from the soil analysis to use as the baseline
      const prntInput = this.inputTargets.find(i => i.dataset.paramName === 'PRNT')
      const basePrnt = prntInput ? (parseFloat(prntInput.value) || 100) : 100

      // Loop through every row in the comparison table
      this.productListTarget.querySelectorAll('.product-row').forEach(row => {
        const pPrnt    = parseFloat(row.querySelector('.product-prnt').value) || 100
        const pPrice   = parseFloat(row.querySelector('.product-price').value) || 0
        const pFreight = parseFloat(row.querySelector('.product-freight').value) || 0

        // MATH: (Dose required * Baseline PRNT) / Product's actual PRNT
        const tonsPerHa = pPrnt > 0 ? (baseNeed * basePrnt) / pPrnt : 0
        const totalTons = tonsPerHa * area
        const totalCost = totalTons * (pPrice + pFreight)

        // Update Row UI
        row.querySelector('.row-total').textContent = totalCost.toLocaleString('pt-BR', { 
          style: 'currency', 
          currency: 'BRL' 
        })
        row.querySelector('.row-tons').textContent = `${totalTons.toFixed(2)} t total`
      })
    } catch (error) {
      console.error("Costs Update Error:", error)
    }
  }

  // --- 3. UTILITIES ---
  removeProduct(e) {
    e.target.closest('.product-row').remove()
    this.updateCalculations()
  }

  reset() {
    this.inputTargets.forEach(i => i.value = i.dataset.paramName === 'PRNT' ? 100 : "")
    if (this.hasAreaTarget) this.areaTarget.value = ""
    this.saturacaoResultTarget.textContent = "0.00"
    this.neutralizacaoResultTarget.textContent = "0.00"
    if (this.hasFinalRecommendationTarget) this.finalRecommendationTarget.value = 0
    this.updateCalculations()
  }

  printReport() {
    window.print()
  }
}

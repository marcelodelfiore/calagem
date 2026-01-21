import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["productList", "productTemplate", "emptyState"]

  connect() { this.toggleEmptyState() }

  addProduct() {
    const content = this.productTemplateTarget.content.cloneNode(true)
    this.productListTarget.appendChild(content)
    this.toggleEmptyState()
    this.updateCalculations()
  }

  updateCalculations() {
    const bridge = document.getElementById("calagem-bridge")
    const baseNeed = parseFloat(bridge?.value) || 0
    const area = parseFloat(document.querySelector('[data-calagem-target="area"]')?.value) || 0
    const basePrnt = parseFloat(document.querySelector('[data-param-name="PRNT"]')?.value) || 100

    this.productListTarget.querySelectorAll('.product-row').forEach(row => {
      const prnt = parseFloat(row.querySelector('.product-prnt').value) || 100
      const price = parseFloat(row.querySelector('.product-price').value) || 0
      const freight = parseFloat(row.querySelector('.product-freight').value) || 0

      const tonsPerHa = (baseNeed * basePrnt) / prnt
      const totalTons = tonsPerHa * area
      const totalCost = totalTons * (price + freight)

      row.querySelector('.row-total').textContent = totalCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      row.querySelector('.row-tons').textContent = `${totalTons.toFixed(2)} t total`
    })
  }

  removeProduct(e) {
    e.target.closest('.product-row').remove()
    this.toggleEmptyState()
    this.updateCalculations()
  }

  toggleEmptyState() {
    const count = this.productListTarget.querySelectorAll('.product-row').length
    if (this.hasEmptyStateTarget) this.emptyStateTarget.classList.toggle('hidden', count > 0)
  }

  printReport() { window.print() }
}

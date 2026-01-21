import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "saturacaoResult", "neutralizacaoResult"]

  calculate() {
    // 1. Gather all values into an object
    const values = {}
    this.inputTargets.forEach(input => {
      values[input.dataset.paramName] = parseFloat(input.value) || 0
    })

    // 2. Example calculation logic
    // Formula for Saturação: NC = (V2 - V1) * CTC / PRNT
    const v2 = 70 // Typical target value
    const v1 = values.Ve
    const ctc = values.CTC
    const prnt = values.PRNT || 100

    const saturacaoValue = ((v2 - v1) * ctc) / prnt
    const neutralizacaoValue = (values.Al * 2)

    // 3. Update the UI
    this.saturacaoResultTarget.textContent = saturacaoValue.toFixed(2)
    this.neutralizacaoResultTarget.textContent = neutralizacaoValue.toFixed(2)

    // Optional: Add a nice animation effect
    this.saturacaoResultTarget.classList.add('animate-pulse')
    setTimeout(() => this.saturacaoResultTarget.classList.remove('animate-pulse'), 500)
  }

  // The reset form logic
  reset() {
    // 1. Clear all input fields
    this.inputTargets.forEach(input => {
      input.value = ""
    })

    // 2. Reset the displayed results to 0.00
    this.saturacaoResultTarget.textContent = "0.00"
    this.neutralizacaoResultTarget.textContent = "0.00"

    // 3. Optional: Focus on the first input to start over
    if (this.inputTargets.length > 0) {
      this.inputTargets[0].focus()
    }
  }
}

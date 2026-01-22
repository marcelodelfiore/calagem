import { Controller } from "@hotwired/stimulus"

const CULTURES_DATA = {
  arroz_sequeiro: { label: "Arroz sequeiro", mt: 25, x: 2.0, ve: 50, obs: "Não utilizar mais de 4 t/ha de calcário por aplicação" },
  arroz_irrigado: { label: "Arroz irrigado", mt: 25, x: 2.0, ve: 50, obs: "Não utilizar mais de 4 t/ha de calcário por aplicação" },
  milho: { label: "Milho", mt: 15, x: 2.0, ve: 50, obs: "Não utilizar mais de 6 t/ha de calcário por aplicação" },
  sorgo: { label: "Sorgo", mt: 15, x: 2.0, ve: 50, obs: "Não utilizar mais de 6 t/ha de calcário por aplicação" },
  trigo: { label: "Trigo (sequeiro ou irrigado)", mt: 15, x: 2.0, ve: 50, obs: "Não utilizar mais de 4 t/ha de calcário por aplicação" },
  feijao: { label: "Feijão", mt: 20, x: 2.0, ve: 50, obs: "" },
  soja: { label: "Soja", mt: 20, x: 2.0, ve: 50, obs: "" },
  adubos_verdes: { label: "Adubos verdes", mt: 20, x: 2.0, ve: 50, obs: "" },
  outras_leguminosas: { label: "Outras leguminosas", mt: 20, x: 2.0, ve: 50, obs: "" },
  amendoim: { label: "Amendoim", mt: 5, x: 3.0, ve: 70, obs: "" },
  mamona: { label: "Mamona", mt: 10, x: 2.5, ve: 60, obs: "" },
  algodao: { label: "Algodão", mt: 10, x: 2.5, ve: 60, obs: "Utilizar calcário contendo magnésio" },
  crotalaria_juncea: { label: "Crotalária-juncea", mt: 5, x: 3.0, ve: 70, obs: "" },
  formio: { label: "Fórmio", mt: 15, x: 2.0, ve: 50, obs: "" },
  rami: { label: "Rami", mt: 5, x: 3.5, ve: 70, obs: "" },
  sisal: { label: "Sisal", mt: 5, x: 3.0, ve: 70, obs: "Exigente em magnésio" },
  cafe: { label: "Café", mt: 25, x: 3.5, ve: 60, obs: "" },
  cana_de_acucar: { label: "Cana-de-açúcar", mt: 30, x: 3.5, ve: 60, obs: "Não utilizar mais de 10 t/ha de calcário por aplicação" },
  cha: { label: "Chá", mt: 25, x: 1.5, ve: 40, obs: "" },
  batata: { label: "Batata", mt: 15, x: 2.0, ve: 60, obs: "Exigentes em magnésio" },
  batata_doce: { label: "Batata-doce", mt: 15, x: 2.0, ve: 60, obs: "Exigentes em magnésio" },
  mandioca: { label: "Mandioca", mt: 30, x: 1.0, ve: 40, obs: "Não utilizar mais de 2 t/ha de calcário por aplicação" },
  cara: { label: "Cará", mt: 10, x: 2.5, ve: 60, obs: "Exigentes em magnésio" },
  inhame: { label: "Inhame", mt: 10, x: 2.5, ve: 60, obs: "Exigentes em magnésio" },
  cacau: { label: "Cacau", mt: 15, x: 2.0, ve: 50, obs: "" },
  seringueira: { label: "Seringueira", mt: 25, x: 1.0, ve: 50, obs: "Não utilizar mais de 2 t/ha de calcário por aplicação. Usar calcário dolomítico" },
  pimenta_do_reino: { label: "Pimenta-do-reino", mt: 5, x: 3.0, ve: 70, obs: "" },
  chuchu: { label: "Chuchu", mt: 5, x: 3.5, ve: 80, obs: "Exigentes em magnésio" },
  melao: { label: "Melão", mt: 5, x: 3.5, ve: 80, obs: "Exigentes em magnésio" },
  abobora: { label: "Abóbora", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  moranga: { label: "Moranga", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  pepino: { label: "Pepino", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  melancia: { label: "Melancia", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  alface: { label: "Alface", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  almeirao: { label: "Almeirão", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  acelga: { label: "Acelga", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  chicoria: { label: "Chicória", mt: 5, x: 3.0, ve: 70, obs: "" },
  escarola: { label: "Escarola", mt: 5, x: 3.0, ve: 70, obs: "" },
  milho_verde: { label: "Milho verde", mt: 10, x: 2.5, ve: 60, obs: "" },
  tomate: { label: "Tomate", mt: 5, x: 3.0, ve: 70, obs: "Para tomate utilizar relação Ca/Mg = 1" },
  pimentao: { label: "Pimentão", mt: 5, x: 3.0, ve: 70, obs: "" },
  pimenta_hortalica: { label: "Pimenta", mt: 5, x: 3.0, ve: 70, obs: "" },
  berinjela: { label: "Berinjela", mt: 5, x: 3.0, ve: 70, obs: "" },
  jilo: { label: "Jiló", mt: 5, x: 3.0, ve: 70, obs: "" },
  beterraba: { label: "Beterraba", mt: 5, x: 3.0, ve: 65, obs: "Exigentes em magnésio" },
  cenoura: { label: "Cenoura", mt: 5, x: 3.0, ve: 65, obs: "Exigentes em magnésio" },
  mandioquinha: { label: "Mandioquinha", mt: 5, x: 3.0, ve: 65, obs: "Exigentes em magnésio" },
  nabo: { label: "Nabo", mt: 5, x: 3.0, ve: 65, obs: "Exigentes em magnésio" },
  rabanete: { label: "Rabanete", mt: 5, x: 3.0, ve: 65, obs: "Exigentes em magnésio" },
  repolho: { label: "Repolho", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  couve_flor: { label: "Couve-flor", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  brocolis: { label: "Brócolos", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  couve: { label: "Couve", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  alho: { label: "Alho", mt: 5, x: 3.0, ve: 70, obs: "" },
  cebola: { label: "Cebola", mt: 5, x: 3.0, ve: 70, obs: "" },
  quiabo: { label: "Quiabo", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  ervilha: { label: "Ervilha", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  feijao_de_vagem: { label: "Feijão de vagem", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  morango: { label: "Morango", mt: 5, x: 3.0, ve: 70, obs: "Exigentes em magnésio" },
  abacaxizeiro: { label: "Abacaxizeiro", mt: 15, x: 2.0, ve: 50, obs: "" },
  banana: { label: "Banana", mt: 10, x: 3.0, ve: 70, obs: "Utilizar calcário dolomítico" },
  citros: { label: "Citros", mt: 5, x: 3.0, ve: 70, obs: "" },
  mamoeiro: { label: "Mamoeiro", mt: 5, x: 3.5, ve: 80, obs: "" },
  abacateiro: { label: "Abacateiro", mt: 10, x: 2.5, ve: 60, obs: "" },
  mangueira: { label: "Mangueira", mt: 10, x: 2.5, ve: 60, obs: "" },
  maracujazeiro: { label: "Maracujazeiro", mt: 5, x: 3.0, ve: 70, obs: "" },
  goiabeira: { label: "Goiabeira", mt: 5, x: 3.0, ve: 70, obs: "" },
  ameixa: { label: "Ameixa", mt: 5, x: 3.0, ve: 70, obs: "" },
  nespera: { label: "Nêspera", mt: 5, x: 3.0, ve: 70, obs: "" },
  pessego: { label: "Pêssego", mt: 5, x: 3.0, ve: 70, obs: "" },
  nectarina: { label: "Nectarina", mt: 5, x: 3.0, ve: 70, obs: "" },
  figo: { label: "Figo", mt: 5, x: 3.0, ve: 70, obs: "" },
  maca: { label: "Maçã", mt: 5, x: 3.0, ve: 70, obs: "" },
  marmelo: { label: "Marmelo", mt: 5, x: 3.0, ve: 70, obs: "" },
  pera: { label: "Pêra", mt: 5, x: 3.0, ve: 70, obs: "" },
  caqui: { label: "Caqui", mt: 5, x: 3.0, ve: 70, obs: "" },
  macadamia: { label: "Macadâmia", mt: 5, x: 3.0, ve: 70, obs: "" },
  peca: { label: "Pecã", mt: 5, x: 3.0, ve: 70, obs: "" },
  videira: { label: "Videira", mt: 5, x: 3.5, ve: 80, obs: "" },
  fumo: { label: "Fumo", mt: 15, x: 2.0, ve: 50, obs: "Teor de magnésio mínimo de 0,5 cmolc/dm³" },
  capim_limao: { label: "Capim-limão", mt: 25, x: 1.5, ve: 40, obs: "" },
  citronela: { label: "Citronela", mt: 25, x: 1.5, ve: 40, obs: "" },
  palmarosa: { label: "Palmarosa", mt: 25, x: 1.5, ve: 40, obs: "" },
  menta: { label: "Menta", mt: 10, x: 2.5, ve: 60, obs: "" },
  piretro: { label: "Piretro", mt: 10, x: 2.5, ve: 60, obs: "" },
  vetiver: { label: "Vetiver", mt: 10, x: 2.5, ve: 60, obs: "" },
  camomila: { label: "Camomila", mt: 5, x: 3.0, ve: 70, obs: "" },
  eucalipto: { label: "Eucalipto", mt: 30, x: 1.5, ve: 40, obs: "" },
  funcho: { label: "Funcho", mt: 15, x: 2.0, ve: 50, obs: "" },
  herbaceas_ornamentais: { label: "Herbáceas (ornamentais)", mt: 10, x: 2.5, ve: 60, obs: "" },
  arbustivas_ornamentais: { label: "Arbustivas (ornamentais)", mt: 10, x: 2.0, ve: 60, obs: "" },
  arboreas_ornamentais: { label: "Arbóreas (ornamentais)", mt: 15, x: 2.0, ve: 50, obs: "" },
  azalea: { label: "Azálea", mt: 20, x: 2.0, ve: 50, obs: "Não utilizar mais de 2 t/ha de calcário por aplicação" },
  cravo: { label: "Cravo", mt: 5, x: 3.0, ve: 70, obs: "" },
  gladiolos: { label: "Gladíolos", mt: 5, x: 3.0, ve: 70, obs: "" },
  roseira: { label: "Roseira", mt: 5, x: 3.0, ve: 70, obs: "" },
  crisantemo: { label: "Crisântemo", mt: 5, x: 3.0, ve: 70, obs: "" },
  gramados: { label: "Gramados", mt: 5, x: 3.0, ve: 70, obs: "" },
  plantio_de_eucalipto: { label: "Plantios de Eucalipto", mt: 45, x: 1.0, ve: 30, obs: "" },
  pastagem_leguminosas_grupo1: { label: "Pastagens (Leguminosas): Leucena; Soja-perene; Alfafa; Siratro", mt: 15, x: 2.5, ve: 60, obs: "Estabelecimento: 0-20cm. Formada: 0-5cm." },
  pastagem_leguminosas_grupo2: { label: "Pastagens (Leguminosas): Kudzu; Calopogônio; Centrocema; Estilosantes; Guandu; Amendoim forrageiro; Galáxia", mt: 25, x: 1.0, ve: 40, obs: "Estabelecimento: 0-20cm. Formada: 0-5cm." },
  pastagem_gramineas_grupo1: { label: "Pastagens (Gramíneas): Grupo do Capim Elefante; Coast-cross; Tiftons; Colonião; Vencedor; Centenário; Tobiatã; Quicuio; Pangola; Transvala", mt: 20, x: 2.0, ve: 50, obs: "Estabelecimento: 0-20cm. Formada: 0-5cm." },
  pastagem_gramineas_grupo2: { label: "Pastagens (Gramíneas): Green-pânico; Tanzânia; Mombaça; Braquiária/Marandu; Estrelas; Jaraguá", mt: 25, x: 1.5, ve: 45, obs: "Estabelecimento: 0-20cm. Formada: 0-5cm." },
  pastagem_gramineas_grupo3: { label: "Pastagens (Gramíneas): Braquiária IPEAN; Braquiária australiana; Quicuio da Amazônia; Andropogon; Gordura; Grama batatais", mt: 30, x: 1.0, ve: 40, obs: "Estabelecimento: 0-20cm. Formada: 0-5cm." }
};

export default class extends Controller {
  static targets = [
    "area", "cultureSelect", "saturacaoResult",
    "neutralizacaoResult", "saturacaoValue", "neutralizacaoValue",
    "productList", "productTemplate", "currentRatioDisplay"
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

    const currentRatio = Mg > 0 ? (Ca / Mg) : 0;
    if (this.hasCurrentRatioDisplayTarget) {
      this.currentRatioDisplayTarget.value = currentRatio.toFixed(2);
      this.currentRatioDisplayTarget.className = `w-full bg-slate-800/50 border-slate-700/50 rounded-xl text-sm p-3 font-black outline-none transition-colors ${
        currentRatio >= 3 && currentRatio <= 4 ? "text-emerald-500" : "text-amber-500"
      }`;
    }

    const Y = this.getY(vals["P-rem"]);
    const ncSat = (PRNT > 0) ? Math.max(0, ((Ve - Va) * CTC) / PRNT) : 0;
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
    
    const soilCa = parseFloat(this.element.querySelector('[data-param-name="Ca"]').value) || 0;
    const soilMg = parseFloat(this.element.querySelector('[data-param-name="Mg"]').value) || 0;

    this.productListTarget.querySelectorAll('.product-row').forEach(row => {
      const pPrnt = parseFloat(row.querySelector('.product-prnt').value) || 100;
      const pPrice = parseFloat(row.querySelector('.product-price').value) || 0;
      const pFreight = parseFloat(row.querySelector('.product-freight').value) || 0;
      const pCaO = parseFloat(row.querySelector('.product-cao').value) || 0;
      const pMgO = parseFloat(row.querySelector('.product-mgo').value) || 0;

      const costPerTon = pPrice + pFreight;
      const inputPrntBase = this.element.querySelector('[data-param-name="PRNT"]');
      const basePrnt = inputPrntBase ? (parseFloat(inputPrntBase.value) || 100) : 100;
      
      const tonsHaSat = pPrnt > 0 ? (ncSatBase * basePrnt) / pPrnt : 0;
      const tonsHaAl = pPrnt > 0 ? (ncAlBase * basePrnt) / pPrnt : 0;

      const calcRatio = (tons) => {
        const addedCa = (tons * (pCaO / 100)) * 0.357;
        const addedMg = (tons * (pMgO / 100)) * 0.496;
        return (soilMg + addedMg) > 0 ? (soilCa + addedCa) / (soilMg + addedMg) : 0;
      };

      const ratioSat = calcRatio(tonsHaSat);
      const ratioAl = calcRatio(tonsHaAl);

      const updateUI = (selector, val) => {
        const el = row.querySelector(selector);
        el.textContent = val.toFixed(2);
        el.className = `${selector.replace('.', '')} font-black text-sm ${val >= 3 && val <= 4 ? 'text-emerald-500' : 'text-amber-500'}`;
      };

      updateUI('.row-ratio-sat', ratioSat);
      updateUI('.row-ratio-al', ratioAl);

      const totalCostSat = tonsHaSat * area * costPerTon;
      const totalCostAl = tonsHaAl * area * costPerTon;

      const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
      row.querySelector('.row-total-sat').textContent = formatter.format(totalCostSat);
      row.querySelector('.row-total-al').textContent = formatter.format(totalCostAl);
    });
  }
}

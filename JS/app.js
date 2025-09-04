import { db } from "./firebase-config.js";
import { ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

//Referência do banco
const compradoresRef = ref(db, "compradores_soro");

//Renderiza a tabela
function renderizar(snapshot) {
  const tbody = document.querySelector('#tabela tbody');
  tbody.innerHTML = '';
  snapshot.forEach(child => {
    const item = child.val();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.litros}</td>
      <td>${item.tipo}</td>
      <td><button class="excluir" onclick="remover('${child.key}')">Excluir</button></td>
    `;
    tbody.appendChild(tr);
  });
}

//Adiciona registro
window.adicionar = function() {
  const nome = document.querySelector('#nome').value.trim();
  const litros = document.querySelector('#litros').value.trim();
  const tipo = document.querySelector('#tipo').value;

  if (!nome || !litros) {
    alert('Preencha nome e litros.');
    return;
  }

  push(compradoresRef, { nome, litros, tipo });
  document.querySelector('#nome').value = '';
  document.querySelector('#litros').value = '';
};

//Remove registro
window.remover = function(key) {
  if (confirm('Deseja realmente excluir este registro?')) {
    remove(ref(db, `compradores_soro/${key}`));
  }
};

//Filtra os registros
window.filtrar = function() {
  const termo = document.querySelector('#search').value.toLowerCase();
  onValue(compradoresRef, snapshot => {
    const tbody = document.querySelector('#tabela tbody');
    tbody.innerHTML = '';
    snapshot.forEach(child => {
      const item = child.val();
      if (item.nome.toLowerCase().includes(termo)) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.nome}</td>
          <td>${item.litros}</td>
          <td>${item.tipo}</td>
          <td><button class="excluir" onclick="remover('${child.key}')">Excluir</button></td>
        `;
        tbody.appendChild(tr);
      }
    });
  }, { onlyOnce: true });
};

//Exporta (JSON)
window.exportar = function() {
  onValue(compradoresRef, snapshot => {
    const data = [];
    snapshot.forEach(child => data.push(child.val()));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relacoes_compradores_soro.json';
    a.click();
    URL.revokeObjectURL(url);
  }, { onlyOnce: true });
};

//Importar (JSON)
document.querySelector('#importFile').addEventListener('change', function() {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        imported.forEach(item => push(compradoresRef, item));
        alert('Dados importados com sucesso!');
      } else {
        alert('Arquivo inválido.');
      }
    } catch (err) {
      alert('Erro ao importar arquivo.');
    }
  };
  reader.readAsText(file);
});

//Apaga tudo
window.apagarTudo = function() {
  if (confirm('Tem certeza que deseja apagar todos os dados?')) {
    remove(compradoresRef);
  }
};

//Atualiza a tabela em tempo real
onValue(compradoresRef, renderizar);
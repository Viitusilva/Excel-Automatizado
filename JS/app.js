//Referência do banco
const compradoresRef = ref;

//Renderiza tabela
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

//Adicionar registro
function adicionar() {
  const nome = document.querySelector('#nome').value.trim();
  const litros = document.querySelector('#litros').value.trim();
  const tipo = document.querySelector('#tipo').value;

  if (!nome || !litros) {
    alert('Preencha nome e litros.');
    return;
  }

  compradoresRef.push({ nome, litros, tipo });
  document.querySelector('#nome').value = '';
  document.querySelector('#litros').value = '';
}

//Remover registro
function remover(key) {
  if (confirm('Deseja realmente excluir este registro?')) {
    compradoresRef.child(key).remove();
  }
}

//Filtrar registros
function filtrar() {
  const termo = document.querySelector('#search').value.toLowerCase();
  ref.once("value", snapshot => {
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
  });
}

//Exportar JSON
function exportar() {
  ref.once("value", snapshot => {
    const data = [];
    snapshot.forEach(child => data.push(child.val()));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relacoes_compradores_soro.json';
    a.click();
    URL.revokeObjectURL(url);
  });
}

//Importar JSON
document.querySelector('#importFile').addEventListener('change', function() {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        imported.forEach(item => compradoresRef.push(item));
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

//Apagar tudo
function apagarTudo() {
  if (confirm('Tem certeza que deseja apagar todos os dados?')) {
    compradoresRef.remove();
  }
}

//Atualiza a tabela em tempo real
ref.on("value", renderizar);
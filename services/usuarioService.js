import AsyncStorage from '@react-native-async-storage/async-storage';

export async function buscarUsuario(nomeUsuario) {
  const dados = await AsyncStorage.getItem(nomeUsuario);
  if (dados === null) {
    return null;
  }
  return JSON.parse(dados);
}

export async function criarUsuario(nomeUsuario, senha) {
  const existente = await buscarUsuario(nomeUsuario);
  if (existente !== null) {
    throw new Error('Este nome já está sendo utilizado!');
  }

  const perfil = { usuario: nomeUsuario, senha };
  await AsyncStorage.setItem(nomeUsuario, JSON.stringify(perfil));
  return perfil;
}


export async function autenticar(nomeUsuario, senha) {
  const perfil = await buscarUsuario(nomeUsuario);

  if (perfil === null) {
    return { sucesso: false, motivo: 'USUARIO_NAO_ENCONTRADO' };
  }
  if (perfil.senha !== senha) {
    return { sucesso: false, motivo: 'SENHA_INCORRETA' };
  }
  return { sucesso: true, perfil };
}
export const cores = {
  fundo: '#d0f6fe',    
  branco: '#ffffff',
  cartao: '#ffffff',

  azulEscuro: '#014a7d',  
  azulClaro: '#61d1ea',   
  azulAccent: '#b3dde6',
  azulInput: '#eaf7fa',    
  bordaInput: '#c5d3d6',

  textoEscuro: '#151515',
  textoCinza: '#414040',
  textoPreto: '#232424',

  sucesso: 'green',
  sucessoClaro: '#60d06e',
  erro: 'red',
  erroForte: '#d93838',
  erroClaro: '#fd5353',
};

export const fontes = {
  padrao: 'sans-serif',
};


export const sombraPadrao = {
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 5,
};

export const sombraTopo = {
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 5,
};

export const inputPadrao = {
  height: 45,
  borderRadius: 8,
  width: '90%',
  paddingHorizontal: 10,
  backgroundColor: cores.azulInput,
  borderWidth: 1,
  borderColor: cores.bordaInput,
  fontSize: 16,
  fontFamily: fontes.padrao,
  ...sombraPadrao,
};

export const botaoPrimario = {
  borderRadius: 20,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: cores.azulClaro,
  ...sombraPadrao,
};
const datosCertificadosMock = [
  { lote: "Lote #22345", producto: "Producto X", fecha: "12/05/2023", estado: "Activo" },
  { lote: "Lote #22346", producto: "Producto Y", fecha: "14/05/2023", estado: "Activo" },
  { lote: "Lote #22347", producto: "Producto Z", fecha: "15/05/2023", estado: "Completado" },
];

const getTodos = async () => {
  await new Promise((res) => setTimeout(res, 500)); // Simula delay
  return datosCertificadosMock;
};

const generarCertificado = async (lote) => {
  const nuevo = {
    lote: lote,
    producto: "Producto Certificado",
    fecha: new Date().toLocaleDateString("es-ES"),
    estado: "Activo",
  };

  await new Promise((res) => setTimeout(res, 500));
  return { ok: true, dato: nuevo };
};

export default {
  getTodos,
  generarCertificado,
};

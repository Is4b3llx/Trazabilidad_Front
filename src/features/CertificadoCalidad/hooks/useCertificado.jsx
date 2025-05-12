import certificadoService from "../services/certificadoCalidad.service";
import { useState } from "react";

const useCertificado = () => {
  const [certificados, setCertificados] = useState([]);
  const [lotesSinCertificado, setLotesSinCertificado] = useState(["Lote #22348", "Lote #22349"]);

  const obtenerCertificados = async () => {
    const data = await certificadoService.getTodos();
    setCertificados(data);
  };

  const generarCertificado = async (lote) => {
    const resultado = await certificadoService.generarCertificado(lote);
    if (resultado.ok) {
      setCertificados((prev) => [...prev, resultado.dato]);
      setLotesSinCertificado((prev) => prev.filter(l => l !== lote));
    }
    return resultado.ok;
  };

  return {
    certificados,
    lotesSinCertificado,
    obtenerCertificados,
    generarCertificado,
  };
};

export default useCertificado;

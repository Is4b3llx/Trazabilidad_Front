import React, { useEffect, useState } from "react";
import useCertificado from "../hooks/useCertificado";

const CertificadoGenerador = () => {
  const [filtro, setFiltro] = useState("Todos");
  const [selectedLote, setSelectedLote] = useState("");

  const {
    certificados,
    lotesSinCertificado,
    obtenerCertificados,
    generarCertificado,
  } = useCertificado();

  useEffect(() => {
    obtenerCertificados();
  }, []);

  const handleGenerar = async () => {
    if (!selectedLote) return;
    const ok = await generarCertificado(selectedLote);
    if (ok) {
      alert(`Certificado generado para ${selectedLote}`);
      setSelectedLote("");
    } else {
      alert("Ocurrió un error al generar el certificado");
    }
  };

  const filtrarCertificados = () => {
    if (filtro === "Recientes") return certificados.slice(-1);
    if (filtro === "Archivados") return certificados.filter(cert => cert.estado === "Completado");
    return certificados;
  };

  return (
    <>
      <div className="certificado-generador-box">
        <h3>Seleccionar Lote</h3>
        <p>Elija un lote de la lista para generar un certificado asociado</p>
        <button className="btn-registrar" onClick={handleGenerar} disabled={!selectedLote}>
          Generar Certificado
        </button>
      </div>

      <div style={{ margin: "1rem 0" }}>
        <label>Lotes sin certificado</label>
        <select value={selectedLote} onChange={(e) => setSelectedLote(e.target.value)}>
          <option value="">Seleccione un lote</option>
          {lotesSinCertificado.map((lote, idx) => (
            <option key={idx} value={lote}>{lote}</option>
          ))}
        </select>
      </div>

      <h2>Certificados Generados</h2>
      <div className="cert-tabs">
        {["Todos", "Recientes", "Archivados"].map(tab => (
          <button
            key={tab}
            className={`cert-tab ${filtro === tab ? "active" : ""}`}
            onClick={() => setFiltro(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Lote</th>
            <th>Producto</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrarCertificados().map((cert, idx) => (
            <tr key={idx}>
              <td>{cert.lote}</td>
              <td>{cert.producto}</td>
              <td>{cert.fecha}</td>
              <td>{cert.estado}</td>
              <td>
                <button title="Ver">👁️</button>
                <button title="Descargar" style={{ marginLeft: "0.5rem" }}>⬇️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CertificadoGenerador;

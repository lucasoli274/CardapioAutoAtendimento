import React, { createContext, useState, useContext } from "react";

const OpcaoSelecionadaContext = createContext();

export const useOpcaoSelecionada = () => {
  return useContext(OpcaoSelecionadaContext);
};

export const OpcaoSelecionadaProvider = ({ children }) => {
  const [templosSelecionado, setTemplosSelecionado] = useState(false);
  const [eventosSelecionado, setEventosSelecionado] = useState(false);
  const [pratosSelecionado, setPratosSelecionado] = useState(false);
  const [surpresaSelecionado, setSurpresaSelecionado] = useState(false);

  return (
    <OpcaoSelecionadaContext.Provider
      value={{
        templosSelecionado,
        setTemplosSelecionado,
        eventosSelecionado,
        setEventosSelecionado,
        pratosSelecionado,
        setPratosSelecionado,
        surpresaSelecionado,
        setSurpresaSelecionado,
      }}
    >
      {children}
    </OpcaoSelecionadaContext.Provider>
  );
};

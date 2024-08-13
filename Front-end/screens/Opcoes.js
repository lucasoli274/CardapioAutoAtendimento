import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useOpcaoSelecionada } from "../src/context/OpcaoSelecionada";
import axios from "axios";

const Opcoes = ({ navigation }) => {
  const {
    templosSelecionado,
    setTemplosSelecionado,
    eventosSelecionado,
    setEventosSelecionado,
    pratosSelecionado,
    setPratosSelecionado,
    surpresaSelecionado,
    setSurpresaSelecionado,
  } = useOpcaoSelecionada();

  const [templos, setTemplos] = useState([]);
  const [pratos, setPratos] = useState([]);
  const [eventos, setEventos] = useState([]);

  const [bgTemplos, setBgTemplos] = useState("#E8E8E8");
  const [bgPratos, setBgPratos] = useState("#E8E8E8");
  const [bgEventos, setBgEventos] = useState("#E8E8E8");
  const [bgSurpresa, setBgSurpresa] = useState("#E8E8E8");

  useEffect(() => {
    if (templosSelecionado) {
      setBgTemplos("#D9DBDA");
    } else {
      setBgTemplos("#E8E8E8");
    }
  }, [templosSelecionado]);

  useEffect(() => {
    if (pratosSelecionado) {
      setBgPratos("#D9DBDA");
    } else {
      setBgPratos("#E8E8E8");
    }
  }, [pratosSelecionado]);

  useEffect(() => {
    if (eventosSelecionado) {
      setBgEventos("#D9DBDA");
    } else {
      setBgEventos("#E8E8E8");
    }
  }, [eventosSelecionado]);

  useEffect(() => {
    if (surpresaSelecionado) {
      setBgSurpresa("#D9DBDA");
    } else {
      setBgSurpresa("#E8E8E8");
    }
  }, [surpresaSelecionado]);

  const getTemplos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/curiosidade/templos"
      );
      setTemplos(response.data);
      await Promise.all(
        response.data.map((curiosidade) => getImagem(curiosidade))
      );
    } catch (error) {
      console.error("Erro ao recuperar templos:", error);
    }
  };

  const getPratos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/curiosidade/pratos"
      );
      setPratos(response.data);
      await Promise.all(
        response.data.map((curiosidade) => getImagem(curiosidade))
      );
    } catch (error) {
      console.error("Erro ao recuperar pratos:", error);
    }
  };

  const getEventos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/curiosidade/eventos"
      );
      setEventos(response.data);
      await Promise.all(
        response.data.map((curiosidade) => getImagem(curiosidade))
      );
    } catch (error) {
      console.error("Erro ao recuperar eventos:", error);
    }
  };

  useEffect(() => {
    getTemplos();
    getEventos();
    getPratos();
  }, []);

  const btnTemplos = () => {
    setTemplosSelecionado(true);
    setEventosSelecionado(false);
    setPratosSelecionado(false);
    setSurpresaSelecionado(false);
  };

  const btnEventos = () => {
    setTemplosSelecionado(false);
    setEventosSelecionado(true);
    setPratosSelecionado(false);
    setSurpresaSelecionado(false);
  };

  const btnPratos = () => {
    setTemplosSelecionado(false);
    setEventosSelecionado(false);
    setPratosSelecionado(true);
    setSurpresaSelecionado(false);
  };

  const btnSurpresa = () => {
    setTemplosSelecionado(false);
    setEventosSelecionado(false);
    setPratosSelecionado(false);
    setSurpresaSelecionado(true);
  };

  const [imageData, setImageData] = useState({});

  const getImagem = async (curiosidade) => {
    try {
      const response = await fetch(
        `http://localhost:8080/curiosidade/imagem/${curiosidade.nomeImagem}`
      );
      if (!response.ok) {
        throw new Error("Erro ao recuperar a imagem");
      }

      const imageBlob = await response.blob();
      const imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageBlob);
      });

      setImageData((prevData) => ({
        ...prevData,
        [curiosidade.id]: imageBase64,
      }));
    } catch (error) {
      console.error("Erro ao recuperar a imagem:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.base}>
        <Image
          source={require("../assets/eua-rapazes.png")}
          style={{ width: "27.5%", height: "15%" }}
        />
        <View style={styles.viewMae}>
          <ScrollView
            style={styles.scrollViewEsquerda}
            contentContainerStyle={{ alignItems: "center" }}
            showsVerticalScrollIndicator={false}
          >
            <Pressable
              style={{ ...styles.btn, backgroundColor: bgTemplos }}
              onPress={btnTemplos}
            >
              <Image
                source={require("../assets/templos.png")}
                style={styles.imgBtn}
              />
              <Text style={{ fontSize: RFValue(12) }}>Templos</Text>
            </Pressable>
            <Pressable
              style={{ ...styles.btn, backgroundColor: bgPratos }}
              onPress={btnPratos}
            >
              <Image
                source={require("../assets/pratos-tipicos.png")}
                style={styles.imgBtn}
              />
              <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>
                Pratos típicos
              </Text>
            </Pressable>
            <Pressable
              style={{ ...styles.btn, backgroundColor: bgEventos }}
              onPress={btnEventos}
            >
              <Image
                source={require("../assets/eventos-tradicionais.png")}
                style={styles.imgBtn}
              />
              <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>
                Eventos tradicionais
              </Text>
            </Pressable>
            <Pressable
              style={{ ...styles.btn, backgroundColor: bgSurpresa }}
              onPress={btnSurpresa}
            >
              <Image
                source={require("../assets/combo-surpresa.png")}
                style={styles.imgBtn}
              />
              <Text
                style={{
                  fontSize: RFValue(12),
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Combo surpresa
              </Text>
            </Pressable>
          </ScrollView>
          <ScrollView
            style={styles.scrollViewDireita}
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            showsVerticalScrollIndicator={false}
          >
            {templosSelecionado &&
              templos.map((curiosidade, index) => (
                <Pressable
                  key={index}
                  style={styles.btnOpcao}
                  onPress={() =>
                    navigation.navigate("Curiosidade", {
                      curiosidade: curiosidade,
                    })
                  }
                >
                  <Text style={styles.txtOpcao}>{curiosidade.titulo}</Text>
                  {imageData[curiosidade.id] && (
                    <Image
                      source={{ uri: imageData[curiosidade.id] }}
                      style={{
                        ...styles.imgBtnOpcao,
                        borderRadius: 10,
                        borderWidth: 2,
                      }}
                    />
                  )}
                </Pressable>
              ))}
            {pratosSelecionado &&
              pratos.map((curiosidade, index) => (
                <Pressable
                  key={index}
                  style={styles.btnOpcao}
                  onPress={() =>
                    navigation.navigate("Curiosidade", {
                      curiosidade: curiosidade,
                    })
                  }
                >
                  <Text style={styles.txtOpcao}>{curiosidade.titulo}</Text>
                  {imageData[curiosidade.id] && (
                    <Image
                      source={{ uri: imageData[curiosidade.id] }}
                      style={styles.imgBtnOpcao}
                    />
                  )}
                </Pressable>
              ))}
            {eventosSelecionado &&
              eventos.map((curiosidade, index) => (
                <Pressable
                  key={index}
                  style={styles.btnOpcao}
                  onPress={() =>
                    navigation.navigate("Curiosidade", {
                      curiosidade: curiosidade,
                    })
                  }
                >
                  <Text style={styles.txtOpcao}>{curiosidade.titulo}</Text>
                  {imageData[curiosidade.id] && (
                    <Image
                      source={{ uri: imageData[curiosidade.id] }}
                      style={{
                        ...styles.imgBtnOpcao,
                        borderRadius: 10,
                        borderWidth: 2,
                        width: "70%",
                      }}
                    />
                  )}
                </Pressable>
              ))}
            {surpresaSelecionado && (
              <Pressable
                style={styles.btnSurpresa}
                onPress={() => navigation.navigate("Combo surpresa")}
              >
                <Text
                  style={{
                    fontSize: RFValue(14),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Combo surpresa
                </Text>
                <Image
                  source={require("../assets/combo-surpresa.png")}
                  style={{ width: "30%", height: "50%" }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: RFValue(12),
                    marginTop: 10,
                  }}
                >
                  Em dúvida do que escolher? Selecione essa opção para ser
                  surpreendido com curiosidades sobre um Templo, uma comida
                  típica e um evento tradicional aleatórios 📦!
                </Text>
              </Pressable>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
    padding: 20,
  },
  base: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  viewMae: {
    width: "80%",
    height: "85%",
    flexDirection: "row",
  },
  scrollViewEsquerda: {
    height: "100%",
    width: "25%",
    borderRightWidth: 2,
    padding: 10,
  },
  scrollViewDireita: {
    height: "100%",
    width: "75%",
    padding: 10,
  },
  btn: {
    width: "90%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgBtn: {
    height: "60%",
    width: "50%",
  },
  viewBtns: {
    flexDirection: "row",
    width: "75%",
    height: "40%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btnOpcao: {
    width: "45%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgBtnOpcao: {
    height: "80%",
    width: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txtOpcao: {
    fontSize: RFValue(12),
    textAlign: "center",
  },
  btnSurpresa: {
    height: 450,
    width: "94%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    margin: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Opcoes;

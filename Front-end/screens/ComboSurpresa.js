import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable, Modal } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const ComboSurpresa = ({ navigation }) => {
  const [curiosidades, setCuriosidades] = useState({
    templo: {},
    prato: {},
    evento: {},
  });
  const [imageData, setImageData] = useState({});
  const [curiosidadeAtiva, setCuriosidadeAtiva] = useState("templo");

  useEffect(() => {
    const fetchCuriosidades = async () => {
      await getTemplo();
      await getPrato();
      await getEvento();
    };
    fetchCuriosidades();
  }, []);

  const getTemplo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/curiosidade/templos/random"
      );
      const templo = response.data;
      setCuriosidades((prev) => ({ ...prev, templo }));
      getImagem(templo);
    } catch (error) {
      console.error("Erro ao recuperar templos:", error);
    }
  };

  const getPrato = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/curiosidade/pratos/random"
      );
      const prato = response.data;
      setCuriosidades((prev) => ({ ...prev, prato }));
      getImagem(prato);
    } catch (error) {
      console.error("Erro ao recuperar pratos:", error);
    }
  };

  const getEvento = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/curiosidade/eventos/random"
      );
      const evento = response.data;
      setCuriosidades((prev) => ({ ...prev, evento }));
      getImagem(evento);
    } catch (error) {
      console.error("Erro ao recuperar eventos:", error);
    }
  };

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

  const [imagemTelaInteira, setImagemTelaInteira] = useState(false);

  const toggleImagemTelaInteira = () => {
    setImagemTelaInteira(!imagemTelaInteira);
  };

  const curiosidade = curiosidades[curiosidadeAtiva];

  return (
    <View style={styles.container}>
      <View style={styles.base}>
        <Image
          source={require("../assets/eua-rapazes.png")}
          style={{ width: "27.5%", height: "15%" }}
        />
        <View style={styles.card}>
          <Pressable
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={() => navigation.navigate("Menu")}
          >
            <FontAwesome name="check" size={RFValue(16)} color={"gray"} />
          </Pressable>
          <Pressable
            style={{ position: "absolute", top: 10, left: 10 }}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome
              name="chevron-left"
              size={RFValue(16)}
              color={"gray"}
            />
          </Pressable>

          <Text
            style={{
              fontSize: RFValue(18),
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            {curiosidade.titulo}
          </Text>
          <Pressable style={styles.img} onPress={toggleImagemTelaInteira}>
            <Image
              source={{ uri: imageData[curiosidade.id] }}
              style={{ height: "100%", width: "100%", borderRadius: 20 }}
            />
          </Pressable>
          <Text
            style={{
              fontSize: RFValue(14),
              textAlign: "center",
              marginTop: 10,
            }}
          >
            {curiosidade.informacao}
          </Text>
          <View style={styles.navigation}>
            <Pressable onPress={() => setCuriosidadeAtiva("templo")}>
              <Text style={{ fontSize: RFValue(14), fontWeight: 'bold', margin: 5 }}>1</Text>
            </Pressable>
            <Pressable onPress={() => setCuriosidadeAtiva("prato")}>
              <Text style={{ fontSize: RFValue(14), fontWeight: 'bold', margin: 5 }}>2</Text>
            </Pressable>
            <Pressable onPress={() => setCuriosidadeAtiva("evento")}>
              <Text style={{ fontSize: RFValue(14), fontWeight: 'bold', margin: 5 }}>3</Text>
            </Pressable>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={imagemTelaInteira}
          onRequestClose={() => {
            setImagemTelaInteira(!imagemTelaInteira);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                onPress={toggleImagemTelaInteira}
                style={{ position: "absolute", top: 10, left: 20, zIndex: 2 }}
              >
                <FontAwesome name="times" size={RFValue(18)} color={"white"} />
              </Pressable>
              <Image
                source={{ uri: imageData[curiosidade.id] }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
          </View>
        </Modal>
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
  card: {
    width: "80%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9DBDA",
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: "50%",
    height: "60%",
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    height: "95%",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
  },
  navigation: {
    flexDirection: "row",
    position: 'absolute',
    right: 10,
    bottom: 10
  },
});

export default ComboSurpresa;

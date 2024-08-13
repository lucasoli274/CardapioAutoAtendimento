import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable, Modal } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome } from "@expo/vector-icons";

const CuriosidadesTela = ({ navigation, route }) => {
  const { curiosidade } = route.params;

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const getImage = async () => {
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

        setImageData(imageBase64);
      } catch (error) {
        console.error("Erro ao recuperar a imagem:", error);
      }
    };

    getImage();
  }, []);

  const [imagemTelaInteira, setImagemTelaInteira] = useState(false);

  const toggleImagemTelaInteira = () => {
    setImagemTelaInteira(!imagemTelaInteira);
  };

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
              source={{ uri: imageData }}
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
              <Pressable onPress={toggleImagemTelaInteira} style={{position: 'absolute', top: 10, left: 20, zIndex: 2}}>
                <FontAwesome name="times" size={RFValue(18)} color={'white'} />
              </Pressable>
              <Image
                source={{ uri: imageData }}
                style={{ width: '100%', height: '100%' }}
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
    height: '95%',
    width: '95%',
    alignItems: "center",
    justifyContent: 'center',
  },
});

export default CuriosidadesTela;

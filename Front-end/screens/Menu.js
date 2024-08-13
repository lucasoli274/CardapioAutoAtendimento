import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useOpcaoSelecionada } from "../src/context/OpcaoSelecionada";

const Menu = ({ navigation }) => {
  const { setTemplosSelecionado, setEventosSelecionado, setPratosSelecionado, setSurpresaSelecionado } = useOpcaoSelecionada();

  const btnTemplos = () => {
    setTemplosSelecionado(true);
    setEventosSelecionado(false);
    setPratosSelecionado(false);
    setSurpresaSelecionado(false);
    navigation.navigate("Opções");
  };

  const btnEventos = () => {
    setTemplosSelecionado(false);
    setEventosSelecionado(true);
    setPratosSelecionado(false);
    setSurpresaSelecionado(false);
    navigation.navigate("Opções");
  };

  const btnPratos = () => {
    setTemplosSelecionado(false);
    setEventosSelecionado(false);
    setPratosSelecionado(true);
    setSurpresaSelecionado(false);
    navigation.navigate("Opções");
  };

  return (
    <View style={styles.container}>
      <View style={styles.base}>
        <Image
          source={require("../assets/eua-rapazes.png")}
          style={{ width: '55%', height: '30%' }}
        />
        <Text style={{fontSize: RFValue(14), marginBottom: 20}}>Escolha uma opção para iniciar:</Text>
        <View style={styles.viewBtns}>
          <Pressable style={styles.btn} onPress={btnTemplos}>
            <Image
              source={require("../assets/templos.png")}
              style={styles.imgBtn}
            />
            <Text style={{fontSize: RFValue(14)}}>Templos</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={btnPratos}>
            <Image
              source={require("../assets/pratos-tipicos.png")}
              style={styles.imgBtn}
            />
            <Text style={{fontSize: RFValue(14)}}>Pratos típicos</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={btnEventos}>
            <Image
              source={require("../assets/eventos-tradicionais.png")}
              style={styles.imgBtn}
            />
            <Text style={{fontSize: RFValue(14)}}>Eventos tradicionais</Text>
          </Pressable>
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
  btn: {
    width: '30%',
    height: '98%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
    height: "70%",
    width: "70%",
  },
  viewBtns: {
    flexDirection: "row",
    width: "75%",
    height: "40%",
    justifyContent: "space-around",
    alignItems: 'center',
  },
});

export default Menu;

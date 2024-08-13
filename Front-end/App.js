import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./screens/Menu";
import Opcoes from "./screens/Opcoes";
import CuriosidadeTela from "./screens/CuriosidadeTela";
import { OpcaoSelecionadaProvider } from "./src/context/OpcaoSelecionada";
import ComboSurpresa from "./screens/ComboSurpresa";

const Stack = createStackNavigator();

const App = () => {
  return (
    <OpcaoSelecionadaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Menu">
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Opções"
            component={Opcoes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Curiosidade"
            component={CuriosidadeTela}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Combo surpresa"
            component={ComboSurpresa}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </OpcaoSelecionadaProvider>
  );
};

export default App;

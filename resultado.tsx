import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Resultado() {

  const { dados } = useLocalSearchParams();

  if (!dados) {
    return (
      <View style={styles.container}>
        <Text>Nenhum CEP consultado.</Text>
      </View>
    );
  }

  const cepData = JSON.parse(dados as string);

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Resultado</Text>

      <Text>CEP: {cepData.cep}</Text>
      <Text>Rua: {cepData.logradouro}</Text>
      <Text>Bairro: {cepData.bairro}</Text>
      <Text>Cidade: {cepData.localidade}</Text>
      <Text>UF: {cepData.uf}</Text>
      <Text>Estado: {cepData.estado}</Text>
      <Text>DDD: {cepData.ddd}</Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff"
  },

  titulo: {
    fontSize: 24,
    marginBottom: 20
  }

});
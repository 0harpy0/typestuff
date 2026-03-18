import { useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Resultado() {

  const { dados } = useLocalSearchParams();

  if (!dados) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text>Nenhum CEP consultado.</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const cepData = JSON.parse(dados as string);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.card}>

          <Text style={styles.titulo}>Resultado</Text>

          <Text style={styles.item}>CEP: {cepData.cep}</Text>
          <Text style={styles.item}>Rua: {cepData.logradouro}</Text>
          <Text style={styles.item}>Bairro: {cepData.bairro}</Text>
          <Text style={styles.item}>Cidade: {cepData.localidade}</Text>
          <Text style={styles.item}>UF: {cepData.uf}</Text>
          <Text style={styles.item}>Estado: {cepData.estado}</Text>
          <Text style={styles.item}>DDD: {cepData.ddd}</Text>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: "#468a87"
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  item: {
    fontSize: 16,
    marginBottom: 8
  }

});
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const [cep, setCep] = useState("");
  const router = useRouter();

  const buscarCep = async () => {

    if (!/^[0-9]{8}$/.test(cep)) {
      Alert.alert("Erro", "Digite um CEP com 8 números.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert("CEP não encontrado");
        return;
      }

      router.push({
        pathname: "/resultado",
        params: { dados: JSON.stringify(data) }
      });

    } catch {
      Alert.alert("Erro", "Falha ao consultar o CEP.");
    }

  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >

        <View style={styles.card}>

          <Text style={styles.titulo}>Consulta de CEP</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o CEP"
            placeholderTextColor="#666"
            keyboardType="numeric"
            maxLength={8}
            value={cep}
            onChangeText={setCep}
          />

          <TouchableOpacity style={styles.botao} onPress={buscarCep}>
            <Text style={styles.botaoTexto}>Buscar</Text>
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: "#468a87"
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  card: {
    width: "100%", // 🔥 ocupa bem a tela
    maxWidth: 400, // 🔥 limita em telas grandes
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

  input: {
    width: "100%", // 🔥 agora responsivo
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    color: "#000"
  },

  botao: {
    backgroundColor: "#468a87",
    padding: 15,
    borderRadius: 8,
    alignItems: "center"
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold"
  }

});
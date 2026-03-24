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

  // 🔥 função para formatar o CEP com hífen
  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const buscarCep = async () => {

    // 🔥 remove o hífen antes de validar/enviar
    const cepLimpo = cep.replace("-", "");

    if (!/^[0-9]{8}$/.test(cepLimpo)) {
      Alert.alert("Erro", "Digite um CEP válido com 8 números.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
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
            placeholder="00000-000"
            placeholderTextColor="#666"
            keyboardType="numeric"
            maxLength={9} // 🔥 agora aceita o hífen
            value={cep}
            onChangeText={(text) => {
              const formatted = formatCep(text);
              setCep(formatted);
            }}
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

  input: {
    width: "100%",
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
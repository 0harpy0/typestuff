import { useState } from "react";
import {
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
  const [endereco, setEndereco] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // 🔥 formata o CEP
  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const buscarCep = async () => {

    const cepLimpo = cep.replace("-", "");

    // limpa estados antes da busca
    setErro("");
    setEndereco(null);

    if (!/^[0-9]{8}$/.test(cepLimpo)) {
      setErro("Digite um CEP válido com 8 números.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      // 🔥 validação mais forte
      if (data.erro || !data.cep) {
        setErro("CEP não encontrado.");
        return;
      }

      setEndereco(data);

    } catch {
      setErro("Erro ao consultar o CEP.");
    } finally {
      setLoading(false);
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
            maxLength={9}
            value={cep}
            onChangeText={(text) => {
              const formatted = formatCep(text);
              setCep(formatted);
            }}
          />

          <TouchableOpacity style={styles.botao} onPress={buscarCep}>
            <Text style={styles.botaoTexto}>
              {loading ? "Buscando..." : "Buscar"}
            </Text>
          </TouchableOpacity>

          {/* 🔴 mensagem de erro */}
          {erro !== "" && (
            <Text style={styles.erro}>{erro}</Text>
          )}

          {/* ✅ resultado */}
          {endereco && (
            <View style={styles.resultado}>
              <Text style={styles.item}>CEP: {endereco.cep}</Text>
              <Text style={styles.item}>Rua: {endereco.logradouro}</Text>
              <Text style={styles.item}>Bairro: {endereco.bairro}</Text>
              <Text style={styles.item}>Cidade: {endereco.localidade}</Text>
              <Text style={styles.item}>UF: {endereco.uf}</Text>
              <Text style={styles.item}>DDD: {endereco.ddd}</Text>
            </View>
          )}

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
  },

  erro: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold"
  },

  resultado: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15
  },

  item: {
    fontSize: 16,
    marginBottom: 8
  }

});
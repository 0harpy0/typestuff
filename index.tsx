import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

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
    <View style={styles.container}>

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

      <Button title="Buscar" onPress={buscarCep} />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1, // FOCA TUDO NO CENTRO
    alignItems: 'center',
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#468a87"
  },

  titulo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 20,
    color: "#000"
  },

  input: {
    display: 'flex',
    width: "50%",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    color: "#000"
  }

});
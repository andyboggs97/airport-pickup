import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function HomeScreen() {
  const [flightNumber, setFlightNumber] = useState('');
  const [result, setResult] = useState('');

  // Simulated "API call" (replace with real flight API later)
  const handleCheckFlight = async () => {
    if (!flightNumber) {
      setResult('⚠️ Please enter a flight number.');
      return;
    }

    // Pretend API response
    const fakeApiResponse = {
      flight: flightNumber,
      status: 'On Time',
      arrival: '8:25 PM',
      gate: 'C4',
    };

    // Show result
    setResult(
      `Flight ${fakeApiResponse.flight} is ${fakeApiResponse.status}. ` +
      `Expected arrival: ${fakeApiResponse.arrival}, Gate: ${fakeApiResponse.gate}.`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✈️ Airport Pickup App 🚖</Text>
      <Text style={styles.subtitle}>Enter a flight number below:</Text>

      <TextInput
        label="Flight Number"
        mode="outlined"
        value={flightNumber}
        onChangeText={setFlightNumber}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleCheckFlight}
        style={styles.button}
      >
        Check Flight
      </Button>

      {result ? <Text style={styles.result}>{result}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginBottom: 20,
  },
  result: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

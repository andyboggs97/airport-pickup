import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';
import { AERODATABOX_API_KEY, AERODATABOX_HOST } from '@env';

export default function HomeScreen() {
  const [flightNumber, setFlightNumber] = useState('');
  const [result, setResult] = useState('');

  const handleCheckFlight = async () => {
    if (!flightNumber) {
      setResult('⚠️ Please enter a flight number.');
      return;
    }

    try {
      // AeroDataBox requires airline code + number (e.g., "AA100")
      const url = `https://${AERODATABOX_HOST}/flights/number/${flightNumber}`;

      const response = await axios.get(url, {
        headers: {
          'x-rapidapi-key': AERODATABOX_API_KEY,
          'x-rapidapi-host': AERODATABOX_HOST,
        },
      });

      const data = response.data;

      if (!data || data.length === 0) {
        setResult('❌ Flight not found.');
        return;
      }

      const flight = data[0];
      const airline = flight.airline?.name || 'Unknown Airline';
      const status = flight.status || 'Unknown Status';
      const arrival = flight.arrival?.scheduledTimeLocal || 'Unknown Arrival';
      const gate = flight.arrival?.gate || 'Unknown Gate';

      setResult(
        `${airline} Flight ${flightNumber.toUpperCase()} → ` +
        `${status}, Arrival: ${arrival}, Gate: ${gate}`
      );
    } catch (error) {
      console.error(error);
      setResult('❌ Error fetching flight data. Check API key or flight number.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✈️ Airport Pickup App 🚖</Text>
      <Text style={styles.subtitle}>Enter a flight number below:</Text>

      <TextInput
        label="Flight Number (e.g., AA100)"
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

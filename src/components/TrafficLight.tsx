import { StyleSheet, Text, View } from "react-native";
import { SignalColor } from "../types/traffic";
import React from "react";

interface TrafficLightProps {
  direction: string;
  signal: SignalColor;
  countdown: number | string;
  isActive: boolean;
}

export const TrafficLight = React.memo<TrafficLightProps>(({
  direction,
  signal,
  countdown,
  isActive,
}) => {
  const countdownColor =
    signal === 'green' ? '#00ff88' : signal === 'yellow' ? '#ffd700' : '#ff4444';

  return (
    <View style={[styles.card, isActive && styles.cardActive]}>
      <Text style={styles.directionLabel}>{direction}</Text>

      <Text style={[styles.countdown, { color: countdownColor }]}>{countdown}</Text>

      <View style={styles.lightPole}>
        <View
          style={[
            styles.light,
            styles.lightRed,
            signal === 'red' ? styles.lightRedOn : styles.lightOff,
          ]}
        />

        <View
          style={[
            styles.light,
            styles.lightYellow,
            signal === 'yellow' ? styles.lightYellowOn : styles.lightOff,
          ]}
        />

        <View
          style={[
            styles.light,
            styles.lightGreen,
            signal === 'green' ? styles.lightGreenOn : styles.lightOff,
          ]}
        />
      </View>
    </View>
  );
});


const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#161b22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#21262d',
    alignItems: 'center',
    paddingVertical: 16,
  },

  cardActive: {
    borderColor: '#238636',
  },

  directionLabel: {
    color: '#8b949e',
    fontSize: 13,
    marginBottom: 6,
  },

  countdown: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
  },

  lightPole: {
    alignItems: 'center',
  },

  lightRed: {
    backgroundColor: '#ff3b30',
  },

  lightRedOn: {
    backgroundColor: '#ff3b30',
  },
  lightYellow: {
    backgroundColor: '#ffd700',
  },

  lightYellowOn: {
    backgroundColor: '#ffd700',
  },
  lightGreen: {
    backgroundColor: '#30d158',
  },

  lightGreenOn: {
    backgroundColor: '#30d158',
  },

  light: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginVertical: 4,
  },

  lightOff: {
    opacity: 0.2,
  },
});

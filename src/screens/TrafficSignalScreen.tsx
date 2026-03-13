import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { DirectionState, SignalColor } from '../types/traffic';
import { DIRECTIONS, GREEN_TIME } from '../constant/trafficConstants';
import { TrafficLight } from '../components/TrafficLight';

type Direction = typeof DIRECTIONS[number];

const buildInitialState = (): Record<Direction, DirectionState> => ({
  'North → South': { label: 'North → South', signal: 'green', countdown: GREEN_TIME },
  'South → North': { label: 'South → North', signal: 'red', countdown: GREEN_TIME },
  'East → West': { label: 'East → West', signal: 'red', countdown: GREEN_TIME * 2 },
  'West → East': { label: 'West → East', signal: 'red', countdown: GREEN_TIME * 3 },
});


const TrafficSignalScreen: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [states, setStates] = useState<Record<Direction, DirectionState>>(
    buildInitialState()
  );

  const tickRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTraffic = () => {
    if (intervalRef.current) return;

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      tickRef.current += 1;

      const activeIndex = Math.floor(tickRef.current / GREEN_TIME) % DIRECTIONS.length;
      const currentSecond = tickRef.current % GREEN_TIME;

      const newStates: Record<Direction, DirectionState> = {} as any;

      DIRECTIONS.forEach((dir, index) => {
        let signal: SignalColor = 'red';
        let countdown = 0;

        if (index === activeIndex) {
          countdown = GREEN_TIME - currentSecond;

          if (countdown <= 3) {
            signal = 'yellow';
          } else {
            signal = 'green';
          }
        } else {
          const distance = (index - activeIndex + 4) % 4;
          countdown = distance * GREEN_TIME - currentSecond;
          signal = 'red';
        }

        newStates[dir] = {
          label: dir,
          signal,
          countdown,
        };
      });

      setStates(newStates);
    }, 1000);
  };

  const stopTraffic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsRunning(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.trafficIcon}>🚦</Text>
        <Text style={styles.title}>Traffic Signal Management System</Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.btn, styles.btnStart, isRunning && styles.btnDisabled]}
          onPress={startTraffic}
          disabled={isRunning}
        >
          <Text style={styles.btnText}>▶ Start Traffic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnStop, !isRunning && styles.btnDisabled]}
          onPress={stopTraffic}
          disabled={!isRunning}
        >
          <Text style={styles.btnText}>■ Stop Traffic</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {DIRECTIONS.map((dir) => (
          <TrafficLight
            key={dir}
            direction={dir}
            signal={states[dir].signal}
            countdown={isRunning ? states[dir].countdown : '--'}
            // countdown={states[dir].countdown}
            isActive={states[dir].signal === 'green'}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#21262d',
  },

  trafficIcon: {
    fontSize: 24,
    marginRight: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e6edf3',
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
  },

  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },

  btnStart: {
    backgroundColor: '#238636',
    borderColor: '#2ea043',
  },

  btnStop: {
    backgroundColor: '#b62324',
    borderColor: '#da3633',
  },

  btnDisabled: {
    opacity: 0.4,
  },

  btnText: {
    color: '#fff',
    fontWeight: '600',
  },

  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
});

export default TrafficSignalScreen;
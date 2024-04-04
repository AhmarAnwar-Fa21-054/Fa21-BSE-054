import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chessboard = () => {
  const renderChessboard = () => {
    const chessboard = [];

    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        const color = (i + j) % 2 === 0 ? '#FFFFFF' : '#000000';
        row.push(
          <View
            key={`${i}-${j}`}
            style={[styles.square, { backgroundColor: color }]}
          >
            <Text style={styles.text}>{i * 8 + j + 1}</Text>
          </View>
        );
      }
      chessboard.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }
    return chessboard;
  };
  return (
    <View style={styles.container}>
      {renderChessboard()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});


export default Chessboard;
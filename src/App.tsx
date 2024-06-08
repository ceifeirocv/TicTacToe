import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';

export default function App() {
  const [turn, setTurn] = useState('X');
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [winner, setWinner] = useState<string | null>(null);

  function checkWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  useEffect(() => {
    setWinner(checkWinner());
  }, [board]);

  function changeTurn() {
    setTurn(turn === 'X' ? 'O' : 'X');
  }

  function onItemPress(index: number) {
    if (board[index] !== '') {
      return;
    }
    setBoard(
      board.map((item, itemIndex) => (index === itemIndex ? turn : item)),
    );

    changeTurn();
  }

  function resetGame() {
    setBoard(['', '', '', '', '', '', '', '', '']);
    setWinner(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tic Tac Toe</Text>
      </View>
      {winner === null ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Current Turn: </Text>
          <Text
            style={[
              styles.infoText,
              turn === 'X' ? styles.infoX : styles.infoO,
            ]}>
            {turn}
          </Text>
        </View>
      ) : (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Winner: </Text>
          <Text
            style={[
              styles.infoText,
              winner === 'X' ? styles.infoX : styles.infoO,
            ]}>
            {winner}
          </Text>
        </View>
      )}

      <View style={styles.boardWrapper}>
        {board.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.boardItem}
            disabled={item !== '' || winner !== null}
            onPress={() => onItemPress(index)}>
            <Text
              style={[
                styles.boardSymbol,
                item === 'X' && styles.boardX,
                item === 'O' && styles.boardO,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    padding: 10,
  },
  headerContainer: {
    backgroundColor: '#686D76',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
  },
  headerText: {
    fontSize: 32,
    color: '#DC5F00',
    fontWeight: 'bold',
    shadowColor: '#373A40',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
  },
  infoText: {
    fontSize: 24,
    color: '#686D76',
    fontWeight: 'bold',
    shadowColor: '#373A40',
    textAlign: 'center',
  },
  infoX: {
    color: '#DC5F00',
  },
  infoO: {
    color: '#373A40',
  },
  boardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    backgroundColor: '#686D76',
    padding: 12,
    borderRadius: 12,
  },
  boardItem: {
    width: Dimensions.get('window').width / 3 - 12 * 2,
    height: Dimensions.get('window').width / 3 - 12 * 2,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DC5F00',
    elevation: 12,
  },
  boardSymbol: {
    fontSize: 60,
    fontWeight: 'bold',
    elevation: 12,
  },
  boardX: {
    color: '#DC5F00',
  },
  boardO: {
    color: '#373A40',
  },
  resetButton: {
    backgroundColor: '#DC5F00',
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    marginTop: 12,
    shadowColor: '#373A40',
    elevation: 12,
  },
  resetText: {
    fontSize: 24,
    color: '#373A40',
    fontWeight: 'bold',
    shadowColor: '#373A40',
    textAlign: 'center',
  },
});

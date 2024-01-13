import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Grid,
  GridItem,
  Button,
  extendTheme,
} from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#f0f2f5",
        color: "#333",
      },
    },
  },
  colors: {
    teal: {
      50: "#e6fffa",
      100: "#b2f5ea",
      200: "#81e6d9",
      300: "#4fd1c5",
      400: "#38b2ac",
      500: "#319795",
      600: "#2c7a7b",
      700: "#285e61",
      800: "#234e52",
      900: "#1d4044",
    },
  },
});

const App = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = () => {
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
  };

  const handleClick = (index) => {
    if (calculateWinner() || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <Button
      size="lg"
      fontSize="2xl"
      fontWeight="bold"
      colorScheme="teal"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </Button>
  );

  const winner = calculateWinner();
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="4xl" fontWeight="bold" p={4}>
        {status}
      </Box>
      <Box display="flex" justifyContent="center">
        <Grid templateColumns="repeat(3, 1fr)" gap={5} maxW="300px">
          {board.map((_, index) => (
            <GridItem key={index}>{renderSquare(index)}</GridItem>
          ))}
        </Grid>
      </Box>
      <Box textAlign="center" mt={4}>
        <Button colorScheme="teal" onClick={resetGame}>
          Reset Game
        </Button>
      </Box>
    </ChakraProvider>
  );
};

export default App;

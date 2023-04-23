import React, { useState } from 'react';
import TileGrid from './TileGrid';
import AppHeader from './AppHeader';
import Footer from './Footer';
import GameStats from './GameStats';
import tileFactory from './tile-factory';
import { GAME_WON, GAME_STARTED } from './game-states';
import './App.css';

function App(props) {
  const [showDashboard, setShowDashboard] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };
  const [gameState, setGameState] = useState(tileFactory.newGame());

  const restartGame = () => {
    setShowDashboard(false);
    setGameState(tileFactory.newGame());
  };

  const onTileClick = tile => {
    const matchingTile = getMatchingTile(tile);
    if (matchingTile.temporarilyFlipped) {
      const modifiedTiles = gameState.tiles.map(t => {
        if (t.id === tile.id || t.id === matchingTile.tile.id) {
          return {
            ...t,
            flipped: true,
          };
        }
  
        return t;
      });
  
      // Check if game has been won
      const gameWon = modifiedTiles.reduce(
        (result, tile) => {
          return result && tile.flipped;
        },
        true,
      );
  
      // Update game state with modified tiles and game won status
      setGameState(prevState => ({
        ...prevState,
        tiles: modifiedTiles,
        gameState: gameWon ? GAME_WON : GAME_STARTED,
        moves: prevState.moves + 1,
      }));
    } else {
      // Increment number of game moves
      setGameState(prevState => ({
        ...prevState,
        moves: prevState.moves + 1,
      }));
    }
  };
  
  const onTileFlip = (tileId, isFlipped) => {
    const temporaryFlippedTiles = Object.assign(
      {},
      gameState.temporaryFlippedTiles,
      {
        [tileId]: isFlipped,
      },
    );

    setGameState({
      ...gameState,
      temporaryFlippedTiles,
    });
  };

  const getMatchingTile = tile => {
    // Search for matching tile and see if it's also flipped
    const matchingTile = gameState.tiles.find(t => {
      return t.id !== tile.id && t.name === tile.name;
    });

    return {
      tile: matchingTile,
      temporarilyFlipped: gameState.temporaryFlippedTiles[matchingTile.id],
    };
  };

  let content = null;
  if (showDashboard) {
    const moves = gameState.moves;
    const pairs = gameState.tiles.length / 2;
    content = (
      <div>
        <h1>Dashboard</h1>
        <p>Username: {username}</p>
        <p>Total Moves: {moves}</p>
        <p>Total Pairs: {pairs}</p>
      </div>
    );
  } else {
    content = (
      <div className="App-content">
        <GameStats
          moves={gameState.moves}
          gameState={gameState.gameState}
          onRestart={restartGame}
        />
        <TileGrid
          tiles={gameState.tiles}
          onClick={onTileClick}
          onFlip={onTileFlip}
        />
      </div>
    );
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const handleSignup = event => {
    setLoggedIn(true);
    event.preventDefault();
    alert(`Welcome, ${username}!`);
  };

  const isFormValid = () => {
    return username !== '';
  };

  return loggedIn
    ? <div className="App">
        <AppHeader moves={gameState.moves} />
        <button
          style={{
            backgroundColor: '#E4DCCF',
            width: 'fit-content',
            borderRadius: '6px',
            height: '40px',
            // eslint-disable-next-line no-dupe-keys
            width: '80px',
            border: '2px solid #E4DCCF',
          }}
          onClick={toggleDashboard}
        >
          {showDashboard ? 'Go to Puzzle' : 'View Dashboard'}
        </button>
        <button
          style={{
            backgroundColor: '#E4DCCF',
            width: 'fit-content',
            borderRadius: '6px',
            height: '40px',
            width: '80px',
            border: '2px solid #E4DCCF',
          }}
          onClick={() => {
            setLoggedIn(false);
          }}
        >
          Logout
        </button>
        {content}
        <Footer />
      </div>
    : <div className="App">
        <AppHeader moves={gameState.moves} />
        <div className="login-container">
          <form
            onSubmit={handleSignup}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <label style={{ marginBottom: '1rem' }}>
              E-mail:
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </label>
            <label style={{ marginBottom: '1rem' }}>
              Password:
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            <button
              type="submit"
              disabled={!isFormValid()}
              style={{
                padding: '0.5rem 1rem',
                border: '2px solid #0077b6',
                borderRadius: '9999px',
                backgroundColor: '#0077b6',
                color: '#fff',
                fontWeight: 'bold',
                cursor: isFormValid() ? 'pointer' : 'not-allowed',
              }}
            >
              Signup
            </button>
          </form>

        </div>

      </div>;
}
export default App;

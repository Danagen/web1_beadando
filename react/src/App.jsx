import React, { useState } from 'react';
import Game from './menu1/Game';
import TodoApp from './menu2/TodoApp';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('menu1');

  return (
    <div>
      <h1>React Beadandó</h1>
      <nav>
        <button onClick={() => setActiveMenu('menu1')}>Számkitalálós játék</button>
        <button onClick={() => setActiveMenu('menu2')}>Teendők</button>
      </nav>
      <hr />
      {activeMenu === 'menu1' && <Game />}
      {activeMenu === 'menu2' && <TodoApp />}
    </div>
  );
}
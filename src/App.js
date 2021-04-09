import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Vaccine Tracker</NavbarBrand>
          </div>
        </Navbar>
      </header>
    </div>
  );
}

export default App;

import React from 'react';
  import Particles from 'react-particles-js';
import { Cards, CountryPicker, Chart, Footer } from './components';
import { fetchData } from './api/';
import styles from './App.module.css';

import covid19_logo from './images/covid19_logo.png';
const particlesOptions = {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 1000
          }
        }
      }
    }
class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
      <Particles ClassName={styles.container} style={{position: 'fixed',zIndex:-1,top: 0, right: 0, bottom: 0, left: 0}}
           params={particlesOptions}
           />
        <img className={styles.image} src={covid19_logo} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        <Footer ClassName='footer' />
      </div>

    );
  }
}

export default App;

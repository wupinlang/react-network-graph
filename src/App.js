import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Neo4jd3 } from './main';
import data from './data';
import { Nodes, Graph } from './components';

class App extends Component {

  componentDidMount() {
    // var neo4jd3 = new Neo4jd3('#neo4jd3', {
    //   highlight: [],
    //   images: {},
    //   minCollision: 60,
    //   d3Data: data,
    //   nodeRadius: 25,
    //   onNodeDoubleClick: function(node) {
    //     switch(node.id) {
    //       case '25':
    //         window.open(node.properties.url, '_blank');
    //         break;
    //       default:
    //         break;
    //     }
    //   },
    //   onRelationshipDoubleClick: function(relationship) {
    //     console.log('double click on relationship: ' + JSON.stringify(relationship));
    //   },
    //   zoomFit: true
    // });
  }

  state = {
    data
  }

  add = () => {
    data.nodes.push({
      "id":"2c32e169cf4c1b083952b5ad04e74fbc",
      "labels":"Organization",
      "properties":{
        "name":"Fontinalis Partners",
        "logo_url":"http://public.crunchbase.com/t_api_images/v1496420794/hbqwufhek7z1l1rqjst3.png"
      }
    });
    data.relationships.push({
      "id":"rel-ind:1",
      "type":"Board Director",
      "source":"7ecfa61e54bd256cdc054d22d2f5e16f",
      "target":"2c32e169cf4c1b083952b5ad04e74fbc",
      "properties":{
      }
    });
    this.setState({data})
  }

  render() {
    return (
      <div className="App">
        <div style={{ height: 600 }}>
          <Graph data={this.state.data}/>
        </div>
        <button onClick={this.add}>add</button>
        {/*<div id="neo4jd3" style={{ height: 600 }}>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default App;

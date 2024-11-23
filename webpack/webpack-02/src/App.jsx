import React, {Component} from 'react';
import '../src/assets/css/app.css';
import image1 from '../src/assets/images/1.png';
import image2 from '../src/assets/images/2.jpg';
import Tag from "../src/tag/index.jsx"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'hello webpack for react',
      name: "Maic",
      age: 18,
      publicName: 'Web技术学苑',
      imgSource: [image1, image2]
    }
  }
  render() {
    const { text, name, age, publicName, imgSource} = this.state;
    return (<>
      <div className="app">
          <h1>{text}</h1>
          <div>
            <p>{name}</p>,<span>{age}</span>岁
            <p>{publicName}</p>
          </div>
          <div>
            {
              imgSource.map(src => <img src={src} key={src} />)
            }
          </div>
          <Tag />
      </div>
    </>)
  }
}
export default App

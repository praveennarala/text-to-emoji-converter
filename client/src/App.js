import './App.css';
import { Component } from 'react';
import { getTexts, addText, deleteText } from './services/textServices';
import { emojiMap } from './emojis/emojiMap';

class App extends Component {

  state = { texts: [], currentText: "" };
  async componentDidMount() {
    try {
      const { data } = await getTexts();
      this.setState({ texts: data });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = ({ currentTarget: input }) => {
    this.setState({ currentText: input.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const originalTexts = this.state.texts;
    try {
      const { data } = await addText({ text: this.state.currentText });
      const texts = originalTexts;
      texts.push(data);
      this.setState({ texts, currentText: "" });
    } catch (error) {
      console.log(error);
    }
  }

  handleDelete = async (currentText) => {
    const originalTexts = this.state.texts;
    try {
      const texts = originalTexts.filter(
        (text) => text._id !== currentText
      );
      this.setState({ texts });
      await deleteText(currentText);
    } catch (error) {
      this.setState({ tasks: originalTexts });
      console.log(error);
    }
  };

  render() {
    const { texts } = this.state;
    return (
      <div className="App">
        <div className="box">
          <h1>Text to emoji converter</h1>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group mx-sm-3 mb-2">
              <input type="text"
                className="form-control"
                id="inputPassword2"
                value={this.state.currentText}
                required={true}
                onChange={this.handleChange}
                placeholder="Enter text"></input>
            </div>
            <button type="submit" className="btn btn-primary mb-2">Add Text</button>
          </form>
          <ul className="list-group">
            {texts.map(text => {
              return <li key={text._id} className="list-group-item"><div dangerouslySetInnerHTML={{ __html: textToEmojiConverter(text.text) }} />
                <button className='btn btn-danger' onClick={() => this.handleDelete(text._id)}>Delete</button></li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const textToEmojiConverter = (text) => {
  for (let i = 0; i < Object.keys(emojiMap).length; i++) {
    if (text.includes(Object.keys(emojiMap)[i])) {
      text = text.replace(new RegExp(Object.keys(emojiMap)[i], "g"), emojiMap[Object.keys(emojiMap)[i]]);
    }
  }
  return `<span>${text}</span>`
}

export default App;

import React from 'react';

import { Button } from 'antd';
import { linebreak, capitalize } from './stringUtils';

export class Speech extends React.Component {
  state = {
    speechEnabled: ('webkitSpeechRecognition' in window),
    transcribing: false,
    transcript: '',
  }

  recognition = null;

  componentDidMount() {
    if (this.state.speechEnabled) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
  
      this.recognition.onstart = () => {
        this.setState({ transcribing: true, })
      }
      this.recognition.onend = () => {
        this.setState({ transcribing: false, })
      }
      this.recognition.onresult = this.onSpeechResult;
    }
  }

  startRecognition = () => {
    if (!this.recognition) return;
    if (this.state.transcribing) {
      this.recognition.stop();
      return;
    }

    this.recognition.lang = 'en-US';
    this.recognition.start();
  }

  onSpeechResult = (event) => {
    let final_transcript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);

    this.setState({ transcript: final_transcript })
  }
  
  render() {
    const { speechEnabled, transcribing, transcript } = this.state;
    if (!speechEnabled) {
      return <span>Web Speech API is not available on your browser.</span>
    }
    else {
      return <>
        <Button onClick={this.startRecognition}>Start/Stop</Button>
        <div>Transcribing: {transcribing}</div>
        <div>{transcript}</div>
      </>
    }
  }
}

export default Speech;
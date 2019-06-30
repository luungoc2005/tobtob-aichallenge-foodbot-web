import React from 'react';

import { Button } from 'antd';
import { linebreak, capitalize } from './stringUtils';

export class Speech extends React.Component {
  state = {
    speechEnabled: ('webkitSpeechRecognition' in window),
    transcribing: false,
    transcript: '',
    intermediate_transcript: '',
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
    let intermediate_transcript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      }
      else {
        intermediate_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    if (final_transcript) {
      if (this.props.onFinalTranscript) {
        this.props.onFinalTranscript(final_transcript)
      }
    }
    else {
      if (this.props.onIntermediateTranscript) {
        this.props.onIntermediateTranscript(intermediate_transcript)
      }
    }

    this.setState({ transcript: final_transcript, intermediate_transcript });
  }
  
  render() {
    const { speechEnabled, transcribing, transcript, intermediate_transcript } = this.state;
    if (!speechEnabled) {
      return <span>Web Speech API is not available on your browser.</span>
    }
    else {
      return <>
        <Button onClick={this.startRecognition}>{transcribing ? 'Stop Listening' : 'Start Listening'}</Button>
        {!this.props.hideTranscript && <div><span>{transcript}</span><span>{' ' + intermediate_transcript}</span></div>}
      </>
    }
  }
}

export default Speech;
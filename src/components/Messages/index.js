import React from 'react';

import { Comment, Icon, Tooltip, Avatar } from 'antd';

import { v4 } from 'uuid';

import { AppContext } from '../../App';

import Speech from '../Speech';
import BotHandler from './BotHandler';

const DEFAULT_MESSAGES = [
  {
    id: v4(),
    author: 'Bot',
    content: 'Welcome. Please select your item from the menu.',
    complete: true,
  }
]

export class Messages extends React.Component {
  state = {
    messageHistory: DEFAULT_MESSAGES,
  }

  currentMessageId = null;

  onFinalTranscript = (value) => {
    const { messageHistory } = this.state;
    if (this.currentMessageId) {
      this.setState({
        messageHistory: messageHistory.map(message => message.id === this.currentMessageId
          ? { ...message, complete: true, content: value }
          : message)
      })
      this.currentMessageId = null;
    }
    // handle action here
  }

  onIntermediateTranscript = (value) => {
    const { messageHistory } = this.state;
    if (!this.currentMessageId) {
      // add new message
      this.currentMessageId = v4();
      this.setState({
        messageHistory: [...messageHistory, { 
          id: this.currentMessageId,
          author: 'User',
          content: value,
          complete: false,
        }]
      })
    }
    else {
      // modify existing
      this.setState({
        messageHistory: messageHistory.map(message => message.id === this.currentMessageId
          ? { ...message, content: value }
          : message)
      })
    }
  }

  onBotResponse = (value) => {
    const { messageHistory } = this.state;
    this.setState({
      messageHistory: [...messageHistory, { 
        id: v4(),
        author: 'Bot',
        content: value,
        complete: true,
      }]
    })
  }

  render() {
    const { messageHistory } = this.state;
    return (
      <>
        {messageHistory && messageHistory.slice(-4).map((message, idx) => 
        <React.Fragment key={message.id}>
          <div
            style={{ 
              borderRadius: 10, 
              backgroundColor: message.author === 'Bot' ? '#eee' : '#40a9ff', 
              marginLeft: message.author === 'Bot' ? 0 : 50,
              marginRight: message.author === 'Bot' ? 50 : 0,
            }}>
            <Comment 
              author={message.author}
              content={message.content}
            />
          </div>
          <div style={{ height: 10 }} />
        </React.Fragment>)}
        <div style={{ height: 10 }} />
        <AppContext.Consumer>
          {context => 
            <BotHandler 
              messageHistory={messageHistory} 
              onBotResponse={this.onBotResponse}
              {...context}
            />
          }
        </AppContext.Consumer>
        <Speech 
          onIntermediateTranscript={this.onIntermediateTranscript}
          onFinalTranscript={this.onFinalTranscript}
          hideTranscript={true}
        />
      </>
    )
  }
}

export default Messages;
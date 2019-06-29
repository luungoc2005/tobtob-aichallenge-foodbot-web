import React from 'react';

import { Comment, Icon, Tooltip, Avatar } from 'antd';

const DEFAULT_MESSAGES = [
  {
    author: 'Bot',
    content: 'Welcome. Please select your item from the menu.'
  }
]

export const Messages = ({ messages = DEFAULT_MESSAGES }) => <>
  {messages && messages.slice(-2).map((message, idx) => <Comment 
    key={idx}
    author={message.author}
    content={message.content}
  />)}
</>

export default Messages;
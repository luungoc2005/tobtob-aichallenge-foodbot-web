import React from 'react';
import bot_responses from './bot_responses.json';
import menu from '../../menu.json';

import { getWitResponse } from './witHandler';
import { JaroWrinker } from './utils';

import { v4 } from 'uuid';

const CONFIDENCE_THRESHOLD = .5;
export class BotHandler extends React.Component {
  state = {
    context: {
      currentOrderItem: null,
      itemProps: null,
    },
  }
  lastProcessedId = null;
  lastResponse = '';

  async componentDidUpdate(prevProps) {
    const { messageHistory } = this.props;
    if (prevProps.messageHistory !== messageHistory
      && messageHistory.length) {
      const lastMessage = messageHistory.slice(-1)[0]
      if (this.lastProcessedId !== lastMessage.id && lastMessage.author === 'User' && lastMessage.complete) {
        this.lastProcessedId = lastMessage.id;
        const result = await getWitResponse(lastMessage.content);
        // console.log(result);
        if (result) {
          this.onHandleResponse(result);
        }
      }
    }
  }

  onHandleResponse = (witResponse) => {
    const { onBotResponse } = this.props;
    let fallback = false;
    let overrideResponse = null;

    if (witResponse.entities.intent && witResponse.entities.intent[0].confidence > CONFIDENCE_THRESHOLD) {
      const intentName = witResponse.entities.intent[0].value;
      const botResponse = bot_responses.find(item => item.name === intentName);

      console.log(botResponse)
      const menuItem = menu.find(item => item.intent_name === intentName);
      const { context } = this.state;

      if (menuItem) {
        console.log('New menu item')
        this.setState({
          context: {
            ...context,
            currentOrderItem: {...menuItem, id: v4()},
            itemProps: {
              qTy: 1,
              notes: [],
            },
          }
        }, () => this.props.addToCart(this.state.context.currentOrderItem))
      }
      else if (intentName === 'quantity') {
        console.log('Set quantity for new item')
        const newQty = witResponse.entities.number
          ? witResponse.entities.number[0].value
          : 1;
        const currentId = this.state.context.currentOrderItem.id
        if (context.currentOrderItem) {
          // also end order
          this.setState({
            context: {
              ...context,
              currentOrderItem: null,
              itemProps: {},
            }
          }, () => this.props.onQtyChange(currentId, newQty))
        }
        else {
          fallback = true;
        }
      }
      else if (intentName === 'spicy' || intentName === 'no_spicy') {
        console.log('Set notes for new item')
        if (['vn_banhmi_beef', 'vn_banhmi_chicken', 'eggplant_sandwich']
          .findIndex(item => item === context.currentOrderItem.intent_name) > -1) {
          this.setState({
            context: {
              ...context,
              itemProps: {
                ...context.itemProps,
                qTy: 1,
                notes: [...context.itemProps.notes, intentName === 'spicy' ? 'Spicy' : 'Not spicy']
              }
            }
          }, () => this.props.onPropChange(
            this.state.context.currentOrderItem.id, 
            'notes',
            this.state.context.itemProps.notes.join(', ')
          ))
        }
      }
      else if (intentName === 'ice' || intentName === 'no_ice') {
        console.log('Set notes for new item')
        if (['coffee_black', 'coffee_soya', 'coffee_fmilk', 'coffee_cmilk', 'milk_soya', 'milk_almond', 'milk_fresh']
          .findIndex(item => item === context.currentOrderItem.intent_name) > -1) {
          this.setState({
            context: {
              ...context,
              itemProps: {
                ...context.itemProps,
                qTy: 1,
                notes: [...context.itemProps.notes, intentName === 'ice' ? 'Ice' : 'Hot']
              }
            }
          }, () => this.props.onPropChange(
            this.state.context.currentOrderItem.id, 
            'notes',
            this.state.context.itemProps.notes.join(', ')
          ))
        }
      }
      else if (intentName === 'sugar' || intentName === 'no_sugar') {
        console.log('Set notes for new item')
        if (['coffee_black', 'coffee_soya', 'coffee_fmilk', 'coffee_cmilk', 'milk_soya', 'milk_almond', 'milk_fresh']
          .findIndex(item => item === context.currentOrderItem.intent_name) > -1) {
          this.setState({
            context: {
              ...context,
              itemProps: {
                ...context.itemProps,
                qTy: 1,
                notes: [...context.itemProps.notes, intentName === 'sugar' ? 'Sugar' : 'No Sugar']
              }
            }
          }, () => this.props.onPropChange(
            this.state.context.currentOrderItem.id, 
            'notes',
            this.state.context.itemProps.notes.join(', ')
          ))
        }
      }
      else if (intentName === 'change_order_item') {
        
        console.log('Change previous item')

        if (witResponse.entities.food_item && witResponse.entities.food_item.length === 2) {
          const firstItem = witResponse.entities.food_item[0];
          const secondItem = witResponse.entities.food_item[1];
          const firstItemCandidates = this.props.cart.filter(
            cartItem => cartItem.name.toLowerCase().indexOf((firstItem.value.toLowerCase())) > -1 
              || JaroWrinker(firstItem.value.toLowerCase(), cartItem.name.toLowerCase()) > .7
          )
          const secondItemCandidates = menu.filter(
            menuItem => menuItem.name.toLowerCase().indexOf((secondItem.value.toLowerCase())) > -1 
              || JaroWrinker(secondItem.value.toLowerCase(), menuItem.name.toLowerCase()) > .7
          )
          if (firstItemCandidates.length && secondItemCandidates.length) {
            this.props.onChangeItem(firstItemCandidates[0].id, secondItemCandidates[0]);
            if (context.currentOrderItem) {
              overrideResponse = `I've changed your ${firstItemCandidates[0].name} to ${secondItemCandidates[0].name}. Back to the ${context.currentOrderItem.name}, ${botResponse}`;
            }
            else {
              overrideResponse = `I've changed your ${firstItemCandidates[0].name} to ${secondItemCandidates[0].name}. Would you like anything else?`;
            }
          }
        }
      }

      console.log(context)
      if (!fallback) {
        try {
          this.lastResponse = overrideResponse || botResponse.response;
          onBotResponse(overrideResponse || botResponse.response);
          return;
        }
        catch {
          this.fallback = true;
        }
      }
    }

    this.lastResponse = 'Sorry I could not hear you, please try again.';
    onBotResponse('Sorry I could not hear you, please try again.');
  }

  render() {
    return (<div>
      {this.props.children}
    </div>)
  }
}

export default BotHandler;
import React, { createRef } from 'react';
import { Button, Modal, Row } from 'antd';

import Messages from '../Messages';
import Speech from '../Speech';

import { connect } from '../../socket';

import * as handTrack from 'handtrackjs';
import * as Instascan from 'instascan';

const modelParams = {
  flipHorizontal: true, // flip e.g for video  
  imageScaleFactor: 0.7,
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6, // confidence threshold for predictions.
}
const VIDEO_INTERVAL = 500

const distance = (point1, point2) => Math.abs(point1 - point2)

export class HandTrack extends React.Component {
  state = {
    enabled: false,
    modelLoading: true,
    videoOpen: false,
  }

  model = null;
  videoElement = createRef();
  qrVideoElement = createRef();
  canvasElement = createRef();
  canvasContext = null;
  prediction = null;
  qrScanner = null;
  sendImage = false;
  socket = null;

  componentDidMount() {
    if (this.canvasElement.current && !this.canvasContext) {
      this.canvasContext = this.canvasElement.current.getContext("2d");
    }
  }

  enableVideo = () => {
    this.setState({
      enabled: true,
    })
    handTrack.load(modelParams).then(loaded_model => {
      this.model = loaded_model;
      this.setState({
        modelLoading: false,
      })

      this.startVideo();
    })
  }

  disableVideo = () => {
    if (this.videoElement.current) {
      handTrack.stopVideo(this.videoElement.current)
      this.prediction = null;

      if (this.qrScanner) {
        this.qrScanner.stop();
        this.qrScanner = null;
      }

      this.setState({
        enabled: false,
        videoOpen: false,
      })
    }
  }

  startVideo = () => {
    console.log(this.videoElement.current);
    if (this.videoElement.current) {
      console.log('Socket connecting')
      this.socket = connect();
      this.socket.on('message', this.handleSocketMessage)
      console.log('Starting video')
      handTrack.startVideo(this.videoElement.current)
        .then(status => {
          console.log('Video started', status)
          this.setState({
            videoOpen: true,
          });
          if (this.canvasElement.current && !this.canvasContext) {
            this.canvasContext = this.canvasElement.current.getContext("2d");
          }
          if (this.qrVideoElement.current) {
            this.qrScanner = new Instascan.Scanner({
              video: this.qrVideoElement.current,
              backgroundScan: false,
              scanPeriod: VIDEO_INTERVAL,
            });
            this.qrScanner.addListener('scan', this.onQrScanned);
          }
          if (status) {
            this.runDetection();
          }
        })
    }
  }

  runDetection = () => {
    requestAnimationFrame(() => {
      if (this.model && this.videoElement.current) {
        this.model.detect(this.videoElement.current).then(predictions => {
          try {
            this.model.renderPredictions(
              predictions, 
              this.canvasElement.current, 
              this.canvasContext, 
              this.videoElement.current
            );
            if (predictions.length) {
              const newPrediction = predictions[0]
              if (this.prediction) {
                if (distance(this.prediction.bbox[0], newPrediction.bbox[0]) < 50
                  && distance(this.prediction.bbox[1], newPrediction.bbox[1]) < 50) {
                  // console.log('send')
                  this.handleVideoSeeked();
                  this.sendImage = true;
                }
                else {
                  this.sendImage = false;
                }
              }
              this.prediction = newPrediction;
            }
          }
          catch (e) {
            console.error(e)
          }
        });
        setTimeout(this.runDetection, VIDEO_INTERVAL)
      }
    });
  }

  onQrScanned = (content, image) => {
    if (content && this.prediction) {
      // hand and qr code present
      console.log(content);
    }
  }

  handleVideoSeeked = () => {
    if (this.socket) {
      const canvas = document.createElement('canvas');
      const video = this.videoElement.current;

      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
  
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const data = canvas.toDataURL();
      this.socket.emit('message', JSON.stringify({
        type: 'video',
        data,
        hand_prediction: this.prediction,
      }))
    }
  }

  handleSocketMessage = (data) => {
    try {
      const dataObject = JSON.parse(data);
      if (dataObject.type === 'result' && dataObject.data) {
        this.disableVideo();
      }
    }
    catch {

    }
  }

  render() {
    return <div style={{ width: '215px', height: '162px' }}>
      {!this.state.enabled && <Button onClick={this.enableVideo}>Enable Video</Button>}
      <Modal
        visible={this.state.enabled}
        onCancel={this.disableVideo}
        footer={[
          <Button key="close" onClick={this.disableVideo}>
            Close
          </Button>,
        ]}
        width={920}
      >
        <Row>
          {this.state.modelLoading && <div>Loading model....</div>}
          <div style={{ width: 860, height: 648, position: 'relative' }}>
            <video 
              ref={this.qrVideoElement} 
              autoPlay="autoplay"
              width="860"
              height="648"
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, }} 
            />
            <video 
              ref={this.videoElement}
              // onSeeked={this.handleVideoSeeked}
              autoPlay="autoplay"
              width="860"
              height="648"
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, }} 
            />
            <canvas
              ref={this.canvasElement}
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, }} 
            />
          </div>
        </Row>
      </Modal>
    </div>
  }
}

export default HandTrack
import React, { Component } from 'react';

import icoYoutube from './images/youtube.svg';
import icoSoundcloud from './images/soundcloud.svg';
import icoImage from './images/image.svg';
import icoFullscreen from './images/fullscreen.svg';
import icoLink from './images/link.svg';

class Toolbar extends Component {

    colors = [
      "#000000", "#e60000", "#ff9900", "#ffff00", "#008A00", "#0066cc", "#9933ff",
      "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff",
      "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff",
      "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2",
      "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"
    ];
    render() {
        return (
            <div className='Toolbar' id='toolbar'>
            <span className='ql-formats'>
              <select className='ql-header'>
                <option value='2'>Título 2</option>
                <option value='3'>Título 3</option>
                <option value='4'>Título 4</option>
                <option value='5'>Título 5</option>
                <option value='6'>Título 6</option>
              </select>
              <select className='ql-size'>
                <option value='small'></option>
                <option value='normal'></option>
                <option value='large'></option>
                <option value='huge'></option>
              </select>
            </span>
            <span className='ql-formats'>
              <button className='ql-bold'></button>
              <button className='ql-italic'></button>
              <button className='ql-underline'></button>
              <button className='ql-strike'></button>
            </span>
            <span className='ql-formats'>
              <button className='ql-script' value='sub'></button>
              <button className='ql-script' value='super'></button>
            </span>
            <span className='ql-formats'>
              <select className='ql-color ql-picker ql-color-picker'>
                { this.colors.map(color => <option value={color} key={color}></option>) }
              </select>
              <select className='ql-background ql-picker ql-color-picker'>
                { this.colors.map(color => <option value={color} key={color}></option>) }
              </select>
            </span>
            <span className='ql-formats'>
              <select className='ql-align'>
                <option></option>
                <option value='center'></option>
                <option value='right'></option>
                <option value='justify'></option>
              </select>
              <button className='ql-list' value='ordered'></button>
              <button className='ql-list' value='bullet'></button>
            </span>
            <span className='ql-formats'>
              <button className='ql-blockquote'></button>
              <button className='ql-code-block'></button>
            </span>
            <span className='ql-formats'>
              <button className='ql-my-link' value='my-link'>
                <img src={icoLink} alt="ico link" />
              </button>
              <button className='ql-my-image' value='my-image'>
                <img src={icoImage} alt="ico" />
              </button>
              <button className='ql-my-video' value='my-video'>
                <img src={icoYoutube} alt="youtube" />
              </button>
              <button className='ql-my-audio' value='my-audio'>
                <img src={icoSoundcloud} alt="soundcloud" />
              </button>
            </span>
            <span className='ql-formats'>
              <button className='ql-clean'></button>
              <button className='ql-fullscreen' value='fullscreen'>
                <img src={icoFullscreen} alt="ico" />
              </button>
            </span>
          </div>
        );
    }
}

export default Toolbar;
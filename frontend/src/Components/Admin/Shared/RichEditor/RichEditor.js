import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichEditor.css';
import {
    IsInt,
    OpenFullscreen,
    CloseFullscreen,
    GetYoutubeVideoId,
    IsSoundCloudUrl,
    IsAnUrl,
    CreateYoutubeIframe,
    CreateSoundCloudIframe
} from '../../../../Utils/Utils';
import Toolbar from './Toolbar';
import './MyImage';
import './MyVideo';
import './MyAudio';
import './MyLink';
import UploadButton from '../UploadButton/UploadButton';

function Iframe(props) {
    return (<div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }} />);
}

class RichEditor extends Component {

    /* eslint-disable */
    self = null;

    toolbarConfig = {
        'container': '#toolbar',
        'handlers': {
            'my-image': function (value) {
                self.toggleConfigurationPanel('image');
            },
            'my-video': function (value) {
                self.toggleConfigurationPanel('video');
            },
            'my-audio': function (value) {
                self.toggleConfigurationPanel('audio');
            },
            'my-link': function (value) {
                self.toggleConfigurationPanel('link');
            },
            'fullscreen': function (value) {
                self.openFullscreen();
            }
        }
    };

    constructor(props) {
        super(props);
        this.quillRef = null;
        this.reactQuillRef = null;
        this.state = {
            text: '',
            currentImage: null,
            currentVideo: null,
            currentAudio: null,
            currentLink: null,
            width: 'auto',
            height: 'auto',
            position: 'normal',
            target: '_self',
            title: null,
            loadingImage: false,
            uploadError: null
        };
        this.handleEditorChange = this.handleEditorChange.bind(this);
        self = this;
    }

    componentDidMount() {
        this.attachQuillRefs()
    }

    componentDidUpdate() {
        this.attachQuillRefs()
    }

    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }

    insertImageIntoEditor(editor) {
        editor.focus();
        const range = editor.getSelection();
        if (range) {
            editor.insertEmbed(range.index, 'myimage', this.getConfigurations());
        }
        this.toggleConfigurationPanel('image');
    }

    insertVideoIntoEditor(editor) {
        editor.focus();
        const range = editor.getSelection();
        if (range) {
            editor.insertEmbed(range.index, 'myvideo', this.getConfigurations());
        }
        this.toggleConfigurationPanel('video');
    }

    insertAudioIntoEditor(editor) {
        editor.focus();
        const range = editor.getSelection();
        if (range) {
            editor.insertEmbed(range.index, 'myaudio', this.getConfigurations());
        }
        this.toggleConfigurationPanel('audio');
    }

    insertLinkIntoEditor(editor) {
        editor.focus();
        const range = editor.getSelection();
        if (range) {
            editor.formatText(range.index, range.length, 'mylink', this.getConfigurations());
        }
        this.toggleConfigurationPanel('link');
    }

    handleAddImage() {
        this.insertImageIntoEditor(this.quillRef);
    }

    handleAddVideo() {
        if ((GetYoutubeVideoId(this.state.currentVideo))) {
            this.insertVideoIntoEditor(this.quillRef);
        } else {
            alert('Apenas vídeos do Youtube.');
        }
    }

    handleAddAudio() {
        if (IsSoundCloudUrl(this.state.currentAudio)) {
            this.insertAudioIntoEditor(this.quillRef);
        } else {
            alert('Apenas áudios do SoundCloud.')
        }
    }

    handleAddLink() {
        if (IsAnUrl(this.state.currentLink)) {
            this.insertLinkIntoEditor(this.quillRef);
        } else {
            alert('Apenas urls válidas.');
        }
    }

    handleEditorChange(value) {
        this.setState({ text: value });
        this.props.parentGettingTheEditorValue(this.state.text);
    }

    handleChange(e) {
        const stateName = e.target.getAttribute('data-state-name');
        self.setState({ [stateName]: e.target.value });
    }

    openFullscreen() {
        const el = document.querySelector('.RichEditor');
        if (el.classList.contains('is-fullscreen')) {
            CloseFullscreen();
            el.classList.remove('is-fullscreen');
        } else {
            OpenFullscreen(el);
            el.classList.add('is-fullscreen');
        }

    }

    resetConfigurationFields() {
        this.setState({
            currentImage: null,
            currentAudio: null,
            currentVideo: null,
            currentLink: null,
            width: 'auto',
            height: 'auto',
            position: 'normal',
            target: '_self',
            title: null,
            loadingImage: false,
            uploadError: null
        });
        const els = document.querySelectorAll('.configuration-panel input, .configuration-panel select');
        if (els && els.length) {
            els.forEach(el => {
                el.value = null;
            });
        }
    }

    toggleConfigurationPanel(type) {
        let extraClassName = '.' + type;
        const els = document.querySelectorAll('.configuration-panel' + extraClassName);
        if (els && els.length) {
            els.forEach(el => {
                if (el.classList.contains('opened')) {
                    el.classList.remove('opened');
                } else {
                    el.classList.add('opened');
                }
            });
            self.resetConfigurationFields();
        }
    }

    getConfigurations() {
        let width = (IsInt(this.state.width)) ? this.state.width + 'px' : 'auto';
        let height = (IsInt(this.state.height)) ? + this.state.height + 'px' : 'auto';
        return {
            width,
            height,
            position: this.state.position,
            imageUrl: this.state.currentImage,
            videoUrl: this.state.currentVideo,
            audioUrl: this.state.currentAudio,
            linkUrl: this.state.currentLink,
            title: this.state.title,
            target: this.state.target
        };
    }

    getUploadButtonState = (childState) => {
        this.setState({
            currentImage: childState.currentImage,
            uploadError: childState.uploadError,
            loadingImage: childState.loadingImage
        });
    }

    render() {
        return (
            <div className='RichEditor'>
                <Toolbar />
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    value={this.state.text}
                    modules={{ toolbar: this.toolbarConfig }}
                    onChange={this.handleEditorChange} />
                <div id="ImageEditor" className="configuration-panel image">
                    <div>
                        <button type="button" className="btn btn-danger" onClick={() => this.toggleConfigurationPanel('image')}>Cancelar</button>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Selecione uma imagem:</label>
                                    <UploadButton getUploadButtonState={this.getUploadButtonState} />
                                </div>
                                <div className="form-group">
                                    {(this.state.currentImage) &&
                                        <img id="previewImage" src={this.state.currentImage} alt="Preview da imagem" />
                                    }
                                    {(this.state.loadingImage) &&
                                        <p>Enviado...</p>
                                    }
                                    {(this.state.uploadError) &&
                                        <p>{ this.state.uploadError }</p>
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="form-grou col-md-6">
                                        <label>Informe a largura:</label>
                                        <input
                                            type="number"
                                            data-state-name="width"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Informe a altura:</label>
                                        <input
                                            type="number"
                                            data-state-name="height"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Selecione o posicionamento:</label>
                                    <select
                                        data-state-name="position"
                                        className="form-control"
                                        onChange={this.handleChange}>
                                        <option value="normal">Normal</option>
                                        <option value="left">Esquerda</option>
                                        <option value="center">Centralizado</option>
                                        <option value="right">Direita</option>
                                    </select>
                                </div>
                                {(this.state.currentImage) &&
                                    <div className="form-group">
                                        <button type="button" className="btn btn-primary" onClick={() => { this.handleAddImage() }}>Add image</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div id="VideoEditor" className="configuration-panel video">
                    <div>
                        <button type="button" className="btn btn-danger" onClick={() => this.toggleConfigurationPanel('video')}>Cancelar</button>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>
                                        Informe a URL do vídeo: <br />
                                        <small><b>Apenas vídeos do Youtube</b></small>
                                    </label>
                                    <input
                                        type="text"
                                        id="RichEditorFieldVideo"
                                        data-state-name="currentVideo"
                                        className="form-control"
                                        onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <Iframe iframe={'<iframe src="" id="previewVideo"></iframe>'} />
                                    {(this.state.currentVideo && GetYoutubeVideoId(this.state.currentVideo)) &&
                                        <div>
                                            {CreateYoutubeIframe(document.getElementById('previewVideo'), this.getConfigurations())}
                                        </div>
                                    }
                                    {(!GetYoutubeVideoId(this.state.currentVideo)) &&
                                        <div className="hide">{(setTimeout(() => {
                                            if (document.getElementById('previewVideo')) {
                                                document.getElementById('previewVideo').setAttribute('src', '')
                                            }
                                        }, 1))}</div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Informe a largura:</label>
                                        <input
                                            type="number"
                                            data-state-name="width"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Informe a altura:</label>
                                        <input
                                            type="number"
                                            data-state-name="height"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Informe o posicionamento:</label>
                                    <select
                                        data-state-name="position"
                                        className="form-control"
                                        onChange={this.handleChange}>
                                        <option value="normal">Normal</option>
                                        <option value="left">Esquerda</option>
                                        <option value="center">Centralizado</option>
                                        <option value="right">Direita</option>
                                    </select>
                                </div>
                                {(this.state.currentVideo && GetYoutubeVideoId(this.state.currentVideo)) &&
                                    <div className="form-group">
                                        <button type="button" className="btn btn-primary" onClick={() => { this.handleAddVideo() }}>Add vídeo</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div id="AudioEditor" className="configuration-panel audio">
                    <div>
                        <button type="button" className="btn btn-danger" onClick={() => this.toggleConfigurationPanel('audio')}>Cancelar</button>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>
                                        Informe a URL do áudio: <br />
                                        <small><b>Apenas áudios do Soundcloud</b></small>
                                    </label>
                                    <input
                                        type="text"
                                        id="RichEditorFieldAudio"
                                        data-state-name="currentAudio"
                                        className="form-control"
                                        onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <Iframe iframe={'<iframe src="" id="previewAudio"></iframe>'} />
                                    {(this.state.currentAudio) && IsSoundCloudUrl(this.state.currentAudio) &&
                                        <div>
                                            {CreateSoundCloudIframe(document.getElementById('previewAudio'), this.getConfigurations())}
                                        </div>
                                    }
                                    {(!IsSoundCloudUrl(this.state.currentAudio)) &&
                                        <div className="hide">{(setTimeout(() => {
                                            if (document.getElementById('previewAudio')) {
                                                document.getElementById('previewAudio').setAttribute('src', '')
                                            }
                                        }, 1))}</div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Informe a largura:</label>
                                        <input
                                            type="number"
                                            data-state-name="width"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Informe a altura:</label>
                                        <input
                                            type="number"
                                            data-state-name="height"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Informe o posicionamento:</label>
                                    <select
                                        data-state-name="position"
                                        className="form-control"
                                        onChange={this.handleChange}>
                                        <option value="normal">Normal</option>
                                        <option value="left">Esquerda</option>
                                        <option value="center">Centralizado</option>
                                        <option value="right">Direita</option>
                                    </select>
                                </div>
                                {(this.state.currentAudio) &&
                                    <div className="form-group">
                                        <button type="button" className="btn btn-primary" onClick={() => { this.handleAddAudio() }}>Add audio</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div id="LinkEditor" className="configuration-panel link">
                    <div>
                        <button type="button" className="btn btn-danger" onClick={() => this.toggleConfigurationPanel('link')}>Cancelar</button>
                        <div className="row">
                            <div className="col-md-6">
                                <div>
                                    <div className="form-group">
                                        <label>Informe a URL:</label>
                                        <input
                                            type="text"
                                            id="RichEditorFieldLink"
                                            data-state-name="currentLink"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <div className="form-group">
                                        <label>Informe o título:</label>
                                        <input
                                            type="text"
                                            data-state-name="title"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Informe em qual janela abrir:</label>
                                        <select
                                            data-state-name="target"
                                            className="form-control"
                                            onChange={this.handleChange}>
                                            <option value="_self">Abrir na mesma janela</option>
                                            <option value="_blank">Abrir em outra janela</option>
                                        </select>
                                    </div>
                                </div>
                                {(this.state.currentLink) && IsAnUrl(this.state.currentLink) &&
                                    <div>
                                        <button type="button" className="btn btn-primary" onClick={() => { this.handleAddLink() }}>Add link</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RichEditor;

import React, { Component } from 'react';
import { GetFileExtension } from '../../../../Utils/Utils';

class UploadButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentImage: null,
            uploadError: null,
            loadingImage: false,
            imageId: ''
        };
    }

    handleUploadImage = () => {
        this.setState({
            uploadError: null,
            currentImage: null,
            loadingImage: false,
            imageId: ''
        });
        this.sendStateToParentComponent();
        const element = document.querySelector('.UploadButton input');
        const uploadInfo = document.querySelector('.file-upload-info');
        uploadInfo.value = '';
        const file = element.files[0];
        if (file && file.name) {
            uploadInfo.value = file.name;
            const extension = GetFileExtension(file.name).toLowerCase();
            const accepts = element.getAttribute('accept').split(',');
            if (file.size <= 5017969) {
                if (accepts.indexOf('.' + extension) > -1) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        this.setState({ loadingImage: true });
                        this.sendStateToParentComponent();
                        fetch(`${process.env.REACT_APP_BASE_URL}/api/image`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': sessionStorage.getItem('Token')
                            },
                            body: JSON.stringify({ image: reader.result })
                        })
                            .then(data => data.json())
                            .then(data => {
                                if (data && data.id) {
                                    this.setState({
                                        currentImage: `${process.env.REACT_APP_BASE_URL}/api/media/${data.id}`,
                                        imageId: data.id,
                                        loadingImage: false
                                    });
                                    this.sendStateToParentComponent();
                                } else {
                                    element.value = null;
                                    uploadInfo.value = '';
                                    this.setState({
                                        uploadError: data.message,
                                        loadingImage: false
                                    });
                                    this.sendStateToParentComponent();
                                }
                            }, error => {
                                console.log('handleUploadImage: ', error);
                                element.value = null;
                                uploadInfo.value = '';
                                this.setState({
                                    uploadError: 'Falha ao tentar conectar com o servidor.',
                                    loadingImage: false
                                });
                                this.sendStateToParentComponent();
                            });
                    }
                    reader.readAsDataURL(file);
                } else {
                    element.value = null;
                    uploadInfo.value = '';
                    this.setState({ uploadError: 'Tipo de arquivo inválido.' });
                    this.sendStateToParentComponent();
                }
            } else {
                element.value = null;
                setTimeout(() => {
                    this.setState({ uploadError: 'O tamanho da imagem não deve exceder 5mb.' });
                    this.sendStateToParentComponent();
                }, 1);
            }
        }
    }

    triggerUploadFile() {
        document.querySelector('.UploadButton input').click();
    }

    sendStateToParentComponent(value) {
        this.props.getUploadButtonState(this.state);
    }

    render() {
        return (
            <div className="UploadButton">
                <input type="file" name="files" className="file-upload-default" id="RichEditorInputFile" accept=".jpg,.jpeg,.png,.gif" onChange={this.handleUploadImage} />
                <div className="input-group">
                    <input type="text" className="form-control file-upload-info" placeholder="Upload Image" disabled />
                    <span className="input-group-append">
                        <button className="file-upload-browse btn btn-primary"
                            type="button" onClick={this.triggerUploadFile}>Upload</button>
                    </span>
                </div>
            </div>
        );
    }
}

export default UploadButton;

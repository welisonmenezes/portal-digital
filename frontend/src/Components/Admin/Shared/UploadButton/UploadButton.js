import React, { Component } from 'react';
import { GetFileExtension } from '../../../../Utils/Utils';

class UploadButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentImage: null,
            uploadError: null,
            loadingImage: false
        };
    }

    handleUploadImage = () => {

        this.setState({
            uploadError: null,
            currentImage: null,
            loadingImage: false
        });
        this.sendStateToParentComponent();

        const element = document.querySelector('.UploadButton input');
        const file = element.files[0];
        if (file && file.name) {
            const extension = GetFileExtension(file.name).toLowerCase();
            const accepts = element.getAttribute('accept').split(',');
            if (file.size <= 5017969) {
                if (accepts.indexOf('.' + extension) > -1) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        this.setState({ loadingImage: true });
                        this.sendStateToParentComponent();
                        fetch('http://127.0.0.1:5000/api/image', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                image: reader.result
                            })
                        })
                            .then(data => data.json())
                            .then(data => {
                                if (data && data.id) {
                                    this.setState({
                                        currentImage: 'http://127.0.0.1:5000/api/media/' + data.id,
                                        loadingImage: false
                                    });
                                    this.sendStateToParentComponent();
                                } else {
                                    element.value = null;
                                    this.setState({
                                        uploadError: data.message,
                                        loadingImage: false
                                    });
                                    this.sendStateToParentComponent();
                                }
                            }, error => {
                                element.value = null;
                                this.setState({ loadingImage: false });
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

    sendStateToParentComponent(value) {
        this.props.getUploadButtonState(this.state);
    }

    render() {
        return (
            <div className="UploadButton">
                <input
                    type="file"
                    id="RichEditorInputFile"
                    name="files"
                    accept=".jpg,.jpeg,.png,.gif"
                    className="form-control"
                    onChange={this.handleUploadImage} />
            </div>
        );
    }
}

export default UploadButton;

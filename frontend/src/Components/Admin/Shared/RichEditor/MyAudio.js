import ReactQuill from 'react-quill';

import { CreateSoundCloudIframe } from '../../../../Utils/Utils';

const EmbedBlot = ReactQuill.Quill.import('blots/block/embed');

export class MyAudio extends EmbedBlot {

    static create(value) {
        if (typeof value === 'object' && value.audioUrl) {
            const node = super.create(value);
            return CreateSoundCloudIframe(node, value, true);
        } else {
            return value;
        }
    }

    static value(node) {
        return node;
    }
}

MyAudio.blotName = 'myaudio';
MyAudio.tagName = 'iframe';
MyAudio.className = 'MyAudio';
ReactQuill.Quill.register(MyAudio);
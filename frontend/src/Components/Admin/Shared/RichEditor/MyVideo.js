import ReactQuill from 'react-quill';
import { CreateYoutubeIframe } from '../../../../Utils/Utils';

const EmbedBlot = ReactQuill.Quill.import('blots/block/embed');

export class MyVideo extends EmbedBlot {

    static create(value) {
        if (typeof value === 'object' && value.videoUrl) {
            const node = super.create(value);
            return CreateYoutubeIframe(node, value, true);
        } else {
            return value;
        }
    }

    static value(node) {
        return node;
    }
}

MyVideo.blotName = 'myvideo';
MyVideo.tagName = 'iframe';
MyVideo.className = 'MyVideo';
ReactQuill.Quill.register(MyVideo);
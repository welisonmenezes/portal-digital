import ReactQuill from 'react-quill';

const EmbedBlot = ReactQuill.Quill.import('blots/block/embed');

export class MyImage extends EmbedBlot {

    static create(value) {
        if (typeof value === 'object' && value.imageUrl) {
            const node = super.create(value);
            node.setAttribute('src', value.imageUrl);
            node.style.width = value.width;
            node.style.height = value.height;
            switch (value.position) {
                case 'left':
                    node.style.float = value.position;
                    break;
                case 'right':
                    node.style.float = value.position;
                    break;
                case 'center':
                    node.style.marginLeft = 'auto';
                    node.style.marginRight = 'auto';
                    node.style.display = 'flex';
                    break;
                default:
                    break;
            }
            return node;
        } else {
            return value;
        }
    }

    static value(node) {
        return node;
    }
}

MyImage.blotName = 'myimage';
MyImage.tagName = 'img';
MyImage.className = 'MyImage';
ReactQuill.Quill.register('formats/myimage', MyImage);
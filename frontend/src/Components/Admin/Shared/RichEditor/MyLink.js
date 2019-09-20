import ReactQuill from 'react-quill';

let Inline = ReactQuill.Quill.import('formats/link');

export class MyLink extends Inline {

    static href = '';
    static title = '';
    static target = '';

    static create(value) {
        const node = super.create();
        if (typeof value === 'object' && value.linkUrl) {
            this.href = value.linkUrl;
            this.title = value.title;
            this.target = value.target;
        }
        node.setAttribute('target', this.target);
        node.setAttribute('href', this.href);
        node.setAttribute('title', this.title);
        return node;
    }
}

MyLink.blotName = 'mylink';
MyLink.tagName = 'a';
MyLink.className = 'MyLink';
ReactQuill.Quill.register(MyLink);
const jwtDecode = require('jwt-decode');

export const IsInt = (value) => {
    if (value.toString().indexOf('.') > -1) {
        return false;
    }
    try {
        // eslint-disable-next-line
        value = parseInt(value);
        // eslint-disable-next-line
        return !isNaN(value) && parseInt(Number(value)) === value && !isNaN(parseInt(value, 10));
    } catch (error) {
        return false;
    }
};

export const OpenFullscreen = (elem) => {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
};

export const CloseFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

export const GetYoutubeVideoId = (url) => {
    try {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    } catch (error) {
        return null;
    }
};

export const IsSoundCloudUrl = (url) => {
    const regExp = /((http:\/\/(soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|snd\.sc\/.*))|(https:\/\/(soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*)))/i;
    return regExp.test(url);
};

export const GetFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};

export const IsAnUrl = (url) => {
    const regExp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return regExp.test(url);
};

export const CreateYoutubeIframe = (node, config, mustReturn) => {
    const ytUrl = `https://www.youtube.com/embed/${GetYoutubeVideoId(config.videoUrl)}`;
    node.setAttribute('src', ytUrl);
    if (mustReturn) {
        node.style.width = config.width;
        node.style.height = config.height;
        switch (config.position) {
            case 'left':
                node.style.float = config.position;
                break;
            case 'right':
                node.style.float = config.position;
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
    }
};

export const CreateSoundCloudIframe = (node, config, mustReturn) => {
    const scUlr = `https://w.soundcloud.com/player/?url=${encodeURI(config.audioUrl)}`;
    node.setAttribute('src', scUlr);
    if (mustReturn) {
        node.style.width = config.width;
        node.style.height = config.height;
        switch (config.position) {
            case 'left':
                node.style.float = config.position;
                break;
            case 'right':
                node.style.float = config.position;
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
    }
};

export const HasPermission = (permissions) => {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        if (decoded['role'] && permissions.includes(decoded['role'])) {
            return true;
        }
    }
    //return false;
    return true;
}
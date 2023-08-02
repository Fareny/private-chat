import Resize from 'react-image-file-resizer';

function Resizer(uriOrEvent, width, height, setValue) {

    if (uriOrEvent.target && uriOrEvent.target.files.length > 0) {
        const fileType = uriOrEvent.target.files[0].type;
        if (fileType.startsWith('video/')) {
            return alert('В данном чате видео не поддерживаются!');
        }
    }

    if (typeof uriOrEvent === 'string') {
        setValue(uriOrEvent);
        return;
    }

    let file;
    if (uriOrEvent instanceof File) {
        file = uriOrEvent;
    } else if (uriOrEvent.target && uriOrEvent.target.files.length > 0) {
        file = uriOrEvent.target.files[0];
    }

    if (file) {
        Resize.imageFileResizer(
            file,
            String(width), // Desired width (adjust to your preference)
            String(height), // Desired height (adjust to your preference)
            'JPEG', // Format (options: 'JPEG', 'PNG', 'WEBP')
            100, // Quality (1-100)
            0, // Rotation (0 = no rotation)
            (resizedUri) => {
                setValue(resizedUri);
            },
            'base64'
        );
    }
}

export default Resizer;

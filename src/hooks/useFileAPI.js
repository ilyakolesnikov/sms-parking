const DEFAULT_FILE_TYPE = 'application/json';

const checkFileAPI = () =>
    window.File && window.FileReader && window.FileList && window.Blob;

const readJSONFromFile = (file, requiredFormat = DEFAULT_FILE_TYPE) => {
    if (!file || !file.type.match(requiredFormat)) {
        return Promise.reject();
    }

    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
        reader.onload = ({ target }) => {
            const { result = '' } = target || {};

            try {
                const decoded = JSON.parse(result);

                resolve(decoded);
            } catch {
                reject();
            }
        };
    });

    reader.readAsText(file);

    return promise;
};

const loadFile = (event, requiredFormat) => {
    const { target } = event || {};

    if (!target) {
        return Promise.reject();
    }

    const [file] = target.files || [];

    return file ?
        readJSONFromFile(file, requiredFormat) :
        Promise.reject();
};

const downloadByVirtualLink = (url, fileName) => {
    const a = document.createElement("a");

    document.body.appendChild(a);

    a.style = "display: none";
    a.href = url;
    a.download = fileName;

    a.click();

    window.URL.revokeObjectURL(url);

    // TODO: delete link
}

const saveFile = (content, fileName) => {
    const blob = new Blob(
        [content],
        {type: 'application/json;charset=utf-8'}
    );
    const url = URL.createObjectURL(blob);

    downloadByVirtualLink(url, fileName);
};

const useFileAPI = () => {
    return {
        isFileAPISupported: checkFileAPI(),
        saveFile,
        loadFile,
        readJSONFromFile,
    }
};

export default useFileAPI;


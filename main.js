(function() {
    const filePath = './Dhruv Kant.pdf';
    const fileSizeEle = document.getElementById("file_size");
    const labelEle = document.getElementById("label");

    function setFileName(fileUrl) {
        const fileName = fileUrl.slice(fileUrl.lastIndexOf("/") + 1);
        labelEle.innerText = fileName;
    }

    setFileName(filePath);

    function getFileSize(fileUrl, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200){
                callback(parseInt(xhr.getResponseHeader("Content-Length")));
            }
        }
        xhr.open("HEAD", fileUrl, false);
        xhr.send();
    }

    function getFileSizeCallback(sizeInBytes) {
        const fileSizeInKB = Math.round(sizeInBytes/1024, 5);
        fileSizeEle.innerText = `${fileSizeInKB} KB`;
    }

    getFileSize(filePath, getFileSizeCallback);

    this.downloadFile = function() {
        downloadViaLink();
    }

    function downloadViaLink() {
        const link=document.createElement('a');
        link.href = filePath;
        link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
        link.click();
    }

    function downloadViaIframe() {
        const body = document.body;
        const iframeEle = document.createElement('iframe');
        iframeEle.src = filePath;
        iframeEle.setAttribute("style", "display: none");
        body.appendChild(iframeEle);
        setTimeout(() => body.removeChild(iframeEle), 1000);
    }

})()

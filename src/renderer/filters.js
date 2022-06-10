function applyFilter(filter, currentImage){
    console.log(filter);
    let imgObj = new Image(); // eslint-disable-line
    imgObj.src = currentImage.src;
     
    filterous.importImage(imgObj, {}) // eslint-disable-line
        .applyInstaFilter(filter)
        .renderHtml(currentImage);
}

module.exports = applyFilter;
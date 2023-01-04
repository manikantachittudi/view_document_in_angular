  prepareIframe( base64 ) {
    const blob = this.base64ToBlob( base64, 'application/pdf' );
    const url = URL.createObjectURL( blob );
    return url;
  }

  base64ToBlob( base64, type = "application/octet-stream" ) {
    const binStr = atob( base64 );
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      arr[ i ] = binStr.charCodeAt( i );
    }
    return new Blob( [ arr ], { type: type } );
  }

  viewDocument (data, index?) {
    const fileData = this.uploadDataSource[index].fileData;
      const reader = new FileReader();
      let baseData;
      reader.onload = (e) => {
        // view image as Base64  string
        baseData = e.target.result as string;
        console.log('baseData', baseData);
        let url = this.prepareIframe(baseData.split(',')[ 1 ]);

        let w = window.open("");
        w.document.write( `<iframe width='100%' height='100%' src='${url}'></iframe>`);
      }
      reader.readAsDataURL(fileData);
 }

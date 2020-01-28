'use strict';

import React,{
    Component
} from 'react';

import {
    StyleSheet,
    View
} from 'react-native';

// import PDFView from 'react-native-pdf-view';

export default class PDF extends Component {
    constructor(props) {
        super(props);
    }
      // <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
      //                    src={this.props.file}
      //                    onLoadComplete = {(pageCount)=>{
      //                       this.pdfView.setNativeProps({
      //                           zoom: 1.5
      //                       });
      //                    }}
      //                    style={styles.pdf}/>
    render(){
        <View></View>
    }
}
var styles = StyleSheet.create({
    pdf: {
        flex:1
    }
});

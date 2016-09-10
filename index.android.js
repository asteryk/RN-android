/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  Image
} from 'react-native';
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class EasyBangumi extends Component {
  constructor(props) {
      super(props)
      // 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
      // this.handleClick = this.handleClick.bind(this)
      // bind把父域中的this绑定到函数里才能调用this.props,也可以用箭头函数()=>{this.functionName()}构造匿名函数来实现
      this.state = {
        obj:{},
        title: ['loading...'],
        originTitle:['loading...'],
        coverUrl:['loading...'],
        comicTitle:['loading...'],
        comicCoverUrl:['loading...']
      };
  }
  componentWillMount(){
      // data get
      fetch('http://45.248.84.6:19942/')
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
          this.setState({
            title: responseJson.chineseName,
            originTitle:responseJson.originName,
            coverUrl: responseJson.coverUrl
          });
      })
      .catch((error) => {
        console.error(error);
      });

      // comic rank
      fetch('http://45.248.84.6:19942/comic')
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
          this.setState({
            comicTitle:responseJson.originName,
            comicCoverUrl: responseJson.coverUrl
          });
      })
      .catch((error) => {
        console.error(error);
      });

    // Display an interstitial ads
    AdMobInterstitial.setAdUnitID('your-admob-unit-id');
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    // 此处广告会报错，从stackoverflow上抄来一段代码
    AdMobInterstitial.requestAd(err => /*ignore_the(err) && */ AdMobInterstitial.showAd());
  }
  render() {
    var layout = [];
    for(var i = 0;i<this.state.title.length;i++){
     layout.push(
       <View key={'bangumi-info'+i} style={styles.listStyle}>
        <Image key={'cover-img'+i} style={styles.imageStyle}
          source={{uri: this.state.coverUrl[i]}} 
        />
        <View style={styles.contentStyle}>
          <Text key={'bangumi'+i} style={styles.spanMain}>
            {this.state.title[i]}
          </Text>
          <Text key={'japan'+i} style={styles.spanSmall}>
            {this.state.originTitle[i]}
          </Text>
        </View>
        </View>
      );
    }
    var comicLayout = [];
    for(var i = 0;i<this.state.comicTitle.length;i++){
     comicLayout.push(
       <View key={'comic-info'+i} style={styles.listStyle}>
        <Image key={'comic-img'+i} style={styles.imageStyle}
          source={{uri: this.state.comicCoverUrl[i]}} 
        />
        <View style={styles.contentStyle}>
          <Text key={'comic'+i} style={styles.spanMain}>
            {this.state.comicTitle[i]}
          </Text>
        </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.welcome}>
          Easy Bangumi
        </Text>
        <Text style={styles.welcome}>
          動漫信息
        </Text>
        <View style={styles.smallTitle}>
          <Text style={styles.spanTitle}>
            每日番組 Today Animate
          </Text>
        </View>
        {layout}
        <View style={styles.smallTitle}>
          <Text style={styles.spanTitle}>
            本月漫画排行 Comic Ranking
          </Text>
        </View>
        {comicLayout}
        <View style={styles.smallTitle}>
          <Text style={styles.spanTitle}>
            關於 About
          </Text>
        </View>
        <View style={styles.listStyle}>
        <Image style={styles.imageStyle}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} 
        />
        <View style={styles.contentStyle}>
          <Text style={styles.spanMain}>
            Copyright © Asteryk 基於 React Native 
          </Text>
          <Text style={styles.spanSmall}>
            版本：3.0.0，更多功能開發中
          </Text>
        </View>
        </View>
        </ScrollView>
        
         <View style={styles.wigetBottomAds}>
          <Text style={styles.spanTitle}>點一下廣告支持⤵️</Text>
          <AdMobBanner style={styles.wigetBottomAds}
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-9782109381882160/8042109937"
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError} />
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edecec',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color:'#fff',
    margin: 10,
  },
  smallTitle:{
    width:width,
    height:30,
    backgroundColor:'#edecec'
  },
  spanTitle:{
    paddingLeft:10,
    paddingTop:5,
    color:'#999'
  },
  listStyle:{
    flex: 1, 
    flexDirection: 'row' ,
    width:width,
    height:90,
    backgroundColor:'#fbf9fe',
    paddingLeft:10,
    paddingTop:15,
    borderWidth: 0.5,
    borderColor: '#e5e5e5'
  },
  imageStyle:{
    width:60,
    height:60,
  },
  scrollView:{
    backgroundColor:'#000',
    marginBottom:55
  },
  // 90 60 18 12
  contentStyle:{
    flex: 1,
    flexDirection: 'column',
    width:width - 70,
    paddingLeft:10
  },
  spanMain: {
    textAlign: 'left',
    width:width - 70,
    height:30, 
    color: '#333333'
  },
  spanSmall: {
    textAlign: 'left',
    fontSize:12,
    width:width - 70,
    height:30, 
    color: '#999'
  },
  wigetBottomAds:{
    position:'absolute',
    bottom:0,
    height:50,
    width:width,
    backgroundColor:'#edecec'
  }
});

AppRegistry.registerComponent('EasyBangumi', () => EasyBangumi);

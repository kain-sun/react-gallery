import React, {Component} from 'react';
import  {findDOMNode} from 'react-dom';
import imgDatasJson from './imgDetail/imgDatas.json';
import {getRangeRandom, get30DegRandom} from './util';
import logo from './logo.svg';
import './App.css';

const imgDatas = imgDatasJson.map((item) => {
    console.log('test');
    item.imgUrl = require('./images/' + item.fileName);
    return item;
})

export default class extends Component {
    constructor() {
        super();
        this.stage = {
            centerPos: {
                left: 0,
                top: 0
            },
            leftPos: {
                x: [0, 0],
                y: [0, 0]
            },
            rightPos: {
                x: [0, 0],
                y: [0, 0]
            },
            topPos: {
                x: [0, 0],
                y: [0, 0]
            }
        };
        this.state = {//存放每张图片的位置信息
            imgArr: []
        }
    }

    //重新布局 centerIndex是居中图片的索引值
    relayout(centerIndex) {
        let {imgArr} = this.state, {centerPos, leftPos, rightPos, topPos} = this.stage;
        let center = imgArr.splice(centerIndex, 1);//取出居中图片
        center[0] = {
            'pos': 'centerPos',
            'rotate': 0,
            'isCenter': true
        };
        //获取需要布局到上扇区的图片数量和信息；
        let top = [], topNum = Math.floor(Math.random() * 2), topIndex = Math.floor(Math.random() * imgArr.length);
        top = imgArr.splice(topIndex, topNum);
        //设置布置在上扇区的图片
        top.forEach((val, index) => {
            top[index] = {
                pos: {
                    top: getRangeRandom(topPos.y[0], topPos.y[1]),
                    left: getRangeRandom(topPos.x[0], topPos.x[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        });

        //布局左右两个扇区的图片
        for (let i = 0, length = imgArr.length, halflength = length / 2; i < length; i++) {
            let xRange = i < halflength ? leftPos.x : rightPos.x;
            imgArr[i] = {
                pos: {
                    top: getRangeRandom(leftPos.y[0], leftPos.y[1]),
                    left: getRangeRandom(xRange[0], xRange[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        }
        //如果上扇区有图片，则将其插回imgArr
        if (top && top[0]) {
            imgArr.splice(topIndex, 0, top[0]);
        }
        //将中心图片插回
        imgArr.splice(centerIndex, 0, center[0]);
        this.setState({imgArr});
    }

    centerFn(index) {
        this.relayout(index);
    }

    inverseFn(index) {
        let {imgArr} = this.state;
        imgArr[index].isInverse = !imgArr[index].isInverse;
        this.setState({imgArr});
    }

    //计算图片位置范围
    componentDidMount() {
        //拿到舞台的大小计算其一半的值
        let stageDOM = findDOMNode(this.refs['stage']),
            stageWidth = stageDOM.scrollWidth,
            stageHeight = stageDOM.scrllHeight,
            halfStageWidth = stageWidth / 2,
            halfStageHeight = stageHeight / 2;
        //取imgFigure的大小
        let imgFigureDOM = findDOMNode(this.refs['imgFigure0']),
            imgWidth = imgFigureDOM.scrollWidth,
            imgHeight = imgFigureDOM.scrllHeight,
            halfImgWidth = imgWidth / 2,
            halfImgHeight = imgHeight / 2;
        //计算中心图片的位置
        this.stage.centerPos = {
            top: halfStageHeight - halfImgHeight,
            left: halfStageWidth - halfStageWidth
        };
        //计算左扇区x和y的临界值
        this.stage.leftPos.x[0] = -halfImgWidth;
        this.stage.leftPos.x[1] = halfStageWidth - halfImgWidth*3;
        this.stage.leftPos.y[0] = -halfImgHeight;
        this.stage.leftPos.y[1] = stageHeight - halfImgHeight;
        //计算右扇区x和y的临界值
        this.stage.rightPos.x[0] = halfStageWidth + halfStageWidth;
        this.stage.rightPos.x[1] = stageWidth -halfImgWidth;
        this.stage.rightPos.y[0] = this.stage.leftPos.y[0];
        this.stage.rightPos.y[1] = this.stage.leftPos.y[1];
        //计算上扇区x和y的临界值
        this.stage.topPos.x[0] = halfStageWidth -halfImgWidth;
        this.stage.topPos.x[1] = halfStageWidth;
        this.stage.topPos.y[0] = -halfImgHeight;
        this.stage.topPos.y[1] = halfStageHeight - halfImgHeight * 3;
        //默认居中第一张
        this.relayout(0);
    }

    render() {
        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    111 {/*{imgFigure}*/}
                </section>
                <nav className="controller-nav">
                    222 {/*{cotrollerUnits}*/}
                </nav>
            </section>
        );
    }
}

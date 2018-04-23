/**
 * Created by Sundongdong on 18/4/23.
 */
import React, {Component} from 'react';
import classNames from 'classnames';

export default class extends Component{
    constructor(){
        super()
    }

    //处理用户点击，若是居中图片则翻转，否则让其居中
    handleClick(e){
        if(this.props.arrange.isCenter){
            this.props.inverseFn();
        }else{
            this.props.centerFn();
        }
        e.stopPropagation();
        e.preventDefault();
    }

    //获取图片样式
    getImgStyle(){
        let styleObj = {};
        //如果已指定图片位置，则使用
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos
        }
        //添加图片旋转样式
        if(this.props.arrange.rotate){
            let prefixArr =  ['MozTransform','MsTransform','WebkitTransform','transform'];
            prefixArr.forEach( value => {
                styleObj[value] = `rotate(${this.props.arrange.rotate}deg)`;
            });
        }
        //设置中心图片的z-index，使其总是在最上层
        if(this.props.arrange.isCenter){
            styleObj.zIndex = 11;
        }
        return styleObj;
    }

    render(){
        let styleObj = this.getImgStyle();
        let figureClass = classNames({
            'img-figure':true,
            'is-inverse':this.props.arrange.isInverse
        }), data = this.props.data;
        return(
            <figure className={figureClass} style={styleObj} onClick={::this.handleClick}>
                <img src={data.imgUrl} alt={data.title}/>
                <figcaption>
                    <h2 className="img-title">{data.title}</h2>
                    <div className="img-back" onClick={::this.handleClick}>
                        <p>{data.desc}</p>
                    </div>
                </figcaption>
            </figure>
        )
    }
}
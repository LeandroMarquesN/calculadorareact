import React from "react";
import "./Button.css"

export default props =>{

    //Aqui estou criando as classes css que vao definir as configurações dos  butoes 

    let classes = 'button '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''


    return (
        
    <button 
        onClick={e => props.click(props.label)}
        className={classes}>
        {props.label}
    </button>

    )
}
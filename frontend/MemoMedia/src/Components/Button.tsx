import styles from './css/Button.module.css'

const {button} = styles;

interface ButtonProps {
    onClick? : () =>void;
    content? : string
}

function Button(props : ButtonProps){
    return(
        <div>
            <button className={button} onClick={props.onClick}>{props.content}</button>
        </div>
    )
}
export default Button;
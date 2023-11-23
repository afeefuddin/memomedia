import styles from './css/Button.module.css'

const {button} = styles;
function Button(props : any){
    return(
        <div>
            <button className={button} onClick={props.onClick}>{props.content}</button>
        </div>
    )
}
export default Button;
import styles from './css/LoadingButton.module.css'

const {actionBtn,loginBtn } = styles
 function LoadingButton() {
  return (
    <div>
        <div>
            <button className={actionBtn} id={loginBtn}></button>
        </div>
    </div>
  )
}

export default LoadingButton
import { useSelector } from 'react-redux'
import { StateType } from '../Store/store'

function CommentIcon() {
    const theme = useSelector((state:StateType)=>state.theme.currentTheme)
  return (
    <div className='m-auto'><svg width="28" height="22" viewBox="0 0 151 132" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.6366 100.518L21.1797 98.3285L19.5866 96.7309C9.7573 86.874 4 74.5085 4 61.1382C4 30.3106 35.0776 4 75.247 4C115.416 4 146.494 30.3106 146.494 61.1382C146.494 91.9659 115.416 118.276 75.247 118.276C64.4543 118.276 54.2609 116.281 45.0868 112.83L42.9617 112.031L41.186 113.446C34.7686 118.559 22.4172 126.49 6.05718 127.561C7.33023 126.004 8.95757 123.901 10.6753 121.399C14.3464 116.052 18.6342 108.592 20.6366 100.518ZM3.53683 130.479C3.54843 130.467 3.56128 130.453 3.57536 130.438C3.56293 130.452 3.55021 130.466 3.53722 130.479L3.53683 130.479Z" stroke={theme==='light'? 'black' : 'white'} strokeWidth="8"/>
    </svg>
    </div>
  )
}

export default CommentIcon
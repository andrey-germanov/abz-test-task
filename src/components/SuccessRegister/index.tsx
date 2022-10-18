import success from '../../images/success-image.webp'
import s from './SuccessRegister.module.scss';

export const SuccessRegister = () => {
    
  return (
    <div className={s.successRegister}>
        User successfully registered
        <img src={success} alt="" />
    </div>
  )
}

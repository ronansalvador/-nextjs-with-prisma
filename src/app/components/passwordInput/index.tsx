import React, { useState } from 'react'
import Image from 'next/image'
import styles from './style.module.css'
import eye from '../../../../public/eye.svg'
import eyeSlash from '../../../../public/eye-slash.svg'

interface PasswordInputProps {
  placeholder: string
  passwordValue: string
  setPassword: (password: string) => void
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  passwordValue,
  setPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={styles.password_input}>
      <input
        type={showPassword ? 'text' : 'password'}
        name="password"
        id="password"
        placeholder={placeholder}
        value={passwordValue}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />

      <button
        className={styles.show_password}
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {/* Substitua os paths de 'eye' e 'eyeSlash' pelos caminhos corretos das suas imagens */}
        <Image
          src={showPassword ? eye : eyeSlash}
          alt="toggle password visibility"
          width={24} // Ajuste conforme necessário
          height={24} // Ajuste conforme necessário
        />
      </button>
    </div>
  )
}

export default PasswordInput

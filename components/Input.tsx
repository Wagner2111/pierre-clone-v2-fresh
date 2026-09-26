import React, { useState } from 'react'

interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  toggleVisibility?: boolean
  className?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    type = 'text',
    placeholder,
    value,
    onChange,
    toggleVisibility,
    className,
    disabled,
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-3 bg-gray-900 border border-gray-700
            rounded-lg text-white placeholder-gray-500
            focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
            transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}
          `}
        />
        {isPassword && toggleVisibility && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

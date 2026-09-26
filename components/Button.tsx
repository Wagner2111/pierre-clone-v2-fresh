import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'social'
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    type = 'button',
    onClick,
    disabled,
    className,
  }, ref) => {
    const baseStyles = `
      w-full px-4 py-3 rounded-lg font-medium
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      flex items-center justify-center gap-2
    `

    const variants = {
      primary: 'bg-white text-black hover:bg-gray-100 focus:ring-white',
      secondary: 'border border-gray-700 text-white hover:bg-gray-900 focus:ring-gray-400',
      social: 'border border-gray-700 text-white hover:bg-gray-900 focus:ring-gray-400',
    }

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

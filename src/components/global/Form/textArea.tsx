import React, { forwardRef } from 'react'

const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>((props, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className="w-full placeholder:text-sm rounded border bg-light px-3 py-4 focus-within:ring-2 focus-within:ring-neutral outline-none"
    />
  )
})
TextArea.displayName = 'textArea'

export default TextArea

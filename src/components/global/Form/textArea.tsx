import React, { forwardRef } from 'react'

const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>((props, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className="w-full placeholder:text-sm rounded  bg-zinc-200 px-3 py-4 focus-within:ring-2 focus-within:ring-zinc-400 outline-none"
    />
  )
})
TextArea.displayName = 'textArea'

export default TextArea
